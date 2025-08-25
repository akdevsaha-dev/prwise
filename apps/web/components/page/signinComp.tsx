"use client"
import { handleGithubAuth, handleGoogleAuth } from "@/lib/actions"
import { authClient } from "@/lib/auth-client"
import { InputBox } from "@workspace/ui/components/inputBox"
import { Loader } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handleEmailSignin = async () => {
    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => {
        setLoading(true)
      },
      onSuccess: (ctx) => {
        setLoading(false)
        toast.success("Signed up successfully!")
        router.push("/dashboard")
      },
      onError: (ctx) => {
        setLoading(false)
        toast.error(ctx.error.message);
      }
    })
  }

  return <div className="h-screen text-black dark:text-white w-full flex justify-center items-center">
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-[500px] w-[400px]">
      <div className="dark:text-[white]/90 text-black text-xl text-center font-semibold">
        Log in to PRwise
      </div>

      <div className="mt-8">
        <InputBox
          type="text"
          label="Email address" placeholder="Johndoe@gmail.com" value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current?.focus()
            }
          }}
        />
        <InputBox
          type="password"
          ref={passwordRef}
          value={password}
          label="Password" placeholder="••••••••••"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEmailSignin();
            }
          }}
        />
        <button onClick={handleEmailSignin} className="h-12 flex items-center justify-center font-semibold mt-8 rounded-md w-full dark:text-black text-white bg-[#5c4cd8] hover:bg-[#8979ff]">
          {loading ? <Loader /> : "Log In"}
        </button>
        <div className="h-[1px] bg-gradient-to-r from-transparent dark:via-[#8979ff] via-[#c3c3c7] to-transparent mt-10" >
        </div>
        <div className="flex gap-5  mt-6">
          <button
            onClick={handleGoogleAuth}
            className="flex-1 hover:bg-neutral-100 dark:hover:bg-neutral-950 h-12 px-3 rounded-md border border-neutral-200 dark:border-neutral-800 flex justify-center items-center gap-2 cursor-pointer">
            <Image src="/images/google.png" alt="google" height={20} width={20} />
            Google
          </button>
          <button
            onClick={handleGithubAuth}
            className="flex-1 hover:bg-neutral-100 dark:hover:bg-neutral-950 h-12 px-3 rounded-md border border-neutral-200 dark:border-neutral-800 flex justify-center items-center gap-2 cursor-pointer">
            <Image src={"/images/github.png"} alt="google" height={22} width={22} />
            Github
          </button>
        </div>
        <div className="text-neutral-500 text-sm text-center mt-4">
          Don't have an account? <Link href={"/signup"} className="dark:text-white/90 text-neutral-800 hover:underline hover:underline-offset-2">Sign up</Link> or <Link href={"/"} className="dark:text-white/90 text-neutral-800 hover:underline hover:underline-offset-2">Learn more</Link>
        </div>
      </div>
    </motion.div>
  </div>
}