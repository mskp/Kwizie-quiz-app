import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/globals.css';
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

// Import Page Components
import App from './App'; // Root Component
import MyQuizes from "./pages/MyQuizes";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import EditQuiz, { loader } from "./pages/EditQuiz";

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
        element: <MyQuizes />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <Toaster toastOptions={{
        duration: 3000,
        style: { borderRadius: "10px", background: "#2c3030", color: "#fff" },
      }}
        position="top-center" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);