import {
  getQuizData,
  getTotalActiveQuestionsLength,
} from "../../slices/quizSlice";
import clickSoundFile from "../../assets/click-sound.mp3";
import { useEffect, useState } from "react";
import styles from "./PlayQuiz.module.css";
import ResultModal from "../../components/modals/ResultModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Option from "./Option";

import { hideNameModal, showNameModal, showQuitModal } from "../../slices/modalsSlice";
import ConfirmQuitModal from "../../components/modals/ConfirmQuitModal";
import NameModal from "../../components/modals/NameModal";
import { Box } from "@mui/material";
import StyledButton from "../../components/StyledButton";
import toast from "react-hot-toast";
import { calculateQuizScore } from "../../utils/quizUtils";
import { useNavigate } from "react-router-dom";

export default function PlayQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizData = useSelector(getQuizData);
  const outOf = useSelector(getTotalActiveQuestionsLength);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(1);
  const [quizOver, setQuizOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length }, () => ({}))
  );

  const [score, setScore] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const playerName = useSelector((state) => state.player.name);

  // Modal State
  const nameModalState = useSelector((state) => state.nameModal.value);
  const quitModalState = useSelector((state) => state.quitModal.value);

  useEffect(() => {
    if (quizData?.length && quizData.length !== 0) {
      dispatch(showNameModal());
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        dispatch(hideNameModal());
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  const currentQuiz = quizData[currentQuizIndex];
  const currentQuestion = currentQuiz?.questionOptions[currentQuestionIndex];
  const isLastQuestionInQuiz =
    currentQuestionIndex === currentQuiz?.questionOptions?.length - 1;

  const handleNextClick = () => {
    if (!isOptionSelected) {
      return toast.error("Please select at least one option", { id: "option-selection-alert" })
    }
    if (isLastQuestionInQuiz && currentQuizIndex === quizData.length - 1) {
      const calculatedScore = calculateQuizScore(quizData, userAnswers);
      setScore(calculatedScore);
      setQuizOver(true);
    } else if (isLastQuestionInQuiz) {
      setCurrentQuizIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }

    const nextQuestionAnswer = userAnswers[currentQuizIndex]?.[currentQuestionIndex + 1];
    setIsOptionSelected(nextQuestionAnswer);

    setCurrentQuestionCount((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    // Check if we are at the first question of the current quiz
    if (currentQuestionIndex === 0) {
      // If we are at the first question of the first quiz, do nothing
      if (currentQuizIndex === 0) return;

      // Move to the last question of the previous quiz
      setCurrentQuizIndex((prev) => prev - 1);
      const lastQuestionIndex = quizData[currentQuizIndex - 1].questionOptions.length - 1;
      setCurrentQuestionIndex(lastQuestionIndex);
    } else {
      // Move to the previous question in the current quiz
      setCurrentQuestionIndex((prev) => prev - 1);
    }

    setCurrentQuestionCount((prev) => prev - 1);

    // Update isOptionSelected based on whether an answer exists for the previous question
    setIsOptionSelected(
      userAnswers[currentQuizIndex]?.[currentQuestionIndex - 1]
    );
  };

  const handleReplay = () => {
    setCurrentQuizIndex(0);
    setCurrentQuestionIndex(0);
    setCurrentQuestionCount(1);
    setQuizOver(false);
    setUserAnswers(Array.from({ length: quizData.length }, () => ({})));
    setScore(0);
    setIsOptionSelected(false);

    navigate("/play-quiz");
  };

  const handleOptionClick = (selectedOption) => {
    new Audio(clickSoundFile).play();
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuizIndex] = {
      ...updatedUserAnswers[currentQuizIndex],
      [currentQuestionIndex]: selectedOption,
    };
    setUserAnswers(updatedUserAnswers);
    setIsOptionSelected(true);
  };

  if (quizData?.length === 0)
    return (
      <section className={styles.play_quiz_section}>
        <p className={styles.not_found_text}>
          No active quizzes found
        </p>
      </section>
    )

  else if (!playerName && nameModalState)
    return (
      <NameModal open={true} />
    )

  else if (quizOver)
    return (
      <ResultModal score={score} outOf={outOf} handleReplay={handleReplay} />
    )

  else
    return (
      <section className={styles.play_quiz_section}>
        <h1 className={styles.quiz_title}>
          {currentQuiz.quizTitle}
        </h1>
        <p className={styles.question}>
          {currentQuestionCount}. {currentQuestion.question}
        </p>
        <ul className={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <Option
              key={`${option}${index}`}
              styles={styles}
              id={`${option}${index}`}
              optionText={option}
              onSelect={() => handleOptionClick(option)}
              isSelected={
                option ===
                userAnswers[currentQuizIndex]?.[currentQuestionIndex]
              }
            />
          ))}
        </ul>
        <p className={styles.progress_count}>
          Question: {currentQuestionCount} / {outOf}
        </p>
        <Box className={styles.buttonsContainer} display="flex" justifyContent="space-between" gap={1}>
          <StyledButton
            style={{ flexBasis: '33.33%' }}
            buttonText="Quit"
            onClick={() => dispatch(showQuitModal())}
          />
          <StyledButton
            style={{ flexBasis: '33.33%' }}
            buttonText="Previous"
            onClick={handlePrevClick}
            disabled={
              currentQuestionIndex === 0 && currentQuizIndex === 0
            }
          />
          <StyledButton
            style={{ flexBasis: '33.33%' }}
            buttonText={isLastQuestionInQuiz &&
              currentQuizIndex === quizData.length - 1
              ? "Show Result"
              : "Next"}
            onClick={handleNextClick}
          />
        </Box>
        {quitModalState && <ConfirmQuitModal />}
      </section>
    )
}
