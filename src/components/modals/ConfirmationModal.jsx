import { useDispatch } from 'react-redux';
import { Modal, Typography, Button, Box } from '@mui/material';
import modalStyles, { buttonStyles, buttonsContainerStyles } from "./modalStyles";

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    cancelText,
    confirmText,
}) => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        onConfirm();
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
                <Typography id="modal-modal-title" variant="h6">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ fontSize: '0.8rem' }}>
                    {description}
                </Typography>
                <Box sx={buttonsContainerStyles}>
                    <Button onClick={onClose} sx={buttonStyles}>{cancelText}</Button>
                    <Button onClick={handleConfirm} sx={buttonStyles}>{confirmText}</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
