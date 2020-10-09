import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import browserHistory from 'src/util/history'

// const Layout = AsyncComponent(() => import('src/pages/Layout/Layout'))
// const StaffTab = AsyncComponent(() => import('src/pages/StaffTab/StaffTab'))
// const Community = AsyncComponent(() => import('src/pages/Community/Community'))
// const Register = AsyncComponent(() => import('src/pages/Register/Register'))

import Layout from 'src/pages/Layout/Layout'
import StaffTab from 'src/pages/StaffTab/StaffTab'
import CommunityLayout from 'src/pages/Community/Layout'
import AuthLayout from 'src/pages/Auth/AuthLayout'

// 动态加载组件，目前和热更新合作不了，为了开发体验，先暂时不用动态加载， 打包的时候可以再改为动态加载
import AsyncComponent from './AsyncComponent'

const PageLayout = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/staff" component={StaffTab} />
                <Route path="/community" component={CommunityLayout} />
                <Redirect to="/staff" />
            </Switch>
        </Layout>
    )
}

const getRouter = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route path="/auth" component={AuthLayout} />
            <Route path="/" component={PageLayout} />
            <Redirect to="/" />
        </Switch>
    </Router>
)

export default getRouter
