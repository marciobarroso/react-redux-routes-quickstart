import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'

export default class MatchRoute extends Component {
    constructor(props){
        super(props)

        const user = localStorage.getObject('user')

        this.state = {
            layout: props.layout,
            component: props.component,
            roles: props.roles,
            user: user,
            isAuthenticationNeeded: props.roles.length > 0,
            hasPermission: this.props.roles.filter(role => user.roles.includes(role)).length > 0
        }
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
