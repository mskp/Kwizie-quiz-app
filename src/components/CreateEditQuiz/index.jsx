import styles from "./CreateEditQuiz.module.css";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    IconButton,
    Box
} from "@mui/material";
import StyledButton from "../StyledButton";
import { createDeepCopy } from "../../utils/quizUtils";
import OptionsMenu from "./OptionsMenu";

export default function CreateEditQuiz({
    quizTitle,
    setQuizTitle,
    questions,
    setQuestions,
    handleFormSubmit,
    saveButtonActionName
}) {
    // Function responsible for adding new question
    const handleAddQuestion = () => {
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            { question: "", options: ["", ""], correctAnswer: "" },
        ]);
    };

    // Function responsible for deleting the question
    const handleDeleteQuestion = (questionIndex) => {
        if (questions?.length <= 1)
            return toast.error("Each quiz has to have a minimum question of 1", { id: "quest-delete-toast" });

        setQuestions((prevQuestions) =>
            prevQuestions.filter((_, index) => index !== questionIndex)
        );
        toast.error(`Question: ${questionIndex + 1} deleted!`, { id: "quest-delete-toast" })
    };

    const handleQuestionChange = (index, field, value) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, optionValue) => {
        let updatedQuestions = createDeepCopy(questions);
        updatedQuestions[questionIndex].correctAnswer = optionValue;
        setQuestions(updatedQuestions);
    };

    const handleDeleteOption = (questionIndex, optionIndex) => {
        const updatedQuestions = createDeepCopy(questions);
        if (updatedQuestions[questionIndex].options.length <= 2)
            return toast.error("Can't have less then 2 options", { id: "warning-toast" });
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (questionIndex) => {
        let updatedQuestions = createDeepCopy(questions);
        if (updatedQuestions[questionIndex].options.length >= 5)
            return toast.error("Can't add more than 5 options", { id: "warning-toast" });
        updatedQuestions[questionIndex].options.push("");
        setQuestions(updatedQuestions);
    };

    return (
        <section className={styles["create-quiz-card"]}>
            <form onSubmit={handleFormSubmit} className={styles["quiz-create-form"]}>
                <input
                    className={styles["input-title"]}
                    spellCheck={false}
                    type="text"
                    placeholder="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
                {questions.map((question, questionIndex) => (
                    <div className={styles["question-options"]} key={questionIndex}>
                        <div className={styles.question_info}>
                            <p className={styles.question_count}>Q. {questionIndex + 1}</p>
                            <button type="button" onClick={() => handleDeleteQuestion(questionIndex)} className={`${styles.delete_btn}`}>
                                {/* <IconButton aria-label="delete" size="large" style={{ color: "inherit" }}>
                                    <DeleteIcon />
                                </IconButton> */}
                            </button>
                            <OptionsMenu onClickAddOption={() => handleAddOption(questionIndex)} onClickDelete={() => handleDeleteQuestion(questionIndex)} />
                        </div>
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
                            {/* <button
                                type="button"
                                className={`button-primary ${styles["add-option-btn"]}`}
                                onClick={() => handleAddOption(questionIndex)}
                            >
                                Add Option
                            </button> */}
                        </div>
                        <div className={styles["options"]}>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className={styles["option-container"]}>
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
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Button sx={{ color: "inherit" }} startIcon={<DeleteIcon />} onClick={() => handleDeleteOption(questionIndex, optionIndex)}>Delete</Button>
                                        </Grid>
                                        <Grid item>
                                            {/* Your Checkbox with Label */}
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
                <Box className={styles.buttonsContainer} display="flex" justifyContent="space-between" gap={0.5}>
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