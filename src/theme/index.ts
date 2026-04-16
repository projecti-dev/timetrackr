import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f0b89a",
      dark: "#d4845a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a8c5a0",
      dark: "#5e8f57",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fdf8f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#3d2e26",
      secondary: "#7a6258",
      disabled: "#b09a90",
    },
    divider: "#ecddd3",
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h4: { fontFamily: '"Lora", serif', fontWeight: 600 },
    h5: { fontFamily: '"Lora", serif', fontWeight: 600 },
    h6: { fontFamily: '"Lora", serif', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});

export default theme;
