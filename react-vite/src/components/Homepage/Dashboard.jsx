import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import './Dashboard.css'
import GroupTile from "../Tiles/GroupTile"


export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const groups = useSelector(state => state.groups)
    const groupVal = Object.values(groups)

    useEffect(() => {
        dispatch(loadUserGroupsThunk(user.id))
    }, [dispatch])
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
                    </div>
                </div>
                <div className="middle-content">
                    <h2 className="middle-heading">Dashboard</h2>
                    {groupVal.map(group => (
                        <GroupTile key={group.id} group={group}/>
                    ))}
                </div>
                <div className="right-content">

                </div>
            </div>
        </div>
    )
}
