import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./reduxComponents/store.jsx";
import googleTheme from "./googleTheme.jsx";


// Disable Ripple Globally
// const theme = createTheme({
//   components: {
//     MuiButtonBase: {
//       defaultProps: {
//         disableRipple: true, // Disables ripple effect globally
//       },
//     },
//   },
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={googleTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);