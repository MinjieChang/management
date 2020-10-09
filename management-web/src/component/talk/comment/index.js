import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { getAvatar, merge, sleep, enterKey } from 'src/util'
import PerComment from 'src/component/talk/comment/include/PerComment'

import s from './index.less'

const Comment = props => {
    const inputEl = useRef(null)
    const [showToolTip, setShowToolTip] = useState(false)
    const { account, talk, submitComment, comments } = props
    const { _id: accountId, avatar } = account
    const { _id: talkId } = talk
    // 点击评论，展开/折起评论
    const handleComment = () => {
        const inputVal = inputEl.current.value
        if (!inputVal) {
            setShowToolTip(true)
            return sleep(1000).then(() => setShowToolTip(false))
        }
        const payload = {
            commenterId: accountId,
            talkId,
            content: inputVal,
        }
        if (submitComment) {
            inputEl.current.value = ''
            return submitComment(payload)
        }
    }
    // 回复评论
    const replyComment = val => {
        const { replyComment: actionReplyComment } = props
        if (actionReplyComment) actionReplyComment(val)
    }
    return (
        <div className={s.root}>
            <div className="marginBottom5">
                <div className="layoutRow startCenter marginBottom5">
                    <img className={s.commentAvatar} src={getAvatar(avatar)} alt="" />
                    <Tooltip title="评论内容不能为空，写点什么吧！" visible={showToolTip}>
                        <input
                            ref={inputEl}
                            onKeyPress={enterKey(handleComment)}
                            className={merge(['flex1', s.input])}
                        />
                    </Tooltip>
                </div>
                <div className="layoutRow endCenter">
                    <div onClick={handleComment} className={s.commentBtn}>
                        评论
                    </div>
                </div>
            </div>
            <div className={s.comments}>
                {comments &&
                    !!comments.length &&
                    comments.map(comment => (
                        <PerComment replyComment={replyComment} key={comment._id} comment={comment} />
                    ))}
            </div>
        </div>
    )
}

Comment.propTypes = {
    account: PropTypes.shape({ _id: PropTypes.string, avatar: PropTypes.string }).isRequired,
    talk: PropTypes.shape({ _id: PropTypes.string }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitComment: PropTypes.func.isRequired,
    replyComment: PropTypes.func.isRequired,
}

export default Comment
