import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
// import { loadUserGroupsThunk } from "../../redux/groups"
import './Dashboard.css'
// import GroupTile from "../Tiles/GroupTile"
import { loadUserExpensesThunk } from "../../redux/expenses"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateExpenseModal from "../CreateExpense/CreateExpenseModal"


export default function Dashboard() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    // const groups = useSelector(state => state.groups)
    // const groupVal = Object.values(groups)
    const expenses = Object.values(useSelector(state => state.expenses))


    useEffect(() => {
        // dispatch(loadUserGroupsThunk(user.id))
        dispatch(loadUserExpensesThunk(user.id))
    }, [dispatch])


    if(!expenses) return null
    return (
        <div className="homepage-container">
            <div className="homepage">
                <div className="left-bar">
                    <div className="left-bar-content">
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                        <NavLink to='/activity'>Recent activity</NavLink>
                    </div>
                    <div>
                        <NavLink to='/expenses/all'>All expenses</NavLink>
                        <OpenModalButton modalComponent={CreateExpenseModal} itemText={'Create Expense'} />
                    </div>
                </div>
                <div className="middle-content">
                    <h2 className="middle-heading">Dashboard</h2>
                    {expenses.map(expense => (
                        <div key={expense.id} className="expense-tile">
                            <h4>{expense.description}</h4>
                            <p>{expense.category}</p>
                            <p>{expense.amount}</p>
                        </div>
                    ))}
                </div>
                <div className="right-content">

                </div>
            </div>
        </div>
    )
}
