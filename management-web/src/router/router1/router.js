import React from 'react'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// 这种动态加载比较麻烦的就是这种写法
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home'
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1'
import Counter from 'bundle-loader?lazy&name=page1!pages/Counter/Counter'
import UserInfo from 'bundle-loader?lazy&name=page1!pages/UserInfo/UserInfo'
import Bundle from './Bundle'

const Loading = function() {
    return <div>Loading...</div>
}

const createComponent = component => props => (
    <Bundle load={component}>{Component => (Component ? <Component {...props} /> : <Loading />)}</Bundle>
)

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">首页3333</Link>
                </li>
                <li>
                    <Link to="/page1">Page</Link>
                </li>
                <li>
                    <Link to="/counter">counter</Link>
                </li>
                <li>
                    <Link to="/userInfo">userInfo</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={createComponent(Home)} />
                <Route path="/page1" component={createComponent(Page1)} />
                <Route path="/counter" component={createComponent(Counter)} />
                <Route path="/userInfo" component={createComponent(UserInfo)} />
            </Switch>
        </div>
    </Router>
)

export default getRouter
