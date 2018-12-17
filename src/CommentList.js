import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
    render() {
        let accountNodes = this.props.data.map(account => {
            return (
                <Comment
                    author={ account.author }
                    account ={ account.account }
                    uniqueID={ account['_id'] }
                    onCommentDelete={ this.props.onCommentDelete }
                    onCommentUpdate={ this.props.onCommentUpdate }
                    key={ account['_id'] }>
                    { account.text }
                </Comment>
            )
        })
        return (
            <div >
                { accountNodes }
            </div>
        )
    }
}

export default CommentList