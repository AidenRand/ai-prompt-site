import React, { useRef, useState } from 'react';
import SendIcon from './assets/send.png';
import './styling/Home.scss';
import OpenAI from 'openai';

async function makeResponse(user_input_array) {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    console.log('user_input_array', user_input_array);
    // const messages = user_input_array.map(input => {
    //     return {

    //     }
    // })
    const chatCompletion = await openai.chat.completions.create({
        messages: user_input_array,
        model: 'gpt-4',
    });

    const chat_message = chatCompletion.choices[0].message.content;
    return chat_message;
}

function Home() {
    const [inputs, setInputs] = useState([]);
    const inputRef = useRef();

    const [conversation, setConversation] = useState([]);

    const handleInput = () => {
        const user_input = inputRef.current.value;
        // setInputs([...inputs, user_input]);
        // setConversation([
        //     ...conversation,
        //     { role: 'user', content: user_input },
        // ]);
        const convArr = [];
        convArr.push(...conversation, { role: 'user', content: user_input });
        console.log('my conversation', conversation);
        const handleResponse = async () => {
            try {
                // console.log('is this empty?', conversation);
                const response = await makeResponse(convArr);
                setConversation([
                    ...convArr,
                    { role: 'assistant', content: response },
                ]);
            } catch (err) {
                console.log('error', err);
            }
        };
        handleResponse();
        inputRef.current.value = '';
    };

    console.log(conversation);
    return (
        <div className='home-container'>
            <div className='prompt-container'>
                {conversation.map((messages, index) => (
                    <div className='input-div' key={index}>
                        <p className='user-input-text'>{messages.role}</p>
                        <p>{messages.content}</p>
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
