// Importing createSlice from Redux Toolkit for creating slices
import { createSlice } from '@reduxjs/toolkit';

// Retrieving quiz details from local storage or initializing an empty array
const quizDetails = JSON.parse(localStorage.getItem('quizData')) ?? [];

// Creating a slice for the quiz
const quizSlice = createSlice({
  name: 'quiz', // Slice name, used to generate action types
  initialState: {
    quizDetails, // Initial state of the quiz, with quizDetails loaded from local storage or an empty array
  },
  reducers: {
    // Action to add a new question to the quiz
    addQuestion: (state, action) => {
      const data = action.payload;
      state.quizDetails.push(data);
      // Updating local storage with the modified quiz details
      localStorage.setItem('quizData', JSON.stringify(state.quizDetails));
    },
    // Action to remove a quiz by index
    removeQuiz: (state, action) => {
      const quizIndex = action.payload;
      // Filtering out the quiz at the specified index
      state.quizDetails = state.quizDetails.filter((_, index) => index !== quizIndex);
      // Updating local storage with the modified quiz details
      localStorage.setItem('quizData', JSON.stringify(state.quizDetails));
    },
    // Action to change the status of a quiz
    changeStatus: (state, action) => {
      const { index, status } = action.payload;
      // Updating the status of the quiz at the specified index
      if (status === 0 || status === 1) {
        const updatedQuizDetails = [...state.quizDetails];
        updatedQuizDetails[index] = {
          ...updatedQuizDetails[index],
          status: status,
        };
        state.quizDetails = updatedQuizDetails;
        // Updating local storage with the modified quiz details
        localStorage.setItem('quizData', JSON.stringify(updatedQuizDetails));
      }
    },
    // Action to update quiz data for a specific quiz
    updateQuizData: (state, action) => {
      const { index, updatedQuiz } = action.payload;
      // Updating the quiz data for the quiz at the specified index
      const updatedQuizDetails = [...state.quizDetails];
      updatedQuizDetails[index] = {
        ...updatedQuizDetails[index],
        ...updatedQuiz,
      };
      state.quizDetails = updatedQuizDetails;
      // Updating local storage with the modified quiz details
      localStorage.setItem('quizData', JSON.stringify(updatedQuizDetails));
    },
  },
});

// Selector to get active quiz data
export const getQuizData = state => {
  return state.quiz.quizDetails.filter(quiz => quiz.status === 1);
};

// Selector to get the total number of active questions
export const getTotalActiveQuestionsLength = state => {
  const activeQuizDetails = getQuizData(state);

  const totalActiveQuestions = activeQuizDetails.reduce(
    (total, quiz) => total + quiz.questionOptions.length,
    0
  );

  return totalActiveQuestions;
};

// Exporting actions and reducer from the quiz slice
export const { addQuestion, removeQuiz, changeStatus, updateQuizData } = quizSlice.actions;
export default quizSlice.reducer;
