/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Roboto', 'sans-serif']
    },
    extend: {
      width: {
        main: '1170px'
      },
      backgroundColor: {
        main: '#bf0000',
        bgc: '#f4f6f8',
        cusblue: '#3b5998',
        cusred: '#e14b33',
        overlay: 'rgba(0,0,0,0.4)'
      },
      colors: {
        main: '#9b2c2c'
      },
      gridGrow: {
        'span-7': 'span 7 / span 7'
      },
      gridTemplateRows: {
        // Simple 16 row grid
        '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(10px);',
            transform: 'translateY(10px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          }
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-1000px);',
            transform: 'translateX(-1000px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}