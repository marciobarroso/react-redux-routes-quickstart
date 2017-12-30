import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

export default class MatchRoute extends Component {
    constructor(props){
        super(props)

        this.state = {
            layout: props.layout,
            component: props.component,
            roles: props.roles,
            user: undefined,
            isAuthenticationNeeded: props.roles.length > 0,
            hasPermission: false
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3000/auth')
            .then(result => {
                const user = result.data
                localStorage.setObject('user', user)
                const hasPermission = this.state.roles.filter(role => user.roles.includes(role)).length > 0
                this.setState({
                    ...this.state,
                    user: user,
                    hasPermission: hasPermission
                })
            }).catch(error => {
                console.log('error ' + error)
            })
    }

    render() {
        if( this.state.isAuthenticationNeeded ) {
            if( this.state.hasPermission ) {
                const Layout = this.state.layout
                const Component = this.state.component
                return <Route {...this.props} component={() => <Layout><Component /></Layout>} />
            } else {
                return <Redirect to='/403' />
            }
        } else {
            const Layout = this.state.layout
            const Component = this.state.component
            return <Route {...this.props} component={() => <Layout><Component /></Layout>} />
        }
    }
}

MatchRoute.propTypes = {
    layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    roles: PropTypes.arrayOf(PropTypes.string)
}

MatchRoute.defaultProps = {
    roles: []
}
