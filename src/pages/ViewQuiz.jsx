import { useLoaderData } from "react-router-dom";
import QuizForm from "../components/QuizForm";
import { useSelector } from "react-redux";

// Loader function to fetch data needed for the component
export async function loader({ request }) {
    // Extract quizIndex from params and return it
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return parseInt(q);
}

// ViewQuiz component
export default function ViewQuiz() {
    // Retrieve quizIndex from the loader data
    const quizIndex = useLoaderData();

    // Retrieve quizData from the Redux store based on quizIndex
    const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);

    // If quizData is not available, display "Quiz Not Found"
    if (!quizData)
        return <div>Quiz Not Found</div>

    // Extract quizTitle and questions from quizData
    const quizTitle = quizData.quizTitle;
    const questions = quizData.questionOptions;

    return (
        <>
            {/* Render QuizForm component with readOnly set to true */}
            <QuizForm
                quizTitle={quizTitle}
                questions={questions}
                readOnly={true}
            />
        </>
    )
}
