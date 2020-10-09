export const ACTION = {
    LODING: {
        LODING_STATE: 'LODING/LODING_STATE',
    },
    STAFF: {
        GET_STAFFS: 'STAFF/GET_STAFFS',
        SET_STAFFS: 'STAFF/SET_STAFFS',
        SET_STAFF_INFO: 'STAFF/SET_STAFF_INFO',
    },
    COMMUNITY: {
        SET_TALKS: 'COMMUNITY/SET_TALKS',
        SET_COMMENTS: 'COMMUNITY/SET_COMMENTS',
    },
    AUTH: {
        SET_ACCOUNT: 'AUTH/SET_ACCOUNT',
    },
}

export const ENDPOINT = {
    STAFF: {
        GET_STAFFS: 'api/staff/getStaffs',
        ADD_STAFF: 'api/staff/add',
        DEL_STAFF: 'api/staff/del',
        GET_STAFF_INFO: 'api/staff/getStaffInfo',
        EDIT_STAFF: 'api/staff/update',
        BATCH_DELETE_STAFFS: 'api/staff/batchDelByIds',
    },
    COMMUNITY: {
        GET_TALKS: 'api/community/init',
        SUBMIT_TALK: 'api/community/submitTalk',
        DELETE_TALK: 'api/community/removeTalk',
        COLLECT_TALK: 'api/community/collectTalk',
        LIKE_TALK: 'api/community/likeTalk',
        COMMENT_TALK: 'api/community/commentTalk',
        GET_TALK_COMMENTS: 'api/community/getTalkComments',
        REPLY_COMMENTS: 'api/community/replyComment',
    },
    AUTH: {
        REGISTER: 'api/account/register',
        LOGIN: 'api/account/login',
        LOGOUT: 'api/account/logout',
        GET_ACCOUNT_INFO: 'api/account/accountInfo',
    },
}

export const ERROR_MESSAGE = {
    INVALID_ACCOUNT_OR_PASSWORD: '账号或密码不正确',
    FORBIDDEN: '你没有权限',
    INVALID_PARAM: '无效参数，请稍后重试',
    INVALID_TOKEN: '登录无效',
    INVALID_PASSCODE: 'passcode错误',
    PRISTINE_PASSWORD_ERROR: '请更改初始密码',
    DUP: '该资源已存在',
    SERVER_ERROR: '服务器错误',
    UNKNOWN: '未知错误，请联系管理员',
    TOKEN_KICKED_OUT: '账号失效，请重新登陆',

    // 自定义错误
    NETWORK_TIMEOUT: '请求超时, 请稍后再试',
}

export const server = {
    webServer: 'http://localhost:8000',
    devServer: 'http://localhost:8080',
}
