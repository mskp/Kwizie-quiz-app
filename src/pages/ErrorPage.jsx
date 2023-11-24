// Importing the Footer and Header components
import Footer from "../components/Footer";
import Header from "../components/Header";

// ErrorPage component definition
export default function ErrorPage({ message = "Some error occurred" }) {
    return (
        <>
            {/* Include the Header component */}
            <Header />

            {/* Main container for the error page */}
            <main className="main-container">
                {/* Display the error message with a specified font size */}
                <h2 style={{ fontSize: "2rem" }}>{message}</h2>
            </main>

            {/* Include the Footer component */}
            <Footer />
        </>
    );
}
