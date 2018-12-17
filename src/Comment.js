import React, { Component } from 'react'
import marked from 'marked'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            author: '',
            text: '',
            account: ''
        };
    }

    updateComment = (e) => {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleCommentUpdate = (e) => {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT request
        //will ignore it.
        let author = (this.state.author) ? this.state.author : null;
        let text = (this.state.text) ? this.state.text : null;
        let account = (this.state.account) ? this.state.account : null
        let comment = { author: author, text: text, account: account };
        this.props.onCommentUpdate(id, comment)
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            author: '',
            text: '',
            account: ''
        })
    }
    deleteComment = (e) => {
        e.preventDefault()
        let id = this.props.uniqueID
        this.props.onCommentDelete(id)
        console.log('oops deleted')
    }
    handleTextChange = (e) => {
        this.setState({ text: e.target.value })
    }
    handleAuthorChange = (e) => {
        this.setState({ author: e.target.value })
    }
    handleAccountChange = (e) => {
        this.setState({ account: e.target.value })
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString())
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div>
                <h3>Name: {this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <h3>Account: {this.props.account}</h3>
                {/*<a style={ style.updateLink } href='#' onClick={ this.updateComment }>update</a>*/}
                {/*<a style={ style.deleteLink } href='#' onClick={ this.deleteComment }>delete</a>*/}
                <button href='#' onClick={this.updateComment}> Edit</button>
                <button  href='#' onClick={this.deleteComment}> Delete</button>
                {(this.state.toBeUpdated)
                    ? (<form onSubmit={this.handleCommentUpdate}>
                        <input
                            type='text'
                            placeholder='Update name...'
                            value={this.state.author}
                            onChange={this.handleAuthorChange} />
                        <input
                            type='text'
                            placeholder='Update your comment...'
                            value={this.state.text}
                            onChange={this.handleTextChange} />
                        <input
                            type='test'
                            placeholder='Update Account'
                            value={this.state.account}
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