import React, {Component} from 'react'
import {Redirect} from 'react-router'
import axios from 'axios'
import SignInForm from '../../Components/SignInForm'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'initial'
        }
    }

    // this business rule will be provided by a backend service
    onSubmit(values) {
        axios.post('http://localhost:3000/auth', values)
            .then(result => {
                localStorage.setItem('token', result.data.token)
                this.setState({status: 'success'})
            }).catch(() => {
                localStorage.clear()
                this.setState({status: 'error'})
            })
    }

    render() {
        if (this.state.status === 'success')
            return <Redirect to='/'/>
        else
            return <SignInForm onSubmit={this.onSubmit.bind(this)}/>
    }
}