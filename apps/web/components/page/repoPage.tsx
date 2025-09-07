"use client"
import { useEffect } from "react";
import { useRepoStore } from "@/store/repoStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Dot, GitBranch, Plus } from "lucide-react";
import { SideBar } from "../sidebar";

export const RepoPage = () => {
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    if (!workspaceId) throw new Error("workspaceId param missing");

    const repos = useRepoStore((s) => s.repos);
    const totalRepos = useRepoStore((s) => s.totalRepos);
    const isFetchingRepos = useRepoStore((s) => s.isFetchingRepos);
    const getRepos = useRepoStore((s) => s.getRepos);

    useEffect(() => {
        getRepos({ workspaceId });
    }, [workspaceId, getRepos]);

    return (
        <div className="flex dark:bg-[#111015] bg-white">
            <SideBar />
            <div className="min-h-screen flex flex-col items-center justify-start w-full  text-black dark:text-white ">
                <div className="w-[90%] mt-10 flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-semibold">Connected Repositories</h1>
                        <p className="mt-2 text-sm dark:text-neutral-500 text-neutral-600">
                            Manage your GitHub repositories and review settings.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-end items-center">
                        <Link
                            href={`https://github.com/settings/installations/YOUR_APP_ID`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex bg-purple-600 gap-2 text-sm font-semibold justify-center items-center h-12 min-w-[11rem] rounded-md px-4"
                        >
                            <Plus size={20} />
                            Add repositories
                        </Link>
                    </div>
                </div>

                <div className="mt-10 w-[90%] bg-[#131217]">
                    <div className="px-6 py-6 border border-neutral-800 border-b-0 rounded-t-2xl">
                        <h2 className="text-lg font-semibold">Your repositories</h2>
                        <div className="mt-2 text-sm dark:text-neutral-400 text-neutral-500">
                            {isFetchingRepos ? (
                                <div className="flex gap-2 animate-pulse">
                                    <div className="bg-neutral-600 h-3 rounded w-6"></div>
                                    <div className="bg-neutral-600 h-3 rounded w-10"></div>
                                    <div className="bg-neutral-600 h-3 rounded w-40"></div>
                                </div>
                            ) : (
                                <div>{totalRepos} repositories connected</div>
                            )}
                        </div>
                    </div>

                    <div
                        className="max-h-[400px] overflow-y-auto scroll-smooth border border-neutral-800 border-t-0 rounded-b-2xl divide-y divide-neutral-800">
                        {isFetchingRepos
                            ? Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="py-6 px-7">
                                        <div className="h-6 w-40 bg-neutral-700 animate-pulse rounded mb-2" />
                                        <div className="h-4 w-64 bg-neutral-800 animate-pulse rounded" />
                                    </div>
                                ))
                            : repos.map((r) => (
                                <Link
                                    href={r.url}
                                    key={r.id}
                                    className="py-4 px-7 flex items-center justify-between hover:bg-[white]/4 transition-colors focus:outline-none"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-md bg-[#211c3c]">
                                            <GitBranch className="text-[#624EDD]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white">{r.name}</h3>
                                            <div className="text-sm text-neutral-500">{r.fullName}</div>
                                            <div className="px-2 w-fit text-xs font-semibold rounded-md border mt-1">
                                                {r.language ?? "Unknown"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm font-semibold flex items-center">
                                        {r.private ? (
                                            <div className="flex items-center gap-1 pr-3 border-2 border-[#574721] bg-[#3A311C] rounded-md">
                                                <Dot /> Private
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 pr-3 border-2 border-[#254a41] bg-[#1F322D] rounded-md">
                                                <Dot /> Public
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};