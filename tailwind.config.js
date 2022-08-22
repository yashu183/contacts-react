/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#007bff',
                danger: 'rgb(252, 87, 74)',
                warning: '#ffc107',
                dark: '#343a40',
                info: '#17a2b8',
                success: '#28a745'
            },
            width: {}
        }
    },
    plugins: []
};
