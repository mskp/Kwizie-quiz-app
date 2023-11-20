import { Button } from "@mui/material";

export default function StyledButton({ buttonText = "Button", onClick, ...otherProps }) {
    const buttonStyles = {
        color: "inherit",
        border: "1px solid",
        borderColor: "inherit",
        textTransform: "capitalize"
    };
    return (
        <Button
            {...otherProps}
            variant="outlined"
            sx={buttonStyles}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    )
}
