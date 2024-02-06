import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { createUserExpenseThunk } from "../../redux/expenses";
import { loadUserGroupsThunk } from "../../redux/groups";
import { useNavigate } from "react-router-dom";
// import { loadUserGroupsThunk } from "../../redux/groups";
import './CreateExpense.css'

function CreateExpense() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [selected, setSelected] = useState('')
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState('')
    // const [errors, setErrors] = useState({});
    console.log(category)

    const user = useSelector(state => state.session.user)
    const userGroups = Object.values(useSelector(state => state.groups))

    useEffect(() => {
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
        navigate('/dashboard')
    };

    return (
        <div className="createExpenseMain">
            <form className="createExpenseForm">
            <h1>Add an Expense</h1>
                <label htmlFor="">
                    Description
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />
                </label>
                <p>Category</p>
                <div className="categoryHolder">
                    <div className="categoryOption" onClick={()=> {
                        setCategory('Food')
                    }}>
                        <i className="fa-solid fa-bowl-food"></i>
                        <p>Food</p>
                    </div>
                    <div className="categoryOption" onClick={()=> {
                        setCategory('Entertainment')
                    }}>
                        <i className="fa-solid fa-champagne-glasses"></i>
                        <p>Entertainment</p>
                    </div>
                    <div className="categoryOption" onClick={()=> {
                        setCategory('Living Expenses')

                    }}>
                        <p>Living Expenses</p>
                    </div>
                    <div className="categoryOption" onClick={()=> {
                        setCategory('Other')

                    }}>
                        <p>Other</p>
                    </div>
                </div>
                <label htmlFor="">
                    Amount
                    <input type="input" onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label htmlFor="">Group
                    <select name="" id="" onChange={(e) => setGroupId(e.target.value)}>
                        <option disabled={false}>(select option)</option>
                        {userGroups?.map(group => (
                            <option key={group.id} value={group.id} onClick={(e) => setGroupId(e.target.value)}>{group.name}</option>
                        ))}
                    </select>
                </label>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default CreateExpense;
