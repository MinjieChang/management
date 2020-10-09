import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Icon } from 'antd'
import { getAvatar, merge, sleep, enterKey } from 'src/util'

import s from './CommentInput.less'

const CommentInput = props => {
    const inputEl = useRef(null)
    const [showToolTip, setShowToolTip] = useState(false)
    const { commenter, handleCommentClick } = props
    const { name } = commenter
    const handleComment = () => {
        const inputVal = inputEl.current.value
        if (!inputVal) {
            setShowToolTip(true)
            return sleep(1000).then(() => setShowToolTip(false))
        }
        if (handleCommentClick) {
            inputEl.current.value = ''
            return handleCommentClick(inputVal)
        }
    }
    return (
        <div className={s.root}>
            <div>
                <div className="layoutRow startCenter marginBottom5">
                    <Tooltip title="评论内容不能为空，写点什么吧！" visible={showToolTip}>
                        <input
                            ref={inputEl}
                            onKeyPress={enterKey(handleComment)}
                            className={merge(['flex1', s.input])}
                            placeholder={`回复@${name}:`}
                        />
                    </Tooltip>
                </div>
                <div className="layoutRow startCenter">
                    <div style={{ fontSize: '16px' }}>
                        <Icon style={{ marginRight: '10px' }} type="smile" />
                        <Icon className="marginRight10" type="twitter" />
                        <Icon className="marginRight10" type="wechat" />
                    </div>
                    <div className="flex1 layoutRow endCenter">
                        <div onClick={handleComment} className={s.commentBtn}>
                            评论
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentInput.propTypes = {
    commenter: PropTypes.shape({ _id: PropTypes.string, avatar: PropTypes.string }).isRequired,
    handleCommentClick: PropTypes.func.isRequired,
}

export default CommentInput
