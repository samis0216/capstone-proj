import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateGroupThunk } from "../../redux/groups"
import { useModal } from "../../context/Modal"
import './UpdateGroup.css'

export default function UpdateGroup({ group, user }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageURL] = useState(group.group_pic_url)
    const [name, setName] = useState(group.name)
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(()=> {
        const newErrors = {}
        if (!name) {
            newErrors.name = 'Group name is required'
        }

        if (!imageUrl) {
            setImageURL(group.group_pic_url)
        }

        setErrors(newErrors)
    }, [name, group.group_pic_url])

    const handleSubmit = (e) => {
        e.preventDefault()

        setSubmitted(true)

        if (!Object.values(errors).length) {

            const form = new FormData()
            form.append('name', name)
            form.append('organizer_id', user.id)
            if (!imageUrl) setImageURL(group.group_pic_url)
            form.append('group_pic_url', imageUrl)
            dispatch(updateGroupThunk(group.id, form))
            closeModal()
        }
    }

    return (
        <div className="updateGroupModal">
            <h1>Update &quot;{group.name}&quot;</h1>
            <p style={{fontStyle: "italic"}}>Image will remain the same if no image is uploaded.</p>
            <div style={{display: "flex", alignItems: 'center', padding: 20}}>
                <div className="imageInput">
                    <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt="" style={{ width: 200 }} />
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
                {submitted && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                <label htmlFor="">
                    Group Name
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>
                </div>
            </div>
            <button onClick={(e)=> handleSubmit(e)}>Submit</button>
        </div>
    )
}
