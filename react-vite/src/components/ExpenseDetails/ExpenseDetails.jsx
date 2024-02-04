import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenseThunk, loadOneExpenseThunk } from "../../redux/expenses"
import { useNavigate, useParams } from "react-router-dom"
import { loadOneGroupThunk } from "../../redux/groups"

export default function ExpenseDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { expenseId } = useParams()
    const user = useSelector(state => state.session.user)
    const expense = useSelector(state => state.expenses[expenseId])
    console.log(user, expenseId)

    useEffect(()=> {
        dispatch(loadOneExpenseThunk(expenseId))
        dispatch(loadOneGroupThunk(user.id, expense?.groupId))
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()
        const result = dispatch(deleteExpenseThunk(expenseId))
        if (result) navigate('/dashboard')

    }
    return (
        <div>
            <h4>{expense?.description}</h4>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
    )
}
