import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch} from 'react-router-dom'

import Home from './Containers/Home'
import SignIn from './Containers/SignIn'
import MatchRoute from './Commons/MatchRoute'
import MainLayout from './Commons/Layouts/MainLayout'
import EmptyLayout from './Commons/Layouts/EmptyLayout'

const root = document.getElementById('root')

const routes = (
    <BrowserRouter>
        <Switch>
            <MatchRoute exact path='/' component={Home} layout={MainLayout} />
            <MatchRoute exact path='/sign-in' component={SignIn} layout={EmptyLayout} />
            <MatchRoute exact path='/403' component={() => <div>Access Denied</div>} layout={EmptyLayout} />
            <MatchRoute exact path='/404' component={() => <div>Page Not Found</div>} layout={EmptyLayout} />
            <MatchRoute path='*' component={() => <div>Not Found</div>} layout={EmptyLayout} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(routes, root)