import { Helmet } from "react-helmet-async";
import MiniAbout from "../../../Components/MiniAbout/MiniAbout";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefRecomendations from "../ChefRecomendations/ChefRecomendations";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../Featured/Featured";
import Menu from "../Menu/Menu";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <>
            {/* page tittle changing using helmet */}
            <Helmet>
                <title>Home | Bistro Boss</title>
            </Helmet>
            {/* page tittle changing using helmet */}
            <Banner></Banner>
            <Category></Category>
            <MiniAbout></MiniAbout>
            <Menu></Menu>
            <ContactUs></ContactUs>
            <ChefRecomendations></ChefRecomendations>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </>
    );
};

export default Home;