import React from 'react'

const MainLayout = (props) => (
    <div className='main-layout'>
        <div className='header'>
            <ul>
                <li>
                    <a href='/'>Home</a>
                </li>
                {isUser()}
                {isAdmin()}
                <li>
                    {signInOrOut()}
                </li>
            </ul>
        </div>
        <div className='content'>
            {props.children}
        </div>
        <div className='footer'>
            footer
        </div>
    </div>
)

const signInOrOut = () => {
    if( localStorage.getObject('user') && localStorage.getObject('user').authenticated ) {
        return <a href='/sign-out'>Sign-Out</a>
    } else {
        return <a href='/sign-in'>Sign-In</a>
    }
}

const isAdmin = () => {
    if( hasRole('admin') ) {
       return (
           <li>
               <a href='/admin'>Admin</a>
           </li>
       )
    }
}

const isUser = () => {
    if( hasRole('user') ) {
        return (
            <li>
                <a href='/user'>User</a>
            </li>
        )
    }
}

const hasRole = role => {
    const user = localStorage.getObject('user')
    return user && user.roles && user.roles.includes(role)
}

export default MainLayout
