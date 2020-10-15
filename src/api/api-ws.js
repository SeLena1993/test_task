import {instance} from './instance'

export const WsAPI = {
    getWS(token){
        return instance.get('/subscribe', 
            {'headers':{'x-test-app-jwt-token':token}})
    }
}