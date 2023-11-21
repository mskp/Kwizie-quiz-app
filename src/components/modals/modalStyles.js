// Exporting a set of styles for the modal
export const modalStyles = {
    position: 'absolute', // Absolute positioning for the modal
    top: '50%', // Centering vertically
    left: '50%', // Centering horizontally
    transform: 'translate(-50%, -50%)', // Adjusting the centering
    width: "25rem", // Default width of the modal
    bgcolor: '#262626', // Background color of the modal
    boxShadow: 24, // Adding a shadow to the modal
    color: "#fff", // Text color
    display: "flex", // Displaying as a flex container
    flexDirection: "column", // Vertical stacking of child elements
    gap: ".5rem", // Spacing between child elements
    p: 2, // Padding for the modal content
    borderRadius: ".8rem", // Border radius for rounded corners
    '@media (max-width: 600px)': {
        width: '80%', // Adjust the width for smaller devices
    },
};

// Exporting styles for the container of action buttons
export const buttonsContainerStyles = {
    display: "flex", // Displaying as a flex container
    justifyContent: "flex-end", // Aligning buttons to the right
    gap: "1rem", // Spacing between buttons
    width: "100%", // Full width
}

// Exporting styles for action buttons
export const buttonStyles = {
    textTransform: "capitalize" // Avoiding uppercase transformation for button text
}

// Exporting the main modal style
export default modalStyles;
