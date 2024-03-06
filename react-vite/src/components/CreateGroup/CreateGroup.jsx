import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupThunk } from "../../redux/groups";
import "./CreateGroup.css";
import { useNavigate } from "react-router-dom";
import { createGroupMemberThunk } from "../../redux/group_members";

export default function CreateGroup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [imageUrl, setImageURL] = useState('')
    const [errors, setErrors] = useState({});
    const [display, setDisplay] = useState(false)
    const [awsLoading, setAwsLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [member1, setMember1] = useState({})
    const [member2, setMember2] = useState({})
    const [member3, setMember3] = useState({})
    const user = useSelector(state => state.session.user)

    useEffect(()=> {
        const newErrors = {}
        if (!name) {
            newErrors.name = 'Group name is required'
        }

        if (!imageUrl) {
            newErrors.imageUrl = 'Please upload a group profile picture.'
        }

        setErrors(newErrors)
    }, [name, imageUrl])

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSubmitted(true)

        if (!Object.values(errors).length) {
            const form = new FormData()
            form.append('name', name)
            form.append('organizer_id', user.id)
            form.append('group_pic_url', imageUrl)
            setAwsLoading(true);
            const newGroup = await dispatch(createGroupThunk(user.id, form));

            const form2 = new FormData()
            form2.append('name', user.username)
            form2.append('email', user.email)
            form2.append('group_id', newGroup.id)
            dispatch(createGroupMemberThunk(form2))

            const members = []
            for (let member of [member1, member2, member3]) {
                if (member.name && member.email) {
                    members.push(member)
                }
            }

            for (let member of members) {
                const form = new FormData()
                form.append('name', member.name)
                form.append('email', member.email)
                form.append('group_id', newGroup.id)
                dispatch(createGroupMemberThunk(form))
            }
            navigate(`/groups/${newGroup.id}`)
        }
    }

    return (
        <div className="createGroupPage">
            <form className="createGroupContainer" encType="multipart/form-data">
                <div className="imageUpload">
                    <img src="https://cdn-icons-png.flaticon.com/512/3372/3372849.png" alt="" style={{ width: 200 }} />
                    <input type="file" accept="image/*" onChange={(e) => {
                                setImageURL(e.target.files[0])
                                }
                            }/>
                    {submitted && errors.imageUrl && <p>{errors.imageUrl}</p>}
                </div>
                <div className="infoContainer">
                    <p>START A NEW GROUP</p>
                    <h4>My group shall be called...</h4>
                    {submitted && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                    <input type="text" onChange={(e) => {
                        setName(e.target.value)
                        setDisplay(true)
                    }} />
                    {display &&
                        <div className="groupMembersContainer">
                            <hr />
                            <p>GROUP MEMBERS</p>
                            <p style={{fontStyle: "italic"}}>(do not include yourself)</p>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}} placeholder="Name" onChange={(e)=>setMember1({...member1, name: e.target.value})}/>
                                <input type="text" style={{width: 179.2}} placeholder="Email" onChange={(e)=>setMember1({...member1, email: e.target.value})}/>
                            </div>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}} placeholder="Name" onChange={(e)=>setMember2({...member2, name: e.target.value})}/>
                                <input type="text" style={{width: 179.2}} placeholder="Email" onChange={(e)=>setMember2({...member2, email: e.target.value})}/>
                            </div>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}} placeholder="Name" onChange={(e)=>setMember3({...member3, name: e.target.value})}/>
                                <input type="text" style={{width: 179.2}} placeholder="Email" onChange={(e)=>setMember3({...member3, email: e.target.value})}/>
                            </div>
                        </div>
                    }
                    <button className='submitCreateExpense' style={{ width: 316, alignSelf: "center", backgroundColor: '#5BC5A6'}} disabled={Object.values(errors).length} onClick={(e)=> handleSubmit(e)}>Create Group</button>
                    {(awsLoading) && <p className="loading-text">Loading...</p>}
                </div>
            </form>
        </div>
    )
}
