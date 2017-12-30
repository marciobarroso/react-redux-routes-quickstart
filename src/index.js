import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import axios from 'axios'

// redux stuffs
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import Home from './Containers/Home'
import Admin from './Containers/Admin'
import SignIn from './Containers/SignIn'
import MatchRoute from './Commons/MatchRoute'
import MainLayout from './Commons/Layouts/MainLayout'
import EmptyLayout from './Commons/Layouts/EmptyLayout'

const root = document.getElementById('root')

const reducers = combineReducers({
    form: formReducer
})

const store = createStore(reducers)

const signOut = () => {
    console.log('signOut')
    localStorage.clear()
    window.location = '/'
}

const routes = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <MatchRoute exact path='/' component={Home} layout={MainLayout} />
                <MatchRoute exact path='/admin' component={Admin} layout={EmptyLayout} roles={['admin']} />
                <MatchRoute exact path='/user' component={() => <div>User Profile</div>} layout={EmptyLayout} roles={['user']} />
                <Route exact path='/sign-in' component={SignIn} />
                <Route exact path='/sign-out' render={signOut} />
                <Route exact path='/403' component={() => <div>Access Denied. <a href='/sign-in'>Sign-In</a></div>} />
                <Route exact path='/404' component={() => <div>Page Not Found</div>} />
                <MatchRoute path='*' component={() => <div>Not Found</div>} layout={EmptyLayout} />
            </Switch>
        </BrowserRouter>
    </Provider>
)

if ( !Storage.prototype.setObject ) {
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
}

if ( !Storage.prototype.getObject ) {
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
}

axios.interceptors.request.use(config => {
    if( config && localStorage.token ) {
        config.headers = {
            Authorization: localStorage.token
        }
    }
    return config
})

ReactDOM.render(routes, root)
