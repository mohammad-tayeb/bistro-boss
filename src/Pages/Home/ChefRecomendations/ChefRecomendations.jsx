import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const ChefRecomendations = () => {
    const [recItems, setRecItems] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const recItems = data.filter(item => item.recomendation === 'yes')
                setRecItems(recItems)
            })
    }, [])
    return (
        <div>
            <SectionTitle
                heading={'---Should Try---'}
                subHeading={'CHEF RECOMMENDS'}>
            </SectionTitle>
            <div className="grid md:grid-cols-3 grid-cols-1 mx-auto justify-items-center mt-10 mb-28">
                {recItems.map(item => <FoodCard key={item._id} item={item}></FoodCard> )}
            </div>
        </div>
    );
};

export default ChefRecomendations;