import './LandingPage.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import SignupFormModal from '../SignupFormModal'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="landingPage">
            <div className="firstBlock">
                <div className="leftContent">
                    <div className="middleContent">
                        <h1 style={{width: 367, fontSize: 40}}>Less stress when sharing expenses.</h1>
                        <div className="iconsDiv">
                            <i className="fa-solid fa-plane-departure"></i>
                            <i className="fa-solid fa-house fa-flip-horizontal" style={{ color: "#B197FC" }}></i>
                            <i className="fa-solid fa-heart" style={{ color: "#bd0000" }}></i>
                            <i className="fa-solid fa-asterisk"></i>
                        </div>
                        <div>
                            <p style={{width: 320}}> Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
                        </div>
                    </div>
                    <OpenModalButton modalComponent={<SignupFormModal />} buttonText={'Sign Up'} buttonStyle={'signUpButtonLarge'}/>
                    <div>
                        <p>Free for <i className="fa-brands fa-apple"></i> iPhone, <i className="fa-brands fa-android"></i> Android, and web.</p>
                    </div>
                </div>
                <div className='imgContainer'>
                    <img src="https://www.pngall.com/wp-content/uploads/12/Asterisk-Mark-PNG-Images.png" alt="" style={{width: 500}}/>
                </div>
            </div>
            <div className="bottomContentLanding">
                <div className="TrackBalances1">
                    <div className='bottomTextImage'>
                        <h4 style={{fontSize: 24, fontWeight: 300}}>Track balances</h4>
                        <p>Keep track of shared expenses, balances, and who owes who.</p>
                    </div>
                    <div>
                        <img src="http://aa-dt-image-bucket-767398031119.s3.amazonaws.com/f4af5d0ba6214c8ea986cbed0ee331af.png" className='phoneImgs' alt="" />
                    </div>
                </div>
                <div className="OrganizeExpenses">
                    <div className='bottomTextImage'>
                        <h4 style={{fontSize: 24, fontWeight: 300}}>Organize expenses</h4>
                        <p>Split expenses with any group: trips, housemates, friends, and family.</p>
                    </div>
                    <div>
                        <img src="http://aa-dt-image-bucket-767398031119.s3.amazonaws.com/e3c076592b4649c7a03b5864888e962f.png" className='phoneImgs' alt="" />
                    </div>
                </div>
            </div>
            <footer>
                <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
                    <p>Created by Sami Samman, inspired by Splitwise</p>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: 400}}>
                        <a className='links' href="https://github.com/samis0216/capstone-proj"><i className="fa-brands fa-github"></i> Github</a>
                        <a className='links' href="https://www.linkedin.com/in/sami-s-4a6a17129"><i className="fa-brands fa-linkedin" ></i> My LinkedIn</a>
                        <a className='links' href="https://samis0216.github.io"><i className="fa-solid fa-briefcase"></i> My Portfolio</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
