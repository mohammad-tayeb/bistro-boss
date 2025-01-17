
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="flex flex-col items-center mt-16">
            <p className="text-amber-500">{heading}</p>
            <hr className="border-2 w-60 mt-4 mb-2" />
            <p className="text-black text-2xl font-semibold">{subHeading}</p>
            <hr className="border-2 w-60 mt-2 mb-4" />
        </div>
    );
};

export default SectionTitle;