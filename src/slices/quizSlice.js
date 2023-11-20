import { createSlice } from '@reduxjs/toolkit';

const quizDetails = JSON.parse(localStorage.getItem('quizData')) ?? [];

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizDetails
  },
  reducers: {
    addQuestion: (state, action) => {
      const data = action.payload;
      state.quizDetails.push(data);
      localStorage.setItem('quizData', JSON.stringify(state.quizDetails));
    },
    removeQuiz: (state, action) => {
      const quizIndex = action.payload;
      state.quizDetails = state.quizDetails.filter((_, index) => index !== quizIndex);
      localStorage.setItem('quizData', JSON.stringify(state.quizDetails));
    },
    changeStatus: (state, action) => {
      const { index, status } = action.payload;
      if (status === 0 || status === 1) {
        const updatedQuizDetails = [...state.quizDetails];
        updatedQuizDetails[index] = {
          ...updatedQuizDetails[index],
          status: status,
        };
        state.quizDetails = updatedQuizDetails;
        localStorage.setItem('quizData', JSON.stringify(updatedQuizDetails));
      }
    },
    updateQuizData: (state, action) => {
      const { index, updatedQuiz } = action.payload;
      const updatedQuizDetails = [...state.quizDetails];
      updatedQuizDetails[index] = {
        ...updatedQuizDetails[index],
        ...updatedQuiz,
      };
      state.quizDetails = updatedQuizDetails;
      localStorage.setItem('quizData', JSON.stringify(updatedQuizDetails));
    },
  },
});

export const getQuizData = state => {
  return state.quiz.quizDetails.filter(quiz => quiz.status === 1);
};

export const getTotalActiveQuestionsLength = state => {
  const activeQuizDetails = getQuizData(state);

  const totalActiveQuestions = activeQuizDetails.reduce(
    (total, quiz) => total + quiz.questionOptions.length,
    0
  );

  return totalActiveQuestions;
};

export const { addQuestion, removeQuiz, changeStatus, updateQuizData } = quizSlice.actions;
export default quizSlice.reducer;