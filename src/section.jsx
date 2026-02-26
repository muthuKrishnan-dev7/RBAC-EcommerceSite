import { useEffect, useState } from "react";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Order from "./Order";

export default function Section1(z) {
  let { data, searchdata } = z;
  let [Data, setData] = useState([]);

  useEffect(function () {
    fetch("https://69805d0a6570ee87d50eebdd.mockapi.io/Cruddata/Products", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((Prddata) => {
        setData(Prddata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const orderpg = (z) => {
    navigate("/Order", { state: { prddata: z } });
  };

  console.log(searchdata);

  return (
    <div className="sec1" id="Cont">
      {Data.filter((prd) => prd.category).map(function (item) {
        return (
          <div className="boxcards" key={item.id}>
            <div className="carti">
              {" "}
              <FaRegHeart className="carticon" />{" "}
              <FaShoppingCart className="carticon" />{" "}
            </div>
            <div className="imgbox">
              <img src={item.prdimg} alt={item.productName} />
            </div>
            <h2 className="pname">{item.name}</h2>
            <h5 className="desc">{item.des1}</h5>
            <p className="price">₹{item.price}</p>
            <p className="rating">Ratings ⭐ {item.rating}</p>
            <button className="boxcardsbutton" onClick={() => orderpg(item)}>Order Now</button>
          </div>
        );
      })}
    </div>
  );
}
