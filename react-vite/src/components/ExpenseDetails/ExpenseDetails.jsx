import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenseThunk, loadOneExpenseThunk } from "../../redux/expenses"
import { useNavigate, useParams } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateExpenseModal from "../CreateExpense/UpdateExpenseModal"

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
        <div>
            <h4>{expense?.description}</h4>
            <p>{expense?.category}</p>
            <p>${expense?.amount}</p>
            <p>{group?.name}</p>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
            <OpenModalButton modalComponent={<UpdateExpenseModal expense={expense} userId={user.id}/>} buttonText={'Update'} />
        </div>
    )
}
