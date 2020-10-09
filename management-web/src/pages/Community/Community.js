// redux 开发组件实际在开发类
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTalks as actionGetTalks, namespace } from 'src/redux/actions/community'
import { AuthContext } from 'src/context'
import history from 'src/util/history'
import Talks from 'src/pages/Community/include/Talks'
import { withSpin } from 'src/hoc'

const Community = ({ match, getTalks, community: { talks, comments }, auth: { account } }) => {
    useEffect(() => {
        const { _id } = account
        getTalks({ accountId: _id })
    }, [])

    const clickBtn = () => {
        history.push(`${match.url}/postTalk`)
    }

    return (
        <AuthContext.Consumer>
            {value => (
                <div>
                    <Button onClick={clickBtn}>发说说</Button>
                    <Talks account={value} talks={talks} comments={comments} />
                </div>
            )}
        </AuthContext.Consumer>
    )
}

Community.propTypes = {
    getTalks: PropTypes.func.isRequired,
    community: PropTypes.shape({ talks: PropTypes.any, comments: PropTypes.object }).isRequired,
    auth: PropTypes.shape({ account: PropTypes.any }).isRequired,
}

const mapState = state => ({
    loading: state.loading,
    auth: state.auth,
    community: state.community,
})
const mapDispatch = dispatch => ({
    getTalks: value => dispatch(actionGetTalks(value)),
})

export default compose(
    connect(
        mapState,
        mapDispatch,
    ),
    withSpin(({ loading }) => loading[namespace]),
)(Community)
