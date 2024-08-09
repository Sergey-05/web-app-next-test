'use client';

import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useState } from "react";
import { Suspense } from "react";
import UserDashboard from "./ui/user-dashboard";

interface UserData{
    id: number,
    first_name?: string,
}

export default function Page(){

    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        if (WebApp.initDataUnsafe.user){
            setUserData(WebApp.initDataUnsafe.user as UserData)
        }
    }, [])

    return(
        <main className="p-4">
            {
                userData ?
                (
                    <>
            <Suspense fallback={<div>Loading user data...</div>}>
        <UserDashboard userId={userData.id} />
      </Suspense>

        </>
                ):
                (
                    <div>Loading...</div>
                )
            }
        </main>
    );
}