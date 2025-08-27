"use client"
import { useRouter } from "next/navigation"

export const Success = () => {
    const router = useRouter()
    return <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="text-3xl">
            Your'e good to go
        </div>
        <div className="text-center px-10 mt-5">
            Go ahead and explore the app. When you're ready, submit a pr in github
        </div>
        <div className="w-[60%] h-52  border border-neutral-800 flex mt-5">
            <div className="flex-1 flex flex-col items-center border-r border-neutral-800">
                <div>

                </div>
                <div></div>
                <div></div>
            </div>
            <div className="flex-1 text-center border-r border-neutral-800">hi there</div>
            <div className="flex-1 text-center">hi there</div>
        </div>
        <button onClick={() => {
            router.push("/dashboard")
        }} className="w-[270px] h-12 flex items-center justify-center bg-neutral-800 mt-16 rounded-md">
            Open PRwise
        </button>
    </div>
}
