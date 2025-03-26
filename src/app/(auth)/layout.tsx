import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const {userId} = await auth();

    if(userId !== null){
        redirect("/");
    }

    return <div className="flex items-center justify-center h-screen" >
        {children}
    </div>;
}
