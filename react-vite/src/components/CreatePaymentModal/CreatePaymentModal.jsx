import './CreatePaymentModal.css'
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';

export default function CreatePaymentModal() {
    const { closeModal } = useModal();
    const navigate = useNavigate()
    return (
        <div className="paymentModal">
            <div className="paymentModalHeader">
                <h3>Settle Up</h3>
                <i className="fa-solid fa-xmark" style={{cursor: 'pointer'}} onClick={()=> closeModal()}></i>
            </div>
            <div className="paymentModalMiddle">
                <p>Choose a payment method</p>
                <button className='paymentOption' id='record' onClick={()=> {closeModal(); navigate('/payments/new')}}>Record cash payment</button>
                <button className='paymentOption' id='paypal' onClick={()=> alert('Feature coming soon...')}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="" style={{width: 100}}/></button>
                <button className='paymentOption' id='venmo' onClick={() => alert('Feature coming soon...')}><img src="https://download.logo.wine/logo/Venmo/Venmo-Logo.wine.png" alt="" style={{width: 100}}/></button>
                <p style={{color: 'gray'}}>Splitti charges no extra fees.</p>
            </div>

        </div>
    )
}
