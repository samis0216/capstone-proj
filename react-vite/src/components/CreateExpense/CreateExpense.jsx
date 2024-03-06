import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { createUserExpenseThunk } from "../../redux/expenses";
import { loadUserGroupsThunk } from "../../redux/groups";
import { useNavigate } from "react-router-dom";
// import { loadUserGroupsThunk } from "../../redux/groups";
import './CreateExpense.css'
import { createDetailsThunk } from "../../redux/expense_details";

function CreateExpense() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState('')
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)

    const user = useSelector(state => state.session.user)
    const userGroups = Object.values(useSelector(state => state.groups))

    useEffect(() => {
        dispatch(loadUserGroupsThunk(user.id))
    }, [dispatch])

    if (!user) navigate('/')

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
        if (groupId === '') {
            newErrors.groupId = 'Group selection is required'
        }
        setErrors(newErrors);
    }, [description, amount, groupId, category])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (!Object.values(errors).length) {
            let form = new FormData()
            form.append('category', category)
            form.append('description', description)
            form.append('amount', amount)
            form.append('payer_id', user.id)
            form.append('group_id', groupId)

            // const expense = dispatch(createUserExpenseThunk(user.id, form))
            // dispatch(createDetailsThunk(expense.id, user.id, groupId))
            navigate('/dashboard')
        }

    };

    return (
        <div className="createExpenseMain">
            <form className="createExpenseForm">
                <h1>Add an Expense</h1>
                <div style={{ width: 700 }}>
                    <hr style={{ display: "block" }} />
                </div>
                {/* <p style={{width: 600}}>Create a group expense. This will set you as the expense coverer and split the expense amount evenly among all in the selected group</p> */}
                <div style={{ display: "flex", flexDirection: "column", width: 400 }}>
                    <label style={{ display: 'flex' }}>
                        Description {submitted && errors.description && <p style={{ color: 'red', marginLeft: 5 }}>{errors.description}</p>}
                    </label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <p style={{ display: 'flex' }}>Expense Category {submitted && errors.category && <p style={{ color: 'red', marginLeft: 5 }}>{errors.category}</p>}</p>
                <div className="categoryHolder">
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
                        <i className="fa-solid fa-couch" style={{ color: "#ffffff" }}></i>
                        <p>Living Expenses</p>
                    </div>
                    <div className="categoryOption" id={category == 'Other' ? 'selected' : 'not'} onClick={() => {
                        setCategory('Other')
                    }}>
                        <i className="fa-solid fa-asterisk" style={{ color: "#ffffff" }}></i>
                        <p>Other</p>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: 400 }}>
                    <label style={{ display: "flex", width: 400 }}>
                        Amount ($)
                        {submitted && errors.amount && <p style={{ color: 'red', marginLeft: 5 }}>{errors.amount}</p>}
                    </label>
                    <input type="number" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: 400 }}>
                    <label style={{ display: "flex", width: 400 }}>Group
                        {submitted && errors.groupId && <p style={{ color: 'red', marginLeft: 5 }}>{errors.groupId}</p>}
                    </label>
                    <select name="" id="" onChange={(e) => setGroupId(e.target.value)}>
                        <option disabled={false}>(select option)</option>
                        {userGroups?.map(group => (
                            <option key={group.id} value={group.id} onClick={(e) => setGroupId(e.target.value)}>{group.name}</option>
                        ))}
                    </select>
                </div>
                <button className='submitCreateExpense' onClick={(e) => handleSubmit(e)}>Create Expense</button>
            </form>
        </div>
    );
}

export default CreateExpense;
