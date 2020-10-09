/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import { Talk } from 'src/component'
import {
    deleteTalk as actionDeleteTalk,
    collectTalk as actionCollectTalk,
    likeTalk as actionLikeTalk,
    commentTalk as actionCommentTalk,
    getTalkCommentsById as actionGetTalkCommentsById,
    replyComment as actionReplyComment,
} from 'src/redux/actions/community'
import s from 'src/pages/Community/Community.less'

const Talks = props => {
    const {
        talks,
        comments,
        account: { _id: accountId, isVip },
        deleteTalk,
        collectTalk,
        likeTalk,
        commentTalk,
        replyComment,
        getTalkCommentsById,
    } = props
    const handleDelete = (authorId, talkId, pathArr) => {
        if (isVip || authorId === accountId) return deleteTalk({ id: talkId, pathArr })
        return message.error('你无权限删除此微博！')
    }
    // 收藏
    const handleCollect = ({ talkId, status }) => collectTalk({ talkId, status, accountId })
    // 点赞
    const handleStar = ({ talkId, status }) => likeTalk({ talkId, status, accountId })
    // 评论
    const handleComment = ({ talkId, content, commenterId }) => commentTalk({ talkId, content, commenterId })
    // 获取评论
    const getTalkComments = talkId => getTalkCommentsById({ talkId })
    // 回复评论
    const replyCommentLocal = ({ talkId, commentId, replyContent, beReplierId }) =>
        replyComment({ talkId, commentId, accountId, replyContent, beReplierId })

    const talkProps = {
        handleDelete,
        handleCollect,
        handleStar,
        handleComment,
        getTalkComments,
        replyComment: replyCommentLocal,
    }
    return (
        <div className="layoutColumn startCenter">
            {!!talks.length &&
                talks.map(talk => (
                    <Talk
                        {...talkProps}
                        key={talk._id}
                        talk={talk}
                        comments={comments[talk._id] || []}
                        account={props.account}
                    />
                ))}
            {!talks.length && <div style={{ color: '#ccc' }}>暂时还没有微博， 你可以尝试发布第一个...</div>}
        </div>
    )
}

const mapState = state => ({})
const mapDispatch = dispatch => ({
    deleteTalk: value => dispatch(actionDeleteTalk(value)),
    collectTalk: value => dispatch(actionCollectTalk(value)),
    likeTalk: value => dispatch(actionLikeTalk(value)),
    commentTalk: value => dispatch(actionCommentTalk(value)),
    getTalkCommentsById: value => dispatch(actionGetTalkCommentsById(value)),
    replyComment: value => dispatch(actionReplyComment(value)),
})

export default connect(
    mapState,
    mapDispatch,
)(Talks)
