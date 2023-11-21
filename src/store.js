// Importing necessary functions and reducers from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import modalsReducers from "./slices/modalsSlice";
import playerReducer from "./slices/playerSlice";

// Configuring the Redux store with combineReducers
export const store = configureStore({
    // Defining the root reducer by combining multiple reducers
    reducer: {
        // quizReducer handles state related to the quiz
        quiz: quizReducer,
        // playerReducer handles state related to the player
        player: playerReducer,
        // modalsReducers handles state related to different modals
        // Each modal is managed by a separate reducer in the modalsSlice
        nameModal: modalsReducers.nameModal,
        deleteModal: modalsReducers.deleteModal,
        quitModal: modalsReducers.quitModal
    }
});
