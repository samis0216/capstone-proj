import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateGroupThunk } from "../../redux/groups"
import { useModal } from "../../context/Modal"

export default function UpdateGroup({ group, user }) {
    const dispatch = useDispatch()
    const [imageUrl, setImageURL] = useState(group.group_pic_url)
    const [name, setName] = useState(group.name)
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('name', name)
        form.append('organizer_id', user.id)
        form.append('group_pic_url', imageUrl)
        dispatch(updateGroupThunk(group.id, form))
        closeModal()
    }

    return (
        <>
            <div>
                <div>
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
                <label htmlFor="">
                    Group Name
                    <input type="text" onChange={(e)=> setName(e.target.value)}/>
                </label>
            </div>
            <button onClick={(e)=> handleSubmit(e)}>Submit</button>
        </>
    )
}
