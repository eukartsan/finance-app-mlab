import uuidv4 from 'uuid/v4'

export const initialState = {
    data: [
        { id: uuidv4(), accountName: 'Mastercard 1' },
        { id: uuidv4(), accountName: 'Visa 2' },
        { id: uuidv4(), accountName: 'Card 34' },
    ],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD' : {
            const newAccount = {
                id: uuidv4,
                accountName: 'New',
            }
            const accounts = [...state.data, newAccount]
            return { ...state, accounts }
        }

        case 'DELETE': {
            const accounts = state.data.filter((account) => account.id !== action.id)
            return { ...state, accounts }
        }

        default:
            return state

    }
}