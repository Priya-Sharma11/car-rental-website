/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor : "#FEB60D",
        purpleColor:"9771FF",
        irisBlueColor :"#01B5C5",
        headingColor:"#181A1E",
        textColor:"#4E545F",
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      boxShadow:{
        panelShow : "rgba(17,12,46,0.15) 0px 48px 100px 0px;"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' , animationTimingFunction: 'ease-out'},
          '100%': { transform: 'translateX(-100%)', animationTimingFunction: 'ease-in' },
        },
       
      },
     
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      toastBody:{
        fontFamily: "Atlas grotesk web, arial, helvetica, sans-serif",
        fontSize: "1.7rem" ,
      },
    
    },
  },
  plugins: [],
};
