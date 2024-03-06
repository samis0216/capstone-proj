const LOAD_EXPENSE_DETAILS = 'groups/loadExpenseDetails'
// const LOAD_ONE_EXPENSE_DETAIL = 'groups/loadOneExpenseDetail'
const DELETE_DETAIL = 'details/deleteDetail'
const CREATE_DETAILS = 'details/createDetails'

const loadUserExpenseDetails = (expenseDetails) => {
    return {
        type: LOAD_EXPENSE_DETAILS,
        expenseDetails
    }
}

// const loadOneExpenseDetail = (expenseDetail) => {
//     return {
//         type: LOAD_ONE_EXPENSE_DETAIL,
//         expenseDetail
//     }
// }

const createDetails = (details)  => {
    return {
        type: CREATE_DETAILS,
        details
    }
}

const deleteDetail = (id) => {
    return {
        type: DELETE_DETAIL,
        id: id.id
    }
}

export const loadUserExpenseDetailsThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}/expenses/details`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserExpenseDetails(data))
        return data
    }
}

export const createDetailsThunk = (expenseId, userId, groupId) => async(dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/expenses/${expenseId}`, {
        body: userId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createDetails(data))
        return data
    }
}

export const deleteDetailThunk = (detailId, userId) => async(dispatch)=> {
    const res = await fetch(`/api/details/${detailId}/${userId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const id = await res.json()
        dispatch(deleteDetail(id))
        return id
    }
}

const initialState = {}

const expenseDetailsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_EXPENSE_DETAILS: {
            const newState = {}
            action.expenseDetails.forEach(expense => {
                newState[expense.id] = expense
            })
            return newState
        }
        case DELETE_DETAIL: {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        case CREATE_DETAILS: {
            const newState = {}
            action.details.forEach(detail => {
                newState[detail.id] = detail
            })
        }
        default:
            return state
    }
}
export default expenseDetailsReducer
