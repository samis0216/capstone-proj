import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import './Dashboard.css'
import { loadUserExpensesThunk } from "../../redux/expenses"

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const groups = Object.values(useSelector(state => state.groups))
    const expenses = Object.values(useSelector(state => state.expenses))
    const [option, setOption] = useState('expenses')
    console.log(option)

    useEffect(() => {
        dispatch(loadUserGroupsThunk(user.id))
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
                    <div className="left-bar-content">
                        <div className="group-container">
                            <p>Groups</p>
                            <NavLink to='/groups/new'>+new</NavLink>
                        </div>
                        {groups.map(group => (
                            <NavLink key={group.id} to={`/groups/${group.id}`}>{group.name}</NavLink>
                    ))}

                    </div>
                    <div className="left-bar-content">
                        <p to='/expenses/all' onClick={()=> setOption('expenses')}>All expenses</p>
                        {/* <NavLink to='/expenses/new'>Create Expense</NavLink> */}
                    </div>
                </div>
                <div className="middle-content">
                    <h2 className="middle-heading">Dashboard</h2>
                        {expenses.map(expense => (
                        <div key={expense.id} className="expense-tile" onClick={()=> navigate(`/expenses/${expense.id}`)}>
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
