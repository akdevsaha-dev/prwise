import { WorkSpaceSetup } from "@/components/page/spaceSetup";
import { getSession } from "@/useSession";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getSession()
     if(!session?.user.firstLogin){
        redirect("/dashboard")
     }
    return (
        <div>
            <WorkSpaceSetup email={session?.user.email} />
        </div>

    );
}
