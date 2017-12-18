import React from 'react'

const MainLayout = (props) => (
    <div className='main-layout'>
        <div className='header'>
            header
        </div>
        <div className='content'>
            {props.children}
        </div>
        <div className='footer'>
            footer
        </div>
    </div>
)

export default MainLayout