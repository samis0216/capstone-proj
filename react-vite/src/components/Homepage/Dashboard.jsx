import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loadUserGroupsThunk } from "../../redux/groups"
import './Dashboard.css'


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
            <h1 style={{ alignSelf: 'center' }}>Welcome, {user.username}</h1>
            <div className="homepage">
                <div className="left-bar">

                </div>
                <div className="middle-content">
                    {groupVal.map(group => (
                        <div className="group-tile">
                            <div>
                                <img src={group.group_pic_url} style={{ width: 50 }} alt="" />
                            </div>
                            <div>
                                <p>{group.name}</p>
                                <p>{group.organizer_id}</p>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="right-content">

                </div>
            </div>
        </div>
    )
}
