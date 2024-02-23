import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import './Dashboard.css'
import { loadUserExpensesThunk } from "../../redux/expenses"
import { ExpenseTile } from "../Tiles/ExpenseTile"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreatePaymentModal from '../CreatePaymentModal/CreatePaymentModal'

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


    if (!expenses) return null

    return (
        <div className="homepage-container">
            <div className="homepage">
                <div className="left-bar">
                    <div className="left-bar-content">
                        <NavLink style={{ color: '#666666', textDecoration: 'none' }} to='/dashboard'>Dashboard</NavLink>
                        {/* <NavLink style={{ color: '#666666', textDecoration: 'none' }} to='/activity'>Recent activity</NavLink> */}
                        <div className="left-bar-content">
                            <p to='/expenses/all' onClick={() => setOption('expenses')} style={{ color: '#666666', textDecoration: 'none' }}>All expenses</p>
                            {/* <NavLink to='/expenses/new'>Create Expense</NavLink> */}
                        </div>
                    </div>
                    <div className="left-bar-content">
                        <div className="left-bar-content" style={{backgroundColor: '#F6F6F6'}}>
                            <div className="group-container">
                                <p>Groups</p>
                                <NavLink style={{ color: '#666666', textDecoration: 'none' }} to='/groups/new'>+new</NavLink>
                            </div>
                            {groups.map(group => (
                                <NavLink style={{ color: '#666666', textDecoration: 'none' }} key={group.id} to={`/groups/${group.id}`}>{group.name}</NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="middle-content">
                    <div className="middle-heading" style={{borderBottom: '#DDDDDD solid 1px'}}>
                        <h2>Dashboard</h2>
                        <div className="dashButtons">
                            <button style={{ backgroundColor: '#FF6430', color: "white", cursor: "pointer"  }} onClick={() => navigate('/expenses/new')}>Add an Expense</button>
                            <OpenModalButton modalComponent={<CreatePaymentModal/>} buttonText={'Settle Up'} buttonStyle={'settleUp'}>Settle Up</OpenModalButton>
                        </div>
                    </div>
                    <div>
                        {expenses.map(expense => (
                            <ExpenseTile key={expense.id} expense={expense} user={user}/>
                        ))}
                    </div>
                </div>
                <div className="right-content">
                </div>
            </div>
        </div>
    )
}
