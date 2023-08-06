import React, { useState, useEffect, useRef } from "react";
import Thanks from "./Thanks";
import { useForm } from "react-hook-form";
import Arrow from "../components/Arrow";
import { Link } from "react-router-dom";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";
import SubmittingForm from "./SubmittingForm";

const GraduateExitSurvey = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const buttonStyle =
    " mb-9 self-start px-4 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200 mb-4";
  const labelDivStyle = "flex flex-col gap-3  ";
  const multipleButtonStyle =
    "gap-2 flex self-start px-4 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200 ";
  const homeButtonStyle =
    "self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200 mb-4";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    if (step < 10) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setStep(step + 1);
    }
  };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  const invalidElementRef = useRef(null);
  useEffect(() => {
    if (!isValid) {
      invalidElementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isValid]);

  return (
    <div
      className="w-3/4 flex flex-col justify-center  mx-auto h-100v  "
      ref={invalidElementRef}
    >
      <div className="h-70v">
        <div className="bg-red-500 text-white mb-4 p-3 flex flex-col gap-3 rounded-lg ">
          <h1 className="text-3xl font-bold">Graduate Exit Survey</h1>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between ">
            <p className="text-lg font-semibold">
              Complete this form in quick 10 steps!
            </p>
            <Link className={homeButtonStyle} to="/">
              Home
            </Link>
          </div>
        </div>
        <div className="px-3 shadow-2xl ">
          {!loading && (
            <form
              className="flex flex-col gap-5 px-3"
              onSubmit={handleSubmit(async (data) => {
                var index = 5;
                console.log(urlAddress + routeAddresses[index]);
                setLoading(true);
                await axios
                  .post(urlAddress + routeAddresses[index], data)
                  .then((reponse) => {
                    console.log(reponse);
                    console.log(loading);
                    setLoading(false);
                  });
                setStep(step + 1);
              })}
            >
              {step >= 1 && step <= 10 && (
                <section>
                  <p className="text-xl mb-5">Step {step} of 10</p>
                </section>
              )}
              {step === 1 && (
                <section>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Name</label>
                    <input
                      {...register("name", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.name?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Regno</label>
                    <input
                      {...register("regNo", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.regNo?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Year Joined</label>
                    <input
                      {...register("yearJoined", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.yearJoined?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Email address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      type="email"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Mobile NO</label>
                    <input
                      {...register("mobileNo", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.mobileNo?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Present Address</label>
                    <input
                      {...register("presentAddress", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.presentAddress?.message}
                    </p>
                  </div>
                </section>
              )}
              {step === 2 && (
                <section className="">
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                        A. EDUCATIONAL EXPERIANCE
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2  mb-4 py-3 ">
                        <p></p>
                        <div className="grid grid-cols-6  py-3 font-bold ">
                          <p className="text-center">5</p>
                          <p className="text-center">4</p>
                          <p className="text-center">3</p>
                          <p className="text-center">2</p>
                          <p className="text-center">1</p>
                          <p className="text-center">Can't Rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          Has the educational experience met your expectations?
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("educationalExperience", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("educationalExperience")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("educationalExperience")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("educationalExperience")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("educationalExperience")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("educationalExperience")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Effectiveness of the Department</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("effectiveness", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("effectiveness")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("effectiveness")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("effectiveness")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("effectiveness")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("effectiveness")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Admin Offices</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("adminOffices", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("adminOffices")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("adminOffices")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("adminOffices")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("adminOffices")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("adminOffices")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Career Guidance and Placement</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("careerGuidanceAndPlacement", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("careerGuidanceAndPlacement")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("careerGuidanceAndPlacement")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("careerGuidanceAndPlacement")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("careerGuidanceAndPlacement")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("careerGuidanceAndPlacement")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Transportation</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("transportation", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("transportation")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("transportation")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("transportation")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("transportation")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("transportation")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Canteen</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("canteen", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("canteen")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("canteen")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("canteen")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("canteen")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("canteen")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Hostel</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("hostel", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("hostel")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("hostel")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("hostel")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("hostel")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("hostel")}
                            className="h-3"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                          B. FACULTY
                        </p>
                      </div>
                      <div>
                        <div className="grid grid-cols-2  mb-4 py-3 ">
                          <p></p>
                          <div className="grid grid-cols-6  py-3 font-bold ">
                            <p className="text-center">5</p>
                            <p className="text-center">4</p>
                            <p className="text-center">3</p>
                            <p className="text-center">2</p>
                            <p className="text-center">1</p>
                            <p className="text-center">Can't Rate</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">Availability</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("availability", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("availability")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("availability")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("availability")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("availability")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("availability")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">Contact hours outside lecturing</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("contactHoursOutsideLecturing", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("contactHoursOutsideLecturing")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("contactHoursOutsideLecturing")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("contactHoursOutsideLecturing")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("contactHoursOutsideLecturing")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("contactHoursOutsideLecturing")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">Professionalism</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("professionalism", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("professionalism")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("professionalism")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("professionalism")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("professionalism")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("professionalism")}
                              className="h-3"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">Presentation</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("presentation", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("presentation")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("presentation")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("presentation")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("presentation")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("presentation")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">Mentoring</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("mentoring", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("mentoring")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("mentoring")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("mentoring")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("mentoring")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("mentoring")}
                              className="h-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 3 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                        C. FACILITES
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2  mb-4 py-3 ">
                        <p></p>
                        <div className="grid grid-cols-6  py-3 font-bold ">
                          <p className="text-center">5</p>
                          <p className="text-center">4</p>
                          <p className="text-center">3</p>
                          <p className="text-center">2</p>
                          <p className="text-center">1</p>
                          <p className="text-center">Can't Rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Central Library</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("centralLibrary", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("centralLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("centralLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("centralLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("centralLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("centralLibrary")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Department Library</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("departnmentLibrary", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("departnmentLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("departnmentLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("departnmentLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("departnmentLibrary")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("departnmentLibrary")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Central Computing Centre</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("centralComputingCentre", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("centralComputingCentre")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("centralComputingCentre")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("centralComputingCentre")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("centralComputingCentre")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("centralComputingCentre")}
                            className="h-3"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Infrastructures / Labs</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("infrastructuresAndLabs", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("infrastructuresAndLabs")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("infrastructuresAndLabs")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("infrastructuresAndLabs")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("infrastructuresAndLabs")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("infrastructuresAndLabs")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Internet</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("internet", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("internet")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("internet")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("internet")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("internet")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("internet")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Parking</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("parking", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("parking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("parking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("parking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("parking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("parking")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Modern Classrooms</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("modernClassroom", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("modernClassroom")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("modernClassroom")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("modernClassroom")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("modernClassroom")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("modernClassroom")}
                            className="h-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                        D. COURSES
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2  mb-4 py-3 ">
                        <p></p>
                        <div className="grid grid-cols-6  py-3 font-bold ">
                          <p className="text-center">5</p>
                          <p className="text-center">4</p>
                          <p className="text-center">3</p>
                          <p className="text-center">2</p>
                          <p className="text-center">1</p>
                          <p className="text-center">Can't Rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Curriculum / Courses offered</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("curriculum", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("curriculum")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("curriculum")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("curriculum")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("curriculum")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("curriculum")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Syllabi Content</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("syllabiContent", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("syllabiContent")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("syllabiContent")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("syllabiContent")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("syllabiContent")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("syllabiContent")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Student Learning Assessment</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("studentLearningAssessment", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("studentLearningAssessment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("studentLearningAssessment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("studentLearningAssessment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("studentLearningAssessment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("studentLearningAssessment")}
                            className="h-3"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">Quality of Instruction</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("qualityOfInstruction", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("qualityOfInstruction")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("qualityOfInstruction")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("qualityOfInstruction")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("qualityOfInstruction")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("qualityOfInstruction")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          Opportunity for Creativity / Intellectual Stimulation
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("opportunityForCreativity", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("opportunityForCreativity")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("opportunityForCreativity")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("opportunityForCreativity")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("opportunityForCreativity")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("opportunityForCreativity")}
                            className="h-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 4 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                        E. KNOWLEDGE AND SKILL DEVELOPMENT 1
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-2  mb-4 py-3 ">
                        <p></p>
                        <div className="grid grid-cols-6  py-3 font-bold ">
                          <p className="text-center">5</p>
                          <p className="text-center">4</p>
                          <p className="text-center">3</p>
                          <p className="text-center">2</p>
                          <p className="text-center">1</p>
                          <p className="text-center">Can't Rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">1.Knowledge of ethics</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("knowledgeAndEthics", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("knowledgeAndEthics")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("knowledgeAndEthics")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("knowledgeAndEthics")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("knowledgeAndEthics")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("knowledgeAndEthics")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">2. Team work</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("teamWork", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("teamWork")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("teamWork")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("teamWork")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("teamWork")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("teamWork")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          3. Ability to demonstrate Leadership
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("demonstrateLeadership", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("demonstrateLeadership")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("demonstrateLeadership")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("demonstrateLeadership")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("demonstrateLeadership")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("demonstrateLeadership")}
                            className="h-3"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">4. Interpersonal Skills Development</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("interpersonalSkillsDevelopment", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("interpersonalSkillsDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("interpersonalSkillsDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("interpersonalSkillsDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("interpersonalSkillsDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("interpersonalSkillsDevelopment")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          5. Life skills (time Management, Prioritization)
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("lifeSkills", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("lifeSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("lifeSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("lifeSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("lifeSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("lifeSkills")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">6. Training in Verbal Communication</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("verbalCommunication", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("verbalCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("verbalCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("verbalCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("verbalCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("verbalCommunication")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          7. Training in Written Communication
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("writtenCommunication", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("writtenCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("writtenCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("writtenCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("writtenCommunication")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("writtenCommunication")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">8. Problem Solving</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("problemSolving", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("problemSolving")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("problemSolving")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("problemSolving")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("problemSolving")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("problemSolving")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          9. Critical Thinking / Analyticalskills
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("criticalThinking", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("criticalThinking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("criticalThinking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("criticalThinking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("criticalThinking")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("criticalThinking")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          10. Research Skills (Designing and Conducting
                          Experiments)
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("researchSkills", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("researchSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("researchSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("researchSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("researchSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("researchSkills")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">11. Programming skills</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("programmingSkills", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("programmingSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("programmingSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("programmingSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("programmingSkills")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("programmingSkills")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">12. Product Development</p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("productDevelopment", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("productDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("productDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("productDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("productDevelopment")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("productDevelopment")}
                            className="h-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 items-center mb-3 pb-2">
                        <p className=" ">
                          13. Your ability to make use of the above knowledge
                          and skills in final year projects/SIG Projects
                        </p>
                        <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                          <input
                            type="radio"
                            value="5"
                            {...register("applyingSkillsInFinalYearProject", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            className="h-3 "
                          />
                          <input
                            type="radio"
                            value="4"
                            {...register("applyingSkillsInFinalYearProject")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="3"
                            {...register("applyingSkillsInFinalYearProject")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="2"
                            {...register("applyingSkillsInFinalYearProject")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="1"
                            {...register("applyingSkillsInFinalYearProject")}
                            className="h-3"
                          />
                          <input
                            type="radio"
                            value="cantRate"
                            {...register("applyingSkillsInFinalYearProject")}
                            className="h-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white ">
                          F. KNOWLEDGE AND SKILL DEVELOPMENT II
                        </p>
                      </div>
                      <div>
                        <div className="grid grid-cols-2  mb-4 py-3 ">
                          <p></p>
                          <div className="grid grid-cols-6  py-3 font-bold ">
                            <p className="text-center">5</p>
                            <p className="text-center">4</p>
                            <p className="text-center">3</p>
                            <p className="text-center">2</p>
                            <p className="text-center">1</p>
                            <p className="text-center">Can't Rate</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            1.Your ability to code comfortably in high level
                            languages using some IDE
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("comfortableAtHighlevelLanguage", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("comfortableAtHighlevelLanguage")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("comfortableAtHighlevelLanguage")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("comfortableAtHighlevelLanguage")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("comfortableAtHighlevelLanguage")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("comfortableAtHighlevelLanguage")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            2. Comfort in installing & Configuring systems,
                            servers and applications
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("comfortableInConfiguringSystems", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("comfortableInConfiguringSystems")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("comfortableInConfiguringSystems")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("comfortableInConfiguringSystems")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("comfortableInConfiguringSystems")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("comfortableInConfiguringSystems")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            3. Exposure to society relevant projects/ activities
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register(
                                "exposureToSocietyRelevantProjects",
                                {
                                  required: {
                                    value: true,
                                    message: "This is required",
                                  },
                                }
                              )}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("exposureToSocietyRelevantProjects")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("exposureToSocietyRelevantProjects")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("exposureToSocietyRelevantProjects")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("exposureToSocietyRelevantProjects")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("exposureToSocietyRelevantProjects")}
                              className="h-3"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            4. Knowledge of personal health ergonomics / safety
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics",
                                {
                                  required: {
                                    value: true,
                                    message: "This is required",
                                  },
                                }
                              )}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register(
                                "knowledgeOfpersonalHealtheErgonomics"
                              )}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            5. Knowledge of software copyright / licenses
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("knowledgeOfSoftwareCopyright", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("knowledgeOfSoftwareCopyright")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("knowledgeOfSoftwareCopyright")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("knowledgeOfSoftwareCopyright")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("knowledgeOfSoftwareCopyright")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("knowledgeOfSoftwareCopyright")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">6. NSS / NCC Camps</p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("NSSorNCCCamps", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("NSSorNCCCamps")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("NSSorNCCCamps")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("NSSorNCCCamps")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("NSSorNCCCamps")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("NSSorNCCCamps")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            7. Exposure to the impact of Information and
                            Communication Technology (ICT) solutions on the
                            environment
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("exposureToImpactOfICTsolution", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("exposureToImpactOfICTsolution")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("exposureToImpactOfICTsolution")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("exposureToImpactOfICTsolution")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("exposureToImpactOfICTsolution")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("exposureToImpactOfICTsolution")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            8. Emphasis on the sustainable development of ICT
                            solutions
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("emphasisOnSDofICTsolutions", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("emphasisOnSDofICTsolutions")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("emphasisOnSDofICTsolutions")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("emphasisOnSDofICTsolutions")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("emphasisOnSDofICTsolutions")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("emphasisOnSDofICTsolutions")}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            9. Your ability in planning & executing the final
                            year project / SIG project
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register(
                                "abilityInExecutingFinalYearProject",
                                {
                                  required: {
                                    value: true,
                                    message: "This is required",
                                  },
                                }
                              )}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register(
                                "abilityInExecutingFinalYearProject"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register(
                                "abilityInExecutingFinalYearProject"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register(
                                "abilityInExecutingFinalYearProject"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register(
                                "abilityInExecutingFinalYearProject"
                              )}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register(
                                "abilityInExecutingFinalYearProject"
                              )}
                              className="h-3"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center mb-3 pb-2">
                          <p className=" ">
                            10. Organizing & managing Symposiums, Events and
                            Contests
                          </p>
                          <div className="grid grid-cols-6 items-center mb-3 pb-2 ">
                            <input
                              type="radio"
                              value="5"
                              {...register("organizingAndManagingEvents", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="h-3 "
                            />
                            <input
                              type="radio"
                              value="4"
                              {...register("organizingAndManagingEvents")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="3"
                              {...register("organizingAndManagingEvents")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="2"
                              {...register("organizingAndManagingEvents")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="1"
                              {...register("organizingAndManagingEvents")}
                              className="h-3"
                            />
                            <input
                              type="radio"
                              value="cantRate"
                              {...register("organizingAndManagingEvents")}
                              className="h-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 5 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        G. YOUR ACCOMPLISHMENTS
                      </p>
                    </div>
                    <div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Number of Papers published *</label>
                        <input
                          {...register("numberOfPapersPublished", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="number"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.numberOfPapersPublished?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Publication Details</label>
                        <input
                          {...register("publicationDetails", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.publicationDetails?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Number of Softwares / Products developed
                        </label>
                        <input
                          {...register("numberOfSoftwaresorProductsDeveloped", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.numberOfSoftwaresorProductsDeveloped?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Project Details</label>
                        <input
                          {...register("projectDetails", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.projectDetails?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Memeberships in professional societies (Check all that
                          apply.)
                        </label>
                        <input
                          {...register("membershipInProfessionalSocieties", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.membershipInProfessionalSocieties?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Number of International Certifications
                        </label>
                        <input
                          {...register("numberOfInternationalCertifications", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.numberOfInternationalCertifications?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Certification Details</label>
                        <input
                          {...register("certificationDetails", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.certificationDetails?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        H. YOUR NEXT STEPS.
                      </p>
                    </div>
                    <div>
                      <p>Your Next Step*</p>
                      <div>
                        <div className="flex mt-3 gap-3 items-center">
                          <button
                            className={multipleButtonStyle}
                            disabled={!isValid}
                            onClick={() => {
                              nextStep();
                              window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <p>Next</p>
                            <Arrow />
                          </button>
                          Higher Education (Skip to Step 6.)
                        </div>
                        <div className="flex mt-3 gap-3 items-center">
                          <button
                            className={multipleButtonStyle}
                            disabled={!isValid}
                            onClick={() => {
                              setStep(7);
                              window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <p>Next</p>
                            <Arrow />
                          </button>
                          Joining a Workforce (Skip to Step 7.)
                        </div>
                        <div className="flex mt-3 gap-3 items-center">
                          <button
                            className={multipleButtonStyle}
                            disabled={!isValid}
                            onClick={() => {
                              setStep(8);
                              window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <p>Next</p>
                            <Arrow />
                          </button>
                          Part Time Education (Skip to Step 8.)
                        </div>
                        <div className="flex mt-3 gap-3 items-center">
                          <button
                            className={multipleButtonStyle}
                            disabled={!isValid}
                            onClick={() => {
                              setStep(9);
                              window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <p>Next</p>
                            <Arrow />
                          </button>
                          Awaiting Placement (Skip to Step 9.)
                        </div>
                        <div className="flex mt-3 gap-3 items-center">
                          <button
                            className={multipleButtonStyle}
                            disabled={!isValid}
                            onClick={() => {
                              setStep(10);
                              window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <p>Next</p>
                            <Arrow />
                          </button>
                          Other (Skip to Step 10.)
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 6 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        A1. HIGER EDUCATION
                      </p>
                    </div>
                    <div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Name of the College / University
                        </label>
                        <input
                          {...register("collegeName", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.collegeName?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Degree</label>
                        <input
                          {...register("degree", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.degree?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Discipline</label>
                        <input
                          {...register("discipline", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.discipline?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Admission Year</label>
                        <input
                          {...register("admissionYear", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.admissionYear?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        A2. ONLINE EXAMS
                      </p>
                    </div>
                    <div>
                      <div className="">
                        <p className="">
                          Have you attended any online exams? If so provide the
                          details
                        </p>
                        <div className="sm:flex sm:flex-col justify-center sm:gap-4 mt-3 grid grid-cols-1 gap-3 mb-4 ">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("onlineExam", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="checkbox"
                              value="GRE"
                            />
                            GRE
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="GMAT"
                            />
                            GMAT
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="CAT"
                            />
                            CAT
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="GATE"
                            />
                            GATE
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="Other"
                            />
                            Other
                          </label>
                        </div>

                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GRE score</label>
                          <input
                            {...register("GREScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GREScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GMAT score</label>
                          <input
                            {...register("GMATScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GMATScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your CAT score</label>
                          <input
                            {...register("CATScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.CATScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GATE score</label>
                          <input
                            {...register("GATEScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GATEScore?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <button
                      className={buttonStyle}
                      type="button"
                      onClick={() => {
                        setStep(5);
                      }}
                    >
                      Prev
                    </button>
                    <button
                      className={buttonStyle}
                      disabled={!isValid}
                      type="button"
                      onClick={() => {
                        setStep(10);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </section>
              )}
              {step === 7 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        B1. JOINING A WORKFORCE
                        <p>Details of company in which you got placed</p>
                      </p>
                    </div>
                    <div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Name</label>
                        <input
                          {...register("workforceName", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.workforceName?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Sector</label>
                        <input
                          {...register("workforceSector", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.workforceSector?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Designation</label>
                        <input
                          {...register("workforceDesignation", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.workforceDesignation?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">City</label>
                        <input
                          {...register("workforceCity", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.workforceCity?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Salary Per annum</label>
                        <input
                          {...register("workforceSalaryPerAnnum", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.workforceSalaryPerAnnum?.message}
                        </p>
                      </div>

                      <div>
                        <div>
                          <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                            B2. ONLINE EXAMS
                          </p>
                        </div>
                        <div>
                          <div className="">
                            <p className="">
                              Have you attended any online exams? If so provide
                              the details
                            </p>
                            <div className="sm:flex sm:flex-col justify-center sm:gap-4 mt-3 grid grid-cols-1 gap-3 mb-4 ">
                              <label htmlFor="excellent">
                                <input
                                  className="mr-1"
                                  {...register("onlineExam", {
                                    required: {
                                      value: true,
                                      message: "This is required",
                                    },
                                  })}
                                  type="checkbox"
                                  value="GRE"
                                />
                                GRE
                              </label>
                              <label htmlFor="good">
                                <input
                                  className="mr-1"
                                  {...register("onlineExam")}
                                  type="checkbox"
                                  value="GMAT"
                                />
                                GMAT
                              </label>

                              <label htmlFor="average">
                                <input
                                  className="mr-1"
                                  {...register("onlineExam")}
                                  type="checkbox"
                                  value="CAT"
                                />
                                CAT
                              </label>
                              <label htmlFor="poor">
                                <input
                                  className="mr-1"
                                  {...register("onlineExam")}
                                  type="checkbox"
                                  value="GATE"
                                />
                                GATE
                              </label>
                              <label htmlFor="poor">
                                <input
                                  className="mr-1"
                                  {...register("onlineExam")}
                                  type="checkbox"
                                  value="Other"
                                />
                                Other
                              </label>
                            </div>

                            <div className={labelDivStyle}>
                              <label htmlFor="">Your GRE score</label>
                              <input
                                {...register("GREScore", {
                                  required: {
                                    value: true,
                                    message: "All fields are required",
                                  },
                                })}
                                type="text"
                                className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                              />
                              <p className="mb-1 text-red-600 sm:mb-3">
                                {errors.GREScore?.message}
                              </p>
                            </div>
                            <div className={labelDivStyle}>
                              <label htmlFor="">Your GMAT score</label>
                              <input
                                {...register("GMATScore", {
                                  required: {
                                    value: true,
                                    message: "All fields are required",
                                  },
                                })}
                                type="text"
                                className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                              />
                              <p className="mb-1 text-red-600 sm:mb-3">
                                {errors.GMATScore?.message}
                              </p>
                            </div>
                            <div className={labelDivStyle}>
                              <label htmlFor="">Your CAT score</label>
                              <input
                                {...register("CATScore", {
                                  required: {
                                    value: true,
                                    message: "All fields are required",
                                  },
                                })}
                                type="text"
                                className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                              />
                              <p className="mb-1 text-red-600 sm:mb-3">
                                {errors.CATScore?.message}
                              </p>
                            </div>
                            <div className={labelDivStyle}>
                              <label htmlFor="">Your GATE score</label>
                              <input
                                {...register("GATEScore", {
                                  required: {
                                    value: true,
                                    message: "All fields are required",
                                  },
                                })}
                                type="text"
                                className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                              />
                              <p className="mb-1 text-red-600 sm:mb-3">
                                {errors.GATEScore?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3">
                        <button
                          className={buttonStyle}
                          type="button"
                          onClick={() => {
                            setStep(5);
                          }}
                        >
                          Prev
                        </button>
                        <button
                          className={buttonStyle}
                          disabled={!isValid}
                          type="button"
                          onClick={() => {
                            setStep(10);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 8 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        A1. HIGER EDUCATION
                      </p>
                    </div>
                    <div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Name of the College / University
                        </label>
                        <input
                          {...register("parttimeCollegeName", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.parttimeCollegeName?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Degree</label>
                        <input
                          {...register("parttimeDegree", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.parttimeDegree?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Discipline</label>
                        <input
                          {...register("parttimeDiscipline", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.parttimeDiscipline?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Admission Year</label>
                        <input
                          {...register("parttimeAdmissionYear", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.parttimeAdmissionYear?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        B1. JOINING A WORKFORCE
                        <p>Details of company in which you got placed</p>
                      </p>
                    </div>
                    <div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Name</label>
                        <input
                          {...register("parttimeWorkforceName", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.parttimeWorkforceName?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Sector</label>
                        <input
                          {...register("sector", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.sector?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Designation</label>
                        <input
                          {...register("designation", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.designation?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">City</label>
                        <input
                          {...register("city", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.city?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">Salary Per annum</label>
                        <input
                          {...register("salaryPerAnnum", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.salaryPerAnnum?.message}
                        </p>
                      </div>

                      <div className="flex gap-4 mt-3">
                        <button
                          className={buttonStyle}
                          type="button"
                          onClick={() => {
                            setStep(5);
                          }}
                        >
                          Prev
                        </button>
                        <button
                          className={buttonStyle}
                          disabled={!isValid}
                          type="button"
                          onClick={() => {
                            setStep(10);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 9 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        A2. ONLINE EXAMS
                      </p>
                    </div>
                    <div>
                      <div className="">
                        <p className="">
                          Have you attended any online exams? If so provide the
                          details
                        </p>
                        <div className="sm:flex sm:flex-col justify-center sm:gap-4 mt-3 grid grid-cols-1 gap-3 mb-4 ">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("onlineExam", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="checkbox"
                              value="GRE"
                            />
                            GRE
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="GMAT"
                            />
                            GMAT
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="CAT"
                            />
                            CAT
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="GATE"
                            />
                            GATE
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("onlineExam")}
                              type="checkbox"
                              value="Other"
                            />
                            Other
                          </label>
                        </div>

                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GRE score</label>
                          <input
                            {...register("GREScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GREScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GMAT score</label>
                          <input
                            {...register("GMATScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GMATScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your CAT score</label>
                          <input
                            {...register("CATScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.CATScore?.message}
                          </p>
                        </div>
                        <div className={labelDivStyle}>
                          <label htmlFor="">Your GATE score</label>
                          <input
                            {...register("GATEScore", {
                              required: {
                                value: true,
                                message: "All fields are required",
                              },
                            })}
                            type="text"
                            className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                          />
                          <p className="mb-1 text-red-600 sm:mb-3">
                            {errors.GATEScore?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <button
                      className={buttonStyle}
                      type="button"
                      onClick={() => {
                        setStep(5);
                      }}
                    >
                      Prev
                    </button>
                    <button
                      className={buttonStyle}
                      disabled={!isValid}
                      type="button"
                      onClick={() => {
                        setStep(10);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </section>
              )}
              {step === 10 && (
                <section>
                  <div>
                    <div>
                      <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-8">
                        SUMMARY
                      </p>
                    </div>
                    <div>
                      <p>
                        How well do you think your education in TCE prepared you
                        for your career? Please rate on a 4 to 1 scale with 4
                        being the highest (very well prepared) and 1 being the
                        lowest (not prepared).
                      </p>
                      <div>
                        <p className="font-bold my-3">
                          Your Overall rating about TCE
                        </p>
                        <div className="flex items-center gap-4">
                          <label htmlFor="overallRating">
                            <input
                              className="mr-1"
                              {...register("overallRating", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="4"
                            />
                            4
                          </label>
                          <label htmlFor="overallRating">
                            <input
                              className="mr-1"
                              {...register("overallRating", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="3"
                            />
                            3
                          </label>
                          <label htmlFor="overallRating">
                            <input
                              className="mr-1"
                              {...register("overallRating", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="2"
                            />
                            2
                          </label>
                          <label htmlFor="overallRating">
                            <input
                              className="mr-1"
                              {...register("overallRating", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="1"
                            />
                            1
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Please comment on any particular strengths or
                          weaknesses you can see in our program in light of your
                          subsequent experience
                        </label>
                        <input
                          {...register("comment", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.comment?.message}
                        </p>
                      </div>
                      <div className={labelDivStyle}>
                        <label htmlFor="">
                          Role you would wish to contribute to TCE
                        </label>
                        <input
                          {...register("roleYouWishToContribute", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.roleYouWishToContribute?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* {step === 11 && (
                <section className>
                  <Thanks />
                </section>
              )} */}
              <div>
                {step > 1 && step <= 5 && (
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      prevStep();
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>
                )}
                {step === 10 && (
                  <div className="flex gap-3">
                    <button
                      className={buttonStyle}
                      type="button"
                      onClick={() => {
                        setStep(5);
                      }}
                    >
                      Prev
                    </button>
                    <button type="submit" className={buttonStyle}>
                      Submit
                    </button>
                  </div>
                )}
                {step < 5 && (
                  <button
                    type="button"
                    className={buttonStyle}
                    disabled={!isValid}
                    onClick={() => {
                      nextStep();
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          )}
          {loading ? (
            <SubmittingForm />
          ) : (
            step === 11 && (
              <section className>
                <Thanks />
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GraduateExitSurvey;
