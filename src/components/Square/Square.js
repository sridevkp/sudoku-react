import { useState } from 'react'
import './Square.css'

const Square = ({ index, fixed, parent, _val, invalid, inFocus, inRange }) => {
    const [ val, setVal ] = useState( _val )
    
    return (<input 
                className={"sudoko-square"+(fixed ? " fixed": "")+(invalid ? " warn" : "")+(inFocus ? " focused" : "")+(inRange ? " check" : "")} 
                value={val} 
                type='number' 
                min={1} max={9} step={1}
                onFocus={ e => { 
                    if( !fixed ){e.target.select()} 
                    parent.focus( index, val)
                }}
                onChange={ e => { 
                    setVal( e.target.value )
                    parent.handleChange( index, e.target.value )
                 } }
                readOnly = {fixed}
            ></input>)
}

export default Square