import { useDispatch } from 'react-redux';
import { hideQuitModal } from '../../slices/modalsSlice';
import { setPlayerName } from '../../slices/playerSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export default function ConfirmQuitModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuit = () => {
    dispatch(hideQuitModal());
    dispatch(setPlayerName(''));
    return navigate('/');
  };

  return (
    <ConfirmationModal
      open={true}
      onClose={() => dispatch(hideQuitModal())}
      onConfirm={handleQuit}
      title="Are you sure you want to quit?"
      description="You will lose all your scores"
      cancelText="Cancel"
      confirmText="Quit"
    />
  );
}
