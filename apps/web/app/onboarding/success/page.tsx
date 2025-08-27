import { Success } from "@/components/page/success";
import { getSession } from "@/useSession";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function page(req:NextRequest) {
    const session = await getSession()
    if(!session?.user.firstLogin){
       redirect("/dashboard")
    }
    return <div>
        <Success/>
    </div>
    
}