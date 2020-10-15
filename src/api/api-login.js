import {instance} from './instance'

export const LoginAPI = {
    login(username, password){
        return instance.post('/login', {username, password})
    }
}

