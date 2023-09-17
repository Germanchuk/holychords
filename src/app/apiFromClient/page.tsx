"use client";
import React from 'react'

export default function page() {
    const [ name, setName ] = React.useState();

    React.useEffect(() => {
        fetch("/api/whoAmI")
        .then(res => res.json())
        .then(data => setName(data.name));
    })

  return (
    <div>
        <h3>Info returned from api to client:</h3>
        <h4>Name: {name}</h4>
    </div>
  );
}
