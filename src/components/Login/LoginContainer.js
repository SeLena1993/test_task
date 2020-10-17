import React from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { userLogin } from '../../redux/auth-reducer'

const LoginContainer = (props) => {

    const onSubmit = (formData) => {
        props.userLogin(formData.username, formData.password)
    }
    return (
        <LoginForm
            isLoadingStatus={props.isLoadingStatus}
            onSubmit={onSubmit}
        />
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isLoggedIn,
    isLoadingStatus: state.auth.isLoading
})

export default connect(mapStateToProps, { userLogin })(LoginContainer)
