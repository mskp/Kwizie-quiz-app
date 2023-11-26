// Importing necessary dependencies and components
import { useDispatch, useSelector } from 'react-redux';
import { hideViewQuizModal } from '../../slices/modalsSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

// Defining the ConfirmViewQuizModal component
export default function ConfirmViewQuizModal() {
    // Getting access to the Redux dispatch function
    const dispatch = useDispatch();

    // Getting the navigate function from react-router-dom
    const navigate = useNavigate();
    const quizData = useSelector(state => state.quiz.quizDetails);
    const latestQuizIndex = quizData.length - 1;

    // Handling the quit action
    const handleViewQuiz = () => {
        // Dispatching the action to hide the view quiz modal
        dispatch(hideViewQuizModal());
        navigate(`/view-quiz?q=${latestQuizIndex}`);
    };

    const handleCloseModal = () => {
        dispatch(hideViewQuizModal());
        // Navigating to the my quizzes page after quitting
        navigate("/my-quizzes")
    }

    // Rendering the ConfirmationModal component with appropriate props
    return (
        <ConfirmationModal
            open={true} // Always open in this case
            onClose={handleCloseModal} // Handling modal close
            onConfirm={handleViewQuiz} // Handling quit confirmation
            title="Quiz Created Successfully" // Modal title
            cancelText="Close" // Text for the cancel button
            confirmText="View Quiz" // Text for the confirm button
        />
    );
}
