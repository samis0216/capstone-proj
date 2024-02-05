import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteGroupThunk, loadOneGroupThunk } from "../../redux/groups"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateGroup from "../CreateGroup/UpdateGroup"

export default function GroupDetails() {
    const { groupId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const group = useSelector(state => state.groups[groupId])
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(loadOneGroupThunk(user.id, groupId))
    }, [dispatch])

    if (!group) return null

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteGroupThunk(user.id, groupId))
        navigate('/dashboard')
    }

    return (
        <div>
            <h1>{group.name}</h1>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
            <OpenModalButton modalComponent={<UpdateGroup group={group} user={user}/>} buttonText={'Update'}/>
        </div>
    )
}
