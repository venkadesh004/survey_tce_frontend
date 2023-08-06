import React, { useState, useEffect, useRef } from "react";
import Thanks from "./Thanks";
import SubmittingForm from "./SubmittingForm";
import { useForm } from "react-hook-form";
import Arrow from "../components/Arrow";
import { Link } from "react-router-dom";

import { urlAddress, routeAddresses } from "./API";
import axios from "axios";

const AlumniFeedback = () => {
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

  const [step, setStep] = useState(1);
  const homeButtonStyle =
    "self-start px-4 py-1 rounded-md text-white font-semibold border-2 border-white hover:bg-white hover:text-red-500 duration-200 mb-4";

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

  //used for entrepreneur page , to know from where step is reached!
  const [flip, setFlip] = useState(3);

  const [loading, setLoading] = useState(false);

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
          <h1 className="text-3xl font-bold">Alumni Feedback</h1>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-0  sm:w-full sm:justify-between ">
            <p className="text-lg font-semibold">
              Complete this form in quick 5 steps
            </p>
            <Link className={homeButtonStyle} to="/">
              Home
            </Link>
          </div>
        </div>

        {!loading && (
          <form
            className="flex flex-col gap-5 px-5 shadow-2xl"
            onSubmit={handleSubmit(async (data) => {
              console.log(data);
              var index = 4;
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
            {step >= 1 && step <= 10 && (
              <section>
                <p className="text-lg mb-3">Step {step} of 10</p>
              </section>
            )}
            {step === 1 && (
              <section>
                <div className={labelDivStyle}>
                  <label htmlFor="">1.Your Name</label>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder="Name"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.name?.message}
                  </p>
                </div>
                <div>
                  <p>2.The Degree you obtained from TCE *</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="B.E. (CSE)"
                        {...register("degree")}
                        className="mx-3"
                      />
                      <label htmlFor="">B.E. (CSE)</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="M.E. (CSE)"
                        {...register("degree", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">M.E. (CSE)</label>
                    </div>{" "}
                  </div>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">3. Year of graduation *</label>
                  <input
                    {...register("yearOfGraduation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.yearOfGraduation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">4. Your Mail ID *</label>
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
                    placeholder="email"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.email?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">5. Address For Communication *</label>
                  <input
                    {...register("address", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder="Address"
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.address?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    6. Name of the Organization in which you are working *
                  </label>
                  <input
                    {...register("workingOrganisationName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.workingOrganisationName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">7. Location of the Organization *</label>
                  <input
                    {...register("organizationLocation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.organizationLocation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">8. Your Designation *</label>
                  <input
                    {...register("designation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.designation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    9. Your Annual Salary in Lakhs (Optional)
                  </label>
                  <input
                    {...register("annualSalary", {
                      required: {
                        value: false,
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.annualSalary?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    10. Working in the current company since (Example: December
                    15, 2012) *
                  </label>
                  <input
                    {...register("yearsWorkingInTheCompany", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.yearsWorkingInTheCompany?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    11. Date of Response (Example: December 15, 2012) *
                  </label>
                  <input
                    {...register("date", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.date?.message}
                  </p>
                </div>
              </section>
            )}
            {step === 2 && (
              <section>
                <div>
                  <p>12. Nature of work (Check all that apply) *</p>
                  <div className="my-3 sm:flex grid grid-cols-1">
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="technical  "
                        {...register("natureOfWork")}
                        className="mx-3"
                      />
                      <label htmlFor="">Technical</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="managerial"
                        {...register("natureOfWork", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Managerial</label>
                    </div>
                  </div>
                </div>
                <div>
                  <p>
                    13. Roles played by you in your Organization (Check all that
                    apply) *
                  </p>
                  <div className="my-3 sm:flex grid grid-cols-1">
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="analysis  "
                        {...register("roles")}
                        className="mx-3"
                      />
                      <label htmlFor="">Analysis</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="design"
                        {...register("roles", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Design</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="development"
                        {...register("roles", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Development</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="testing"
                        {...register("roles", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Testing</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="maintenance"
                        {...register("roles", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Maintenance</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="r&d"
                        {...register("roles", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">R&D</label>
                    </div>
                  </div>
                </div>

                <div>
                  <p>
                    14. Problem Solving Skill (How efficiently you solve the
                    previously unknown problems) Mark only one oval. *
                  </p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent  "
                        {...register("problemSolvingSkills")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("problemSolvingSkills", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="average"
                        {...register("problemSolvingSkills", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Average</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("problemSolvingSkills", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="cant rate"
                        {...register("problemSolvingSkills", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Can't Rate</label>
                    </div>
                  </div>
                  <div>
                    <p>
                      15. Have you pursued any Higher Education after graduating
                      from TCE *
                    </p>
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
                      Yes (Skip to Step 3.)
                    </div>
                    <div className="flex mt-3 gap-3 items-center">
                      <button
                        className={multipleButtonStyle}
                        disabled={!isValid}
                        onClick={() => {
                          setStep(4);
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
                      No (Skip to Step 4.)
                    </div>
                  </div>
                </div>
              </section>
            )}
            {step === 3 && (
              <section>
                <div>
                  <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-3">
                    Higher Studies Details
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">16.Name of the University *</label>
                  <input
                    {...register("universityName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.universityName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">17.Degree *</label>
                  <input
                    {...register("higherDegree", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.higherDegree?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">18.Discipline *</label>
                  <input
                    {...register("discipline", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.discipline?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">19.Admission Year *</label>
                  <input
                    {...register("admissionYear", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.admissionYear?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">20.Year of Graduation *</label>
                  <input
                    {...register("graduationYear", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.graduationYear?.message}
                  </p>
                </div>
                <div>
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

                  <button
                    type="button"
                    className={buttonStyle}
                    disabled={!isValid}
                    onClick={() => {
                      setStep(5);
                      window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Next
                  </button>
                </div>
              </section>
            )}
            {step === 4 && (
              <section>
                <div>
                  <p>21. Your current working domain * </p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="business"
                        {...register("workingDomain")}
                        className="mx-3"
                      />
                      <label htmlFor="">Business</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="technical"
                        {...register("workingDomain", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Technical</label>
                    </div>{" "}
                  </div>
                </div>
                <div>
                  <p>
                    22. Rate the extent to which you follow Professional Ethics
                    *
                  </p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent  "
                        {...register("professionalEthics")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("professionalEthics", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="average"
                        {...register("professionalEthics", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Average</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("professionalEthics", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="cant rate"
                        {...register("professionalEthics", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Can't Rate</label>
                    </div>
                  </div>
                </div>
                <div>
                  <p>
                    23. Rate the extent to which you involve in corporate social
                    responsibility related activities *
                  </p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent  "
                        {...register("socialResponsibility")}
                        className="mx-3"
                      />
                      <label htmlFor="">Excellent</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("socialResponsibility", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Good</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="average"
                        {...register("socialResponsibility", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Average</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("socialResponsibility", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Poor</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="cant rate"
                        {...register("socialResponsibility", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">Can't Rate</label>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>

                  <button
                    type="button"
                    className={buttonStyle}
                    disabled={!isValid}
                    onClick={() => {
                      setStep(5);
                      setFlip(4);
                      window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Next
                  </button>
                </div>
              </section>
            )}
            {step === 5 && (
              <section>
                <div>
                  <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-3">
                    24. Are you an Entrepreneur?
                  </p>
                </div>
                <div className="mb-5">
                  <div className="flex mt-3 gap-3 items-center">
                    <button
                      className={multipleButtonStyle}
                      onClick={() => {
                        setStep(6);

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
                    Yes (Skip to Step 6.)
                  </div>
                  <div className="flex mt-3 gap-3 items-center">
                    <button
                      className={multipleButtonStyle}
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
                    No (Skip to Step 7.)
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      setStep(flip);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>
                </div>
              </section>
            )}
            {step === 6 && (
              <section>
                <div className={labelDivStyle}>
                  <label htmlFor="">25.Name of the Organization *</label>
                  <input
                    {...register("ownOrganizationName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.ownOrganizationName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">26.Business and Technical Domain *</label>
                  <input
                    {...register("businessAndTechnicalDomain", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.businessAndTechnicalDomain?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">27.Year of Starting *</label>
                  <input
                    {...register("ownCompanyStartedYear", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.ownCompanyStartedYear?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">28.Website URL *</label>
                  <input
                    {...register("websiteUrl", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.websiteUrl?.message}
                  </p>
                </div>

                <div>
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

                  <button
                    type="button"
                    className={buttonStyle}
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
                    Next
                  </button>
                </div>
              </section>
            )}
            {step === 7 && (
              <section>
                <div className="mb-8">
                  <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-3">
                    Your Accomplishments
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">29. Number of Awards received *</label>
                  <input
                    {...register("numberOfAwards", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.numberOfAwards?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    30. Award Details Please use the following format (Name of
                    the Award, Conferring Authority, Year)
                  </label>
                  <input
                    {...register("awardDetails", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.awardDetails?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    31. Number of Papers published after completing your UG
                    Degree *
                  </label>
                  <input
                    {...register("noOfPapersPublishedAfterUG", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.noOfPapersPublishedAfterUG?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    32. Publication Details Please use the following format
                    (Title of the Paper, Journal Name, Year of publication)
                  </label>
                  <input
                    {...register("publicationDetails", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.publicationDetails?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    33. Number of International Certifications *
                  </label>
                  <input
                    {...register("noOfInternationalCertifications", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.noOfInternationalCertifications?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    34.Certification Details Please use the following format
                    (Course Name, Conferring authority, Year of Completion)
                  </label>
                  <input
                    {...register("certificationDetails", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.certificationDetails?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">35. Number of Patents filed *</label>
                  <input
                    {...register("noOfPatentsFiled", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.noOfPatentsFiled?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    36. Patent Details Please use the following format (Course
                    Name, Conferring authority, Year of Completion)
                  </label>
                  <input
                    {...register("patentDetails", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.patentDetails?.message}
                  </p>
                </div>
                <div>
                  <p>
                    37. Memberships in Professional Societies (Check all that
                    apply)
                  </p>
                  <div className="my-3 flex flex-col">
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="IEEE  "
                        {...register("membership")}
                        className="mx-3"
                      />
                      <label htmlFor="">IEEE</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="CSI"
                        {...register("membership", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">CSI</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="IE"
                        {...register("membership", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">IE</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="GATE"
                        {...register("membership", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">GATE</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="ACM"
                        {...register("membership", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">ACM</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="checkbox"
                        value="OTHER"
                        {...register("membership", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">OTHER</label>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      setStep(5);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>

                  <button
                    type="button"
                    className={buttonStyle}
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
                    Next
                  </button>
                </div>
              </section>
            )}
            {step === 9 && (
              <section>
                <p>
                  41. Would it be fine if we solicit feedback about you from
                  your Higher Official? (Mark only one oval) *
                </p>
                <div className="mb-5">
                  <div className="flex mt-3 gap-3 items-center">
                    <button
                      className={multipleButtonStyle}
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
                    Yes (Go to Step 8.)
                  </div>
                  <div className="flex mt-3 gap-3 items-center">
                    <button
                      className={multipleButtonStyle}
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
                    No (Skip to Step 10.)
                  </div>
                </div>
              </section>
            )}
            {step === 8 && (
              <section>
                <div>
                  <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-3">
                    Employer's Details
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">38. Name</label>
                  <input
                    {...register("higherOfficialName", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.higherOfficialName?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">39. Designation *</label>
                  <input
                    {...register("higherOfficialDesignation", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.higherOfficialDesignation?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">40. Mail ID</label>
                  <input
                    {...register("higherOfficialMailID", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.higherOfficialMailID?.message}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      setStep(9);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>

                  <button
                    type="button"
                    className={buttonStyle}
                    disabled={!isValid}
                    onClick={() => {
                      setStep(10);

                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
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
                  <p className="px-3 py-3 bg-red-500 rounded-md font-bold text-lg text-white mb-3">
                    SUMMARY
                  </p>
                </div>
                <p className="font-bold mb-4">
                  How well do you think your education in TCE prepared you for
                  your career? Please rate on a 4 to 1 scale with 4 being the
                  highest (very well prepared) and 1 being the lowest (not
                  prepared).
                </p>
                <div>
                  <p>42. Your Overall rating about TCE *</p>
                  <div className="my-3 sm:flex grid grid-cols-2">
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="excellent  "
                        {...register("overallRatingCollege")}
                        className="mx-3"
                      />
                      <label htmlFor="">5</label>
                    </div>{" "}
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="good"
                        {...register("overallRatingCollege", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">4</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="average"
                        {...register("overallRatingCollege", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">3</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="poor"
                        {...register("overallRatingCollege", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">2</label>
                    </div>
                    <div className="p-2 ">
                      <input
                        type="radio"
                        value="cant rate"
                        {...register("overallRatingCollege", {
                          required: {
                            value: true,
                            message: "This is required",
                          },
                        })}
                        className="mx-3"
                      />
                      <label htmlFor="">1</label>
                    </div>
                  </div>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    Please comment on any particular strengths or weaknesses you
                    can see in our program in light of your subsequent
                    experience
                  </label>
                  <input
                    {...register("strngthOrWeaknessInTheProgram", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.strngthOrWeaknessInTheProgram?.message}
                  </p>
                </div>
                <div className={labelDivStyle}>
                  <label htmlFor="">
                    Role you would wish to contribute to TCE
                  </label>
                  <input
                    {...register("roleWishToContribute", {
                      required: {
                        value: true,
                        message: "All fields are required",
                      },
                    })}
                    type="text"
                    placeholder=""
                    className="rounded-sm px-1 py-1  focus:outline-red-500 border-2 "
                  />
                  <p className="mb-1 text-red-600 sm:mb-3">
                    {errors.roleWishToContribute?.message}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    className={`${buttonStyle} mr-3`}
                    onClick={() => {
                      setStep(5);
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Prev
                  </button>

                  <button
                    type="submit"
                    className={buttonStyle}
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </div>
              </section>
            )}
            {step === 11 && (
              <section className>
                <Thanks />
              </section>
            )}
            <div>
              {step > 1 && step <= 2 && (
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

              {step < 2 && (
                <button
                  type="button"
                  className={buttonStyle}
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
                  Next
                </button>
              )}
            </div>
          </form>
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
      </div>
    </div>
  );
};

export default AlumniFeedback;
