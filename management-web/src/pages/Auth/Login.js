/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Input, Form, Icon, Checkbox } from 'antd'
import { login as actionLogin } from 'src/redux/actions/auth'
import s from './Styles.less'

const Login = props => {
    // useEffect(() => {
    //     props.getStaffs()
    // }, [])
    const {
        form: { getFieldDecorator, validateFields },
        login,
    } = props
    const handleSubmit = e => {
        e.preventDefault()
        validateFields((err, values) => {
            if (!err) {
                login(values)
            }
        })
    }
    return (
        <div className="layoutRow centerCenter inheritHeight">
            <Form onSubmit={handleSubmit} className={s.loginForm}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入邮箱!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入邮箱"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住此账号(3天有效)</Checkbox>)}
                    <Button type="primary" htmlType="submit" className={s.loginFormButton}>
                        登陆
                    </Button>
                    <Link to="/auth/register">注册账号!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default compose(
    connect(
        null,
        dispatch => ({
            login(value) {
                return dispatch(actionLogin(value))
            },
        }),
    ),
    Form.create({ name: 'login' }),
)(Login)
