import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadOneExpenseThunk, updateExpenseThunk } from "../../redux/expenses";
import { loadUserGroupsThunk } from "../../redux/groups";
// import { useNavigate } from "react-router-dom";


function UpdateExpenseModal({expense, userId}) {
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const [category, setCategory] = useState(expense.category);
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [groupId, setGroupId] = useState(expense.groupId)
    // const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const userGroups = Object.values(useSelector(state => state.groups))

    useEffect(()=> {
        dispatch(loadUserGroupsThunk(userId))
        dispatch(loadOneExpenseThunk(expense.id))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append('category', category)
        form.append('description', description)
        form.append('amount', amount)
        form.append('payer_id', userId)
        form.append('group_id', groupId)

        dispatch(updateExpenseThunk(userId, form))
        closeModal()
    };

    return (
        <div>
            <form>
                <label htmlFor="">
                    Description
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label htmlFor="">
                    Category
                    <select name="category" onChange={(e) => setCategory(e.target.value)}>
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
                <label htmlFor="">
                    Group
                    <select name="groupId" onChange={(e) => setGroupId(e.target.value)}>
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

export default UpdateExpenseModal;
