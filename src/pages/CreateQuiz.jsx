import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../slices/quizSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import formatDate from "../utils/formatDate";
import { validateQuizData } from "../utils/quizUtils";
import CreateEditQuiz from "../components/CreateEditQuiz";

export default function CreateQuiz() {
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([
        { question: "", options: ["", ""], correctAnswer: "" },
    ]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateQuiz = (e) => {
        e.preventDefault();

        const newQuiz = {
            quizTitle,
            status: 1,
            createdOn: formatDate(new Date()),
            questionOptions: questions,
        };

        const { success, error } = validateQuizData(newQuiz);
        if (success) {
            dispatch(addQuestion(newQuiz));
            toast.success("Quiz: " + quizTitle + " Created", {id: "create-quiz-toast"})
            navigate("/my-quizzes");
        } else {
            toast.error(error, {id: "create-quiz-toast"})
        }
    };

    return (
        <CreateEditQuiz
            quizTitle={quizTitle}
            setQuizTitle={setQuizTitle}
            questions={questions}
            setQuestions={setQuestions}
            handleFormSubmit={handleCreateQuiz}
            saveButtonActionName={"Create Quiz"}
        />
    );
}
