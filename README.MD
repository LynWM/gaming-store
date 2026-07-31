````markdown
# Gaming Store

## Overview

Gaming Store is a full-stack web application that allows users to browse and explore gaming products through a modern and responsive interface. The application consists of a React frontend and a Flask backend that work together to provide product information and other application data.

## Technologies Used

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React

### Backend
- Python
- Flask
- Flask-CORS
- Pipenv

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- Python 3
- Pipenv

Install Pipenv if you do not already have it:

```bash
pip install pipenv
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

## Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install the backend dependencies:

```bash
pipenv install
```

Activate the virtual environment:

```bash
pipenv shell
```

Start the Flask server:

```bash
python app.py
```

The backend will start on its configured local port.

## Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local URL displayed in the terminal (typically `http://localhost:5173`).

## Frontend Dependencies

- React
- React DOM
- React Router DOM
- Tailwind CSS
- Tailwind CSS Vite Plugin
- Lucide React

## Backend Dependencies

- Flask
- Flask-CORS

## Running the Project

To use the application:

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend URL shown in the terminal.
4. Ensure both servers remain running while using the application.

## Build the Frontend

To create a production build:

```bash
npm run build
```


