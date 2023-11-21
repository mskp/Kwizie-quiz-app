// Importing necessary dependencies and components
import styles from "./CreateEditQuiz.module.css";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    Box
} from "@mui/material";
import StyledButton from "../StyledButton";
import { createDeepCopy } from "../../utils/quizUtils";
import OptionsMenu from "./OptionsMenu";

// CreateEditQuiz Component
// Represents a form for creating or editing a quiz, including questions and options.

// Props:
// - quizTitle: The title of the quiz.
// - setQuizTitle: Function to update the quiz title.
// - questions: Array of objects representing quiz questions.
// - setQuestions: Function to update the array of questions.
// - handleFormSubmit: Function to handle form submission.
// - saveButtonActionName: The label for the save button.

export default function CreateEditQuiz({
    quizTitle,
    setQuizTitle,
    questions,
    setQuestions,
    handleFormSubmit,
    saveButtonActionName
}) {
    // Function to add a new question
    const handleAddQuestion = () => {
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            { question: "", options: ["", ""], correctAnswer: "" },
        ]);
    };

    // Function to delete a question
    const handleDeleteQuestion = (questionIndex) => {
        if (questions?.length <= 1)
            return toast.error("Each quiz must have a minimum of 1 question", { id: "quest-delete-toast" });

        setQuestions((prevQuestions) =>
            prevQuestions.filter((_, index) => index !== questionIndex)
        );
        toast.error(`Question: ${questionIndex + 1} deleted!`, { id: "quest-delete-toast" })
    };

    // Function to handle changes in a question
    const handleQuestionChange = (index, field, value) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    // Function to handle changes in an option
    const handleOptionChange = (questionIndex, optionIndex, value) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Function to handle changes in the correct answer
    const handleCorrectAnswerChange = (questionIndex, optionValue) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[questionIndex].correctAnswer = optionValue;
        setQuestions(updatedQuestions);
    };

    // Function to delete an option
    const handleDeleteOption = (questionIndex, optionIndex) => {
        const updatedQuestions = createDeepCopy(questions);
        if (updatedQuestions[questionIndex].options.length <= 2)
            return toast.error("Can't have less than 2 options", { id: "warning-toast" });
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Function to add an option
    const handleAddOption = (questionIndex) => {
        let updatedQuestions = createDeepCopy(questions);
        if (updatedQuestions[questionIndex].options.length >= 5)
            return toast.error("Can't add more than 5 options", { id: "warning-toast" });
        updatedQuestions[questionIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    return (
        // Create/Edit Quiz Section
        <section className={styles["create-quiz-card"]}>
            {/* Quiz Form */}
            <form onSubmit={handleFormSubmit} className={styles["quiz-create-form"]}>
                {/* Input for Quiz Title */}
                <input
                    className={styles["input-title"]}
                    spellCheck={false}
                    type="text"
                    placeholder="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
                {/* Mapping through Questions */}
                {questions.map((question, questionIndex) => (
                    <div className={styles["question-options"]} key={questionIndex}>
                        <div className={styles.question_info}>
                            {/* Display Question Count */}
                            <p className={styles.question_count}>Q. {questionIndex + 1}</p>
                            {/* Button to Delete Question */}
                            <button type="button" onClick={() => handleDeleteQuestion(questionIndex)} className={`${styles.delete_btn}`}>
                                {/* Icon Button for Delete */}
                            </button>
                            {/* Options Menu for Question */}
                            <OptionsMenu onClickAddOption={() => handleAddOption(questionIndex)} onClickDelete={() => handleDeleteQuestion(questionIndex)} />
                        </div>
                        {/* Container for Question Input */}
                        <div className={styles["question-container"]}>
                            <input
                                type="text"
                                placeholder={`Enter question ${questionIndex + 1}`}
                                className={styles.question}
                                value={question.question}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        questionIndex,
                                        "question",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        {/* Container for Options */}
                        <div className={styles["options"]}>
                            {/* Mapping through Options */}
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className={styles["option-container"]}>
                                    {/* Input for Option */}
                                    <input
                                        key={optionIndex}
                                        id={optionIndex}
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className={styles["option"]}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                questionIndex,
                                                optionIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {/* Container for Option Actions */}
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        {/* Button to Delete Option */}
                                        <Grid item>
                                            <Button sx={{ color: "inherit" }} startIcon={<DeleteIcon />} onClick={() => handleDeleteOption(questionIndex, optionIndex)}>Delete</Button>
                                        </Grid>
                                        {/* Checkbox for Correct Answer */}
                                        <Grid item>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        style={{ color: "inherit" }}
                                                        onChange={
                                                            () => handleCorrectAnswerChange(questionIndex, option)
                                                        }
                                                        aria-label="check"
                                                        checked={Boolean(option && (option === question.correctAnswer))}
                                                    />
                                                }
                                                label="Correct"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {/* Container for Buttons */}
                <Box className={styles.buttonsContainer} display="flex" justifyContent="space-between" gap={0.5}>
                    {/* Button to Add Question */}
                    <StyledButton
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={handleAddQuestion}
                        style={{ flexGrow: 1 }}
                        buttonText="Add Question"
                    >
                        Add Question
                    </StyledButton>
                    {/* Button to Save Quiz */}
                    <StyledButton
                        type="submit"
                        variant="outlined"
                        color="primary"
                        style={{ flexGrow: 1 }}
                        buttonText={saveButtonActionName}
                    >
                        {saveButtonActionName}
                    </StyledButton>
                </Box>
            </form>
        </section>
    )
}
