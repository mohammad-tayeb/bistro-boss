
const SectionTitle = ({ heading, subHeading, textWhite, textXSmall }) => {
    return (
        <div className="flex flex-col items-center mt-16">
            <p className="text-amber-500 italic">{heading}</p>
            <hr className="border-2 w-60 mt-4 mb-2" />
            <p className={`md:text-2xl font-semibold ${textWhite ? 'text-white' : 'text-black'} ${textXSmall? 'text-xs':''}`}>{subHeading}</p>
            <hr className="border-2 w-60 mt-2 mb-4" />
        </div>
    );
};

export default SectionTitle;