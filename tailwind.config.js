/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: 'var(--black)',
                'off-black': 'var(--off-black)',
                'dark-gray': 'var(--dark-gray)',
                'mid-gray': 'var(--mid-gray)',
                'light-gray': 'var(--light-gray)',
                'off-white': 'var(--off-white)',
                white: 'var(--white)',
            },
            fontFamily: {
                sans: ['Roboto', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        },
    },
    plugins: [],
}
