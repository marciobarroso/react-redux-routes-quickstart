import React, {Component} from 'react'
import {Redirect} from 'react-router'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.handleOnChangeEventFromFields = this.handleOnChangeEventFromFields.bind(this)
        this.handleOnSubmitFormEvent = this.handleOnSubmitFormEvent.bind(this)
    }

    handleOnChangeEventFromFields(event) {
        let currentState = {...this.state}
        currentState[event.target.name] = event.target.value
        this.setState(currentState)
    }

    handleOnSubmitFormEvent() {
        console.log('on Submit')

        // hardcoded just for test
        const username = 'marcio'
        const password = '123456'

        if( this.state.username === username && this.state.password === password ) {
            console.log('setting auth data')
            localStorage.setItem('username', username)
            localStorage.setItem('authenticated', true)
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div className='sign-in'>
                <div className='form-title'>
                    Register
                </div>
                <div className='form-container'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' onChange={this.handleOnChangeEventFromFields} />
                </div>
                <div className='form-container'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={this.handleOnChangeEventFromFields} />
                </div>
                <div className='form-container'>
                    <button onClick={this.handleOnSubmitFormEvent}>Register</button>
                </div>
            </div>
        )
    }
}