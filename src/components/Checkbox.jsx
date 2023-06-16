import React from 'react'
import {useForm} from "react-hook-form"
const Checkbox = ({abilities}) => {
    const {register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  return (
    <form className="flex items-center gap-9 mt-3 ">
              <label htmlFor="excellent">
                <input
                  className="mr-1"
                  ref = {register("radio")}
                  type="radio"
                  value="excellent"
                />
                Excellent
              </label>
              <label htmlFor="good">
                <input
                  className="mr-1"
                  ref ={register("radio")}
                  type="radio"
                  value="good"
                />
                Good
              </label>
              
                <label htmlFor="average">
                  <input
                    className="mr-1"
                    ref ={register("radio")}
                    type="radio"
                    value="average"
                  />
                  Average
                </label>
                <label htmlFor="poor">
                  <input
                    className="mr-1"
                    ref ={register("radio")}
                    type="radio"
                    value="poor"
                  />
                  Poor
                </label>
              
    </form>
  )
}

export default Checkbox