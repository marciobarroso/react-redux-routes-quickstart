import React from 'react'
import {Field, reduxForm} from 'redux-form'

const SignInForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <Field name="username" type="text" component="input" placeholder="username"/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <Field name="password" type="password" component="input" placeholder="password"/>
            </div>
            <div>
                <button type="submit">OK</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'sign-in'
})(SignInForm)
