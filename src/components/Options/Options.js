import './Options.css'
import 'boxicons'

const Options = ({ pencil, onExit, onErase, onPencil, onQuickPencil, onHint }) => {
    return (
        <div className='options'>
            <span className='option-btn'>
                <box-icon name='x' ></box-icon>
            </span>
            <span className='option-btn'>
                <box-icon name='eraser' type='solid' ></box-icon>
            </span>
            <span className='option-btn'>
                {
                    pencil?<box-icon name='pencil' type='solid' ></box-icon>:<box-icon name='pencil' ></box-icon>
                }
                
            </span>
            <span className='option-btn premium'>
                <box-icon name='edit-alt' type='solid' className="premium"></box-icon>
            </span>
            <span className='option-btn premium'>
                <box-icon name='bulb' className="premium"></box-icon>
            </span>
        </div>
    )
}

export default Options