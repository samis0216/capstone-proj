import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenseThunk, loadOneExpenseThunk } from "../../redux/expenses"
import { useNavigate, useParams } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateExpenseModal from "../CreateExpense/UpdateExpenseModal"
import './ExpenseDetails.css'

export default function ExpenseDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { expenseId } = useParams()
    const user = useSelector(state => state.session.user)
    const expense = useSelector(state => state.expenses[expenseId])
    const group = useSelector(state => state.groups[expense?.group_id])

    useEffect(() => {
        dispatch(loadOneExpenseThunk(expenseId))
        dispatch(loadUserGroupsThunk(user.id))
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()
        const result = dispatch(deleteExpenseThunk(expenseId))
        if (result) navigate('/dashboard')

    }

    return (
        <div className="expenseDetailsPage">
            <div className="expenseDetailsContainer">
                <h1>{expense?.description}</h1>
                <p>Category: {expense?.category}</p>
                <p>Amount: ${expense?.amount}</p>
                <p>Group: {group?.name}</p>
                <div className="buttonsContainer">
                    <OpenModalButton modalComponent={<UpdateExpenseModal expense={expense} userId={user.id} />} buttonText={'Update'} />
                    <button id='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
                </div>
            </div>
        </div>
    )
}
