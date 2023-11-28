import { useState } from 'react'
import './Square.css'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen.js'

const Square = ({ index, fixed, handleChange, _val, invalid, highlight, inRange, onFocus }) => {
    var mobileDevice = useCheckMobileScreen()
    const [ marked, setMarked ] = useState([])

    return (
        <span className='container-square revealed'>
            <input
                className={"sudoko-square"+(fixed ? " fixed": "")+(invalid ? " warn" : "")+(highlight ? " highlight" : "")+(inRange ? " check" : "")} 
                value={ !_val ? "" : _val} 
                type='number' 
                min={1} max={9} step={1}
                onFocus={ e => { 
                    e.preventDefault()
                    if( !fixed ){e.target.select()} 
                    onFocus( index, e.target.value )
                }}
                onChange={ e => { 
                    handleChange( index, e.target.value )
                } }
                readOnly= {fixed || mobileDevice }
            ></input>
            { _val === null && <div className='pencil'>
                {
                    [...Array(9).keys()].map( i => {
                        const val = i + 1
                        return  <span key={i} style={{ opacity:(marked.includes(val) ? 1 : 0) }} >{ val }</span>
                    })
                }
            </div>}
        </span>
            )
            
}

export default Square