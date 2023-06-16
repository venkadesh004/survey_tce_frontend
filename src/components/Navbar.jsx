import React from "react";
import logo from "../assets/logo.png";
// import back from "../assets/bg1.png"
const Navbar = () => {

  return (
    <div>
      <div className="w-full h-10v flex items-center justify-center bg-red-700 p-6 fixed top-0">
        <img src={logo} alt="Thiagarajar College of Engineering, Madurai"  />
        {/* <h1 className="text-white font-bold text-xl ">
          Department of Computer Science and Engineering
        </h1> */}
      </div>
    </div>
  );
};

export default Navbar;
