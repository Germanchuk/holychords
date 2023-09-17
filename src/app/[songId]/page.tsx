import React from 'react'
import getParsedSong from "@/utils/parser"
import style from "./song.module.css"

export default async function page({
    params: {
        songId
    }
}) {
    const song = await getParsedSong(`https://holychords.pro/${songId}`);

    return (
        <div>
            {song.content.map(item => {
                return (
                    <div>
                        <h3>{item.title}</h3>
                        {item.content.map(item => {
                            return (
                                <div className={style[item.type]}>{item.content.toString()}</div>
                            );
                        })}
                    </div>
                )
            })}
        </div>
    )
}
