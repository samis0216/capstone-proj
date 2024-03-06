import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { loadOneExpenseThunk, updateExpenseThunk } from "../../redux/expenses";
import { loadUserGroupsThunk } from "../../redux/groups";
// import { useNavigate } from "react-router-dom";
import './UpdateExpense.css'


function UpdateExpenseModal({expense, userId}) {
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const [category, setCategory] = useState(expense.category);
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [groupId, setGroupId] = useState(expense.groupId)
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal();
    const userGroups = Object.values(useSelector(state => state.groups))
    // const group = useSelector(state =>state.groups[groupId])

    useEffect(()=> {
        dispatch(loadUserGroupsThunk(userId))
        dispatch(loadOneExpenseThunk(expense.id))
    }, [dispatch])

    useEffect(() => {
        const newErrors = {};
        if (!description.length) {
            newErrors.description = 'Description is required.'
        }
        if (description.length > 20) {
            newErrors.description = 'Description must be 20 characters or less.'
        }
        if (!category) {
            newErrors.category = 'Please select a category'
        }
        if (amount <= 0) {
            newErrors.amount = 'Amount must be a number greater than 0.'
        }
        if (!groupId) {
            newErrors.groupId = 'Group selection is required'
        }
        setErrors(newErrors);
    }, [description, amount, groupId, category])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if (!Object.values(errors).length) {
            let form = new FormData()
            form.append('category', category)
            form.append('description', description)
            form.append('amount', amount)
            form.append('payer_id', userId)
            form.append('group_id', groupId)

            dispatch(updateExpenseThunk(expense.id, form))
            closeModal()
        }
    };

    return (
        <div className="updateFormModal">
            <form className="formExpense">
                <h1>Update &quot;{expense.description}&quot;</h1>
                {submitted && errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                <label htmlFor="">
                    Description
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                {submitted && errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                <p>Category</p>
                <div className="categoryHolder" style={{gap: 20}}>
                    <div className="categoryOption" id={category == 'Food' ? 'selected' : 'not'} onClick={() => {
                        setCategory('Food')
                    }}>
                        <i className="fa-solid fa-bowl-food"></i>
                        <p>Food</p>
                    </div>
                    <div className="categoryOption" id={category == 'Entertainment' ? 'selected' : 'not'} onClick={() => {
                        setCategory('Entertainment')
                    }}>
                        <i className="fa-solid fa-champagne-glasses"></i>
                        <p>Entertainment</p>
                    </div>
                    <div className="categoryOption" id={category == 'Living Expenses' ? 'selected' : 'not'} onClick={() => {
                        setCategory('Living Expenses')
                    }}>
                        <p>Living Expenses</p>
                    </div>
                    <div className="categoryOption" id={category == 'Other' ? 'selected' : 'not'} onClick={() => {
                        setCategory('Other')
                    }}>
                        <p>Other</p>
                    </div>
                </div>
                {submitted && errors.amount && <p style={{ color: 'red' }}>{errors.amount}</p>}
                <label htmlFor="">
                    Amount
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                {submitted && errors.groupId && <p style={{ color: 'red' }}>{errors.groupId}</p>}
                <label htmlFor="">
                    Group
                    <select name="groupId" onChange={(e) => setGroupId(e.target.value)}>
                            <option value="">(select a group)</option>
                        {userGroups?.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default UpdateExpenseModal;
