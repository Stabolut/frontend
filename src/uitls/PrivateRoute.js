import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        render={(props) => {
            if (auth.isAuthenticated) {
                return <Component {...props} />
            } else {

                return <Redirect to={`/login`} />
            }
        }}
        {...rest}
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
})

export default connect(mapStateToProps)(PrivateRoute)
// export default connect(mapStateToProps, null, null, {
//   pure: false,
// })(PrivateRoute);