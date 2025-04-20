import { createTheme } from "@mui/material/styles";

const googleTheme = createTheme({
    palette: {
        primary: {
            main: "#4285F4", // Google's signature blue
        },
        secondary: {
            main: "#34A853", // Google's green
        },
        background: {
            default: "#F5F5F5", // Light gray background
            paper: "#FFFFFF", // White cards and surfaces
        },
        text: {
            primary: "#202124", // Google's dark gray text
            secondary: "#5F6368", // Google's light gray text
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif", // Google's default font
        h1: {
            fontSize: "2rem",
            fontWeight: 500,
        },
        h2: {
            fontSize: "1.8rem",
            fontWeight: 500,
        },
        h3: {
            fontSize: "1.6rem",
            fontWeight: 500,
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
        },
        button: {
            textTransform: "none", // Google's apps use lowercase button text
            fontWeight: "bold",
        },
    },
    shape: {
        borderRadius: 8, // Rounded corners for simplicity
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // Disables ripple effect globally
            },
        },
    },
});

export default googleTheme;