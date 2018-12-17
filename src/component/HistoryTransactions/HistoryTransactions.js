import React from 'react'
import PropTypes from "prop-types";
import './HistoryTransactions.css'

const transactionItem = (value) =>
    <div className="transaction-item">
        {value}
    </div>;

export default class HistoryTransactions extends React.Component {
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        accountsList: PropTypes.array.isRequired,
        transactionMenu: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired
    }

    constructor() {
        super()

        this.state = {
            menuOpen: true
        }
    }

    historyMenuOpen = () => {
        this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }));
    }

    render() {
        const { transactions, transactionMenu } = this.props
        const { menuOpen } = this.state

        const transactionHeaderMenu = menuOpen && transactionMenu.map((transactionMenu) => {
            return (
                <div className="transaction-block-item" key={transactionMenu.id}>
                    {transactionItem(transactionMenu.accountName)}
                    {transactionItem(transactionMenu.amount)}
                    {transactionItem(transactionMenu.comment)}
                    {transactionItem(transactionMenu.datetime)}
                    {transactionItem(transactionMenu.category)}
                    {transactionItem(transactionMenu.income)}
                </div>
            )
        })

        const transactionList = menuOpen && transactions.map((transaction) => {
                const { amount, datetime, comment, isIncome, categoryName, accountName, id } = transaction

                const items = Object.values(transaction).map((item) => {
                    return (
                        <div className="transaction-item">
                            {items}
                        </div>
                    )
                })

                return (
                    <div className="transaction-block-item" key={id}>
                        {transactionItem(accountName)}
                        {transactionItem(amount)}
                        {transactionItem(comment)}
                        {transactionItem(datetime)}
                        {transactionItem(categoryName)}
                        {transactionItem(isIncome ? 'Income' : 'Expense')}
                    </div>
                )
            }
        )

        return (

            <div className="transactions-container list-group-item">
                <h3>History Transaction:</h3>
                <button onClick={this.historyMenuOpen}
                >
                    {menuOpen ? 'Close' : 'Open'}
                </button>
                {transactionHeaderMenu}
                {transactionList}
            </div>
        )
    }
}