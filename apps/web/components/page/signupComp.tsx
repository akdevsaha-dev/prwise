"use client"
import { InputBox } from "@workspace/ui/components/inputBox"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
export const SignUp = () => {
  return <div className="h-screen text-white w-full flex justify-center items-center">
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-[500px] w-[400px]">
      <div className="text-[white]/90 text-xl text-center font-semibold">
        Create your workspace
      </div>
      <div className="mt-8">
      <InputBox label="Name" placeholder="John Doe" />
        <InputBox label="Email address" placeholder="Johndoe@gmail.com" />
        <InputBox label="Password" placeholder="••••••••••" />
        <button type="submit" className="h-12  font-semibold mt-8 rounded-md w-full bg-[#5c4cd8] hover:bg-[#8979ff]">
          Sign Up
        </button>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8979ff] to-transparent mt-10" >
        </div>
        <div className="flex gap-5  mt-6">
          <button className="flex-1 hover:bg-neutral-950 h-12 px-3 rounded-md border border-neutral-800 flex justify-center items-center gap-2 cursor-pointer">
            <Image src="/images/google.png" alt="google" height={20} width={20} />
            <span className="text-sm ">Google</span>
          </button>
          <button className="flex-1  hover:bg-neutral-950 h-12 px-3 rounded-md border border-neutral-800 flex justify-center items-center gap-2 cursor-pointer">
            <Image src={"/images/github.png"} alt="google" height={22} width={22} />
            Github
          </button>
        </div>
        <div className="text-neutral-500 text-sm text-center mt-4">
          Already have an account? <Link href={"/signin"} className="text-white/90 hover:underline hover:underline-offset-2">Sign in</Link>
        </div>
      </div>
    </motion.div>
  </div>
}