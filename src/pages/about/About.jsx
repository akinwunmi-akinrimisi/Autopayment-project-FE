import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import AboutUs from "../../components/about/AboutUs";
// import AboutUs from "../../components/about/aboutus";

const About = () => {
    return (
        <div className="home-page">
            <Header />
            <AboutUs />
            <Footer />
        </div>
    );
};

export default About;
