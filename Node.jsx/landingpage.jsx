import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = ({ onComplete }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onComplete(name);
        }
    };

    return (
        <div className="landing-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="landing-content"
            >
                <h1 className="title">Welcome to Your Special Day</h1>
                <p className="subtitle">Please enter your beautiful name</p>

                <form onSubmit={handleSubmit} className="input-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name..."
                        className="name-input"
                        autoFocus
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="enter-btn"
                    >
                        Enter
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LandingPage;
