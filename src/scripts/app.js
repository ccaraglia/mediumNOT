import React from 'react'
import ReactDOM from 'react-dom'
//import LoginPage from './LoginPage'
import $ from 'jquery'
import Backbone from 'backbone'
import LoginView from './views/LoginView'
import EditorView from './views/editorView'
import AllView from './views/AllView'
import {PstCollection} from './models/models'

export const APP_NAME = 'mediumNOT'

const app = function() {


        const BlogRouter = Backbone.Router.extend({

            routes:{
                    "posts/readAll": "showPsts",
                    "posts/readMine": "showMyPstss",
                    "posts/write": "showEditor",
                    "home": "showHome",
                    "login": "showLogin",
                    "*catchall": "redirect"
        },


        redirect: function(){
            location.hash = "home"
        },

        showLogin: function(){
            ReactDOM.render(<LoginView />, document.querySelector('.container'))
        },

        showPsts: function(){
            var postColl = new PstCollection()
            postColl.fetch().fail(function(err){
                console.log(err)
            })
            //ReactDOM.render(<AllView postColl={postColl} />, document.querySelector('.container'))
            document.querySelector(`.container`).innerHTML = '<h1>posts</h1>'
        },


        showMyPsts: function(){
                ReactDOM.render(<MyView />, document.querySelector('.container'))
        },


        showEditor: function(){
                ReactDOM.render(<EditorView />, document.querySelector('.container'))

        },


        showHome: function(){

            var coll = new PstCollection()
            coll.fetch().fail(function(err){
                console.log(err)
            })
            ReactDOM.render(<AllView coll = {coll} />, document.querySelector('.container'))
        },


        initialize: function() {
            Backbone.history.start()
                }




        })

        new BlogRouter()

}

app()