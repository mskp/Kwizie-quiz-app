// Importing necessary modules from React and ReactDOM
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Importing global styles
import './assets/globals.css';

// Importing modules from react-router-dom for routing
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

// Importing modules from react-redux for state management
import { Provider } from 'react-redux';

// Importing the Redux store
import { store } from './store';

// Importing a notification component
import { Toaster } from 'react-hot-toast';

// Importing the root component of the application
import App from './App'; // Root Component

// Importing pages for routing
import MyQuizzes from "./pages/MyQuizzes";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import EditQuiz, { loader } from "./pages/EditQuiz";

// Creating a router with routes and elements
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found, go to <Link style={{ textDecoration: "underline" }} to="/">home</Link> </div>,
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
        path: "/edit-quiz/:quizIndex",
        element: <EditQuiz />,
        errorElement: <div>Quiz Not Found</div>,
        loader
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
