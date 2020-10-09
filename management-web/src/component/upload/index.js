/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Upload, Modal, Icon, message } from 'antd'
import { server } from 'src/constants'
import { getCurrentApiOrigin } from 'src/util'

const origin = getCurrentApiOrigin()
const uploadUrl = `${origin}/api/community/uploadPic`
const imgTypes = ['image/png', 'image/jpeg']
const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
)

const MyUpload = props => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])
    const handlePreview = file => {
        setPreviewImage(file.url || file.thumbUrl)
        setPreviewVisible(true)
    }

    const beforeUpload = file => {
        const isJPG = imgTypes.includes(file.type)
        if (!isJPG) {
            message.error('只能上传图片！')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片不能大于2MB!')
        }
        return isJPG && isLt2M
    }

    const handleChange = ({ fileList: fl }) => {
        /**
         * 这一块快要被坑死了， 使用setFileList(fl) 无效，状态一直是uploading
         * 需要使用 fl.slice()返回一个新值， 交给Upload，Upload 认为两次 fileList 不一样，才会更新
         */
        setFileList(fl.slice())
    }

    useEffect(() => {
        const { onChange } = props
        // 每次修改fileList后，将fileList传出去
        onChange(fileList)
    }, [fileList])

    const handleCancel = () => setPreviewVisible(false)
    return (
        <div className="clearfix">
            <Upload
                action={uploadUrl}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                {fileList.length >= 9 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default MyUpload
