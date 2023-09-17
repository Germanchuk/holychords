"use client";
import React from 'react'

export default function WhoAmIButton({
    whoAmIAction
}) {
    const [ name, setName ] = React.useState();
  return (
    <div>
        <button
            onClick={async () => {
                setName(await whoAmIAction());
            }}
        >
            Who am I?
        </button>
        {name && <div>{name}</div>}
    </div>
  )
}
