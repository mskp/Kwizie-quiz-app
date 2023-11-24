// Importing necessary dependencies and components
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { validateQuizData } from "../utils/quizUtils";
import { updateQuizData } from "../slices/quizSlice";
import toast from "react-hot-toast";
import QuizForm from "../components/QuizForm";

// Loader function to fetch data needed for the component
export async function loader({ request }) {
    // Extract quizIndex from params and return it
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return parseInt(q);
}

// EditQuiz Component
// Represents the page for editing an existing quiz.
export default function EditQuiz() {
    // Redux hook for dispatch
    const dispatch = useDispatch();

    // React Router hook for navigation
    const navigate = useNavigate();

    // Retrieve quizIndex from the loader data
    const quizIndex = useLoaderData();

    // Retrieve quizData from the Redux store based on quizIndex
    const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);

    // State for quiz title
    const [quizTitle, setQuizTitle] = useState(quizData?.quizTitle);

    // State for questions
    const [questions, setQuestions] = useState(quizData?.questionOptions);

    // If quizData is not available, display "Quiz Not Found"
    if (!quizData) return <div>Quiz Not Found</div>;

    // Function to handle the update of an existing quiz
    const handleUpdateQuiz = (e) => {
        e.preventDefault();

        // Prepare the updated quiz object
        const updatedQuiz = {
            ...quizData,
            quizTitle,
            questionOptions: questions,
        };

        // Validate the updated quiz data
        const { success, error } = validateQuizData(updatedQuiz);

        // If validation is successful, dispatch the action to update the quiz
        if (success) {
            dispatch(updateQuizData({ index: quizIndex, updatedQuiz }));
            toast.success(`Quiz: ${quizTitle} has been updated`, { id: "update-quiz-toast" });
            return navigate("/my-quizzes");
        }

        // If validation fails, show an error toast
        return toast.error(error, { id: "update-quiz-toast" });
    };

    // Render the QuizForm component with necessary props
    return (
        <QuizForm
            quizTitle={quizTitle}
            setQuizTitle={setQuizTitle}
            questions={questions}
            setQuestions={setQuestions}
            handleFormSubmit={handleUpdateQuiz}
            saveButtonActionName={"Update Quiz"}
        />
    );
}
