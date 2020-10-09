import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import getRouter from 'router/router1/router'
import getRouter from 'router/router2'
import { Provider } from 'react-redux'
// import 'antd/dist/antd.css'
// 作为全局样式
import './less/app.css'
import store from './redux/store'

/* 初始化 */
renderWithHotReload(getRouter())

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>{RootElement}</Provider>
        </AppContainer>,
        document.getElementById('app'),
    )
}

/* 热更新 */
if (module.hot) {
    module.hot.accept('./router/router2', () => {
        const getRouter = require('./router/router2').default
        renderWithHotReload(getRouter())
    })
}
