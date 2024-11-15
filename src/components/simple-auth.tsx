"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Success from "./auth/success"
import ProgressBar from "./progress-bar"
import RegisterForm from "./auth/register-form"


export default function SimpleAuth() {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleBack = () => {
    setIsSuccess(false)
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   username: "",
    //   password: "",
    // })
  }

  return (
    <div className="w-[1243px] h-[777px] bg-customGrayDarker text-white rounded-2xl shadow-custom-black">
      <div className="pb-16">
        <ProgressBar isSuccess={isSuccess} />
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            className="w-full"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex pl-14 w-full h-[702px]">
              <div className="text-left w-[430px]">
                <h1 className="text-4xl font-extrabold mb-8">Step 1</h1>
                <h2 className="text-3xl mb-4 font-bold">Account Information</h2>
                <div className="w-full h-[1px] bg-customOrange mb-4" />
                <p className="mb-8 leading-8 mr-6">
                  Start by entering your basic details to personalize your profile. This step ensures a secure and tailored
                  experience for you. Your journey begins here, and we&apos;re here to make it easy.
                </p>
                <p className="leading-8 mr-6">
                  Passwords must be 12+ characters, include uppercase, lowercase, digits (0-9), and a special character (e.g.,!
                  @#$).
                </p>
              </div>

              <div className="pt-28 ml-auto">
                <RegisterForm
                  setIsSuccess={setIsSuccess}
                />
              </div>
            </div>
          </motion.div >
        ) : (
          <Success handleBack={handleBack} />
        )}
      </AnimatePresence >
    </div >
  )
}