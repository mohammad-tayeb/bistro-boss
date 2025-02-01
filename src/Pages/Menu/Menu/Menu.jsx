import { Helmet } from 'react-helmet-async';
import CoverPopular from '../../Shared/Cover/Cover';
import CoverDessert from '../../../assets/menu/dessert-bg.jpeg';
import CoverPizza from '../../../assets/menu/pizza-bg.jpg';
import CoverSalads from '../../../assets/menu/salad-bg.jpg';
import CoverSoup from '../../../assets/menu/soup-bg.jpg';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import CoverImg from '../../../assets/menu/banner3.jpg'
import MenuItem from '../../Shared/MenuItem/MenuItem';
import { useEffect, useState } from 'react';
// react scroll to top button
import ScrollToTop from "react-scroll-to-top";
import { Link } from 'react-router-dom';

const Menu = () => {
    const [menuItem, setMenuItem] = useState([])
    const [dessert, setDessert] = useState([])
    const [pizza, setPizza] = useState([])
    const [salads, setSalads] = useState([])
    const [soup, setSoup] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(item => item.category === 'popular')
                setMenuItem(popular)
                const dessert = data.filter(item => item.category === 'dessert')
                setDessert(dessert)
                const pizza = data.filter(item => item.category === 'pizza')
                setPizza(pizza)
                const salad = data.filter(item => item.category === 'salad')
                setSalads(salad)
                const soup = data.filter(item => item.category === 'soup')
                setSoup(soup)
            })
    }, [])
    return (
        <div>
            {/* page tittle changing using helmet */}
            <Helmet>
                <title>Menu | Bistro Boss</title>
            </Helmet>
            {/* page tittle changing using helmet */}

            {/* popular */}
            <CoverPopular img={CoverImg} heading={'OUR MENU'} subHeading={'Would you like to try a dish?'}></CoverPopular>
            <SectionTitle
                heading={'---Don not miss---'}
                subHeading={'TODAYS OFFER'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10">
                {
                    menuItem.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>

            {/* dessert */}
            <CoverPopular img={CoverDessert} heading={'DESSERTS'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></CoverPopular>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10">
                {
                    dessert.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className='btn text-center mx-auto flex mb-8 bg-yellow-400 text-white btn-outline'><Link to={`/shop/dessert`}>Order Now</Link></button>

            {/* pizza */}
            <CoverPopular img={CoverPizza} heading={'PIZZA'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></CoverPopular>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10">
                {
                    pizza.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className='btn text-center mx-auto flex mb-8 bg-yellow-400 text-white btn-outline'><Link to={`/shop/pizza`}>Order Now</Link></button>

            {/* salad */}
            <CoverPopular img={CoverSalads} heading={'SALADS'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></CoverPopular>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10">
                {
                    salads.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className='btn text-center mx-auto flex mb-8 bg-yellow-400 text-white btn-outline'><Link to={`/shop/salads`}>Order Now</Link></button>

            {/* soup */}
            <CoverPopular img={CoverSoup} heading={'SOUPS'} subHeading={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></CoverPopular>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto mt-6 mb-12 gap-10">
                {
                    soup.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className='btn text-center mx-auto flex mb-8 bg-yellow-400 text-white btn-outline'><Link to={`/shop/soup`}>Order Now</Link></button>
            <ScrollToTop smooth className='ps-1' color='#FDD835' />
        </div>
    );
};

export default Menu;