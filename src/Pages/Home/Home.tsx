import React from 'react';
import Intro from "../Home/Component/Intro"
import ProductQuality from "../Home/Component/ProductQuality";
import Footer from "../Footer/Footer";

const Home: React.FC = () => {
  return (
    <>
     <Intro />
     <ProductQuality /> 
     <Footer /> 
    </>
  );
};

export default Home;
