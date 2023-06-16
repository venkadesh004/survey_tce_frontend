import React from "react";
import { Link } from "react-router-dom";


const FormMenu = () => {
  const h1Style = "w-1/2 text-lg";
  const liDivStyle = "w-full flex justify-around border-b-2 pb-4 shadow-md ";
  const buttonStyle =
    " self-start px-2 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200";
  return (
    <div className="sm:h-90v md:h-100v  h-100v  w-full flex items-center justify-center ">
      <div className="sm:w-1/2 w-3/4 flex flex-col gap-5 border-2 py-6 shadow-md">
        <Link to="/recruitersFeedback">
          <div className={liDivStyle}>
            <h1 className={h1Style}>Recuriters Feedback</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>
        <Link to="/parentsFeedback">
          <div className={liDivStyle}>
            <h1 className={h1Style}>Parent's Feedback</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>

        <Link to="/graduateExitSurvey">
          <div className={liDivStyle}>
            <h1 className={h1Style}>Graduate Exit Survey</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>

        <Link to="/courseExitSurvey">
          <div className={liDivStyle}>
            <h1 className={h1Style}>Course Exit Survey</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>

        <Link to="/alumniFeedback">
          <div className={liDivStyle}>
            <h1 className={h1Style}>Alumni feedback</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>

        <Link to="/employerFeedback">
          <div className="w-full flex justify-around  ">
            <h1 className={h1Style}>Employer feedback</h1>
            <button className={buttonStyle}>Open</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FormMenu;
