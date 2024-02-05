import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { createUserExpenseThunk } from "../../redux/expenses";
import { loadUserGroupsThunk } from "../../redux/groups";
// import { useNavigate } from "react-router-dom";
// import { loadUserGroupsThunk } from "../../redux/groups";

function CreateExpense() {
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const [category, setCategory] = useState("Food");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState('')
    // const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)
    const userGroups = Object.values(useSelector(state => state.groups))

    useEffect(()=> {
        dispatch(loadUserGroupsThunk(user.id))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = new FormData()
        form.append('category', category)
        form.append('description', description)
        form.append('amount', amount)
        form.append('payer_id', user.id)
        form.append('group_id', groupId)

        dispatch(createUserExpenseThunk(user.id, form))
        // closeModal()
        // navigate('/dashboard')
    };

    return (
        <div>
            <form>
                <label htmlFor="">
                    Description
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label htmlFor="">
                    Label
                    <select name="category" id="" onChange={(e) => setCategory(e.target.value)}>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Living Expenses">Living Expenses</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label htmlFor="">
                    Amount
                    <input type="input" onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label htmlFor="">Group
                    <select name="" id="" onChange={(e) => setGroupId(e.target.value)}>
                        <option disabled={false}>(select option)</option>
                        {userGroups?.map(group => (
                            <option key={group.id} value={group.id} onClick={(e)=> setGroupId(e.target.value)}>{group.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default CreateExpense;
