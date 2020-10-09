/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Input, Form, Checkbox, AutoComplete, Select } from 'antd'
import { register as actionRegister } from 'src/redux/actions/auth'
import s from './Styles.less'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const Login = props => {
    // useEffect(() => {
    //     props.getStaffs()
    // }, [])
    const [confirmDirty, setConfirmDirty] = useState(false)
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    const {
        form: { getFieldDecorator, validateFields },
        form,
        register,
    } = props
    const handleSubmit = e => {
        e.preventDefault()
        validateFields((err, values) => {
            if (!err) {
                register(values)
            }
        })
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    }
    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
    })(
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>,
    )
    const validateToNextPassword = (rule, value, callback) => {
        // const form = this.props.form
        if (value && confirmDirty) {
            validateFields(['confirm'], { force: true })
        }
        if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}$/.test(value)) {
            callback('密码需包含字母、数字, 至少8位')
        }
        callback()
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一样!')
        }
        callback()
    }

    const handleConfirmBlur = e => {
        const { value } = e.target
        setConfirmDirty(confirmDirty || !!value)
    }

    const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))

    const handleWebsiteChange = value => {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
        }
        setAutoCompleteResult(autoCompleteResult)
    }

    return (
        <div className="layoutRow centerCenter inheritHeight">
            <Form {...formItemLayout} onSubmit={handleSubmit} className={s.registerForm}>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确 E-mail!',
                            },
                            {
                                required: true,
                                message: '请输入 E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                validator: validateToNextPassword,
                            },
                        ],
                    })(<Input type="password" />)}
                </Form.Item>
                <Form.Item label="确认密码">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请确认密码!',
                            },
                            {
                                validator: compareToFirstPassword,
                            },
                        ],
                    })(<Input type="password" onBlur={handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('nickname', {
                        rules: [{ required: false }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: false, message: '请输入手机号!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="网址">
                    {getFieldDecorator('website', {
                        rules: [{ required: false, message: '网站!' }],
                    })(
                        <AutoComplete dataSource={websiteOptions} onChange={handleWebsiteChange} placeholder="website">
                            <Input />
                        </AutoComplete>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(<Checkbox>自动登陆 (3天)</Checkbox>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className={s.loginFormButton}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default compose(
    connect(
        null,
        dispatch => ({
            register(value) {
                return dispatch(actionRegister(value))
            },
        }),
    ),
    Form.create({ name: 'register' }),
)(Login)
