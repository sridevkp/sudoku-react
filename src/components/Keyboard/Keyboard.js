import "./Keyboard.css"
import { useState } from "react"

const Keyboard = ({ left, onInput }) => {
    const [pencil,setPencil] = useState(false)

    // const handleInput = (no) => {
    //     console.log(no)
    // }

    return (
        <div className={"keyboard"+ (pencil? " pencil":"") }>
            {
                [...Array(9).keys()].map( i => {
                    const no = i + 1
                    return (
                        <button key={i} onClick={() => onInput(no)}>{ no }<span className="left">{left[i]}</span></button>
                    )
                })
            }
        </div>
    )
}

export default Keyboard