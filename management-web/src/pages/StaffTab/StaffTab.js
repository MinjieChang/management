import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Table, Button, Modal, Row, Col, Input, Form, Tooltip, Icon, Popconfirm } from 'antd'

import { withSpin } from 'src/hoc'
import {
    namespace,
    getStaffs as actionGetStaffs,
    addStaff as actionAddStaff,
    deleteStaff as actionDeleteStaff,
    getStaffInfo as actionGetStaffInfo,
    editStaff as actionEditStaff,
    batchDeleteStaffs as actionBatchDeleteStaffs,
} from 'src/redux/actions/staff'
import s from './StaffTab.less'

class StaffTab extends React.Component {
    static propTypes = {
        getStaffs: PropTypes.func.isRequired,
        addStaff: PropTypes.func.isRequired,
        editStaff: PropTypes.func.isRequired,
        deleteStaff: PropTypes.func.isRequired,
        getStaffInfo: PropTypes.func.isRequired,
        batchDeleteStaffs: PropTypes.func.isRequired,
        staffInfo: PropTypes.shape({}).isRequired,
        staffs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        form: PropTypes.shape({ getFieldDecorator: PropTypes.func.isRequired }).isRequired,
    }

    static defaultProps = {}

    state = { visible: false, confirmLoading: false, id: '', selectedRows: [], selectedRowKeys: [] }

    columns = [
        { key: 'name', dataIndex: 'name', title: '姓名', width: 80, fixed: 'left' },
        { key: 'age', dataIndex: 'age', title: '年龄', width: 80, fixed: 'left' },
        { key: 'sex', dataIndex: 'sex', title: '性别' },
        { key: 'phone', dataIndex: 'phone', title: '电话' },
        { key: 'birth', dataIndex: 'birth', title: '生日' },
        { key: 'address', dataIndex: 'address', title: '居住地址' },
        {
            key: 'department',
            dataIndex: 'department',
            title: '部门',
            width: '60px',
        },
        { key: 'email', dataIndex: 'email', title: '邮箱' },
        { key: 'hireDate', dataIndex: 'hireDate', title: '入职日期' },
        {
            key: 'operation',
            dataIndex: 'operation',
            title: '操作',
            width: 100,
            fixed: 'right',
            render: (text, { _id }) => (
                <span>
                    <Popconfirm
                        title="确定删除？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => this.props.deleteStaff({ id: _id })}
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    >
                        <Icon type="delete" />
                    </Popconfirm>
                    <span className="divider" />
                    <span className="pointer" onClick={() => this.editStaff(_id)}>
                        <Tooltip title="编辑">
                            <Icon type="edit" />
                        </Tooltip>
                    </span>
                </span>
            ),
        },
    ]

    componentDidMount() {
        const { getStaffs } = this.props
        getStaffs()
    }

    handleAddClick = () => {
        const { form } = this.props
        form.resetFields()
        this.setState({ visible: true, id: '' })
    }

    editStaff = async id => {
        const { getStaffInfo } = this.props
        await getStaffInfo({ id })
        this.setState({ visible: true, id })
    }

    onSubmit = e => {
        e.preventDefault()
        const {
            form: { validateFields },
            addStaff,
            editStaff,
        } = this.props
        const { id } = this.state
        validateFields(async (err, values) => {
            if (err) return
            this.setState({ confirmLoading: true })
            let result
            if (id) {
                result = await editStaff({ id, values })
            } else {
                result = await addStaff(values)
            }
            if (result) {
                this.setState({ confirmLoading: false, visible: false })
            }
        })
    }

    getFields = () => {
        const {
            form: { getFieldDecorator },
        } = this.props
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        return this.columns.map(({ key, title }) => {
            return (
                key !== 'operation' && (
                    <Col span={12} key={key}>
                        <Form.Item label={title} {...formItemLayout}>
                            {getFieldDecorator(key, {
                                rules: [
                                    {
                                        required: true,
                                        message: `请输入${title}`,
                                    },
                                ],
                            })(<Input placeholder={`请输入${title}`} />)}
                        </Form.Item>
                    </Col>
                )
            )
        })
    }

    handleBatchDeleteClick = async () => {
        const { selectedRowKeys } = this.state
        const { batchDeleteStaffs } = this.props
        const self = this
        Modal.confirm({
            title: '确定删除这些员工吗?',
            content: '删除后无法恢复！！',
            onOk() {
                batchDeleteStaffs({ staffIds: selectedRowKeys }).then(({ done }) => {
                    if (done) {
                        self.setState({ selectedRows: [] })
                    }
                })
            },
        })
    }

    render() {
        const { staffs } = this.props
        const { visible, confirmLoading, selectedRows } = this.state
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows })
            },
        }
        return (
            <div className={s.root}>
                <Button className="mb10 mr20" type="primary" onClick={this.handleAddClick}>
                    添加
                </Button>
                {!!selectedRows.length && (
                    <Button className="mb10" type="danger" onClick={this.handleBatchDeleteClick}>
                        删除
                    </Button>
                )}
                <div>
                    <Table
                        dataSource={staffs}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        rowKey={record => record._id}
                        scroll={{ x: 1200 }}
                    />
                </div>
                <Modal
                    title="添加员工"
                    width="600px"
                    visible={visible}
                    onOk={this.onSubmit}
                    onCancel={() => this.setState({ visible: false })}
                    confirmLoading={confirmLoading}
                >
                    <Form onSubmit={this.onSubmit}>
                        <Row gutter={24}>{this.getFields()}</Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const columns = [
    { key: 'name' },
    { key: 'age' },
    { key: 'sex' },
    { key: 'phone' },
    { key: 'birth' },
    { key: 'address' },
    { key: 'department' },
    { key: 'email' },
    { key: 'hireDate' },
]

const mapPropsToFields = ({ staffInfo }) =>
    columns.reduce((a, { key }) => {
        a[key] = Form.createFormField({ value: staffInfo[key] })
        return a
    }, {})

export default compose(
    connect(
        state => ({
            loading: state.loading,
            staffs: state.staff.staffs,
            staffInfo: state.staff.staffInfo,
        }),
        dispatch => ({
            getStaffs() {
                return dispatch(actionGetStaffs())
            },
            addStaff(value) {
                return dispatch(actionAddStaff(value))
            },
            deleteStaff(value) {
                return dispatch(actionDeleteStaff(value))
            },
            getStaffInfo(value) {
                return dispatch(actionGetStaffInfo(value))
            },
            editStaff(value) {
                return dispatch(actionEditStaff(value))
            },
            batchDeleteStaffs(value) {
                return dispatch(actionBatchDeleteStaffs(value))
            },
        }),
    ),
    Form.create({ name: 'addStaff', mapPropsToFields }),
    withSpin(({ loading }) => loading[namespace]),
)(StaffTab)
