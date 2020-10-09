import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tooltip, Menu } from 'antd'
import { randomNum, getAvatar } from 'src/util'
import { logOut as actionLogOut } from 'src/redux/actions/auth'
import s from './Header.less'

const { SubMenu } = Menu

const everySentence = [
    { e: 'Love is a touch and yet not a touch.——Jerome David Salinger', c: '爱是想要触碰又收回手。——塞林格' },
    {
        e:
            'If wrinkles must be written upon our brows, the only thing you can do is not letting them be written upon the heart.',
        c: '如果额头终将刻上皱纹，你只能做到，不让皱纹刻在你的心上。',
    },
    {
        e: 'Love is like a butterfly. It goes where it pleases and it pleases where it goes.',
        c: '爱情就像一只蝴蝶，它喜欢飞到哪里，就把欢乐带到哪里。',
    },
    {
        e: "If you're lonely when you're alone, you're in bad company",
        c: '独处时若感到孤独，说明你没把自己陪好。',
    },
    {
        e: 'Everything is good in its season. ',
        c: '万物逢时皆美好。',
    },
]

const sentence = everySentence[randomNum(everySentence.length)]

const Header = props => {
    const {
        auth: { account },
        logOut,
    } = props
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div>
            <Row gutter={6}>
                <Col span={16}>
                    <Tooltip placement="topLeft" title={sentence.e} overlayStyle={{ fontSize: 18 }}>
                        <h2 className="ellipsis pointer marginBottom5">{sentence.e}</h2>
                    </Tooltip>
                    <h4>{sentence.c}</h4>
                </Col>
                <Col span={8} className="layoutRow endCenter">
                    <Menu mode="horizontal" style={{ borderBottom: 0 }}>
                        <SubMenu
                            title={
                                <div className="layoutRow endCenter">
                                    <div className="marginRight10 pointer">{account.name}</div>
                                    <img className={s.avatar} src={getAvatar(account.avatar || '0.jpg')} alt="" />
                                </div>
                            }
                        >
                            <Menu.Item onClick={handleLogOut}>退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default connect(
    state => ({
        auth: state.auth,
    }),
    dispatch => ({
        logOut() {
            dispatch(actionLogOut())
        },
    }),
)(Header)
