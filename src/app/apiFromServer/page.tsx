import React from 'react'
import { headers } from "next/headers"

export default async function page() {
    const resp = await fetch("http://localhost:3000/api/whoAmI", {
        method: "GET",
        headers: headers()
    }).then(res => res.json());
    return (
        <div>
            <h3>Info returned from api to Server:</h3>
            <h4>Name: {resp?.name}</h4>
        </div>
      );
}
