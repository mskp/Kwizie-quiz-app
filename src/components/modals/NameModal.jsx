// Importing necessary dependencies and components
import { useState } from 'react';
import { Modal, Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlayerName } from '../../slices/playerSlice';
import { hideNameModal } from '../../slices/modalsSlice';
import modalStyle, { buttonStyles, buttonsContainerStyles } from "./modalStyles";
import toast from 'react-hot-toast';

// Defining the NameModal component
export default function NameModal({ open }) {
  // Setting up state for the player's name
  const [name, setName] = useState('');
  
  // Getting access to the Redux dispatch function
  const dispatch = useDispatch();
  
  // Getting the navigate function from react-router-dom
  const navigate = useNavigate();

  // Handling the play quiz action
  const handlePlayQuiz = (e) => {
    e.preventDefault();
    
    // Checking if the entered name is valid
    const invalidName = !name || name.length < 5 || name.length > 30;
    if (invalidName) {
      toast.error("Name must be 5-50 charcters long.", {id: "invalid-name-toast"});
      return;
    };

    // Dispatching the action to set the player name in the Redux store
    dispatch(setPlayerName(name));

    // Dispatching the action to hide the name modal
    dispatch(hideNameModal());
    
    // Display a toast message saying welcome
    toast.success("Welcome to the quiz.", {id: "welcome-toast"});
  };

  // Rendering the NameModal component
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
