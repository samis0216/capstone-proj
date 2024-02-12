import { useNavigate } from "react-router-dom"

export function ExpenseTile({expense}) {

    const navigate = useNavigate()
    return (
        <div className="expense-tile" onClick={() => navigate(`/expenses/${expense.id}`)}>
            <h4>{expense.description}</h4>
            <p>{expense.category}</p>
            <p>${expense.amount}</p>
        </div>
    )
}