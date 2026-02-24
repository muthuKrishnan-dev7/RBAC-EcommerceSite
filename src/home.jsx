import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import add1 from "./assets/add1.webp";
import add2 from "./assets/add2.webp";
import add3 from "./assets/add3.webp";
import prd1 from "./assets/appl.webp";
import prd2 from "./assets/fash.webp";
import prd3 from "./assets/fl.webp";
import prd4 from "./assets/gro.webp";
import prd5 from "./assets/kit.webp";
import prd6 from "./assets/mobile.webp";
import prd7 from "./assets/shoe.webp";
import prd8 from "./assets/toys.webp";
import prd9 from "./assets/tv.webp";

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  let card = [
    { prdImg: prd3, name: "Flight" },
    { prdImg: prd4, name: "Groceries" },
    { prdImg: prd5, name: "Kitchen" },
    { prdImg: prd6, name: "Mobiles" },
    { prdImg: prd9, name: "Tv" },
    { prdImg: prd7, name: "Shoes" },
    { prdImg: prd8, name: "Toys" },
    { prdImg: prd1, name: "Home" },
    { prdImg: prd2, name: "Fashion" },
  ];

  return (
    <div className="home">
      <div className="products flex">
        <Prd data={card[0]} />
        <Prd data={card[1]} />
        <Prd data={card[2]} />
        <Prd data={card[3]} />
        <Prd data={card[4]} />
        <Prd data={card[5]} />
        <Prd data={card[6]} />
        <Prd data={card[7]} />
        <Prd data={card[8]} />
      </div>

      <Carousel
        interval={2500}
        pause={false} 
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img className="d-block w-100" src={add1} alt="First slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={add2} alt="Second slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={add3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

// Product Box Between the Nav
function Prd(z) {
  let { data } = z;
  let { prdImg, name } = data;

  return (
    <div className="prd-box flex">
      <img src={prdImg} alt="" />
      <h6>{name}</h6>
    </div>
  );
}
