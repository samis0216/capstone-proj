import { useNavigate } from "react-router-dom"

export default function GroupTile({ group }) {
    const navigate = useNavigate()

    return (
    <div className="group-tile" onClick={()=> navigate(`/groups/${group.id}`)}>
        <div>
            <img src={group.group_pic_url} style={{ width: 50 }} alt="" />
        </div>
        <div>
            <p>{group.name}</p>
            <p>{group.organizer_id}</p>
        </div>
    </div>
    )
}
