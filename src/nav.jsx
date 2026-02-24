import { use, useState } from "react";
import logo from "./assets/Logo.svg";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Login from "./login";
import Section1 from "./section";

export default function Nav() {
  let [login, setLogin] = useState(false);

  const Admin = {
    Id: 741860, 
    password: "enter",
  };

  const loginOpen = () => {
    setLogin(!login);
  };

  let [search, setSearch] = useState("");

  return (
    <nav>
      <img src={logo} alt="Logo" />
      <div className="searchbox">
        <CiSearch className="ic" />
        <input
          type="text"
          placeholder="search for Products, Brands and More"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex btn-div">
        <button className="flex btnnav" onClick={loginOpen}>
          {" "}
          <FaRegUserCircle className="ic2" /> Login
        </button>
        <button className="flex btnnav">
          {" "}
          <TiShoppingCart className="ic2" /> Cart
        </button>
      </div>
      <Login UserClick={loginOpen} State={{ log: login, ad: Admin }} />
      <div className="sectiononnav">
        <Section1 searchdata={search} />
      </div>
      {/* {console.log(search)} */}
    </nav>
  );
}
