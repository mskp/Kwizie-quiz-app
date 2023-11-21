// Importing necessary dependencies and components
import { useDispatch, useSelector } from 'react-redux';
import { hideDeleteModal } from '../../slices/modalsSlice';
import { removeQuiz } from '../../slices/quizSlice';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';

// Defining the ConfirmDeleteModal component
export default function ConfirmDeleteModal({ index, open }) {
  // Getting access to the Redux dispatch function
  const dispatch = useDispatch();
  
  // Selecting the quizDetails from the Redux store
  const quizDetails = useSelector((state) => state.quiz.quizDetails);

  // Handling the removal of a quiz
  const handleRemoveQuiz = (quizIndex) => {
    // Dispatching the action to remove the quiz from the Redux store
    dispatch(removeQuiz(quizIndex));

    // Dispatching the action to hide the delete modal
    dispatch(hideDeleteModal());

    // Displaying a toast notification for successful deletion
    toast.error(`Quiz "${quizDetails[quizIndex].quizTitle}" deleted successfully`, {
      id: 'quiz-delete-toast',
    });
  };

  // Rendering the ConfirmationModal component with appropriate props
  return (
    <ConfirmationModal
      open={open}
      onClose={() => dispatch(hideDeleteModal())} // Handling modal close
      onConfirm={() => handleRemoveQuiz(index)} // Handling quiz deletion confirmation
      title="Are you sure you wanna delete?" // Modal title
      description="This will permanently delete this quiz, and there's no way to recover it." // Modal description
      cancelText="Cancel" // Text for the cancel button
      confirmText="Delete" // Text for the confirm button
    />
  );
}
