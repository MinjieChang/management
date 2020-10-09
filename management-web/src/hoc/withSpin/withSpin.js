/* eslint-disable react/require-render-return, no-useless-constructor, react/no-multi-comp, react/prop-types */
import React from 'react'
import s from './withSpin.less'
import { SpinerIcon } from '../../iconSvg'

class Spiner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { loading, children } = this.props
        return (
            <div>
                {!!loading && (
                    <div className={s.bg}>
                        <div className={s.imgBox}>
                            <div className={s.surname}>
                                <SpinerIcon />
                            </div>
                            <span className={s.text}>加载中...</span>
                        </div>
                    </div>
                )}
                {children}
            </div>
        )
    }
}

export default function Render(loadingCheckFn) {
    return function Inner(Component) {
        return class InnerCom extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    showLoading: false,
                }
            }

            // componentWillMount() {
            //     console.log(this.props, 666666)
            //     const showLoading = loadingCheckFn(this.props)
            //     this.setState({
            //         showLoading,
            //     })
            // }

            render() {
                // if (loadingCheckFn(this.props)) {
                //     return (
                //         <Spiner>
                //             <Component {...this.props} />
                //         </Spiner>
                //     )
                // }
                const showLoading = loadingCheckFn(this.props)
                // const { showLoading } = this.state
                return (
                    <Spiner loading={showLoading}>
                        <Component {...this.props} />
                    </Spiner>
                )
            }
        }
    }
}
