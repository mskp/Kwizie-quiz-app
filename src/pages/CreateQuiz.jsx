// Importing necessary dependencies and components
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, getQuizData } from "../slices/quizSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import formatDate from "../utils/formatDate";
import { validateQuizData } from "../utils/quizUtils";
import QuizForm from "../components/QuizForm";
import { showViewQuizModal } from "../slices/modalsSlice";
import ConfirmViewQuizModal from "../components/modals/ConfirmViewQuizModal";

// CreateQuiz Component
// Represents the page for creating a new quiz.

export default function CreateQuiz() {
    // State for quiz title
    const [quizTitle, setQuizTitle] = useState("");

    // State for questions
    const [questions, setQuestions] = useState([
        { question: "", options: ["", ""], correctAnswer: "" },
    ]);

    const viewQuizModalState = useSelector((state) => state.viewQuizModal.value);

    // Redux hook for dispatch
    const dispatch = useDispatch();

    // React Router hook for navigation
    const navigate = useNavigate();

    // const 

    // Function to handle the creation of a new quiz
    const handleCreateQuiz = (e) => {
        e.preventDefault();

        // Prepare the new quiz object
        const newQuiz = {
            quizTitle,
            status: 1,
            createdOn: formatDate(new Date()),
            questionOptions: questions,
        };

        // Validate the quiz data
        const { success, error } = validateQuizData(newQuiz);

        // If validation is successful, dispatch the action to add the quiz
        if (success) {
            dispatch(addQuestion(newQuiz));
            toast.success("Quiz: " + quizTitle + " Created", { id: "create-quiz-toast" })
            dispatch(showViewQuizModal());
            // navigate("/my-quizzes");
        } else {
            // If validation fails, show an error toast
            toast.error(error, { id: "create-quiz-toast" })
        }
    };

    // Render the QuizForm component with necessary props
    return (
        <>
            {!viewQuizModalState ? (
                <QuizForm
                    quizTitle={quizTitle}
                    setQuizTitle={setQuizTitle}
                    questions={questions}
                    setQuestions={setQuestions}
                    handleFormSubmit={handleCreateQuiz}
                    saveButtonActionName={"Create Quiz"}
                />
            )
                :
                <ConfirmViewQuizModal />}
        </>
    );
}
