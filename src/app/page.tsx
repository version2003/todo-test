import { SideBar } from "@/components/Side-bar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


export default async function Home(){
    const {userId} = await auth();
    if(userId !== null){
        redirect("/dashboard");
    }
    return(
        <div>
            <SignedOut >
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>

    )
}