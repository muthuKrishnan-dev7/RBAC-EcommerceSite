import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./nav";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import App from "./App";

export default function Order() {
  const location = useLocation();
  const data = location.state?.prddata;

  console.log(data);

  const navigate = useNavigate();
  let [qty, Setqty] = useState(1);

  const add = (z) => {
    if (z == "add") {
      Setqty(++qty);
    } else if (z == "minus" && qty > 0) {
      Setqty(--qty);
      if (qty == 0) {
        navigate(-1);
      }
    }
  };

  let [addpg, Setaddpg] = useState();

  const addresspg = (z) => {
    Setaddpg(z);
  };

  return (
    <div className="Orderpg">
      <Nav />
      <div className="ord flex">
        <div
          className="orderitem"
          style={{ opacity: addpg == "address" ? "0" : "1" }}
        >
          <div className="lft">
            <img src={data.prdimg} alt={data.productName} />
          </div>
          <div className="ryt flex">
            <h2 className="pname fs-5">{data.name}</h2>
            <h5 className="desc">{data.des1}</h5>
            <h4>
              <FaMinus onClick={() => add("minus")} /> {qty}
              <FaPlus onClick={() => add("add")} />
            </h4>
            <h5 className="price">Total Amout: ₹ {data.price * qty}</h5>
            <div className="flex">
              <h5>
                Cash On Delivery <input type="radio" name="select" />
              </h5>
              <h5>
                UPI Payment <input type="radio" name="select" />
              </h5>
            </div>
            <button
              className="boxcardsbutton"
              onClick={() => addresspg("address")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
