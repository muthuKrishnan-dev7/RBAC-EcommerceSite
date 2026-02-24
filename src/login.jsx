import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ UserClick, State }) {
  console.log(State);

  let [Aadmin, setAdmin] = useState({
    AdminId: null,
    Password: null,
  });

  const navigate = useNavigate();

  const Type = (e) => {
    setAdmin({
      ...Aadmin,
      [e.target.name]: e.target.value,
    });
  };

  const Adminlogin = () => {
    if (Aadmin.AdminId == State.ad.Id && Aadmin.Password == State.ad.password) {
      alert("succes");
      navigate("/admin");
    } else {
      alert("fail");
    }
  };

  return (
    <>
      {/* --- Login Box ---  */}
      <div
        className={State.log ? "login-box flex closelogin" : "login-box flex "}
      >
        <RxCrossCircled className="cross" onClick={UserClick} />
        <div className="insLogin User">
          <label htmlFor="">Admin Id</label>
          <input
            type="number"
            name="AdminId"
            // value={details.name}
            placeholder="Enter Admin Id"
            onChange={(e) => Type(e)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="Password"
            // value={details.name}
            placeholder="Enter your Password"
            onChange={(e) => Type(e)}
          />

          <div className="otpinp">
            <button onClick={Adminlogin}>Enter</button>
          </div>
          {/* <Link to="/admin">About</Link> */}
        </div>
        <div className="insLogin Admin"></div>
      </div>
    </>
  );
}
