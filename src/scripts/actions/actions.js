import {UserModel} from '../models/models.js'

const ACTIONS = {
    registerUser: function(email,password) {
        console.log(email,password)
        return UserModel.register(email,password).then((resp) => {
            console.log(resp)
            return this.logUserIn(email,password)
        })
    },

    logUserIn: function(email,password) {
        return UserModel.login(email,password).then(function(resp){
            console.log(resp)
            location.hash = "home"
        })
    },

    logUserOut: function() {
        return UserModel.logout().then(() => {
            location.hash = "login"
        })
    }
}

export default ACTIONS