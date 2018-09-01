import React from 'react'

const Action = (props) => {
    return (
        <div>
            <button
                disabled={!props.hasOptions}
                onClick={props.handlePick}>
                What Should I Do?
                </button>
        </div>
    )
}


export default Action