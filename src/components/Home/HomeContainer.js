import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { subscribeWs } from '../../redux/ws-reducer'
import { userLogout } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom';
import HomeTimer from './HomeTimer';

const HomeContainer = (props) => {

    const [currentTime, setCount] = useState(0);

    useEffect(() => { current() }, [])

    useEffect(() => { refreshWs() }, [currentTime])

    const current = () => {
        setInterval(() => {
            let time = new Date() / 1000
            setCount(time)
        }, 5000)
        return () => clearInterval(current);
    }

    const refreshWs = () => {
        let isSubscribed = true
        let different = (Math.round(currentTime)) - props.dateTime
        if (different >= 4 && isSubscribed) {
            props.subscribeWs()
            return () => isSubscribed = false
        }
    }

    const logout = () => {
        props.userLogout()
    }

    if (!props.isAuth)
        return <Redirect to={'/login'} />

    return (
        <HomeTimer
            isAuth={props.isAuth}
            dateTime={new Date(props.dateTime * 1000).toLocaleString()}
            isSuccess={props.isSuccess}
            currentTime={new Date(currentTime * 1000).toLocaleString()}
            logout={logout}
        />
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isLoggedIn,
    dateTime: state.subscribeWs.dateTime,
    isSuccess: state.subscribeWs.isSuccess,
})

export default connect(mapStateToProps, { subscribeWs, userLogout })(HomeContainer)
