"use client"
import { useState } from "react"
import { motion } from "motion/react"
import { handleWorkspaceSetup } from "@/lib/actions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { authClient } from "@/lib/auth-client"

export const WorkSpaceSetup = ({ email }: { email: string }) => {
    const [workSpace_name, setworkSpace_name] = useState("")
    const [workSpace_Url, setworkSpace_Url] = useState("")
    const [nameTouched, setNameTouched] = useState(false)
    const [urlTouched, setUrlTouched] = useState(false)
    const router = useRouter()

    async function handleSubmit() {
        setNameTouched(true);
        setUrlTouched(true);

        if (!workSpace_name.trim() || !workSpace_Url.trim()) {
            toast.error("Please fill all the required fields");
            return;
        }
        //TODO: complete the url also checl for unique url
        // const final_workSpace_name = ""

        const res = await handleWorkspaceSetup({ workSpace_name, workSpace_Url });
        if (res.redirectURL) {
            router.push(res.redirectURL)
        } else {
            toast.error("Workspace setup failed");
        }
    }

    return <div className="h-screen dark:bg-black bg-white text-black dark:text-white flex flex-col w-full ">
        <div className="h-20 flex items-center text-sm px-10 justify-between ">
            <button onClick={async () => {
                try {
                    await authClient.signOut();
                    router.push("/signin");
                } catch (err) {
                    console.error("Logout failed:", err);
                    toast.error("Logout failed");
                }
            }}
                className="text-neutral-500 px-2 rounded-md py-[2px] hover:text-white hover:bg-neutral-400 dark:hover:bg-neutral-900">
                Log out
            </button>
            <div className="px-3 rounded-md py-2 hover:text-white text-neutral-500 hover:bg-neutral-400 dark:hover:bg-neutral-900">
                <div >Logged in as</div>
                <div className="text-xs font-semibold dark:text-white text-neutral-700">{email}</div>
            </div>
        </div>
        <div className="flex-1 flex flex-col mt-14 items-center text-black dark:text-white ">
            <div className="md:w-[500px] dark:bg-neutral-950 bg-white/8 w-[400px] h-[60vh] shadow-2xl dark:shadow-none shadow-neutral-200">
                <div className="text-2xl font-semibold text-center">
                    Create a new workspace
                </div>
                <div className="text-neutral-400 mt-5 text-center">
                    workspace are shared environment where team can work on projectscycles and issues
                </div>
                <div className=" mt-6 w-full h-80 px-4 flex flex-col justify-center rounded-md">
                    <div className="text-sm">
                        Workspace Name
                    </div>
                    <input
                        className="focus:outline-none text-sm border-[1px] dark:focus:border-neutral-600 focus:border-neutral-300 border-neutral-200 dark:border-neutral-800 text-neutral-500 w-full px-4 py-4 mt-2 rounded-md"
                        value={workSpace_name}
                        onChange={(e) => setworkSpace_name(e.target.value)}
                        onBlur={() => setNameTouched(true)}
                    />
                    {nameTouched && workSpace_name.trim() === "" && (
                        <div className="text-red-500 text-xs mt-1">Required</div>
                    )}
                    <div className="text-sm mt-8">
                        Workspace URL
                    </div>
                    <div className="flex mt-2 border-[1px] border-neutral-200 dark:border-neutral-800 dark:focus-within:border-neutral-600 focus-within:border-neutral-300 rounded-md overflow-hidden">
                        <div className="dark:bg-neutral-800 bg-neutral-200 px-3 py-3 text-neutral-500 text-sm flex items-center">
                            prwise.app/
                        </div>
                        <input
                            className="focus:outline-none bg-transparent text-neutral-400 text-sm flex-1 px-2 py-4"
                            placeholder="your-workspace"
                            value={workSpace_Url}
                            onChange={(e) => setworkSpace_Url(e.target.value)}
                            onBlur={() => setUrlTouched(true)}
                        />
                    </div>
                    {urlTouched && workSpace_Url.trim() === "" && (
                        <div className="text-red-500 text-xs mt-1">Required</div>
                    )}
                    <div className="mt-10 text-neutral-400 text-sm">
                        Workspace will be hosted in <span className="dark:text-white text-black">aisa</span>
                    </div>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="text-white h-12 rounded-md flex items-center justify-center w-[350px] text-center bg-[#5c4cd8] mt-5 text-sm hover:bg-[#8979ff] disabled:opacity-50 disabled:cursor-not-allowed"
            >Create workspace
            </button>
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
        >
            {[0, 1, 2, 3].map((index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.6 + (index * 0.1),
                        duration: 0.3,
                        type: "spring"
                    }}
                    className={`w-2 h-2 rounded-full ${index === 2 ? 'bg-[#5c4cd8]' : 'bg-neutral-300 dark:bg-neutral-400'
                        }`}
                />
            ))}
        </motion.div>
    </div>
}