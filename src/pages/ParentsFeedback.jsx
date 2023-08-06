import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Thanks from "./Thanks";
import SubmittingForm from "./SubmittingForm"
import { Link } from "react-router-dom";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";

const ParentsFeedback = () => {
  const [thanks, setThanks] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const buttonStyle =
    " mb-9 self-start px-4 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200 mb-4";
  const labelDivStyle = "flex flex-col gap-3  ";
  const homeButtonStyle =
    " self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200 ";

  return (
    <div>
      <div className="w-3/4 flex flex-col justify-center  mx-auto h-100v  ">
        <div className="h-65v ">
          <div className="bg-red-500 text-white mb-4 px-4 py-6 flex flex-col gap-3 rounded-lg  ">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between sm:items-center ">
              <h1 className="text-3xl font-bold">Parents Feedback</h1>
              <Link className={homeButtonStyle} to="/">
                Home
              </Link>
            </div>
          </div>
          <div className="px-3 shadow-2xl ">
            {!thanks && !loading && (
              <section>
                <form
                  onSubmit={handleSubmit(async (data) => {
                    console.log(data);
                    var index = 1;
                    console.log(urlAddress + routeAddresses[index]);
                    setLoading(true);
                    await axios
                      .post(urlAddress + routeAddresses[index], data)
                      .then((reponse) => {
                        console.log(reponse);
                        setLoading(false);
                      });
                    setThanks(!thanks);
                  })}
                >
                  <div className={labelDivStyle}>
                    <label htmlFor="">Student Name</label>
                    <input
                      {...register("studentName", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.studentName?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Parent Name</label>
                    <input
                      {...register("parentName", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.parentName?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Date</label>
                    <input
                      {...register("date", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="date"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.date?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Phone number</label>
                    <input
                      {...register("mobile", {
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
                      {errors.mobile?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Parent Occupation </label>
                    <input
                      {...register("parentOccupation", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.parentOccupation?.message}
                    </p>
                  </div>
                  <div className="mt-3">
                    <div>
                      <p>
                        1. The specific reason(s) on your choice of TCE and CSE
                        Department for your ward is/are:(Select more than one
                        options, if needed) *
                      </p>
                      <div className="my-3 border-2">
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="Vicinity"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            Vicinity and Location (situated in Madurai City)
                          </label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="betterJobOffers"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            TCE has better job offers for Students
                          </label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="cut-offMarks"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            TCE – CSE Department selected based on my ward’s
                            cut-off marks
                          </label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="recommendedBy"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            My ________ (friends/relatives/son/daughter/TCE
                            Alumni) recommended BE CSE Programme
                          </label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="TCEisBest"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            TCE is one among the best Engineering Institutes in
                            TamilNadu/India
                          </label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="ambiance"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">TCE ambience and environment</label>
                        </div>
                        <div className="p-2 border-b-2">
                          <input
                            type="checkbox"
                            value="GovtAidedCollege"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            TCE is Govt. aided College and Cost affordable
                          </label>
                        </div>
                        <div className="p-2 ">
                          <input
                            type="checkbox"
                            value="updatedCurriculum"
                            {...register("reasons", { required: true })}
                            className="mx-3"
                          />
                          <label htmlFor="">
                            BE CSE Programme has updated Curriculum with latest
                            Syllabus
                          </label>
                        </div>
                      </div>
                      <div>
                        <p>
                          2. What do you expect your ward to become after BE CSE
                          graduation at TCE? *
                        </p>
                        <div className="my-3 border-2">
                          <div className="p-2 border-b-2">
                            <input
                              type="radio"
                              value="SoftwareEngineer"
                              {...register("expectations")}
                              className="mx-3"
                            />
                            <label htmlFor="">
                              A Software engineer with job offer(s)
                            </label>
                          </div>{" "}
                          <div className="p-2 border-b-2">
                            <input
                              type="radio"
                              value="Researcher"
                              {...register("expectations", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="mx-3"
                            />
                            <label htmlFor="">
                              A Researcher with Higher Studies opportunities
                            </label>
                          </div>{" "}
                          <div className="p-2">
                            <input
                              type="radio"
                              value="Entrepreneur"
                              {...register("expectations")}
                              className="mx-3"
                            />
                            <label htmlFor="">An Entrepreneur</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p>
                          3. Do you feel that your expectations about your ward
                          be fulfilled by us? *
                        </p>
                        <div className="my-3 border-2 sm:flex grid grid-cols-1">
                          <div className="p-2 border-b-2">
                            <input
                              type="radio"
                              value="definitely"
                              {...register("fulfill", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              className="mx-3"
                            />
                            <label htmlFor="">Definitely</label>
                          </div>{" "}
                          <div className="p-2 border-b-2">
                            <input
                              type="radio"
                              value="moderately"
                              {...register("fulfill")}
                              className="mx-3"
                            />
                            <label htmlFor="">Moderately</label>
                          </div>{" "}
                          <div className="p-2">
                            <input
                              type="radio"
                              value="notSure"
                              {...register("fulfill")}
                              className="mx-3"
                            />
                            <label htmlFor="">Not sure</label>
                          </div>
                        </div>
                        <p className="mb-4 mt-4">
                          4. Give your valuable suggestions for further
                          improvement. *
                        </p>
                        <textarea
                          {...register("ParentsSuggestions", {
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
                          {errors.ParentsSuggestions?.message}
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
            {/* {thanks == 1 && (
              <section>
                <Thanks />
              </section>
            )} */}
            {
              loading? <SubmittingForm/> : thanks == 1 && (
                <section>
                  <Thanks />
                </section>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsFeedback;
