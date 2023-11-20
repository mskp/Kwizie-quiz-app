import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { validateQuizData } from "../utils/quizUtils";
import { updateQuizData } from "../slices/quizSlice";
import toast from "react-hot-toast";
import CreateEditQuiz from "../components/CreateEditQuiz";

export async function loader({ params }) {
    const { quizIndex } = params;
    return quizIndex;
}

export default function EditQuiz() {
    const quizIndex = useLoaderData();
    const quizData = useSelector((state) => state.quiz.quizDetails[quizIndex]);
    
    const [quizTitle, setQuizTitle] = useState(quizData.quizTitle);
    const [questions, setQuestions] = useState(quizData.questionOptions);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateQuiz = (e) => {
        e.preventDefault();

        const updatedQuiz = {
            ...quizData,
            quizTitle,
            questionOptions: questions,
        };
        const { success, error } = validateQuizData(updatedQuiz);
        if (success) {
            dispatch(updateQuizData({ index: quizIndex, updatedQuiz }));
            toast.success(`Quiz: ${quizTitle} has been updated`, {id: "update-quiz-toast"});
            return navigate("/my-quizzes");
        }

        return toast.error(error, {id: "update-quiz-toast"});
    };

    return (
        <CreateEditQuiz
            quizTitle={quizTitle}
            setQuizTitle={setQuizTitle}
            questions={questions}
            setQuestions={setQuestions}
            handleFormSubmit={handleUpdateQuiz}
            saveButtonActionName={"Update Quiz"}
        />
    );
}
