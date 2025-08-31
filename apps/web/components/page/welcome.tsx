"use client"
import { GitGraph } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

export const Welcome = () => {
    
    return <div className="dark:text-white dark:bg-black bg-white text-black h-screen w-full flex flex-col items-center justify-center">
        <div className="h-80 w-[400px] md:w-[500px] flex flex-col items-center justify-center">
            <motion.div
                initial={{ scale: 7, y: 300, rotate: 180, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
                className="bg-conic from-neutral-800 to-neutral-600 to-50% rounded-xl h-[80px] w-[100px] flex items-center justify-center shadow-2xl">
                <motion.div
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <GitGraph size={50} className="text-white" />
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl md:text-5xl mt-8 font-bold"
            >
                Welcome to PRwise
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center text-neutral-400 w-[350px] md:w-[450px] mt-6"
            >
                Automate your code reviews with PRWise. Get intelligent insights on pull requests and actionable suggestions.
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={"/onboarding/set-theme"} className="text-white h-12 rounded-md flex items-center justify-center w-[350px] text-center bg-[#5c4cd8] mt-5 text-sm hover:bg-[#8979ff] transition-colors duration-200">
                    Get started
                </Link>
            </motion.div>
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
                    className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#5c4cd8]' : 'bg-neutral-300 dark:bg-neutral-400'
                        }`}
                />
            ))}
        </motion.div>
        <div>
        </div>
    </div>
}