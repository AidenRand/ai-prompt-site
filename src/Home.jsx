import React, { useRef, useState } from 'react';
import SendIcon from './assets/send.png';
import './styling/Home.scss';
import OpenAI from 'openai';

function getMessageHistory(user_input_array) {
    for (let i = 0; i < user_input_array.length; i++) {
        console.log(i);
    }
}

async function makeResponse(user_input) {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: user_input }],
        model: 'gpt-4',
    });

    console.log(user_input);

    const chat_message = chatCompletion.choices[0].message.content;
    return chat_message;
}

function Home() {
    const [inputs, setInputs] = useState([]);
    const inputRef = useRef();

    const [conversation, setConversation] = useState([]);

    const handleInput = () => {
        const user_input = inputRef.current.value;
        setInputs([...inputs, user_input]);
        setConversation([...conversation, { input: user_input, output: '' }]);
        getMessageHistory(inputs);

        const handleResponse = async () => {
            try {
                const response = await makeResponse(user_input);
                setConversation([
                    ...conversation,
                    {
                        input: user_input,
                        output: response,
                    },
                ]);
            } catch (err) {
                console.log('error', err);
            }
        };
        handleResponse();

        // console.log(inputRef.current.value + conversation);
        console.log(typeof inputs);

        inputRef.current.value = '';
    };

    return (
        <div className='home-container'>
            <div className='prompt-container'>
                {conversation.map((messages, index) => (
                    <div className='input-div' key={index}>
                        <p className='user-input-text'>{messages.input}</p>
                        <p>{messages.output}</p>
                    </div>
                ))}
            </div>
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
