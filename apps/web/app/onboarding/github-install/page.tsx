import { GithubAuth } from "@/components/page/githubAuth";
import { getSession } from "@/useSession";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getSession()
    if(!session?.user.firstLogin){
       redirect("/dashboard")
    }
    return (
        <div>
            <GithubAuth />
        </div>

    );
}
