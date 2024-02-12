import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupThunk } from "../../redux/groups";
import "./CreateGroup.css";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [imageUrl, setImageURL] = useState('')
    const [errors, setErrors] = useState({});
    const [display, setDisplay] = useState(false)
    const [awsLoading, setAwsLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector(state => state.session.user)

    console.log(awsLoading, submitted)

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
            navigate(`/groups/${newGroup.id}`)
        }
    }

    return (
        <div className="createGroupPage">
            <form className="createGroupContainer" encType="multipart/form-data">
                <div className="imageUpload">
                    <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt="" style={{ width: 200 }} />
                    <input type="file" accept="image/*" onChange={(e) => {
                                setImageURL(e.target.files[0])
                                console.log(e.target.files[0])
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
                            <p style={{fontStyle: "italic"}}>(group member feature coming soon...)</p>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}}/>
                                <input type="text" style={{width: 179.2}}/>
                            </div>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}}/>
                                <input type="text" style={{width: 179.2}}/>
                            </div>
                            <div className="groupMembers">
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' alt="" style={{ width: 26 }} />
                                <input type="text" style={{width: 118}}/>
                                <input type="text" style={{width: 179.2}}/>
                            </div>
                        </div>
                    }
                    <button style={{ width: 316, alignSelf: "center" }} disabled={Object.values(errors).length} onClick={(e)=> handleSubmit(e)}>Submit</button>
                    {(awsLoading) && <p className="loading-text">Loading...</p>}
                </div>
            </form>
        </div>
    )
}
