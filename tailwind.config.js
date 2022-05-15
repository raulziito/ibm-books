module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.300", "currentColor"),
        "plastic-pink": "#ff1493",
      }),
      backgroundColor: (theme) => ({
        "plastic-pink": "#ff1493",
      }),
      textColor: (theme) => ({
        "plastic-pink": "#ff1493",
      }),
    },
  },
  plugins: [],
};
