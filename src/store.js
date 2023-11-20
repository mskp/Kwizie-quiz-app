import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import modalsReducers from "./slices/modalsSlice";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        player: playerReducer,
        nameModal: modalsReducers.nameModal,
        deleteModal: modalsReducers.deleteModal,
        quitModal: modalsReducers.quitModal
    }
});