import { motion } from "framer-motion"

export default function ProgressBar({ isSuccess }: { isSuccess: boolean }) {
  return (
    <div className="w-full h-3 bg-customGrayMedium rounded-b-none rounded-t-full overflow-hidden">
      <motion.div
        className={`h-full ${isSuccess ? "bg-customOrange" : "bg-customGrayMedium"}`}
        initial={{ width: "0%" }}
        animate={{ width: isSuccess ? "100%" : "0%" }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}