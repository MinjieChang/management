/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { getAvatar, timeDiffBefore } from 'src/util'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import CommentInput from './CommentInput'
import s from './PerComment.less'

const PerComment = props => {
    const [showCommentInput, setShowCommentInput] = useState(false)
    const {
        comment: { commenter, content, createdAt },
    } = props
    const { avatar, name } = commenter
    const replyClicked = () => {
        setShowCommentInput(!showCommentInput)
    }

    const handleCommentClick = val => {
        const { replyComment, comment } = props
        const { commenterId } = comment
        if (replyComment) {
            replyComment({ comment, replyContent: val, beReplierId: commenterId })
        }
    }
    const handleFavorClick = () => {
        console.log('点了赞')
    }
    return (
        <div className="layoutRow startStart paddingBottom5 marginBottom5" style={{ borderBottom: '0.6px solid #ddd' }}>
            <img className={s.commentAvatar} src={getAvatar(avatar)} alt="" />
            <div className="flex1 layoutColumn startStart">
                <div className="fontSize12">
                    <span style={{ color: '#eb7350' }}>{name}</span>
                    <span style={{ lineHeight: '20px', color: '#333' }}>: {content}</span>
                </div>
                <div className="layoutRow startCenter" style={{ fontSize: '12px', color: '#808080', width: '100%' }}>
                    <div>{timeDiffBefore(new Date(), createdAt)}</div>
                    <div className="flex1 layoutRow endCenter pointer">
                        <div onClick={replyClicked}>回复</div>
                        <div className="divider" style={{ backgroundColor: '#d9d9d9', height: '12px' }} />
                        <div onClick={handleFavorClick} className={s.perItem}>
                            <Icon type="like" theme="filled" />
                            <span>{77}</span>
                        </div>
                    </div>
                </div>
                {showCommentInput && <CommentInput commenter={commenter} handleCommentClick={handleCommentClick} />}
            </div>
        </div>
    )
}
PerComment.propTypes = {
    replyComment: PropTypes.func.isRequired,
}

export default PerComment
