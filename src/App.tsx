import "./App.css";
import SmartChef from "./components/SmartChef";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      '"Open Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
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
