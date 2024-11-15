import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return digits.length === 7;
    }, "Please enter a valid phone number"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Password must include uppercase")
    .regex(/[a-z]/, "Password must include lowercase")
    .regex(/[0-9]/, "Password must include number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include special character"),
})

export default function RegisterForm({ setIsSuccess }: { setIsSuccess: (value: boolean) => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    try {
      formSchema.parse(formData);
      const submissionData = {
        ...formData,
        phone: `123${formData.phone}`,
      };

      const response = await fetch("https://thebteam.free.beeceptor.com/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit")
      };

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors);
      }
    } finally {
      setIsValidating(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedPhone = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-left h-full">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        <div className="w-[310px]">
          <label htmlFor="firstName" className="block text-sm mb-2.5 font-bold">
            First Name
          </label>
          <input
            disabled={isValidating}
            aria-invalid={!!errors.firstName}
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-customGrayDark border ${errors.firstName ? "border-red-500" : "border-transparent"
              }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div className="pr-10 w-[310px]">
          <label htmlFor="lastName" className="block text-sm mb-2.5 font-bold">
            Last Name
          </label>
          <input
            disabled={isValidating}
            aria-invalid={!!errors.lastName}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-customGrayDark border ${errors.lastName ? "border-red-500" : "border-transparent"
              }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div className="w-[310px]">
          <label htmlFor="email" className="block text-sm mb-2.5 font-bold">
            Email
          </label>
          <input
            disabled={isValidating}
            aria-invalid={!!errors.email}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-customGrayDark border ${errors.email ? "border-red-500" : "border-transparent"
              }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="pr-10 w-[310px]">
          <label htmlFor="phone" className="block text-sm mb-2.5 font-bold">
            Phone
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              (123)
            </span>
            <input
              disabled={isValidating}
              aria-invalid={!!errors.phone}
              placeholder="4567890"
              type="tel"
              id="phone"
              name="phone"
              maxLength={7}
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 pl-14 rounded bg-customGrayDark border ${errors.phone ? "border-red-500" : "border-transparent"
                }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="w-[310px]">
          <label htmlFor="username" className="block text-sm mb-2.5 font-bold">
            Username
          </label>
          <input
            disabled={isValidating}
            aria-invalid={!!errors.username}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-customGrayDark border ${errors.username ? "border-red-500" : "border-transparent"
              }`}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div className="pr-10 w-[310px]">
          <label htmlFor="password" className="block text-sm mb-2.5 font-bold">
            Password
          </label>
          <input
            disabled={isValidating}
            aria-invalid={!!errors.password}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded bg-customGrayDark border ${errors.password ? "border-red-500" : "border-transparent"
              }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
      </div>

      <div className="mt-auto self-end">
        <motion.button
          type="submit"
          className="px-8 py-3 text-black font-bold bg-customOrange w-[210px] h-[60px] rounded-br-2xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isValidating}
        >
          {isValidating ? "Validating..." : "Next"}
        </motion.button>
      </div>
    </form>
  )
}