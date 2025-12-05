/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        athYellow: "#1EA56A",       // Verde-amarillo principal
        athYellowDark: "#0A2C5A",   // Verde oscuro
        athGrayLight: "#F3F4F6",    // Gris claro
        athGray: "#9CA3AF",         // Gris medio
        
        athBlueLight: "#E0F2FE",    // Azul muy claro (fondos suaves)
        athBlue: "#3B82F6",         // Azul principal (botones, enlaces)
        athBlueDark: "#1E3A8A",     // Azul oscuro (headers, sidebar)

        athGreenLight: "#DCFCE7",   // Verde claro (éxito, ingresos)
        athGreen: "#22C55E",        // Verde principal (confirmaciones)
        athGreenDark: "#14532D",    // Verde oscuro (resaltados)

        athRedLight: "#FEE2E2",     // Rojo claro (alertas suaves)
        athRed: "#EF4444",          // Rojo principal (errores, gastos)
        athRedDark: "#7F1D1D",      // Rojo oscuro (alertas fuertes)

        athOrangeLight: "#FFEDD5",  // Naranja claro (avisos)
        athOrange: "#F97316",       // Naranja principal (advertencias)
        athOrangeDark: "#7C2D12",   // Naranja oscuro

        athPurpleLight: "#F3E8FF",  // Morado claro (categorías especiales)
        athPurple: "#A855F7",       // Morado principal
        athPurpleDark: "#4C1D95",   // Morado oscuro

        athBlack: "#111827",        // Negro suave (texto principal)
        athWhite: "#FFFFFF",        // Blanco puro
      },
    },
  },
  plugins: [],
}
