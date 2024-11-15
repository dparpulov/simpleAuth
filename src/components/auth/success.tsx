import { motion } from "framer-motion"
import checkmark from "../../assets/check.png"

export default function Success({ handleBack }: { handleBack: () => void }) {
  return (
    <motion.div
      key="success"
      className="flex flex-col pt-8 text-center h-[700px]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl font-bold mb-8">Success!</h1>
      <motion.div
        className="mx-auto"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <img src={checkmark} alt="Success Checkmark" width={150} height={150} />
      </motion.div>
      <div className="self-start mt-auto">
        <motion.button
          onClick={handleBack}
          className="w-60 h-20 px-6 py-2 bg-customGrayMedium text-white font-bold rounded-bl-2xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  )
}