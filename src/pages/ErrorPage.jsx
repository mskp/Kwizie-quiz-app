import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ErrorPage({ message = "Some error occured" }) {
    return (
        <>
            <Header />
            <main className="main-container">
                <h2 style={{fontSize: "2rem"}}>{message}</h2>
            </main>
            <Footer />
        </>
    )
}