import React from 'react'

export default function Button({classes, name}) {
    return (
        <div>
            <button className={`button ${classes}`}>{name}</button>
        </div>
    )
}
