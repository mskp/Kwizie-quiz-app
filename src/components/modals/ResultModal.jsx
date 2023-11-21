// Importing necessary dependencies and components
import { Modal, Box, Typography, Button } from '@mui/material';
import Confetti from 'react-confetti';
import celebrationEmoji from '../../assets/celebration.png';
import sadEmoji from '../../assets/sad.png';
import victorySound from '../../assets/victory-sound.mp3';
import lostSound from '../../assets/lost-sound.mp3';
import { useNavigate } from 'react-router-dom';
import { setPlayerName } from '../../slices/playerSlice';
import { useDispatch } from 'react-redux';
import modalStyle, { buttonStyles, buttonsContainerStyles } from './modalStyles';

// Defining the ResultModal component
export default function ResultModal({ score, outOf, handleReplay }) {
  // Getting the navigate function from react-router-dom
  const navigate = useNavigate();
  
  // Getting access to the Redux dispatch function
  const dispatch = useDispatch();

  // Determining the threshold for winning
  const threshold = outOf * 0.5;

  // Checking if the player has won based on the score and threshold
  const hasWon = score >= threshold;

  // Playing victory or loss sound based on the result
  new Audio(hasWon ? victorySound : lostSound).play();

  // Handling the exit action
  const handleExit = () => {
    // Dispatching the action to set the player name in the Redux store
    dispatch(setPlayerName(''));

    // Navigating to the "my-quizzes" page
    navigate('/my-quizzes');
  };

  // Rendering the ResultModal component
  return (
    <>
      {hasWon && <Confetti style={{ zIndex: 2, width: "100vw", height: "100vh" }} numberOfPieces={200} />}
      <Modal sx={{ zIndex: 1 }} open={true}>
        <Box sx={{ ...modalStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: ".5rem" }}>
          <img src={hasWon ? celebrationEmoji : sadEmoji} alt="emoji" style={{ height: '6rem', width: '6rem', userDrag: 'none', alignItems: 'center' }} />
          <Typography textAlign="center" variant="h5" sx={{ color: hasWon ? '#32833c' : 'indianred' }}>
            {hasWon ? 'Congratulations, You Won' : 'Oops.. you lost'}
          </Typography>
          <Typography textAlign="center" variant="h6" sx={{ fontSize: '1.5rem' }}>
            You've scored {score} out of {outOf}
          </Typography>
          <Box sx={buttonsContainerStyles}>
            <Button sx={buttonStyles} onClick={handleExit}>
              Close
            </Button>
            <Button sx={buttonStyles} onClick={handleReplay}>
              Replay
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
