/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import cookieService from 'src/util/cookie'
import history from 'src/util/history'
import { isValidObject } from 'src/util'
import { getAccountInfo as actionGetAccountInfo } from 'src/redux/actions/auth'
import { AuthContext } from 'src/context'
import s from './Layout.less'
import Menu from './Menu'
import Header from './Header'

class AppLayout extends React.Component {
    componentDidMount() {
        const userId = cookieService.get()
        if (!userId) {
            return history.push('/auth')
        }
        // 这里主要是浏览器强制刷新的时候重新获取用户信息
        const {
            auth: { account },
            getAccountInfo,
        } = this.props
        if (!isValidObject(account)) {
            getAccountInfo(userId)
        }
        return ''
    }

    render() {
        const day = '日一二三四五六'.split('')
        const {
            auth: { account },
        } = this.props
        return (
            <div className={s.root}>
                <div className={s.menu}>
                    <div className={s.productName}>Hello 周{day[new Date().getDay()]}!</div>
                    <Menu />
                </div>
                <div className={s.content}>
                    <div className={s.contentHeader}>
                        <Header />
                    </div>
                    <div className={s.contentContainer}>
                        <AuthContext.Provider value={account}>
                            <div className={s.childContent}>{this.props.children}</div>
                        </AuthContext.Provider>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        auth: state.auth,
    }),
    dispatch => ({
        getAccountInfo(id) {
            dispatch(actionGetAccountInfo(id))
        },
    }),
)(AppLayout)
