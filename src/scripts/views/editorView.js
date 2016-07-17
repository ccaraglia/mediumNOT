import React from 'react'
import {PstModel} from '../models/models'
import {UserModel} from '../models/models'
import Header from './header'


const EditorView = React.createClass({
    render: function() {
        return (
            <div className="composeView">
                <Header />
                <ComposeForm />
            </div>
            )
    }
})

const ComposeForm = React.createClass({

    _savePst: function(e) {
        e.preventDefault()

        var newPst = new PstModel({
            title: e.currentTarget.title.value,
            body: e.currentTarget.content.value,
            user: {
                email: UserModel.getCurrentUser().email,
            _id:UserModel.getCurrentUser()._id
        }
        })
        // makes a post request to the url set as a property on the model.
        // all of the model's attributes will comprise the body of the request.
        newPst.save()
        console.log(newPst)
    },

    render: function() {
        return (
            <form onSubmit={this._savePst}>
                <input name="title" placeholder="title" />
                <input name="content" placeholder="content" />
                <button type="submit" value="send!">send!</button>
            </form>
            )
    }
})

export default EditorView