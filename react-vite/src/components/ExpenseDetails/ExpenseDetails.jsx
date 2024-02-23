import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenseThunk, loadOneExpenseThunk } from "../../redux/expenses"
import { useNavigate, useParams } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateExpenseModal from "../CreateExpense/UpdateExpenseModal"
import './ExpenseDetails.css'
import { loadUserExpenseDetailsThunk } from "../../redux/expense_details"
// import { loadGroupMembersThunk } from "../../redux/group_members"

export default function ExpenseDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { expenseId } = useParams()
    const user = useSelector(state => state.session.user)
    const expense = useSelector(state => state.expenses[expenseId])
    const group = useSelector(state => state.groups[expense?.group_id])
    // const details = Object.values(useSelector(state=> state.expenseDetails))


    // console.log(details)

    useEffect(() => {
        dispatch(loadOneExpenseThunk(expenseId))
        dispatch(loadUserGroupsThunk(user.id))
        dispatch(loadUserExpenseDetailsThunk(2))
        // dispatch(loadGroupMembersThunk(expense?.group_id))
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()

        if (window.confirm(`Are you sure you want to delete ${expense.description}?`)) {
            const result = dispatch(deleteExpenseThunk(expenseId))
            if (result) navigate('/dashboard')
        }

    }

    return (
        <div className="expenseDetailsPage">
            <div className="expenseDetailsContainer">
                <h1>{expense?.description}</h1>
                <p>Category: {expense?.category}</p>
                <p>Amount: ${expense?.amount}</p>
                <p>Group: {group?.name}</p>
                <div className="buttonsContainer">
                    <OpenModalButton modalComponent={<UpdateExpenseModal expense={expense} userId={user.id} />} buttonText={'Update'} buttonStyle={'updateButton'}/>
                    <button id='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
                </div>
                {/* <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Each Splitti:</p>
                    <p>${expense?.amount / 4}</p>
                </div> */}
            </div>
        </div>
    )
}
