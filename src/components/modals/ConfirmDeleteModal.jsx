import { useDispatch, useSelector } from 'react-redux';
import { hideDeleteModal } from '../../slices/modalsSlice';
import { removeQuiz } from '../../slices/quizSlice';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';

export default function ConfirmDeleteModal({ index, open }) {
  const dispatch = useDispatch();
  const quizDetails = useSelector((state) => state.quiz.quizDetails);

  const handleRemoveQuiz = (quizIndex) => {
    dispatch(removeQuiz(quizIndex));
    dispatch(hideDeleteModal());
    toast.error(`Quiz "${quizDetails[quizIndex].quizTitle}" deleted successfully`,
      {
        id: 'quiz-delete-toast',
      });
  };

  return (
    <ConfirmationModal
      open={open}
      onClose={() => dispatch(hideDeleteModal())}
      onConfirm={() => handleRemoveQuiz(index)}
      title="Are you sure you wanna delete?"
      description="This will permanently delete this quiz, and there's no way to recover it."
      cancelText="Cancel"
      confirmText="Delete"
    />
  );
}
