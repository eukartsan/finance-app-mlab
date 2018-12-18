import React, { Component } from 'react'
import '../src/component/Accounts/Accounts.css'
import marked from 'marked'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            // author: '',
            // text: '',
            account: ''
        };
    }

    updateComment = (e) => {
        e.preventDefault();
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleCommentUpdate = (e) => {
        e.preventDefault();
        let id = this.props.uniqueID
        // let author = (this.state.author) ? this.state.author : null
        // let text = (this.state.text) ? this.state.text : null
        let account = (this.state.account) ? this.state.account : null
        let comment = {
            // author: author,
            // text: text,
            account: account
        }
        this.props.onCommentUpdate(id, comment)
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            // author: '',
            // text: '',
            account: ''
        })
    }
    deleteComment = (e) => {
        e.preventDefault()
        let id = this.props.uniqueID
        this.props.onCommentDelete(id)
    }
    // handleTextChange = (e) => {
    //     this.setState({ text: e.target.value })
    // }
    // handleAuthorChange = (e) => {
    //     this.setState({ author: e.target.value })
    // }
    handleAccountChange = (e) => {
        this.setState({ account: e.target.value })
    }

    // rawMarkup() {
    //     let rawMarkup = marked(this.props.children.toString())
    //     return { __html: rawMarkup }
    // }

    render() {
        return (
            <div className="account-list list-group-item">
                <ul className="list-group-item">
                    {this.props.account}
                    <button onClick={this.updateComment} className="account-buttons">
                        Edit
                    </button>
                    <button onClick={this.deleteComment} className="account-buttons">
                        Delete
                    </button>
                </ul>
                {(this.state.toBeUpdated)
                    ? (<form onSubmit={this.handleCommentUpdate}>
                        <input
                            type='test'
                            placeholder='Update Account'
                            value={this.state.account}
                            className="account-items-name"
                            onChange={this.handleAccountChange}
                        />
                        <input
                            type='submit'
                            value='Update' />
                    </form>)
                    : null}
            </div>
        )
    }
}

export default Comment