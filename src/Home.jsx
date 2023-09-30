import React, { useRef, useState } from 'react';
import SendIcon from './assets/send.png';
import './styling/Home.scss';
import OpenAI from 'openai';

async function makeResponse(conversation_history) {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: conversation_history,
        model: 'gpt-4',
    });

    const chat_message = chatCompletion.choices[0].message.content;
    return chat_message;
}

function Home() {
    const inputRef = useRef();

    const [history, setHistory] = useState([]);
    const [conversation, setConversation] = useState([]);

    const handleInput = () => {
        const user_input = inputRef.current.value;
        const historyArr = [];
        historyArr.push(...history, { role: 'user', content: user_input });

        setConversation([...conversation, { input: user_input, output: '' }]);
        const handleResponse = async () => {
            try {
                const response = await makeResponse(historyArr);

                setHistory([
                    ...historyArr,
                    { role: 'assistant', content: response },
                ]);

                setConversation([
                    ...conversation,
                    { input: user_input, output: response },
                ]);
            } catch (err) {
                console.log('error', err);
            }
        };
        handleResponse();
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
