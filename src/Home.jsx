import React, { useRef, useState } from 'react';
import SendIcon from './assets/send.png';
import './styling/Home.scss';
import OpenAI from 'openai';

async function makeResponse(user_input_array = 'why is the sky blue') {
    const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: user_input_array }],
        model: 'gpt-4',
    });

    console.log(user_input_array);

    const chat_message = chatCompletion.choices[0].message.content;
    console.log(chat_message);
}

function Home() {
    const [inputs, setInputs] = useState([]);
    const inputRef = useRef();

    const handleInput = () => {
        const user_input = inputRef.current.value;
        setInputs([...inputs, user_input]);
        console.log(inputs[inputs.length - 1]);
        makeResponse(inputs[inputs.length - 1]);
        inputRef.current.value = '';
    };

    return (
        <div className='home-container'>
            <div className='input-container'>
                <input
                    ref={inputRef}
                    className='input-box'
                    type='text'
                    placeholder='Why is the sky blue?'
                ></input>
                <button className='submit-button' onClick={handleInput}>
                    <img src={SendIcon} alt='send-icon' />
                </button>
            </div>
        </div>
    );
}

export default Home;
