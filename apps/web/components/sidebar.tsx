"use client"

import { FileScan, GitBranch, LayoutDashboard, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const SideBar = () => {
    const params = useParams();
    const pathname = usePathname();
    const workspaceName = params.workspacename as string;
    const workspaceId = params.workspaceId as string;
    if (!workspaceId || !workspaceName) throw new Error("param missing");

    const items = [
        { label: "Dashboard", href: `/dashboard/${workspaceName}/${workspaceId}`, icon: LayoutDashboard },
        { label: "Connected Repos", href: `/repos/${workspaceName}/${workspaceId}`, icon: GitBranch },
        { label: "Reviews", href: `/reviews/${workspaceName}/${workspaceId}`, icon: FileScan },
        { label: "Billing", href: `/billing`, icon: Wallet },
        { label: "Settings", href: `/settings`, icon: Settings },
    ];

    return (
        <div className="h-screen bg-white/10 dark:bg-[#1f1e2742] backdrop-blur-md w-[330px]">
            <div className="mt-8 px-7 text-3xl font-semibold">Prwise</div>
            <div className="flex flex-col mt-8 space-y-3">
                {items.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`ml-6 mr-5 py-3 rounded-md border transition-colors ${isActive
                                ? "bg-[#614edd36] border-[#614edd51] text-black dark:text-[#7869dcfd] font-semibold"
                                : "bg-transparent border-transparent text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
                                }`}
                        >
                            <div className="pl-3 flex items-center gap-2">
                                {Icon && <Icon className="h-5 w-5" />}
                                {label}
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="">

            </div>
        </div>
    );
};