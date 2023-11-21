// Importing the Header component to display the header of the application
import Header from "./components/Header";

// Importing the Outlet component from react-router-dom to handle nested routes
import { Outlet } from "react-router-dom";

// Importing the Footer component to display the footer of the application
import Footer from "./components/Footer";

// Defining the main App component that serves as the container for the entire application
export default function App() {
  // Rendering the Header component at the top of the application
  // The Header component typically contains navigation links or other header-related content
  return (
    <>
      <Header />
      
      {/* Main container for rendering the content of the application */}
      <main className="main-container">
        {/* Outlet component is used for rendering nested routes */}
        <Outlet />
      </main>
      
      {/* Rendering the Footer component at the bottom of the application */}
      <Footer />
    </>
  );
}
