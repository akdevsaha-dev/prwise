import { axiosInstance } from "@/axios/axiosInstance"
import toast from "react-hot-toast"
import { create } from "zustand"

type repo = {
    id: number,
    name: string,
    fullName: string,
    private: boolean,
    url: string,
    language: string | null,
    issueCount: number
}

type repoStore = {
    totalRepos: number,
    isFetchingRepos: boolean
    repos: repo[],
    getRepos: (data: { workspaceId: string }) => void
}

export const useRepoStore = create<repoStore>((set) => ({
    totalRepos: 0,
    repos: [],
    isFetchingRepos: false,

    getRepos: async ({ workspaceId }) => {
        set({ isFetchingRepos: true, repos: [] })
        try {
            const res = await axiosInstance.get<{ totalRepos: number; repos: repo[] }>(`/v1/repositories/${workspaceId}`)
            set({ repos: res.data.repos, totalRepos: res.data.totalRepos })
        } catch (error) {
            console.error("Error fetching repos", error)
            toast.error("Failed to fetch repositories!")
        } finally {
            set({ isFetchingRepos: false })
        }
    }
}))