import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        render={(props) => {

            if (!auth.isAuthenticated) {
                return <Component {...props} />
            } else {
                return <Redirect to={`/purchase-with-btc`} />
            }
        }}
        {...rest}
    />
)

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({

    auth: state.authReducer,
})

export default connect(mapStateToProps)(PublicRoute)
