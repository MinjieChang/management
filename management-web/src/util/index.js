import { compact, isEmpty } from 'lodash'
import moment from 'moment'
import { server } from 'src/constants'

export function merge(classes) {
    return compact(classes).join(' ')
}

export function click(fn, param) {
    return event => {
        event.preventDefault()
        event.stopPropagation()
        fn(param)
    }
}

export function enterKey(fn, param) {
    if (!fn) {
        return null
    }
    return event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()
            fn(param)
        }
    }
}

export function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
}

export function inherits(Child, Father) {
    function Middle() {}
    Middle.prototype = Father.prototype
    const midInstance = new Middle()
    /* eslint-disable-next-line */
    Child.prototype = midInstance
    midInstance.constructor = Child
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object, Object]'
}

export function isValidObject(obj) {
    if (!isObject(obj)) return false
    return Object.keys(obj).length > 0
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object, Array]'
}

export function isValidArray(arr) {
    if (!isArray(arr)) return false
    return !isEmpty(arr)
}

export function randomNum(num) {
    return Math.floor(Math.random() * num)
}

export const isProduction = () => process.env.NODE_ENV === 'production'

export const getCurrentApiOrigin = () => {
    const production = isProduction()
    const { origin } = window.location
    return production ? origin : server.devServer
}

export const getAvatar = path => {
    const production = isProduction()
    const { origin } = window.location
    return `${production ? origin : server.webServer}/avatar/${path}`
}

export const getTalkImage = path => {
    const production = isProduction()
    const { origin } = window.location
    return `${production ? origin : server.webServer}/upload/${path}`
}

const timeUnits = ['年', '月', '周', '天', '小时', '分钟', '秒']
export function timeDiff(from, to) {
    const mFrom = moment(from)
    const mTo = moment(to)
    const diff = [
        mFrom.diff(mTo, 'years'),
        mFrom.diff(mTo, 'months'),
        mFrom.diff(mTo, 'weeks'),
        mFrom.diff(mTo, 'days'),
        mFrom.diff(mTo, 'hours'),
        mFrom.diff(mTo, 'minutes'),
        mFrom.diff(mTo, 'seconds'),
    ]
    for (let i = 0; i < diff.length; i += 1) {
        if (diff[i]) {
            return `${diff[i]}${timeUnits[i]}`
        }
    }
    return null
}

export function timeDiffBefore(from, to) {
    const diff = timeDiff(from, to)
    return diff ? `${diff}前` : '刚刚'
}
