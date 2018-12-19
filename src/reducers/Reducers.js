import uuidv4 from 'uuid/v4'

export const initialState = {
    accounts: [
        { id: 'f19947e9-0638-4080-9706-900c8fd01c9d', accountName: '', active: false },
        { id: uuidv4(), accountName: 'Mastercard 1', active: false },
        { id: uuidv4(), accountName: 'Visa 2', active: false },
        { id: uuidv4(), accountName: 'Card 3', active: false },
    ],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD' : {
            const newAccount = {
                id: uuidv4,
                accountName: 'New',
                action: false
            }
            const accounts = [...state.accounts, newAccount]
            return { ...state, accounts }
        }

        default:
            return state

    }
}