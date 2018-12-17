import React from 'react';
import PropTypes from 'prop-types'
import CategoryAccounts from '../CategoryAccounts/CategoryAccounts';
import './Operation.css';

export default class Operation extends React.Component {
    static propTypes = {
        accountsList: PropTypes.array.isRequired,
        transactions: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
    }

    constructor() {
        super()

        this.state = {
            amount: '',
            categoryName: '',
            comment: '',
            isIncomeChecked: false,
            isToggleOpen: true,
            accountName: '',
        }
    }

    resetSelectedAccount = () => {
        this.selectedAccount.value = null
    }

    addIncome = () => {
        const dateTime = (new Date().toDateString())
        const Amount = this.amount.value
        const Comment = this.comment.value
        const {isIncomeChecked, categoryName, accountName } = this.state
        this.props.onAddTransaction(Amount, dateTime, Comment, isIncomeChecked, categoryName, accountName);
        this.resetSelectedAccount()
        this.setState({ amount: '', comment: '' })
    }

    onCancel = () => {
        this.resetSelectedAccount()
        this.setState({ amount: '', comment: '' })
    }

    accountsList() {
        const { accountsList, accountName } = this.props
        const accountsName = accountsList.map((account) => {
            const { accountName, id } = account;
            return (
                <option
                    key={id}
                    data-id={id}>
                    {accountName}
                </option>)
        })

        return (
            <select
                className="select-item"
                ref={elem => this.selectedAccount = elem}
                onChange={this.selectAccount}
                value={accountName}>
                {accountsName}
            </select>)
    }

    selectAccount = (event) => {
        this.setState({ accountName: event.target.value })
    }

    changeAmount = (event) => {
        if (/^\d+$/.test(event.target.value)) {
            this.setState({
                amount: parseInt(event.target.value, 10)
            })
        }
    }

    addComment = (event) => {
        this.setState({ comment: event.target.value })
    }

    selectCategory = (event) => {
        this.setState({ categoryName: event.target.value })
    }

    incomeChange = () => {
        this.setState({
            isIncomeChecked: !this.state.isIncomeChecked
        });
    }

    transactionMenuOpen = () => {
        this.setState(({ isToggleOpen }) => ({
            isToggleOpen: !isToggleOpen
        }));
    }

    render() {
        const { categories } = this.props;
        const { amount, comment, isToggleOpen, isIncomeChecked } = this.state

        const accountMenu = isToggleOpen && <div>
            <div className="transaction-amount mb-8">
                <label className="label">Select account:</label>
                <div className="operation-item">
                    {this.accountsList()}
                </div>
            </div>
            <div className="transaction-checkbox mb-8">
                <input
                    type="checkbox"
                    id="income"
                    name="transaction"
                    value="income"
                    onChange={this.incomeChange} />
                <label htmlFor="income"
                       className="label label-checkbox"> Is income?</label>
            </div>
            <div className="transaction-amount mb-8">
                <label>Select Category:</label>
                <CategoryAccounts
                    categories={categories}
                    setCategory={this.selectCategory}
                    isIncomeChecked={isIncomeChecked} />
            </div>
            <div className="transaction-amount mb-8">
                <label>Enter Amount:</label>
                <input className="amount-label"
                       placeholder="Amount"
                       ref={(input)=>{this.amount = input}}
                       value={amount}
                       onChange={this.changeAmount} />
            </div>
            <div>
                <textarea
                    className="comment-value"
                    placeholder="Comment"
                    rows="3"
                    ref={(input)=>{this.comment = input}}
                    value={comment}
                    onChange={this.addComment}>
                </textarea>
            </div>
            <div className="transaction-buttons">
                <div>
                    <button
                        onClick={this.addIncome}
                        disabled={amount === ''}>Save
                    </button>
                </div>
                <div>
                    <button onClick={this.onCancel}>Cancel</button>
                </div>
            </div>
        </div>

        return (
            <div className="operation-list list-group-item">
                <h3>Account transactions: </h3>
                <button onClick={this.transactionMenuOpen}>
                    {isToggleOpen ? 'Close' : 'Open'}
                </button>
                {accountMenu}
            </div>)
    }
}