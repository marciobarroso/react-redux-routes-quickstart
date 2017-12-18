import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'

export default class MatchRoute extends Component {
    constructor(props){
        super(props)
        this.state = {
            layout: props.layout,
            component: props.component
        }
    }

    render() {
        console.log('MatchRoute')
        console.log(this.props)
        console.log(this.state)

        const Layout = this.state.layout
        const Component = this.state.component

        return <Route {...this.props} component={() => <Layout><Component /></Layout>} />
    }
}

MatchRoute.propTypes = {
    layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}