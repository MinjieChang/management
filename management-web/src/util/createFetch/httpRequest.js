import isObject from 'lodash/isObject'
import { message } from 'antd'
import { ERROR_MESSAGE } from 'src/constants'
import history from 'src/util/history'
import { sleep, getCurrentApiOrigin } from 'src/util'
import ClientError from './clientError'

class HttpRequest {
    constructor() {
        this.time = 10000
    }

    setUrl = (url, options = {}) => {
        const { withBaseUrl } = options
        const origin = getCurrentApiOrigin()
        return `${origin}/${url}`
        // if(isProduction) {
        //     return `${location.origin}/${url}`
        // }
        // return withBaseUrl ? `${server.webServer}/${url}` : `${server.devServer}/${url}`
    }

    get = (url, options) => {
        const option = this.setOptions({ method: 'get' })
        const fullUrl = this.setUrl(url, options)
        return this.createFetchFn(fullUrl, option)
    }

    post = (url, body, options) => {
        const option = this.setOptions({
            method: 'post',
            body: isObject(body) ? JSON.stringify(body) : body,
        })
        const fullUrl = this.setUrl(url, options)
        return this.createFetchFn(fullUrl, option)
    }

    delete = (url, body, options) => {
        const option = this.setOptions({
            method: 'delete',
            body: isObject(body) ? JSON.stringify(body) : body,
        })
        const fullUrl = this.setUrl(url, options)
        return this.createFetchFn(fullUrl, option)
    }

    put = (url, body, options) => {
        const option = this.setOptions({
            method: 'put',
            body: isObject(body) ? JSON.stringify(body) : body,
        })
        const fullUrl = this.setUrl(url, options)
        return this.createFetchFn(fullUrl, option)
    }

    setOptions = (option, baseUrl = '') => {
        const options = {
            mode: baseUrl ? 'cors' : 'same-origin',
            credentials: baseUrl ? 'include' : 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // ...(cookie ? { Cookie: cookie } : null),
            },
        }
        return Object.assign({}, options, option)
    }

    checkHttpStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response
        }

        if (response.status >= 400 && response.status < 500) {
            return response
        }

        const error = new ClientError({ errorCode: 'SERVER_ERROR' })
        throw error
    }

    checkAuthority = response => {
        const hasNoAuth = response.errorCode === 'TOKEN_KICKED_OUT' || response.errorCode === 'FORBIDDEN'
        if (hasNoAuth) {
            message.warning('登录无效')
            return sleep(1000).then(() => history.push('/auth'))
        }
        return response
    }

    checkErrorResponse = response => {
        const { errorCode } = response
        if (errorCode) throw response
        return response
    }

    createFetchFn = async (url, options) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new ClientError({ errorCode: 'NETWORK_TIMEOUT' })), this.time)
            fetch(url, options)
                .then(response => this.checkHttpStatus(response))
                .then(response => response.json())
                .then(response => this.checkAuthority(response))
                .then(response => this.checkErrorResponse(response))
                .then(response => resolve(response))
                .catch(err => reject(err))
        }).catch(error => {
            message.error(ERROR_MESSAGE[error.errorCode || 'UNKNOWN'])
            if (error instanceof ClientError) {
                return {
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                }
            }
            return { errorCode: 'UNKNOWN', errorMessage: error.message }
        })
    }
}

export default new HttpRequest()
