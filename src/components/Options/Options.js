import './Options.css'
import 'boxicons'

const Options = ({ pencil, onExit, onErase, onPencil, onQuickPencil, onHint }) => {
    return (
        <div className='options'>
            <span className='option-btn' onClick={ onExit }>
                <box-icon name='x' ></box-icon>
            </span>
            <span className='option-btn' onClick={ onErase }>
                <box-icon name='eraser' type='solid' ></box-icon>
            </span>
            <span className='option-btn' onClick={ onPencil }>
                {
                    pencil?<box-icon name='pencil' type='solid' ></box-icon>:<box-icon name='pencil' ></box-icon>
                }
                
            </span>
            <span className='option-btn premium' onClick={ onQuickPencil }>
                <box-icon name='edit-alt' type='solid' className="premium"></box-icon>
            </span>
            <span className='option-btn premium' onClick={ onHint }>
                <box-icon name='bulb' className="premium"></box-icon>
            </span>
        </div>
    )
}

export default Options