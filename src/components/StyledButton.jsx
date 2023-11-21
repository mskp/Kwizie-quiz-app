import { Button } from "@mui/material";

// StyledButton Component
// Represents a customized styled button using Material-UI Button.

export default function StyledButton({ buttonText = "Button", onClick, ...otherProps }) {
    // Custom styles for the button
    const buttonStyles = {
        color: "inherit",
        border: "1px solid",
        borderColor: "inherit",
        textTransform: "capitalize",
    };

    return (
        // Material-UI Button component with custom styles
        <Button
            {...otherProps}
            variant="outlined"
            sx={buttonStyles}
            onClick={onClick}
        >
            {/* Button text */}
            {buttonText}
        </Button>
    );
}
