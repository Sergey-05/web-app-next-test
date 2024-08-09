'use client';

import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useState } from "react";
import { Suspense } from "react";
import UserDashboard from "./ui/user-dashboard";

interface UserDataTg{
    id: number,
    first_name?: string,
}

export default function Page(){

    const [userData, setUserData] = useState<UserDataTg | null>(null)
    console.log("User Data:", userData); // Вывод userData в консоль

    useEffect(() => {
        if (WebApp.initDataUnsafe.user){
            setUserData(WebApp.initDataUnsafe.user as UserDataTg)
            console.log("User Data:", userData); // Вывод userData в консоль
        }
    }, [])

    return(
        <main className="p-4">
            <>
            <Suspense fallback={<div>Loading user data...</div>}>
                            {/* Приведение userData.id к bigint */}
                            <UserDashboard userId={BigInt(userData.id)} />
                        </Suspense>

        </>
        </main>
    );
}