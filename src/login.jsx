import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ UserClick, State }) {
  const navigate = useNavigate();

  const Adminlogin = () => {
    navigate("/admin");
  };

  return (
    <>
      {/* --- Login Box ---  */}
      <div
        className={State.log ? "login-box flex closelogin" : "login-box flex "}
      >
        <RxCrossCircled className="cross" onClick={UserClick} />
        <button onClick={Adminlogin}>Go To Admin Panel</button>
      </div>
    </>
  );
}
