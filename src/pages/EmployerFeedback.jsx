import React, { useState } from "react";
import Thanks from "./Thanks";
import SubmittingForm from "./SubmittingForm"
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";


const EmployerFeedback = () => {
  const [thanks, setThanks] = useState(0);
  const [loading , setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const buttonStyle =
    " mb-9 self-start px-4 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200 mb-4";
  const labelDivStyle = "flex flex-col gap-3  ";
  const homeButtonStyle =
  "self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200";
  return (
    <div className="w-3/4 flex flex-col justify-center  mx-auto h-100v  ">
      <div className="h-70v">
        <div className="bg-red-500 text-white mb-4 p-3 flex flex-col gap-3 rounded-lg ">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between sm:items-center">
        <h1 className="text-3xl font-bold">Employer Feedback</h1>
          <Link className={homeButtonStyle} to="/">
              Home
            </Link>
        </div>
        </div>
        <div className="px-3 shadow-2xl rounded-lg">
          {!thanks && !loading && (
            <section>
              <form
                onSubmit={handleSubmit(async (data) => {
                  console.log(data);
                  var index = 3;
                  console.log(urlAddress+routeAddresses[index]);
                  setLoading(true)
                  await axios.post(urlAddress+routeAddresses[index], data).then(reponse => {
                    console.log(reponse);
                  });
                  setThanks(!thanks)
                  setLoading(false)
                })}
              >
                <div className={labelDivStyle}>
                  <label htmlFor="">Name of the organization*</label>
                  <input
                    {...register("organizationName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.organizationName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">Location of the organization*</label>
                  <input
                    {...register("organizationLocation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.organizationLocation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">Name of the feedback provider*</label>
                  <input
                    {...register("feedbackProvider", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.feedbackProvider?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    Designation of the feedback provider*
                  </label>
                  <input
                    {...register("feedbackProviderDesignation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.feedbackProviderDesignation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">Name of the Alumnus*</label>
                  <input
                    {...register("alumnusName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.alumnusName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">Nature of the Alumnus Role*</label>
                  <input
                    {...register("natureOfalumnusRole", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.natureOfalumnusRole?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    Role of the Alumnus in your organization *
                  </label>
                  <input
                    {...register("alumnusRole", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.alumnusRole?.message}
                  </p>
                </div>
                <div>
                  <p>Quality of the work delivered by them*</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent"
                        {...register("qualityOfWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("qualityOfWork", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>{" "}
                    <div className="p-2">
                      <input
                        type="radio"
                        value="fair"
                        {...register("qualityOfWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Fair</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("qualityOfWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>{" "}
                  </div>
                </div>
                <div>
                  <p>Individual and team work *</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent"
                        {...register("individualAndTeamWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("individualAndTeamWork", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>{" "}
                    <div className="p-2">
                      <input
                        type="radio"
                        value="fair"
                        {...register("individualAndTeamWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Fair</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("individualAndTeamWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>{" "}
                  </div>
                </div>
                <div>
                  <p>Technical Knowledge *</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent"
                        {...register("technicalKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("technicalKnowledge", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>{" "}
                    <div className="p-2">
                      <input
                        type="radio"
                        value="fair"
                        {...register("technicalKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Fair</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("technicalKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>{" "}
                  </div>
                </div>
                <div>
                  <p>Domain knowledge and development of software systems *</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent"
                        {...register("domainKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("domainKnowledge", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>{" "}
                    <div className="p-2">
                      <input
                        type="radio"
                        value="fair"
                        {...register("domainKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Fair</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("domainKnowledge")}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>{" "}
                  </div>
                </div>
                <div>
                  <p>Your Overall rating about our alumnus *</p>
                  <div className="grid grid-cols-5 border-b-2 mb-4 py-3 border-black">
                    <p className="text-center">5</p>
                    <p className="text-center">4</p>
                    <p className="text-center">3</p>
                    <p className="text-center">2</p>
                    <p className="text-center">1</p>
                  </div>
                  <div>
                    <div className="grid grid-cols-5 items-center mb-3 pb-2 ">
                      <input
                        type="radio"
                        value="5"
                        {...register("overallRating", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="h-3"
                      />
                      <input
                        type="radio"
                        value="4"
                        {...register("overallRating")}
                        className="h-3"
                      />
                      <input
                        type="radio"
                        value="3"
                        {...register("overallRating")}
                        className="h-3"
                      />
                      <input
                        type="radio"
                        value="2"
                        {...register("overallRating")}
                        className="h-3"
                      />
                      <input
                        type="radio"
                        value="1"
                        {...register("overallRating")}
                        className="h-3"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-4 mt-4">Any other suggestion*</p>
                  <textarea
                    {...register("suggestions", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder="Suggestions"
                    className="rounded-sm px-1 py-1 w-full h-auto focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.suggestions?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">Your Digital Signature*</label>
                  <input
                    placeholder="Digital Signature"
                    {...register("digitalSignature", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.digitalSignature?.message}
                  </p>
                </div>
                <button type="submit" className={buttonStyle}>
                  Submit
                </button>
              </form>
            </section>
          )}
          {
            loading?(<SubmittingForm/>):(thanks==1 && ( <Thanks/>))
          }
          {/* {thanks == 1 && (
            <section>
              <Thanks />
            </section>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EmployerFeedback;