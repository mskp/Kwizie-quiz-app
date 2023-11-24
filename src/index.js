// Importing necessary modules from React and ReactDOM
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Importing global styles
import './assets/globals.css';

// Importing modules from react-router-dom for routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing modules from react-redux for state management
import { Provider } from 'react-redux';

// Importing the Redux store
import { store } from './store';

// Importing a notification component
import { Toaster } from 'react-hot-toast';

// Importing the root component of the application
import App from './App'; // Root Component

// Importing pages for routing
import Home from "./pages/Home";
import PlayQuiz from "./pages/PlayQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz, { loader as editQuizLoader } from "./pages/EditQuiz";
import ViewQuiz, { loader as viewQuizLoader } from './pages/ViewQuiz';
import ErrorPage from './pages/ErrorPage';

// Creating a router with routes and elements
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage message='404 | Page not found' />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/play-quiz",
        element: <PlayQuiz />
      },
      {
        path: "/create-quiz",
        element: <CreateQuiz />
      },
      {
        path: "/my-quizzes",
        element: <MyQuizzes />
      },
      {
        path: "/view-quiz",
        element: <ViewQuiz />,
        errorElement: <ErrorPage message='Quiz not found' />,
        loader: viewQuizLoader
      },
      {
        path: "/edit-quiz",
        element: <EditQuiz />,
        errorElement: <ErrorPage message='Quiz not found' />,
        loader: editQuizLoader
      }
    ]
  },
])

// Creating a root element for rendering React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application within a Redux Provider and RouterProvider
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* Adding a notification toaster with custom options */}
      <Toaster toastOptions={{
        duration: 3000,
        style: { borderRadius: "10px", background: "#2c3030", color: "#fff" },
      }}
        position="top-center" />

      {/* Providing the router for routing within the application */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
