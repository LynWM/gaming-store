import json
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse


class Blueprint:
    def __init__(self, name, import_name):
        self.name = name
        self.import_name = import_name
        self.routes = {}

    def route(self, rule, methods=None):
        methods = methods or ["GET"]

        def decorator(func):
            self.routes[(rule, tuple(methods))] = func
            return func

        return decorator

    def register(self, app, url_prefix=None):
        prefix = url_prefix or ""
        for (rule, methods), handler in self.routes.items():
            full_rule = prefix + rule
            app.routes[(full_rule, methods)] = handler


class Response:
    def __init__(self, payload, status_code=200, headers=None):
        self.payload = payload
        self.status_code = status_code
        self.headers = headers or {}

    def get_data(self):
        return self.payload.encode("utf-8")


class Request:
    def __init__(self):
        self.json = None
        self.args = {}
        self.method = "GET"
        self.path = "/"
        self.form = {}


request = Request()


class Flask:
    def __init__(self, name):
        self.name = name
        self.routes = {}
        self.error_handlers = {}
        self.blueprints = {}

    def route(self, rule, methods=None):
        methods = methods or ["GET"]

        def decorator(func):
            self.routes[(rule, tuple(methods))] = func
            return func

        return decorator

    def blueprint(self, blueprint, url_prefix=None):
        self.blueprints[blueprint.name] = blueprint
        blueprint.register(self, url_prefix)

    def errorhandler(self, code):
        def decorator(func):
            self.error_handlers[code] = func
            return func

        return decorator

    def jsonify(self, payload, status_code=200):
        data = json.dumps(payload, indent=2)
        return Response(data, status_code=status_code, headers={"Content-Type": "application/json"})

    def run(self, host="127.0.0.1", port=5000, debug=False):
        class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                self._dispatch("GET")

            def do_POST(self):
                self._dispatch("POST")

            def do_PUT(self):
                self._dispatch("PUT")

            def do_DELETE(self):
                self._dispatch("DELETE")

            def _dispatch(self, method):
                parsed = urlparse(self.path)
                path = parsed.path
                query = parse_qs(parsed.query)
                body = self.rfile.read(int(self.headers.get("Content-Length", "0")))
                data = {}
                if body:
                    try:
                        data = json.loads(body.decode("utf-8"))
                    except Exception:
                        data = {}

                global request
                request = Request()
                request.method = method
                request.path = path
                request.args = {k: v[0] if len(v) == 1 else v for k, v in query.items()}
                request.json = data

                response = None
                print(f"Incoming {method} {path}")
                for (rule, methods), handler in self.server.app.routes.items():
                    if method not in methods:
                        continue
                    match = self._match_rule(rule, path)
                    print(f"Trying {rule} -> {match}")
                    if match:
                        request.url_params = match
                        try:
                            response = handler(**match)
                        except TypeError:
                            response = handler()
                        break

                if response is None:
                    print(f"No route match for {method} {path}")
                    print("Available routes:", list(self.server.app.routes.keys()))
                    response = self.server.app.jsonify({"error": "Not found"}, status_code=404)

                self.send_response(response.status_code)
                self.send_header("Content-Type", response.headers.get("Content-Type", "application/json"))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
                self.send_header("Access-Control-Allow-Headers", "Content-Type,Authorization")
                self.end_headers()
                self.wfile.write(response.get_data())

            def do_OPTIONS(self):
                self.send_response(200)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
                self.send_header("Access-Control-Allow-Headers", "Content-Type,Authorization")
                self.end_headers()

            def _match_rule(self, rule, path):
                if rule == path:
                    return {}

                rule_parts = [part for part in rule.strip("/").split("/") if part]
                path_parts = [part for part in path.strip("/").split("/") if part]

                if len(rule_parts) != len(path_parts):
                    if len(rule_parts) == len(path_parts) + 1 and rule_parts and rule_parts[-1] == "<path:path>":
                        return {"path": "/".join(path_parts[len(rule_parts) - 1:])}
                    return None

                params = {}
                for index, (rule_part, path_part) in enumerate(zip(rule_parts, path_parts)):
                    if rule_part.startswith("<") and rule_part.endswith(">"):
                        if rule_part.startswith("<int:"):
                            name = rule_part[5:-1]
                            if not path_part.isdigit():
                                return None
                            params[name] = int(path_part)
                        elif rule_part.startswith("<string:"):
                            name = rule_part[8:-1]
                            if not path_part:
                                return None
                            params[name] = path_part
                        elif rule_part == "<path:path>":
                            params["path"] = "/".join(path_parts[index:])
                            break
                        else:
                            return None
                    elif rule_part != path_part:
                        return None

                return params

        server = HTTPServer((host, port), Handler)
        server.app = self
        print(f"Server running on http://{host}:{port}")
        server.serve_forever()
