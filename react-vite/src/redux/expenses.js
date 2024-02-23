const LOAD_EXPENSES = 'groups/loadExpenses'
const LOAD_ONE_EXPENSE = 'groups/loadOneExpense'
const LOAD_ALL_EXPENSES = 'groups/loadAllExpenses'
const CREATE_EXPENSE = 'groups/createExpense'
const UPDATE_EXPENSE = 'expense/updateExpense'
const DELETE_EXPENSE = 'groups/deleteExpense'
const LOAD_GROUP_EXPENSES = 'groups/loadGroupExpenses'

const loadUserExpenses = (expenses) => {
    return {
        type: LOAD_EXPENSES,
        expenses
    }
}

const loadAllExpenses = (expenses) => {
    return {
        type: LOAD_ALL_EXPENSES,
        expenses
    }
}

const loadOneExpense = (expense) => {
    return {
        type: LOAD_ONE_EXPENSE,
        expense
    }
}

const loadGroupExpenses = (expenses) => {
    return {
        type: LOAD_GROUP_EXPENSES,
        expenses
    }
}

const createExpense = (expense) => {
    return {
        type: CREATE_EXPENSE,
        expense
    }
}

const deleteExpense = (payload) => {
    return {
        type: DELETE_EXPENSE,
        payload
    }
}

const updateExpense = (expense) => {
    return {
        type: UPDATE_EXPENSE,
        expense
    }
}

export const loadUserExpensesThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}/expenses`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserExpenses(data))
        return data
    }
}

export const loadAllExpensesThunk = () => async(dispatch) => {
    const res = await fetch('/api/expenses/all')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadAllExpenses(data))
        return data
    }
}

export const createUserExpenseThunk = (userId, expense) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}/expenses`, {
        method: 'POST',
        body: expense
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createExpense(data))
        return data
    }
}

export const loadOneExpenseThunk = (expenseId) => async(dispatch) => {
    const res = await fetch(`/api/users/expenses/${expenseId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneExpense(data))
        return data
    }
}

export const updateExpenseThunk = (expenseId, expense) => async(dispatch) => {
    const res = await fetch(`/api/expenses/${expenseId}`, {
        method: 'PUT',
        body: expense
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateExpense(data))
        return data
    }
}

export const deleteExpenseThunk = (expenseId) => async(dispatch) => {
    const res = await fetch(`/api/users/expenses/${expenseId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteExpense)
        return data
    }
}

export const loadGroupExpensesThunk = (groupId) => async(dispatch) => {
    const res = await fetch(`/api/expenses/groups/${groupId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadGroupExpenses(data))
        return data
    }
}

const initialState = {}

const expensesReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_EXPENSES: {
            const newState = {}
            action.expenses.forEach(expense => {
                newState[expense.id] = expense
            })
            return newState
        }
        case LOAD_ALL_EXPENSES: {
            const newState = {}
            action.expenses.forEach(expense => {
                newState[expense.id] = expense
            })
            return newState
        }
        case LOAD_ONE_EXPENSE: {
            const newState = {}
            newState[action.expense.id] = action.expense
            return newState
        }
        case LOAD_GROUP_EXPENSES: {
            const newState = {}
            action.expenses.forEach(expense => {
                newState[expense.id] = expense
            })
            return newState
        }
        case CREATE_EXPENSE: {
            const newState = {...state, [action.expense.id]: action.expense}
            return newState
        }
        case UPDATE_EXPENSE: {
            const newState = {}
            newState[action.expense.id] = action.expense
            return newState
        }
        case DELETE_EXPENSE: {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

export default expensesReducer
