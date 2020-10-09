import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from 'src/pages/Auth/Login'
import Register from 'src/pages/Auth/Register'

const AuthLayout = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/login`} component={Login} />
            <Route exact path={`${match.url}/register`} component={Register} />
            <Redirect to={`${match.url}/login`} />
        </Switch>
    )
}

export default AuthLayout
