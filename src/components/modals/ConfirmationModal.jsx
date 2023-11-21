import { Modal, Typography, Button, Box } from '@mui/material';
import modalStyles, { buttonStyles, buttonsContainerStyles } from "./modalStyles";
import PropTypes from 'prop-types';

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    cancelText,
    confirmText,
}) => {

    // Function to handle the confirmation action
    const handleConfirm = () => {
        // Call the onConfirm callback
        onConfirm();
        // Close the modal
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyles}>
                {/* Modal Title */}
                <Typography id="modal-modal-title" variant="h6">
                    {title}
                </Typography>
                {/* Modal Description */}
                <Typography id="modal-modal-description" sx={{ fontSize: '0.8rem' }}>
                    {description}
                </Typography>
                {/* Container for Cancel and Confirm buttons */}
                <Box sx={buttonsContainerStyles}>
                    {/* Cancel Button */}
                    <Button onClick={onClose} sx={buttonStyles}>
                        {cancelText}
                    </Button>
                    {/* Confirm Button */}
                    <Button onClick={handleConfirm} sx={buttonStyles}>
                        {confirmText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

// Prop types for the ConfirmationModal component
ConfirmationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
};

export default ConfirmationModal;
