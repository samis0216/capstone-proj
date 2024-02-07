import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteGroupThunk, loadOneGroupThunk } from "../../redux/groups"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateGroup from "../CreateGroup/UpdateGroup"
import "./GroupDetails.css"
import { loadGroupExpensesThunk } from "../../redux/expenses"
import { ExpenseTile } from "../Tiles/ExpenseTile"
import { loadGroupMembersThunk } from "../../redux/group_members"

export default function GroupDetails() {
    const { groupId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const group = useSelector(state => state.groups[groupId])
    const user = useSelector(state => state.session.user)
    const expenses = Object.values(useSelector(state => state.expenses))
    const groupMembers = useSelector(state => state.groupMembers)

    useEffect(() => {
        dispatch(loadOneGroupThunk(user.id, groupId))
        dispatch(loadGroupExpensesThunk(groupId))
        dispatch(loadGroupMembersThunk(groupId))
    }, [dispatch])

    if (!group || !groupMembers || !expenses) return null

    const handleDelete = (e) => {
        e.preventDefault()

        if (window.confirm(`Are you sure you want to delete ${group.name}?`)) {
            dispatch(deleteGroupThunk(user.id, groupId))
            navigate('/dashboard')
        }
    }

    return (
        <div className="groupDetailsPage">
            <div className="groupDetailsContainer">
                <div className="groupDetails">
                    <img src={group.group_pic_url} alt="group_image" className="groupPics" />
                    <h1>{group.name}</h1>
                    <div className="buttonsContainer">
                        <OpenModalButton modalComponent={<UpdateGroup group={group} user={user} />} buttonText={'Update'} />
                        <button id='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
                    </div>
                </div>
                <div className="expensesMembersContainer">
                    <div className="groupExpensesContainer">
                        <h3>Expenses</h3>
                        {expenses.map(expense => (
                            <ExpenseTile key={expense.id} expense={expense} />
                        ))}
                    </div>
                    <div className='membersContainer'>
                        <h3>Members</h3>
                        <hr />
                        {Object.values(groupMembers).map(member => (
                            <div>
                                <p>{member.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
