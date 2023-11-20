import { useState } from 'react';
import { Modal, Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlayerName } from '../../slices/playerSlice';
import { hideNameModal } from '../../slices/modalsSlice';
import modalStyle, { buttonStyles, buttonsContainerStyles } from "./modalStyles";

export default function NameModal({open}) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlayQuiz = (e) => {
    e.preventDefault();
    const invalidName = !name || name.length < 5 || name.length > 30;
    if (invalidName) return;
    dispatch(setPlayerName(name));
    dispatch(hideNameModal());
  };

  return (
    <Modal open={open}>
      <Box
        sx={modalStyle}
        display="flex"
        flexDirection="column"
        gap=".5rem"
      >
        <Typography variant='h6'>
          Enter your name to start the quiz
        </Typography>
        <TextField
          fullWidth
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
          sx={{
            color: 'black', // Change to your desired text color
            '&::placeholder': {
              color: 'grey', // Change to your desired placeholder color
            },
            '& input': {
              padding: '.5rem .5rem'
            },
            backgroundColor: 'white', // Change to your desired background color
            border: '1px solid black', // Change to your desired border color
            borderRadius: '4px', // Optional: add border radius
          }}
        />
        <Box style={buttonsContainerStyles}>
          <Button sx={buttonStyles}
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button sx={buttonStyles} onClick={handlePlayQuiz}>
            Start Quiz
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
