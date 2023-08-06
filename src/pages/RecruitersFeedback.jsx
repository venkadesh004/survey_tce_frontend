import { useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import Thanks from "./Thanks";
import { Link } from "react-router-dom";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";
import SubmittingForm from "./SubmittingForm";

const RecruitersFeedback = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const buttonStyle =
    "self-start px-4 py-1 rounded-md text-red-500 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white duration-200 mb-4";
  const homeButtonStyle =
    "self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200 mb-4";
  const labelDivStyle = "flex flex-col gap-3  ";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 5) {
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

  // let validArray = new Array(5).fill(true);
  const invalidElementRef = useRef(null);
  useEffect(() => {
    if (!isValid) {
      invalidElementRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isValid]);

  const [loading, setLoading] = useState(false);

  return (
    <div
      className="w-3/4 flex flex-col justify-center  mx-auto h-100v font-nunito "
      ref={invalidElementRef}
    >
      <div className="h-70v">
        <div className="bg-red-600 text-white mb-4 p-3 flex flex-col gap-3 rounded-lg ">
          <h1 className="text-3xl font-bold">Recruiter's Feedback</h1>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between ">
            <p className="text-lg font-semibold">
              Complete this form in quick 5 steps
            </p>
            <Link className={homeButtonStyle} to="/">
              Home
            </Link>
          </div>
        </div>
        <div className="px-3 shadow-2xl rounded-xl ">
          {!loading && (
            <form
              className="flex flex-col gap-5 px-3"
              onSubmit={handleSubmit(async (data) => {
                console.log(data);
                var index = 0;
                console.log(urlAddress + routeAddresses[index]);
                setLoading(true);
                await axios
                  .post(urlAddress + routeAddresses[index], data)
                  .then((reponse) => {
                    console.log(reponse);
                    setLoading(false);
                  });
                setStep(step + 1);
              })}
            >
              {step >= 1 && step <= 5 && (
                <section>
                  <p className="text-2xl font-semibold mb-3">
                    Step {step} of 5
                  </p>
                </section>
              )}
              {step === 1 && (
                <section>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Email address : </label>
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
                      placeholder="Email"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Name : </label>
                    <input
                      {...register("name", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="name"
                      placeholder="Name"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2"
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.name?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">Designation: </label>
                    <input
                      {...register("designation", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      placeholder="Designation"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.designation?.message}
                    </p>
                  </div>
                  <div className={labelDivStyle}>
                    <label htmlFor="">
                      Name of the organization in which you are working :
                    </label>
                    <input
                      {...register("organisationName", {
                        required: {
                          value: true,
                          message: "All fields are required",
                        },
                      })}
                      type="text"
                      placeholder="Organisation Name"
                      className="rounded-sm px-1 py-1  focus:outline-red-500 border-2"
                    />
                    <p className="mb-1 text-red-600 sm:mb-3">
                      {errors.organisationName?.message}
                    </p>
                  </div>
                </section>
              )}
              {step === 2 && (
                <section>
                  <div className="flex flex-col gap-4 ">
                    <p>
                      Please use a 4 (excellent) to 1 (poor) scale to rank the
                      ability of our students in terms of the following
                      parameters:
                    </p>
                    <div>
                      <p className="font-bold">
                        a{")"} Problem Solving Skill (Mark only one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3 ">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("problemSolving", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("problemSolving")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("problemSolving")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("problemSolving")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        b{")"} Programming Skill (Mark only one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("programmingSkill", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("programmingSkill")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("programmingSkill")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("programmingSkill")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        c{")"} Critical Thinking/Analytical Skill (Mark only
                        one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("criticalThinking", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("criticalThinking")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("criticalThinking")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("criticalThinking")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        d{")"} Communication (Mark only one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("communication", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("communication")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("communication")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("communication")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">
                        e{")"} Interpersonal skills (Mark only one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("interpersonal", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("interpersonal")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("interpersonal")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("interpersonal")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 3 && (
                <section>
                  <div className="flex flex-col ">
                    <div className="mb-5">
                      <p className="font-bold">
                        f{")"} Leadership Skills (Mark onlstepy one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("leadership", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("leadership")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("leadership")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("leadership")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="font-bold">
                      g{")"} Ability to become a team player (Mark only one) *
                    </p>
                    <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                      <label htmlFor="excellent">
                        <input
                          className="mr-1"
                          {...register("team", {
                            required: {
                              value: true,
                              message: "This is required",
                            },
                          })}
                          type="radio"
                          value="excellent"
                        />
                        Excellent
                      </label>
                      <label htmlFor="good">
                        <input
                          className="mr-1"
                          {...register("team")}
                          type="radio"
                          value="good"
                        />
                        Good
                      </label>

                      <label htmlFor="average">
                        <input
                          className="mr-1"
                          {...register("team")}
                          type="radio"
                          value="average"
                        />
                        Average
                      </label>
                      <label htmlFor="poor">
                        <input
                          className="mr-1"
                          {...register("team")}
                          type="radio"
                          value="poor"
                        />
                        Poor
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="font-bold">
                      h{")"} System Engineering Skills (for building
                      Hardware/Software/Products/Designs) (Mark only one) *
                    </p>
                    <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                      <label htmlFor="excellent">
                        <input
                          className="mr-1"
                          {...register("systemEngineeringSkills", {
                            required: {
                              value: true,
                              message: "This is required",
                            },
                          })}
                          type="radio"
                          value="excellent"
                        />
                        Excellent
                      </label>
                      <label htmlFor="good">
                        <input
                          className="mr-1"
                          {...register("systemEngineeringSkills")}
                          type="radio"
                          value="good"
                        />
                        Good
                      </label>

                      <label htmlFor="average">
                        <input
                          className="mr-1"
                          {...register("systemEngineeringSkills")}
                          type="radio"
                          value="average"
                        />
                        Average
                      </label>
                      <label htmlFor="poor">
                        <input
                          className="mr-1"
                          {...register("systemEngineeringSkills")}
                          type="radio"
                          value="poor"
                        />
                        Poor
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="font-bold">
                      i{")"} Ability to design and develop solutions with a
                      comprehension of the design trade-offs involved (Mark only
                      one) *
                    </p>
                    <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                      <label htmlFor="excellent">
                        <input
                          className="mr-1"
                          {...register("design", {
                            required: {
                              value: true,
                              message: "This is required",
                            },
                          })}
                          type="radio"
                          value="excellent"
                        />
                        Excellent
                      </label>
                      <label htmlFor="good">
                        <input
                          className="mr-1"
                          {...register("design")}
                          type="radio"
                          value="good"
                        />
                        Good
                      </label>

                      <label htmlFor="average">
                        <input
                          className="mr-1"
                          {...register("design")}
                          type="radio"
                          value="average"
                        />
                        Average
                      </label>
                      <label htmlFor="poor">
                        <input
                          className="mr-1"
                          {...register("design")}
                          type="radio"
                          value="poor"
                        />
                        Poor
                      </label>
                    </div>
                  </div>
                  <div className="sm:mb-1">
                    <p className="font-bold">
                      j{")"} Ability to work with or knowledge about servers,
                      systems, Integrated Development Environments (IDE), design
                      and testing tools (Mark only one) *
                    </p>
                    <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                      <label htmlFor="excellent">
                        <input
                          className="mr-1"
                          {...register("knowledge", {
                            required: {
                              value: true,
                              message: "This is required",
                            },
                          })}
                          type="radio"
                          value="excellent"
                        />
                        Excellent
                      </label>
                      <label htmlFor="good">
                        <input
                          className="mr-1"
                          {...register("knowledge")}
                          type="radio"
                          value="good"
                        />
                        Good
                      </label>

                      <label htmlFor="average">
                        <input
                          className="mr-1"
                          {...register("knowledge")}
                          type="radio"
                          value="average"
                        />
                        Average
                      </label>
                      <label htmlFor="poor">
                        <input
                          className="mr-1"
                          {...register("knowledge")}
                          type="radio"
                          value="poor"
                        />
                        Poor
                      </label>
                    </div>
                  </div>
                </section>
              )}
              {step === 4 && (
                <section>
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="font-bold">
                          k{")"} Knowledge about contemporary fields in Computer
                          Science and Engineering (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("contemporaryKnowledge", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("contemporaryKnowledge")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("contemporaryKnowledge")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("contemporaryKnowledge")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">
                          l{")"} Life Skills (Time management and
                          Prioritization) (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("lifeSkills", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("lifeSkills")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("lifeSkills")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("lifeSkills")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">
                          m{")"} Exposure to the impact of Information and
                          Communication Technology (ICT) solutions on the
                          environment and Society (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("exposureToIt", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("exposureToIt")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("exposureToIt")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("exposureToIt")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">
                          n{")"}Knowledge of sustainable product development
                          (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("knowledgeAboutSPD", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("knowledgeAboutSPD")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("knowledgeAboutSPD")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("knowledgeAboutSPD")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">
                          o{")"} Professional Ethics (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("professionalEthics", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("professionalEthics")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("professionalEthics")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("professionalEthics")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">
                          p{")"} Project management Skills and awareness about
                          finance management (Mark only one) *
                        </p>
                        <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3 ">
                          <label htmlFor="excellent">
                            <input
                              className="mr-1"
                              {...register("projectManagementSkills", {
                                required: {
                                  value: true,
                                  message: "This is required",
                                },
                              })}
                              type="radio"
                              value="excellent"
                            />
                            Excellent
                          </label>
                          <label htmlFor="good">
                            <input
                              className="mr-1"
                              {...register("projectManagementSkills")}
                              type="radio"
                              value="good"
                            />
                            Good
                          </label>

                          <label htmlFor="average">
                            <input
                              className="mr-1"
                              {...register("projectManagementSkills")}
                              type="radio"
                              value="average"
                            />
                            Average
                          </label>
                          <label htmlFor="poor">
                            <input
                              className="mr-1"
                              {...register("projectManagementSkills")}
                              type="radio"
                              value="poor"
                            />
                            Poor
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {step === 5 && (
                <section>
                  <div>
                    <p className="font-bold text-xl mb-4">Summary</p>
                    <div>
                      <p className="font-bold ">
                        q{")"} Your overall rating about our students (Mark only
                        one) * finance management (Mark only one) *
                      </p>
                      <div className="sm:flex items-center sm:gap-9 mt-4 grid grid-cols-2 gap-3">
                        <label htmlFor="excellent">
                          <input
                            className="mr-1"
                            {...register("overallRating", {
                              required: {
                                value: true,
                                message: "This is required",
                              },
                            })}
                            type="radio"
                            value="excellent"
                          />
                          Excellent
                        </label>
                        <label htmlFor="good">
                          <input
                            className="mr-1"
                            {...register("overallRating")}
                            type="radio"
                            value="good"
                          />
                          Good
                        </label>

                        <label htmlFor="average">
                          <input
                            className="mr-1"
                            {...register("overallRating")}
                            type="radio"
                            value="average"
                          />
                          Average
                        </label>
                        <label htmlFor="poor">
                          <input
                            className="mr-1"
                            {...register("overallRating")}
                            type="radio"
                            value="poor"
                          />
                          Poor
                        </label>
                      </div>
                    </div>

                    <p className="font-bold mb-4 mt-4">
                      Any further Suggestions
                    </p>
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
                </section>
              )}
              {loading ? (
                <SubmittingForm />
              ) : (
                step === 6 && (
                  <section className>
                    <Thanks />
                  </section>
                )
              )}
              {/* {step === 6 && (
              <section className>
                <Thanks />
              </section>
            )} */}

              {/* <p className="mb-1 text-red-600 sm:mb-3">
            {errors.email?.message ||
              errors.name?.message ||
              errors.designation?.message ||
              errors.organisationName?.message}
          </p> */}

              <div className="mt-3 mb-5 sm:mb-0 sm:mt-0">
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
                {step === 5 && (
                  <button
                    type="submit"
                    className={buttonStyle}
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                )}
                {step < 5 && (
                  <button
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });

                      nextStep();
                    }}
                    disabled={!isValid}
                    type="button"
                    className={buttonStyle}
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          )}
          {loading && <SubmittingForm />}
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default RecruitersFeedback;
