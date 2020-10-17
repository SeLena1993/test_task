import { WsAPI } from '../api/api-ws'
const WS_SUBSCRIBE_SUCCESS = 'WS_SUBSCRIBE_SUCCESS'
const WS_SUBSCRIBE_LOADING = 'WS_SUBSCRIBE_LOADING'

const initialState = {
    isSuccess: false,
    isLoading: true,
    dateTime: '',
}

const subscribeWsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                dateTime: action.payload
            }
        case WS_SUBSCRIBE_LOADING:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
                dateTime: '',
            }

        default:
            return state;
    }
}

export const subscribeSuccessWsAC = (dateTime) => ({ type: WS_SUBSCRIBE_SUCCESS, payload: dateTime })
export const subscribeLoadingWsAC = () => ({ type: WS_SUBSCRIBE_LOADING })


export const subscribeWs = () => async (dispatch) => {
    let token = JSON.parse(localStorage.getItem('jwt-token'))
    try {
        let response = await WsAPI.getWS(token)
        dispatch(connectWS(response.data.url))
    } catch (error) {
        console.error('Err', error)
    }
}

function connectWS(urlWs) {
    return (dispatch) => {
        dispatch(subscribeLoadingWsAC())
        let socket = new WebSocket(urlWs)

        socket.onopen = () => {
            console.info('WS connected success')
        }

        socket.onmessage = evt => {
            const message = JSON.parse(evt.data)
            dispatch(subscribeSuccessWsAC(message.server_time))
        }

        socket.onerror = err => {
            console.error('Error', err);
            socket.onclose = null;
            socket.close();
            dispatch(subscribeLoadingWsAC())
            dispatch(subscribeWs())
        }

        socket.onclose = event => {
            console.info(`WebSocket closed with code ${event.code}! ${event.reason}`);
            dispatch(subscribeLoadingWsAC())
            dispatch(subscribeWs())
        }
    }
}

export default subscribeWsReducer;
