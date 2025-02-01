import Cover from "../../Shared/Cover/Cover";
import coverImage from '../../../assets/shop/banner2.jpg'
import { useEffect, useState } from "react";
import FoodCard from "../../Shared/FoodCard/FoodCard";

// for tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Shop = () => {
    const categories = ['dessert', 'pizza', 'soup', 'salad'];
    const { category } = useParams();

    // Ensure a valid index is set
    const initialIndex = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [dessert, setDessert] = useState([]);
    const [pizza, setPizza] = useState([]);
    const [salads, setSalads] = useState([]);
    const [soup, setSoup] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Update tabIndex when `category` changes
        const index = categories.indexOf(category);
        if (index !== -1) setTabIndex(index);
    }, [category]);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const dessert = data.filter(item => item.category === 'dessert')
                setDessert(dessert)
                const pizza = data.filter(item => item.category === 'pizza')
                setPizza(pizza)
                const salad = data.filter(item => item.category === 'salad')
                setSalads(salad)
                const soup = data.filter(item => item.category === 'soup')
                setSoup(soup)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {/* page tittle changing using helmet */}
            <Helmet>
                <title>Shop | Bistro Boss</title>
            </Helmet>
            {/* page tittle changing using helmet */}
            <Cover img={coverImage} heading={'OUR SHOP'} subHeading={'Would you like to try a dish?'}></Cover>
            {loading ? <div className="flex justify-center items-center my-20"><span className="w-10 h-10 loading loading-spinner text-warning mx-auto"></span></div> :
                <div>
                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <TabList className="mt-14 mx-44">
                            <Tab>Dessert</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Soup</Tab>
                            <Tab>Salad</Tab>
                        </TabList>
                        <TabPanel> <div className="grid md:grid-cols-3 grid-cols-1 mx-auto justify-items-center mt-10 mb-28">{dessert.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}</div></TabPanel>
                        <TabPanel><div className="grid md:grid-cols-3 grid-cols-1 mx-auto justify-items-center mt-10 mb-28"> {pizza.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}</div></TabPanel>
                        <TabPanel><div className="grid md:grid-cols-3 grid-cols-1 mx-auto justify-items-center mt-10 mb-28"> {salads.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}</div></TabPanel>
                        <TabPanel><div className="grid md:grid-cols-3 grid-cols-1 mx-auto justify-items-center mt-10 mb-28"> {soup.map(item => <FoodCard key={item._id} item={item}></FoodCard>)}</div></TabPanel>
                    </Tabs>
                </div>
            }

        </div >
    );
};

export default Shop;