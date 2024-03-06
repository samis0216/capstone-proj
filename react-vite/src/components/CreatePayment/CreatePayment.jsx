import { useDispatch, useSelector } from 'react-redux'
import './CreatePayment.css'
import { useEffect } from 'react'
import { loadAllExpensesThunk } from '../../redux/expenses'
import { loadUserExpenseDetailsThunk } from '../../redux/expense_details'
import { loadUserGroupsThunk } from '../../redux/groups'
import { useNavigate } from 'react-router-dom'
import { deleteDetailThunk } from '../../redux/expense_details'

export default function CreatePayment() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const details = Object.values(useSelector(state => state.expenseDetails))
    const expenses = useSelector(state => state.expenses)

    useEffect(() => {
        dispatch(loadUserExpenseDetailsThunk(user.id))
        dispatch(loadUserGroupsThunk(user.id))
        dispatch(loadAllExpensesThunk())
    }, [dispatch])

    const handlePayment = (detail) => {
        // const expenseDetail = {
        //     'id': detail.id,
        //     'expense_id': detail.expense_id,
        //     'contributer_id': detail.contributer_id,
        //     'amount': detail.amount,
        //     'settled': detail.settled
        // }

        dispatch(deleteDetailThunk(detail.id, user.id))
    }

    return (
        <div className="paymentPage">
            <div className="paymentHeader">
                <h1>Create Payment</h1>
                <p style={{padding: '5px'}}>Below is a list of your outstanding expense shares. Select &lsquo;Settle&lsquo; to indicate a fulfilled payment.</p>
            </div>
            <div className='detailTileContainer'>
                {details.map(detail => (
                    <div className='detailTile' key={detail.id}>
                        <div onClick={()=> navigate(`/expenses/${detail.expense_id}`)}>
                            <h4>{expenses?.[detail.expense_id]?.description}</h4>
                            <p>Your Share: ${detail.amount}</p>
                        </div>
                        <button className='settleButtonTile' onClick={() => handlePayment(detail)}>Settle</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
