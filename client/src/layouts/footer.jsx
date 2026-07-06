import { Gamepad2, Mail, Phone } from 'lucide-react'
import React from 'react'


const colors = {
    footer: "#0d0d17",
    footerText: "#a1a1b5",
    border: "rgba(124,58,237,0.15)",
    violet: "#7c3aed",
    cyan: "#00d4ff",
}

const popularTitles = [
    "FIFA 25",
    "Call of Duty",
    "Grand Theft Auto",
    "Mortal Kombat",
]

export default function Footer() {
  return (
    <footer
        style={{
            backgroundColor: colors.footer,
            borderTop: `1px solid ${colors.border}`,
        }}
        className='px-8 pt-8 pb-4 mt-auto'
    >
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-20 items-start'>

            {/* NexPLAY */}
            <div className='max-w-42'>
                <p style={{ color: colors.violet }} className='text-lg font-semibold'>
                    NexPLAY
                </p>
                <p style={{ color: colors.footerText }} className='text-sm opacity-80 pt-2 tracking-wide'>
                    Your one-stop gaming destination for consoles, games, gear & more.
                </p>
            </div>

            {/* Contact Us */}
            <div className=''>
                <p style={{ color: colors.violet }} className='text-lg font-semibold'>
                    Contact Us
                </p>
                <ul className=' text-sm opacity-80 pt-2 ' style={{ color: colors.footerText }}>
                    <li className='flex gap-2 pb-2'> <Mail size={21}/> nexplaygames@gmail.com</li>
                    <li className='flex gap-2 pb-2'> <Phone size={21}/> +254 724 984031</li>
                </ul>
            </div>

            {/* Popular Titles */}
            <div className='mr-2.5'>
                <p style={{ color: colors.violet }} className='text-lg font-semibold'>
                    Popular Titles
                </p>
                <ul className='text-sm opacity-80 pt-2' style={{ color: colors.footerText }}>
                    {popularTitles.map((title) => (
                        <li key={title} className='pb-2'>{title}</li>
                    ))}
                </ul>
            </div>

        </div>

        {/* Copyright*/}
        <div
            style={{ borderTop: `1px solid ${colors.border}` }}
            className='max-w-7xl mx-auto mt-8 pt-6 text-center'
        >
            <p style={{ color: colors.footerText }} className='text-xs opacity-70'>
                © 2026 NexPlay Inc. All rights reserved.
            </p>
        </div>
    </footer>
  )
}