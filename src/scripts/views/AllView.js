import React from 'react'
import $ from 'jquery'
import Header from './header'

var AllView = React.createClass({

    getInitialState: function() {
        return {
            coll: this.props.coll
        }
    },

    componentWillMount: function() {
        this.state.coll.on('sync update',()=>{
            this.setState({
                coll: this.state.coll
            })
        })
    },

    render: function() {
        return (
            <div className="inboxView">
                <Header />
                <Inbox coll={this.props.coll} />
            </div>
            )
    }
})

var Inbox = React.createClass({
    _makeMsg: function(record) {
        return <Msg key={record.id} record={record} />
    },

    render: function() {
        return (
            <div className="inbox">
                {this.props.coll.map(this._makeMsg)}
            </div>
            )
    }
})

var Msg = React.createClass({

    _removeModel: function() {
        this.props.record.destroy({
            url: `/api/posts/${this.props.record.id}`
        })
    },

    render: function() {
        console.log(this.props.record.get('user').email)
        return (
            <div className="pst">
                <div className="msgDeets">
                    <p>title: {this.props.record.get('title')}</p>
                    <p>content: {this.props.record.get('body')}</p>
                    <p>by: {this.props.record.get('user').email} </p>
                </div>

                <button onClick={this._removeModel} >X</button>
            </div>
            )
    }
})



export default AllView