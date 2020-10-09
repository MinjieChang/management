import Cookies from 'js-cookie'

class CookieService {
    cookieName = 'useId'

    set = value => {
        Cookies.set(this.cookieName, value, { expires: 7 })
    }

    get = () => Cookies.get(this.cookieName)

    clear = () => {
        Cookies.remove(this.cookieName)
    }

    isLogin = () => !!this.getCookie()
}

export default new CookieService()
