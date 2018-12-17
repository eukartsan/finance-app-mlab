import React from 'react';
import PropTypes from "prop-types";

export default class NewCategory extends React.Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        addCategory: PropTypes.func.isRequired
    }

    constructor() {
        super()

        this.state = {
            newIsIncomeChecked: false,
            menuCategoryOpen: true,
            categoryName: ''
        }
    }

    newIncomeChange = () => {
        this.setState({
            newIsIncomeChecked: !this.state.newIsIncomeChecked
        });
    }

    addNewCategory = (event) => {
        const { addCategory } = this.props,
            { newIsIncomeChecked } = this.state
        const categoryName = this.categoryName.value
        event.preventDefault()
        addCategory(categoryName, newIsIncomeChecked)
        this.setState({ categoryName: ' ' })
    }

    categoryMenuOpen = () => {
        this.setState(({ menuCategoryOpen }) => ({
            menuCategoryOpen: !menuCategoryOpen
        }));
    }

    handleChange = (event) => {
        this.setState({ categoryName: event.target.value });
    }

    render() {
        const { menuCategoryOpen, categoryName } = this.state;

        const newCategoryMenu = menuCategoryOpen &&
            <div className="transaction-amount">
                <form onSubmit={this.addNewCategory}>
                    <label>Enter new category:</label>
                    <input
                        name="newCategoryName"
                        type="text"
                        ref={(input)=>{this.categoryName = input}}
                        value={categoryName}
                        className="operation-list"
                        onChange={this.handleChange} />
                    <input type="checkbox"
                           id="incomeCategory"
                           name="transaction"
                           value="incomeCategory"
                           onChange={this.newIncomeChange} />
                    <label htmlFor="incomeCategory"
                           className="label label-checkbox">
                        Is income?</label>
                    <button className="transaction-buttons"
                            type="submit">
                        Save
                    </button>
                </form>
            </div>

        return (
            <div className="operation-list list-group-item">
                <h3>Create new category:</h3>
                <button onClick={this.categoryMenuOpen}>
                    {menuCategoryOpen ? 'Close' : 'Open'}
                </button>
                <div className="transaction-amount mb-8">
                    {newCategoryMenu}
                </div>
            </div>)
    }
}