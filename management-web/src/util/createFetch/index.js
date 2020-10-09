import { message } from 'antd'
import isObject from 'lodash/isObject'
import qs from 'query-string'
import history from '../history'
import { sleep } from '../index'
import { ERROR_MESSAGE, ACTION } from '../../constants'
import ajax from './ajax'

class ClientError extends Error {
    constructor({ errorCode, errorMessage }) {
        super(errorMessage)
        this.errorCode = errorCode
    }
}

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    if (response.status >= 400 && response.status < 500) {
        return response
    }

    const error = new ClientError({ errorCode: 'SERVER_ERROR' })
    throw error
}

function createFetch(fetch, { baseUrl, cookie, getToken, getDispatch }) {
    const defaults = {
        // method: 'POST', // handy with GraphQL backends
        mode: baseUrl ? 'cors' : 'same-origin',
        credentials: baseUrl ? 'include' : 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(cookie ? { Cookie: cookie } : null),
        },
    }

    const newFetch = (argu1, argu2) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new ClientError({ errorCode: 'NETWORK_TIMEOUT' }))
            }, 10000)
            fetch(argu1, argu2).then(resolve)
        })

    return async (url, { query, body, ...options } = {}) => {
        try {
            const queryString = qs.stringify(query)
            const fullUrl = `${url}${queryString ? '?' : ''}${queryString}`

            const responsePromise = newFetch(`${baseUrl}${fullUrl}`, {
                ...defaults,
                ...options,
                body: isObject(body) ? JSON.stringify(body) : body,
                headers: {
                    // 'access-token': getToken(),
                    ...defaults.headers,
                    ...(options && options.headers),
                },
            })
                .then(checkHttpStatus)
                .then(response => response)
            const response = await responsePromise
            const res = await response.json()
            if (res.errorCode && (res.errorCode === 'TOKEN_KICKED_OUT' || res.errorCode === 'FORBIDDEN')) {
                // const result = await getDispatch()(
                //   alertError(ERROR_MESSAGE[res.errorCode]),
                // );
                message.error(ERROR_MESSAGE[res.errorCode])
                // if (result) {
                //   history.push('/login');
                //   return { errorCode: res.errorCode };
                // }
            }
            return {
                ...res,
                __response: response,
            }
        } catch (error) {
            if (error instanceof ClientError) {
                return {
                    errorCode: error.errorCode,
                    errorMessage: error.message,
                }
            }
            return { errorCode: 'UNKNOWN', errorMessage: error.message }
        }
    }
}

export { createFetch, ajax }
