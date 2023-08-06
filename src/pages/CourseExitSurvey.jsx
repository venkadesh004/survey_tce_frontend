import React, { useState } from "react";
import Thanks from "./Thanks";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SubmittingForm from "./SubmittingForm";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";

const CourseExitSurvey = () => {
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
    "self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200 ";

  return (
    <div>
      <div className="w-3/4 flex flex-col justify-center  mx-auto h-100v ">
        <div className="h-70v">
          <div className="bg-red-500 text-white mb-4 p-3 flex flex-col gap-3 rounded-lg ">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between sm:items-center  ">
              <h1 className="text-3xl font-bold">Course Exit Survey</h1>
              <Link className={homeButtonStyle} to="/">
                Home
              </Link>
            </div>
          </div>
          <div className="px-3 shadow-2xl">
            {!thanks && !loading && (
              <section>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    console.log(data);
                    var index = 2;
                    console.log(urlAddress + routeAddresses[index]);
                    setLoading(true)
                    await axios
                      .post(urlAddress + routeAddresses[index], data)
                      .then((reponse) => {
                        console.log(reponse);
                        setLoading(false)
                      });
                    setThanks(!thanks);
                  })}
                >
                  <div className={labelDivStyle}>
                    <label htmlFor="">Course code</label>
                    <input
                      {...register("courseCode", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.courseCode?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Course Name</label>
                    <input
                      {...register("courseName", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.courseName?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Year</label>
                    <input
                      {...register("year", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.year?.message}
                    </p>
                  </div>
                  <div>
                    <p>
                      1. Have all the course outcomes been met in your opinion?
                      * [On a scale of 1(min) to 5 (max) rate your level of
                      attainment of the course outcomes]
                    </p>
                    <div className="px-6 font-bold">
                      <div className="grid grid-cols-7 border-b-2 mb-4 py-3">
                        <p></p>
                        <p className="text-center">5</p>
                        <p className="text-center">4</p>
                        <p className="text-center">3</p>
                        <p className="text-center">2</p>
                        <p className="text-center">1</p>
                        <p className="text-center">NA</p>
                      </div>

                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p className="">CO1</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO1", {
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
                          {...register("CO1")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO1")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO1")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO1")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO1")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO2</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO2", {
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
                          {...register("CO2")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO2")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO2")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO2")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO2")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO3</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO3", {
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
                          {...register("CO3")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO3")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO3")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO3")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO3")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO4</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO4", {
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
                          {...register("CO4")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO4")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO4")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO4")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO4")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO5</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO5", {
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
                          {...register("CO5")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO5")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO5")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO5")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO5")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO6</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO6", {
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
                          {...register("CO6")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO6")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO6")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO6")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO6")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-3 pb-2 border-b-2">
                        <p>CO7</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO7", {
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
                          {...register("CO7")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO7")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO7")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO7")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO7")}
                          className="h-3"
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center mb-5 pb-2 border-b-2">
                        <p>CO8</p>
                        <input
                          type="radio"
                          value="5"
                          {...register("CO8", {
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
                          {...register("CO8")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="3"
                          {...register("CO8")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="2"
                          {...register("CO8")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="1"
                          {...register("CO8")}
                          className="h-3"
                        />
                        <input
                          type="radio"
                          value="NA"
                          {...register("CO8")}
                          className="h-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">
                      2. Few things that you liked about this course *
                    </label>
                    <input
                      {...register("like", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.like?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">
                      3. Few things that you disliked about this course *
                    </label>
                    <input
                      {...register("dislike", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.dislike?.message}
                    </p>
                  </div>

                  <div className="mt-3">
                    <div>
                      <div>
                        <p>
                          4. Availability of text/reference books in library *
                        </p>
                        <div className="my-3 sm:flex grid grid-rows-3 sm:gap-4">
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="available"
                              {...register("textBookAvailability", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="mx-3"
                            />
                            <label htmlFor="">Available</label>
                          </div>{" "}
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="notAvailable"
                              {...register("textBookAvailability")}
                              className="mx-3"
                            />
                            <label htmlFor="">Not Available</label>
                          </div>{" "}
                          <div className="p-2">
                            <input
                              type="radio"
                              value="moreCopiesRequired"
                              {...register("textBookAvailability")}
                              className="mx-3"
                            />
                            <label htmlFor="">More copies required</label>
                          </div>
                        </div>
                        <p>5. Please rate the lectures for this course *</p>
                        <div className="my-3 sm:flex grid grid-cols-2 sm:gap-4">
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="excellent"
                              {...register("lectureRating", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="mx-3"
                            />
                            <label htmlFor="">Excellent</label>
                          </div>{" "}
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="good"
                              {...register("lectureRating")}
                              className="mx-3"
                            />
                            <label htmlFor="">Good</label>
                          </div>{" "}
                          <div className="p-2">
                            <input
                              type="radio"
                              value="average"
                              {...register("lectureRating")}
                              className="mx-3"
                            />
                            <label htmlFor="">Average</label>
                          </div>
                          <div className="p-2">
                            <input
                              type="radio"
                              value="poor"
                              {...register("lectureRating")}
                              className="mx-3"
                            />
                            <label htmlFor="">poor</label>
                          </div>
                        </div>
                        <p>
                          6. Please rate the appropriateness of the assessment
                          tools used *
                        </p>
                        <div className=" my-3 sm:flex grid grid-cols-1 sm:gap-4">
                          <div className=" py-2 ">
                            <input
                              type="radio"
                              value="appropriate"
                              {...register(
                                "appropriatenessOfAssessmentToolsUsed",
                                {
                                  required: {
                                    value: true,
                                    message: "This is required",
                                  },
                                }
                              )}
                              className="mx-3"
                            />
                            <label htmlFor="">Appropriate</label>
                          </div>{" "}
                          <div className=" py-2">
                            <input
                              type="radio"
                              value="notAppropriate"
                              {...register(
                                "appropriatenessOfAssessmentToolsUsed"
                              )}
                              className="mx-3"
                            />
                            <label htmlFor="">Not Appropriate</label>
                          </div>{" "}
                          <div className="py-2">
                            <input
                              type="radio"
                              value="changesRequired"
                              {...register(
                                "appropriatenessOfAssessmentToolsUsed"
                              )}
                              className="mx-3"
                            />
                            <label htmlFor="">
                              Changes required in the frequency/assessment
                              tool/questions used
                            </label>
                          </div>
                        </div>
                        <p>
                          7. Please rate the content hosting tools used for this
                          course *
                        </p>
                        <div className="my-3 sm:flex grid grid-cols-2 sm:gap-4">
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="excellent"
                              {...register("hostingTools", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="mx-3"
                            />
                            <label htmlFor="">Excellent</label>
                          </div>{" "}
                          <div className="p-2 ">
                            <input
                              type="radio"
                              value="good"
                              {...register("hostingTools")}
                              className="mx-3"
                            />
                            <label htmlFor="">Good</label>
                          </div>{" "}
                          <div className="p-2">
                            <input
                              type="radio"
                              value="average"
                              {...register("hostingTools")}
                              className="mx-3"
                            />
                            <label htmlFor="">Average</label>
                          </div>
                          <div className="p-2">
                            <input
                              type="radio"
                              value="poor"
                              {...register("hostingTools")}
                              className="mx-3"
                            />
                            <label htmlFor="">Poor</label>
                          </div>
                        </div>
                        <p className="mb-4 mt-4">
                          8. Any other suggestions/feedback *
                        </p>
                        <textarea
                          {...register("courseSuggestions", {
                            required: {
                              value: true,
                              message: "All fields are required",
                            },
                          })}
                          type="text"
                          placeholder="Suggestions"
                          className="rounded-sm px-1 py-1 w-full h-auto focus:outline-red-500 border-2 mb-5"
                        />
                        <p className="mb-1 text-red-600 sm:mb-3">
                          {errors.courseSuggestions?.message}
                        </p>
                      </div>
                      <button type="submit" className={buttonStyle}>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            )}
            {loading ? (
              <SubmittingForm />
            ) : (
              thanks == 1 && (
                <section className>
                  <Thanks />
                </section>
              )
            )}
            {/* {thanks == 1 && (
              <section>
                <Thanks />
              </section>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseExitSurvey;
