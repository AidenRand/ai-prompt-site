import React from 'react';
import SendIcon from './assets/send-message.png';
import './styling/Home.scss';

function Home() {
    return (
        <div className='home-container'>
            <div className='input-container'>
                <input
                    className='input-box'
                    type='text'
                    placeholder='Why is the sky blue?'
                ></input>
                <button className='submit-button'>
                    <img src={SendIcon} alt='send-icon' />
                </button>
            </div>
        </div>
    );
}

export default Home;
