import { useEffect, useState } from "react";
import logo from "./assets/Logo.svg";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Section1 from "./section";
import { RxCrossCircled } from "react-icons/rx";
import Button from "react-bootstrap/Button";
import { data, useNavigate } from "react-router-dom";

export default function Nav() {
  let [login, setLogin] = useState({
    loginvalue: false,
    useradmin: "user",
    adminid: "",
    password: "",
    name: "",
    email: "",
    cart: false,
  });

  const navigate = useNavigate();

  const loginpg = (abc) => {
    setLogin({
      ...login,
      useradmin: abc,
    });
  };

  const loginOpen = (abc) => {
    if (abc == "open") {
      setLogin({
        ...login,
        loginvalue: true,
      });
    } else {
      setLogin({
        ...login,
        loginvalue: false,
      });
    }
  };

  const Admin = {
    Id: 741860,
    password: "enter",
  };

  const adminpg = () => {
    if (login.adminid == Admin.Id && login.password == Admin.password) {
      alert("Admin Login Succesfull");
      navigate("/admin");
    }
  };

  const register = () => {
    if (login.name != "" && login.email != "") {
      alert("login Success");
      setLogin({
        ...login,
        loginvalue: false,
      });
    } else {
      alert("Please fill the required value");
    }
  };

  const cartopen = (e) => {
    if (e == "open") {
      setLogin({
        ...login,
        cart: true,
      });
    } else {
      setLogin({
        ...login,
        cart: false,
      });
    }
  };

  const [cartarray, setCart] = useState([]);

  let [search, setSearch] = useState("");

  return (
    <nav>
      {/* Nav Bar Design */}
      <img src={logo} alt="Logo" />
      <div className="searchbox">
        <CiSearch className="ic" />
        <input
          type="text"
          placeholder="search for Products, Brands and More"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="btn-div">
        <button className="flex btnnav" onClick={() => loginOpen("open")}>
          {" "}
          <FaRegUserCircle className="ic2" /> <span>Login</span>
        </button>
        <button className="flex btnnav">
          {" "}
          <TiShoppingCart
            className="ic2"
            onClick={() => cartopen("open")}
          />{" "}
          <span>Cartt</span>
        </button>
      </div>
      {/* For Transfer the Search Value */}
      <div className="sectiononnav">
        <Section1 searchdata={search} />
      </div>

      {/* ---For login Box--- */}
      <div
        className={
          login.loginvalue == true ? "login flex closelogin" : "login flex"
        }
      >
        <RxCrossCircled className="cross" onClick={loginOpen} />
        {/* User Login */}
        <div
          className="inslogin"
          style={{ zIndex: login.useradmin == "user" ? 1 : 0 }}
        >
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            name="name"
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            required
            name="email"
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <Button variant="primary" onClick={register}>
            Register
          </Button>
          <Button onClick={() => loginpg("admin")} variant="primary">
            Go Admin
          </Button>
        </div>
        {/* Admin Login */}
        <div
          className="inslogin"
          style={{ zIndex: login.useradmin == "admin" ? 1 : 0 }}
        >
          <label htmlFor="">AdminId</label>
          <input
            type="text"
            placeholder="AdminId: 741860"
            required
            name="adminid"
            value={login.adminid}
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password: enter"
            required
            name="password"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <Button variant="primary" onClick={adminpg}>
            {" "}
            Admin{" "}
          </Button>
          <Button onClick={() => loginpg("user")} variant="primary">
            Go User
          </Button>
        </div>
      </div>

      {/* For AddToCart */}
      <div
        className={
          login.cart == true
            ? "addtocart flex cartcp"
            : "addtocart flex cartclose"
        }
      >
        <div className="top flex">
          <RxCrossCircled className="cartcross" onClick={cartopen} />
        </div>
        <div className="middle"></div>
        <div className="bottom"></div>
      </div>
    </nav>
  );
}
