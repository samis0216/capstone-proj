import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateGroupThunk } from "../../redux/groups"
import { useModal } from "../../context/Modal"
import './UpdateGroup.css'
import { useNavigate } from "react-router-dom"

export default function UpdateGroup({ group, user }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imageUrl, setImageURL] = useState(group.group_pic_url)
    const [name, setName] = useState(group.name)
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [awsLoading, setAwsLoading] = useState(false)

    useEffect(() => {
        const newErrors = {}
        if (!name) {
            newErrors.name = 'Group name is required'
        }

        if (!imageUrl) {
            setImageURL(group.group_pic_url)
        }

        setErrors(newErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if (!Object.values(errors).length) {

            const form = new FormData()
            form.append('name', name)
            form.append('organizer_id', user.id)
            if (!imageUrl) setImageURL(group.group_pic_url)
            form.append('group_pic_url', imageUrl)
            setAwsLoading(true)
            const updatedGroup = await dispatch(updateGroupThunk(group.id, form))
            closeModal()
            navigate(`/groups/${updatedGroup.id}`)
        }
    }

    return (
        <div>
            <form encType="multipart/form-data" className="updateGroupModal">
                <h1>Update &quot;{group.name}&quot;</h1>
                <p style={{ fontStyle: "italic" }}>Image will remain the same if no image is uploaded.</p>
                <div style={{ display: "flex", alignItems: 'center', padding: 20 }}>
                    <div className="imageInput">
                        <img src="https://cdn-icons-png.flaticon.com/512/3372/3372849.png" alt="" style={{ width: 200 }} />
                        <label htmlFor="">
                            Image
                            <input type="file" accept="image/*" onChange={(e) => {
                                setImageURL(e.target.files[0])
                                console.log(e.target.files[0])
                            }
                            } />
                        </label>
                    </div>
                    <div>
                        {submitted && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        <label style={{display: "flex", flexDirection: 'column'}}>
                            New Group Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                    </div>
                </div>
                <button className='settleButtonTile'onClick={(e) => handleSubmit(e)}>Update</button>
                {(awsLoading) && <p className="loading-text">Loading...</p>}
            </form>
        </div>
    )
}
