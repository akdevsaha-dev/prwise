import { RepoPage } from "@/components/page/repoPage";
import { getSession } from "@/useSession"
import { redirect} from "next/navigation"

export default async function page() {
    const session = await getSession()
    if (!session?.user) {
        redirect("/signin")
    }

    return <div>
        <RepoPage />
    </div>
}
