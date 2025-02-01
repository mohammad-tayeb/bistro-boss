import SimpleParallax from "simple-parallax-js";
const Cover = ({ img, heading, subHeading }) => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${img}`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content font-serif text-center text-white">
                <div className="">
                    <h1 className="mb-5 text-8xl font-bold">{heading}</h1>
                    <p className="mb-5">
                        {subHeading}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cover;