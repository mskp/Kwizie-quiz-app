import { createSlice } from "@reduxjs/toolkit";

const nameModalSlice = createSlice({
    name: "nameModal",
    initialState: {
        value: false
    },
    reducers: {
        showNameModal: (state) => {
            state.value = true;
        },
        hideNameModal: (state) => {
            state.value = false;
        }
    }
});

export const { showNameModal, hideNameModal } = nameModalSlice.actions;

const deleteConfirmationModalSlice = createSlice({
    name: "deleteModal",
    initialState: {
        value: false
    },
    reducers: {
        showDeleteModal: (state) => {
            state.value = true;
        },
        hideDeleteModal: (state) => {
            state.value = false;
        }
    }
});

export const { showDeleteModal, hideDeleteModal } = deleteConfirmationModalSlice.actions;

const quitQuizConfirmationModalSlice = createSlice({
    name: "quitModal",
    initialState: {
        value: false
    },
    reducers: {
        showQuitModal: (state) => {
            state.value = true;
        },
        hideQuitModal: (state) => {
            state.value = false;
        }
    }
})
export const { showQuitModal, hideQuitModal } = quitQuizConfirmationModalSlice.actions;

const modalsReducers = {
    nameModal: nameModalSlice.reducer,
    deleteModal: deleteConfirmationModalSlice.reducer,
    quitModal: quitQuizConfirmationModalSlice.reducer
};

export default modalsReducers;
