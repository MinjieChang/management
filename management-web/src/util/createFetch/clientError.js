import { inherits } from 'src/util'
// export default class ClientError extends Error {
//     constructor({ errorCode, errorMessage }) {
//         super({ errorCode, errorMessage })
//         this.errorCode = errorCode
//         this.errorMessage = errorMessage
//         // 设置this的原型为ClientError.prototype
//         // this.__proto__ = ClientError.prototype
//         Object.setPrototypeOf(this, ClientError.prototype)
//     }
// }

function ClientError({ errorCode, errorMessage }) {
    this.errorCode = errorCode
    this.errorMessage = errorMessage
}
inherits(ClientError, Error)
export default ClientError
