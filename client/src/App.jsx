import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PaperPlaneRight } from 'phosphor-react'
import { Logo, User } from 'images'
import Loader from 'components/Loader'
import Sidebar from 'components/Sidebar'
import 'style/Global.scss'

const App = () => {

    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.querySelector(".home-styled").scrollTop = document.querySelector(".home-styled").scrollHeight;
    }, [posts]);

    const fetchBotResponse = async () => {
        const { data } = await axios.post(
            //"https://chatgpt-ai-app-od21.onrender.com",
            "http://localhost:4000/",
            { input },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    };

    const autoTypingBotResponse = (text) => {
        let index = 0;
        let interval = setInterval(() => {
            if (index < text.length) {
                setPosts((prevState) => {
                    let lastItem = prevState.pop();
                    if (lastItem.type !== "bot") {
                        prevState.push({
                            type: "bot",
                            post: text.charAt(index - 1),
                        });
                    } else {
                        prevState.push({
                            type: "bot",
                            post: lastItem.post + text.charAt(index - 1),
                        });
                    }
                    return [...prevState];
                });
                index++;
            } else {
                clearInterval(interval);
            }
        }, 20);
    };

    const onSubmit = () => {
        if (input.trim() === "") return;
        updatePosts(input);
        updatePosts("loading...", false, true);
        setInput("");
        fetchBotResponse().then((res) => {
            console.log(res.bot.trim());
            updatePosts(res.bot.trim(), true);
        });
    };

    const updatePosts = (post, isBot, isLoading) => {
        if (isBot) {
            autoTypingBotResponse(post);
        } else {
            setPosts((prevState) => {
                return [
                    ...prevState,
                    {
                        type: isLoading ? "loading" : "user",
                        post,
                    },
                ];
            });
        }
    };

    const onKeyUp = (e) => {
        if (e.key === "Enter" || e.which === 13) {
            onSubmit();
        }
    };

    return (
        <div className='app-styled'>
            <Sidebar />
            <div className='home-styled'>
                {
                    posts.map((post, i) => (
                        <div
                            key={i}
                            className={`chat-styled ${post.type === "bot" || post.type === "loading" ? "bot-bg" : ""}`}
                        >
                            <div className='chat-container'>
                                {post.type === "bot" || post.type === "loading" ? <Logo /> : <img src={User} alt='user' />}
                                {post.type === "loading" ? (
                                    <Loader />
                                ) : (
                                    <div>{post.post}</div>
                                )}
                            </div>
                        </div>
                    ))
                }

                <div className='message-styled'>
                    <div className='message-container'>
                        <div className='message-input'>
                            <input
                                autoFocus
                                type="text"
                                placeholder='Pregunta cualquier cosa'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyUp={onKeyUp}
                            />
                            <PaperPlaneRight size={20} onClick={onSubmit} />
                        </div>
                        <span>ChatGPT puede producir información inexacta sobre personas, lugares o hechos.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App