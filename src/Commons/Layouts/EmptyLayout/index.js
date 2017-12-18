import React from 'react'

const EmptyLayout = (props) => (
    <div className='main-layout'>
        <div className='content'>
            {props.children}
        </div>
    </div>
)

export default EmptyLayout