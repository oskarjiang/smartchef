import "./App.css";
import SmartChef from "./components/SmartChef";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#e67e22", // Orange color to match the SmartChef theme
      dark: "#d35400",
      light: "#f39c12",
    },
    secondary: {
      main: "#2ecc71", // Green for contrast
    },
    info: {
      main: "#3498db",
    },
    error: {
      main: "#e74c3c",
    },
    background: {
      default: "#fffaf2",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "Montserrat",
      "Roboto",
      '"Open Sans"',
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SmartChef />
      </div>
    </ThemeProvider>
  );
}

export default App;
