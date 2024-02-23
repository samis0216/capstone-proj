import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export function ExpenseTile({ expense, user }) {
    const group = useSelector((state) => state.groups[expense.group_id])
    console.log(group)
    const navigate = useNavigate()
    return (
        <div className="expense-tile" onClick={() => navigate(`/expenses/${expense.id}`)}>
            <div>
                <h4>{expense.description}</h4>
                <p>{group?.name}</p>
                <p>{expense.category}</p>
            </div>
            <p style={{color: 'red'}}>-${expense.amount}</p>
        </div>
    )
}
