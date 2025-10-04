module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
};
