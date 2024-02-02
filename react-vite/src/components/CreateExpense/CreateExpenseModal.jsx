import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createUserExpenseThunk } from "../../redux/expenses";
import { useNavigate } from "react-router-dom";
import { loadUserGroupsThunk } from "../../redux/groups";

function CreateExpenseModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState("")
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)
    const userGroups = Object.values(useSelector(state => state.groups))

    // useEffect(()=> {
    // }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        form = new FormData()
        form.append('category', category)
        form.append('description', description)
        form.append('amount', amount)
        form.append('payer_id', payer_id)
        form.append('group_id', groupId)

        dispatch(createUserExpenseThunk(user.id, form))
        // closeModal()
        // navigate('/dashboard')
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </label>
                <select name="category" id="" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Living Expenses">Living Expenses</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="">
                    <input type="input" onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label htmlFor="">Group
                    <select name="" id="" onChange={(e)=> setGroupId(e.target.value)}>
                        {userGroups?.map(group => (
                            <option value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default CreateExpenseModal;
