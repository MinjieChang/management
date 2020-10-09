/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Modal, Icon, Row, Col, Dropdown, Menu } from 'antd'
import { getAvatar, getTalkImage, merge } from 'src/util'
import Comment from './comment'
import s from './index.less'

const Talk = props => {
    const [visible, setVisible] = useState(false)
    const [curImage, setCurImage] = useState('')
    const [createDate, setCreateDate] = useState({})
    const [showComments, setShowComments] = useState(false)
    const { talk, comments, handleDelete, handleCollect, handleStar, handleComment, account, getTalkComments } = props
    const {
        author: { avatar, email, name, _id: authorId },
        pathArr = [],
        text,
        pv,
        createdAt,
        _id: talkId,
        liked,
        collected,
        likedAmount,
        commentsAmount,
    } = talk
    useEffect(() => {
        const date = new Date(createdAt)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        setCreateDate({ month, day, hour, minute })
    }, [createdAt])
    const imageClick = path => {
        setCurImage(path)
        setVisible(true)
    }
    const onDelete = () => {
        handleDelete(authorId, talkId, pathArr)
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={onDelete} style={{ width: 100 }}>
                删除之
            </Menu.Item>
        </Menu>
    )
    // 点击评论
    const onCommentClick = () => {
        setShowComments(!showComments)
        if (!showComments) {
            getTalkComments(talkId)
        }
    }
    // 回复评论
    const replyComment = value => {
        const { replyComment: actionReplyComment } = props
        const { comment, replyContent, beReplierId } = value
        const { _id: commentId } = comment
        const { _id: accountId } = account
        /**
         * replyContent: 回复的评论的内容
         * commentId: 哪条评论
         * accountId：当前账号，也是回复人
         * beReplierId: 被回复人，可能是评论人，也可能是回复人
         * talkId: 哪条说说
         */
        if (actionReplyComment) {
            actionReplyComment({ talkId, commentId, accountId, replyContent, beReplierId })
        }
    }

    const { month, day, hour, minute } = createDate
    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.avatarBox}>
                    <img alt="" className={s.avatar} src={getAvatar(avatar)} />
                </div>
                <div className={s.content}>
                    <div className={s.header}>
                        <div className="marginBottom5">{name}</div>
                        <div>
                            {month}月{day}日 {hour}:{minute} 来自iphone
                        </div>
                        <div className={s.more}>
                            <Dropdown overlay={menu} placement="bottomRight">
                                <Icon type="more" className="pointer" />
                            </Dropdown>
                        </div>
                    </div>
                    <div className={s.text}>{text}</div>
                    <div className={s.images}>
                        {pathArr.map(path => (
                            <img
                                className={s.image}
                                key={path}
                                alt=""
                                src={getTalkImage(path)}
                                onClick={() => imageClick(path)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="horizon" />
            <Row className={s.footer}>
                <Col span={8} className={s.perItem} onClick={() => handleCollect({ talkId, status: !collected })}>
                    <Icon type="star" theme={collected ? 'filled' : ''} />
                    <span>{collected ? '已收藏' : '收藏'}</span>
                </Col>
                <Col span={1} className="divider" style={{ backgroundColor: '#eee', height: '16px' }} />
                <Col span={8} className={s.perItem} onClick={() => onCommentClick()}>
                    <Icon type="message" />
                    <span>{comments.length || commentsAmount}</span>
                </Col>
                <Col span={1} className="divider" style={{ backgroundColor: '#eee', height: '16px' }} />
                <Col span={8} className={s.perItem} onClick={() => handleStar({ talkId, status: !liked })}>
                    <Icon type="like" theme={liked ? 'filled' : ''} />
                    <span>{likedAmount}</span>
                </Col>
            </Row>
            {!!showComments && (
                <Comment
                    account={account}
                    talk={talk}
                    comments={comments}
                    submitComment={handleComment}
                    replyComment={replyComment}
                />
            )}
            <Modal title="预览" visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
                <div className="layoutColumn startStart">
                    <img className={s.previewImg} src={getTalkImage(curImage)} alt="" />
                    <div className={s.modalNavi}>
                        {pathArr.map(path => (
                            <div key={path} className="positionRelative">
                                <img className={s.naviImage} alt="" src={getTalkImage(path)} />
                                <span
                                    onClick={() => setCurImage(path)}
                                    className={s.mask}
                                    style={{ opacity: curImage === path ? 0 : 0.7 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

Talk.propTypes = {
    talk: PropTypes.shape({
        author: PropTypes.any,
        pathArr: PropTypes.arrayOf(PropTypes.string),
        text: PropTypes.string,
        pv: PropTypes.number,
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCollect: PropTypes.func.isRequired,
    handleStar: PropTypes.func.isRequired,
    handleComment: PropTypes.func.isRequired,
    getTalkComments: PropTypes.func.isRequired,
    replyComment: PropTypes.func.isRequired,
    account: PropTypes.shape({ avatar: PropTypes.string, _id: PropTypes.string }).isRequired,
}

export default Talk
