"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <button onClick={() => signOut()}>Sign out</button>
        )
    } else {
        return (
            <button onClick={() => signIn()}>Sign in</button>
        )
    }
}
