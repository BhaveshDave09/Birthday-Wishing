import React from 'react';
import { motion } from 'framer-motion';
import './MessagePage.css';

const MessagePage = ({ name }) => {
    return (
        <div className="message-container">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className="card"
            >
                <div className="gif-container">
                    <img
                        src="https://media.tenor.com/ZflUcQVPYmkAAAAi/love.gif"
                        alt="Heart GIF"
                        style={{
                            width: '250px',
                            height: '250px',
                            objectFit: 'contain',
                            borderRadius: '15px'
                        }}
                    />
                </div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="birthday-text"
                >
                    Happy Birthday, {name}!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="wish-text"
                >
                    Dear {name}, May your day be filled with Love ❤️, Laughter, and Endless Joy.
                    You are very special to me and deserve the world!
                </motion.p>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{
                        textAlign: 'right',
                        marginTop: '2rem',
                        fontSize: '1.3rem',
                        color: 'var(--primary-pink)',
                        fontStyle: 'italic'
                    }}
                >
                    ~ Bhavesh
                </motion.p>
            </motion.div>
        </div>
    );
};

export default MessagePage;
