import { ENDPOINT, ACTION } from 'src/constants'
import { message } from 'antd'
import history from 'src/util/history'
import { sleep } from 'src/util'

export const namespace = 'GET_TALKS'

export function getTalks(payload) {
    return {
        namespace,
        promise: ajax => ajax.get(ENDPOINT.COMMUNITY.GET_TALKS, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            dispatch({
                type: ACTION.COMMUNITY.SET_TALKS,
                payload: data.talks,
            })
        },
    }
}

export function submitTalks(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.COMMUNITY.SUBMIT_TALK, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('恭喜，发布成功！')
                sleep(1000).then(() => history.push('/community'))
            }
        },
    }
}

export function deleteTalk(payload) {
    return {
        promise: ajax => ajax.delete(ENDPOINT.COMMUNITY.DELETE_TALK, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('删除成功！')
                dispatch(getTalks())
            }
        },
    }
}

export function collectTalk(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.COMMUNITY.COLLECT_TALK, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                const { accountId, status } = payload
                message.success(`${status ? '收藏' : '取消'}成功！`)
                dispatch(getTalks({ accountId }))
            }
        },
    }
}

export function likeTalk(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.COMMUNITY.LIKE_TALK, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                const { accountId, status } = payload
                message.success(`${status ? '点赞' : '取消'}成功！`)
                dispatch(getTalks({ accountId }))
            }
        },
    }
}

export function getTalkCommentsById(payload) {
    return {
        promise: ajax => ajax.get(ENDPOINT.COMMUNITY.GET_TALK_COMMENTS, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                const { comments } = data
                const { talkId } = payload
                dispatch({
                    type: ACTION.COMMUNITY.SET_COMMENTS,
                    payload: { talkId, comments },
                })
            }
        },
    }
}

export function commentTalk(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.COMMUNITY.COMMENT_TALK, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('评论成功！')
                const { talkId } = payload
                dispatch(getTalkCommentsById({ talkId }))
            }
        },
    }
}

// 回复评论
export function replyComment(payload) {
    return {
        promise: ajax => ajax.post(ENDPOINT.COMMUNITY.REPLY_COMMENTS, payload),
        onSuccess: (dispatch, getState, response) => {
            const { data } = response
            if (data) {
                message.success('回复成功！')
                // const { talkId } = payload
                // dispatch(getTalkCommentsById({ talkId }))
            }
        },
    }
}
