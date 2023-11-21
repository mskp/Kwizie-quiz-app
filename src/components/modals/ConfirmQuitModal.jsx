// Importing necessary dependencies and components
import { useDispatch } from 'react-redux';
import { hideQuitModal } from '../../slices/modalsSlice';
import { setPlayerName } from '../../slices/playerSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

// Defining the ConfirmQuitModal component
export default function ConfirmQuitModal() {
  // Getting access to the Redux dispatch function
  const dispatch = useDispatch();
  
  // Getting the navigate function from react-router-dom
  const navigate = useNavigate();

  // Handling the quit action
  const handleQuit = () => {
    // Dispatching the action to hide the quit modal
    dispatch(hideQuitModal());

    // Dispatching the action to set the player name to an empty string
    dispatch(setPlayerName(''));

    // Navigating to the home page ("/") after quitting
    return navigate('/');
  };

  // Rendering the ConfirmationModal component with appropriate props
  return (
    <ConfirmationModal
      open={true} // Always open in this case
      onClose={() => dispatch(hideQuitModal())} // Handling modal close
      onConfirm={handleQuit} // Handling quit confirmation
      title="Are you sure you want to quit?" // Modal title
      description="You will lose all your scores" // Modal description
      cancelText="Cancel" // Text for the cancel button
      confirmText="Quit" // Text for the confirm button
    />
  );
}
