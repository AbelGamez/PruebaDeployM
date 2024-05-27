import { useState, useEffect } from "react";
import Banner from '../../img/Banner.jpg';
import HomeImagenAK from '../../img/HomeImagenAK.jpg';
import Container from '../General/Container';
import { randomProductsHome } from '../../Routes/routes';
import { useParams, Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import Card from "../General/Card";
import IconPercentage from '../../Assets/porcentaje'
import IconPistol from '../../Assets/pistol'
import IconBxEuro from '../../Assets/euro'
import {FormattedMessage} from 'react-intl'

function Home() {
  const [rndProducts, setRndProducts] = useState([]);
  const [rndProductsRight, setRndProductsRight] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchRndProducts();
    fetchRndProductsRhigt();
    window.scrollTo(0, 0);
  }, [id]);
  const handleButton = () => {
    navigate('/pistols'); 
};
  async function fetchRndProducts() {
    try {
      const response = await axios.get(randomProductsHome());
      console.log(response.data)
      setRndProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  async function fetchRndProductsRhigt() {
    try {
      const response = await axios.get(randomProductsHome());
      console.log(response.data)

      setRndProductsRight(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


  return (
    <Container>
      <div className="relative">
        <img src={Banner} alt="Banner" className="w-full lg:w-auto hidden lg:block" />
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
          <p className="text-white text-3xl font-bold">
            The best skins at the best price
          </p>
          <button onClick={handleButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4">
            The best knives for the best player
          </button>
        </div>
      </div>
      <Container className="Principal flex p-8 flex-col lg:flex-row">
  <Container className='w-full lg:w-1/3 grid gird-cols-1 sm:grid-cols-2 gap-10 p-4'>
    {rndProducts.map(productInStock => (
      <Container key={productInStock.id} >
        <Link to={`/product/${productInStock.id}`}>
          <Card  
            src={productInStock.product.image}
            alt={productInStock.product.name}
            productName={productInStock.product.name}
            patternName={productInStock.product.pattern}
            productPrice={productInStock.unit_price}
            floatProduct={productInStock.float}
          />
        </Link>
      </Container>
    ))}
  </Container>

  <Container className='w-full md:w-1/3 p-4 flex items-center justify-center relative hidden lg:block'>
  <img src={HomeImagenAK} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl font-bold text-center space-y-4">
    <div>You still don't have skins? Buy here 30% less compared to the steam market</div>
    <button onClick={handleButton} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
      Buy them here!!!
    </button>
  </div>
</Container>




  <Container className='w-full lg:w-1/3 grid gird-cols-1 sm:grid-cols-2 gap-10 p-4'>
    {rndProductsRight.map(productInStock => (
      <Container key={productInStock.id} >
        <Link to={`/product/${productInStock.id}`}>
          <Card
            src={productInStock.product.image}
            alt={productInStock.product.name}
            productName={productInStock.product.name}
            patternName={productInStock.product.pattern}
            productPrice={productInStock.unit_price}
            floatProduct={productInStock.float}
          />
        </Link>
      </Container>
    ))}
  </Container>
</Container>

<Container className="flex justify-center flex-wrap">
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full">
            <h3 className="text-lg font-semibold mb-2 text-black"> <IconPercentage className="inline mr-2"/>
            <FormattedMessage
              id="home.cheep"
              defaultMessage='~30% cheaper'
            />
            </h3>
            <p className='text-black'>  <FormattedMessage
              id="home.cheepMessage"
              defaultMessage='Save money compared to community market'
            /></p>
        </div>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full">
            <h3 className="text-lg font-semibold mb-2 text-black"><IconPistol className="inline mr-2"/>1.000.000 skins</h3>
            <p className='text-black'> 
             <FormattedMessage
              id="home.MillionMessage"
              defaultMessage='More than a million Skins available in Black Market'
            />
              </p>
        </div>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full">
            <h3 className="text-lg font-semibold mb-2 text-black"><IconBxEuro className="inline mr-2"/>
            <FormattedMessage
              id="home.bank"
              defaultMessage='Get real money'
            />
            </h3>
            <p className='text-black' >
            <FormattedMessage
              id="home.bankMessage"
              defaultMessage='Sell your skins and receive money in your bank account.'
            /></p>
        </div>
    </div>
</Container>




    
    </Container>

  );
}

export default Home;

