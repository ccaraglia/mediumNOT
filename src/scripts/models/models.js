import Backbone from 'backbone'
import $ from 'jquery'
import {APP_NAME} from '../app'



export const PstModel = Backbone.Model.extend({
    url: "/api/posts",
    // warning: behind-the-scenes magic
    // when you sync with the server, read the ._id property
    // off the returned record, and assign it into your .id
    // property
    idAttribute: "_id"
})

export const PstCollection = Backbone.Collection.extend({
    model: PstModel,
    url: "/api/posts"
})


export const UserModel = {
	register: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/register',
			data: {
				email: email,
				password: password
			}
		}).then((email,password)=>this.login(email,password))
	},
	login: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/login',
			data: {
				email: email,
				password: password
			}
		}).then((userData) => {
			localStorage[APP_NAME] = JSON.stringify(userData)
		})
	},
	logout: function() {
		return $.getJSON('/auth/logout')
	},
	getCurrentUser: function() {
		return JSON.parse(localStorage[APP_NAME])
	}
}