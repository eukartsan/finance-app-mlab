import React from 'react'
import './Accounts.css'
import PropTypes from "prop-types";

export default class Accounts extends React.Component {
    static propTypes = {
        accountsList: PropTypes.array.isRequired,
        addAccount: PropTypes.func.isRequired,
        onDeleted: PropTypes.func.isRequired,
        editAccountName: PropTypes.func.isRequired,
        setAccountActive: PropTypes.func.isRequired
    }

    constructor() {
        super()

        this.state = {
            accountName: '',
            isMenuOpen: ''
        };
    }

    addAccountName = (event) => {
        const { addAccount } = this.props
        event.preventDefault()
        const newAccount = this.accountName.value
        addAccount(newAccount)
        this.setState({ accountName: '' })
    }

    handleChange = (event) => {
        this.setState({ accountName: event.target.value })
    }

    deleteAccount = (id) => (event) => {
        const { onDeleted } = this.props
        event.preventDefault()
        onDeleted(id);
    }

    editAccountName = (id) => (event) => {
        const { editAccountName } = this.props
        editAccountName(event.target.value, id)
    }

    setActive = (id) => (event) => {
        const { setAccountActive } = this.props
        event.preventDefault()
        setAccountActive(id)
    }

    render() {
        const { accountsList } = this.props,
            { accountName } = this.state

        const account = accountsList
            .filter((item) => item.accountName !== '')
            .map((item) => {
                const { id, accountName: accountItemName, active } = item;

                return (<li key={id} className="account-list list-group-item">
                    {
                        active
                            ? <label className="account-items">
                                <input name="accountName"
                                       type="text"
                                       value={accountItemName}
                                       onChange={this.editAccountName(id)}
                                       className="account-items-name" />
                                <button onClick={this.setActive(id)} className="account-buttons">
                                    Exit
                                </button>
                                <button onClick={this.deleteAccount(id)} className="account-buttons">
                                    Delete
                                </button>
                            </label>
                            : <div className="account-items">
                                <div className="account-items-names">
                                    {accountItemName}
                                </div>
                                <button className="account-buttons"
                                        onClick={this.setActive(id)}>
                                    Edit
                                </button>
                                <button className="account-buttons"
                                        onClick={this.deleteAccount(id)}>
                                    Delete
                                </button>
                            </div>
                    }
                </li>)
            })

        return (
            <div className="app-header list-group-item">
                <h3>Balance</h3>
                <div>
                    <form onSubmit={this.addAccountName}>
                        <label>
                            <span>Account name:</span>
                            <input name="newAccountName"
                                   type="text"
                                   ref={(input)=>{this.accountName = input}}
                                   value={accountName}
                                   onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                <ul className="list-group-item">
                    {account}
                </ul>
            </div>)
    }
}


