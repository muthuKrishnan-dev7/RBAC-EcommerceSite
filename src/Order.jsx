import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./nav";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import gif from "./assets/gif2.gif";

export default function Order() {
  const location = useLocation();
  const data = location.state?.prddata;

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

  let [pg, setpg] = useState({
    page: "pay",
    pay: "",
    name: "",
    email: "",
    phonenumber: "",
    district: "",
    pincode: "",
  });

  const addresspg = (z) => {
    if (pg.pay != "") {
      setpg({
        ...pg,
        page: z,
      });
    }
  };

  const paydone = () => {
    if (
      pg.name != "" &&
      pg.email != "" &&
      pg.phonenumber != "" &&
      pg.district != "" &&
      pg.pincode != ""
    ) {
      alert("success");
      setpg({ ...pg, page: "done" });
    } else {
      alert("Please Fill the Details");
    }
  };

  return (
    <div className="Orderpg">
      <Nav />
      <div className="ord flex" style={{ zIndex: pg.page == "pay" ? 1 : 0 }}>
        {/* Ordered Item */}
        <div className="orderitem">
          <div className="lft">
            <img src={data.prdimg} alt={data.productName} />
          </div>
          <div className="ryt flex">
            <h2 className="pname fs-5">{data.name}</h2>
            <h5 className="desc">{data.des1}</h5>
            <h4>
              <FaMinus onClick={() => add("minus")} className="payic" /> {qty}
              <FaPlus onClick={() => add("add")} className="payic" />
            </h4>
            <h5 className="price">Total Amout: ₹ {data.price * qty}</h5>
            <div className="flex">
              <h5>
                Cash On Delivery{" "}
                <input
                  type="radio"
                  name="select"
                  onChange={(e) => setpg({ ...pg, pay: "cod" })}
                />
              </h5>
              <h5>
                UPI Payment{" "}
                <input
                  type="radio"
                  name="select"
                  onChange={(e) => setpg({ ...pg, pay: "upi" })}
                />
              </h5>
            </div>
            <button
              className="boxcardsbutton"
              onClick={() => addresspg("address")}
            >
              Place Order
            </button>
          </div>
          {/* Address Pg */}
          <div className="addresspg"></div>
        </div>
      </div>
      {/* Address pg */}
      <div
        className="ord flex"
        style={{
          zIndex: pg.page == "address" ? 1 : 0,
        }}
      >
        <div className="addpg">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={(e) => setpg({ ...pg, [e.target.name]: e.target.value })}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => setpg({ ...pg, [e.target.name]: e.target.value })}
          />
          <label htmlFor="">Phone Number</label>
          <input
            type="number"
            placeholder="Enter your Number"
            name="phonenumber"
            onChange={(e) => setpg({ ...pg, [e.target.name]: e.target.value })}
          />
          <label htmlFor="">district</label>
          <input
            type="text"
            placeholder="Enter district"
            name="district"
            onChange={(e) => setpg({ ...pg, [e.target.name]: e.target.value })}
          />
          <label htmlFor="">PinCode</label>
          <input
            type="number"
            placeholder="Enter Pincode"
            name="pincode"
            onChange={(e) => setpg({ ...pg, [e.target.name]: e.target.value })}
          />
          <h2>Total Amout: ₹ {data.price * qty}</h2>
          <button className="boxcardsbutton" onClick={paydone}>
            Place Order
          </button>
        </div>
      </div>
      {/* Done Page */}
      <div
        className="ord ord1 flex"
        style={{
          zIndex: pg.page == "done" ? 1 : 0,
        }}
      >
        <img src={gif} alt="loading" className="giff" />
      </div>
    </div>
  );
}
