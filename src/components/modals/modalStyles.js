export const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25rem",
    bgcolor: '#262626',
    boxShadow: 24,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    p: 2,
    borderRadius: ".8rem",
    '@media (max-width: 600px)': {
        width: '80%', // Adjust the width for smaller devices
    },
};

export const buttonsContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    width: "100%"
}

export const buttonStyles = {
    textTransform: "capitalize"
}

export default modalStyles;