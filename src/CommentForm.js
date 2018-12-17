import React, { Component } from 'react';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '', account: '' };
    }
    handleAuthorChange = (e) => {
        this.setState({ author: e.target.value });
    }
    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }
    handleAccountChange = (e) => {
        this.setState({account: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let author = this.state.author.trim()
        let text = this.state.text.trim()
        let account = this.state.account.trim()
        if (!text || !author || !account) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text, account: account });
        this.setState({ author: '', text: '', account: '' });
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Your name...'
                    value={ this.state.author }
                    onChange={ this.handleAuthorChange } />
                <input
                    type='text'
                    placeholder='Say something...'
                    value={ this.state.text }
                    onChange={ this.handleTextChange } />
                <input
                    type='test'
                    placeholder='Update Account'
                    value={this.state.account}
                    onChange={this.handleAccountChange}
                />
                <input
                    type='submit'
                    value='Add'/>
            </form>
        )
    }
}

export default CommentForm;