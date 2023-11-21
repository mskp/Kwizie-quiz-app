// Importing createSlice from Redux Toolkit for creating slices
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for the name modal
const nameModalSlice = createSlice({
    name: "nameModal",
    initialState: {
        value: false  // Initial state of the name modal, set to false (hidden)
    },
    reducers: {
        // Action to show the name modal
        showNameModal: (state) => {
            state.value = true;
        },
        // Action to hide the name modal
        hideNameModal: (state) => {
            state.value = false;
        }
    }
});

// Exporting the actions created by the nameModalSlice
export const { showNameModal, hideNameModal } = nameModalSlice.actions;

// Creating a slice for the delete confirmation modal
const deleteConfirmationModalSlice = createSlice({
    name: "deleteModal",
    initialState: {
        value: false  // Initial state of the delete modal, set to false (hidden)
    },
    reducers: {
        // Action to show the delete modal
        showDeleteModal: (state) => {
            state.value = true;
        },
        // Action to hide the delete modal
        hideDeleteModal: (state) => {
            state.value = false;
        }
    }
});

// Exporting the actions created by the deleteConfirmationModalSlice
export const { showDeleteModal, hideDeleteModal } = deleteConfirmationModalSlice.actions;

// Creating a slice for the quit quiz confirmation modal
const quitQuizConfirmationModalSlice = createSlice({
    name: "quitModal",
    initialState: {
        value: false  // Initial state of the quit modal, set to false (hidden)
    },
    reducers: {
        // Action to show the quit modal
        showQuitModal: (state) => {
            state.value = true;
        },
        // Action to hide the quit modal
        hideQuitModal: (state) => {
            state.value = false;
        }
    }
});

// Exporting the actions created by the quitQuizConfirmationModalSlice
export const { showQuitModal, hideQuitModal } = quitQuizConfirmationModalSlice.actions;

// Combining the reducers into a single object
const modalsReducers = {
    nameModal: nameModalSlice.reducer,
    deleteModal: deleteConfirmationModalSlice.reducer,
    quitModal: quitQuizConfirmationModalSlice.reducer
};

// Exporting the combined reducers
export default modalsReducers;
