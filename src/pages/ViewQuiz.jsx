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

export default function ViewQuiz() {
    // Retrieve quizIndex from the loader data
    const quizIndex = useLoaderData();

    // Retrieve quizData from the Redux store based on quizIndex
    const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);

    if (!quizData)
        return <div>Quiz Not Found</div>

    // State for quiz title
    const quizTitle = quizData.quizTitle;

    // State for questions
    const questions = quizData.questionOptions;

    return (
        <>
            <QuizForm
                quizTitle={quizTitle}
                questions={questions}
                readOnly={true}
            />
        </>
    )
}