import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalloonPage.css';

const BalloonPage = ({ onComplete }) => {
    const [balloons, setBalloons] = useState([]);
    const [poppedCount, setPoppedCount] = useState(0);
    const targetPops = 5;

    useEffect(() => {
        const interval = setInterval(() => {
            if (balloons.length < 10) {
                const newBalloon = {
                    id: Date.now(),
                    x: Math.random() * 90, // Random left position (0-90%)
                    color: getRandomColor(),
                    speed: Math.random() * 5 + 5, // Random speed
                };
                setBalloons((prev) => [...prev, newBalloon]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [balloons]);

    const getRandomColor = () => {
        const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#DB7093', '#C0C0C0'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const popBalloon = (id) => {
        setBalloons((prev) => prev.filter((b) => b.id !== id));
        setPoppedCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= targetPops) {
                setTimeout(onComplete, 1000); // Wait a bit before transitioning
            }
            return newCount;
        });
    };

    return (
        <div className="balloon-container">
            <h2 className="instruction">Pop {targetPops - poppedCount} Balloons!</h2>
            <AnimatePresence>
                {balloons.map((balloon) => (
                    <motion.div
                        key={balloon.id}
                        initial={{ y: '110vh', opacity: 1 }}
                        animate={{ y: '-20vh' }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: balloon.speed, ease: 'linear' }}
                        className="balloon-wrapper"
                        style={{ left: `${balloon.x}%` }}
                        onClick={() => popBalloon(balloon.id)}
                        onAnimationComplete={() => {
                            // Remove balloon if it floats off screen without popping
                            setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
                        }}
                    >
                        <div className="balloon" style={{ backgroundColor: balloon.color }}>
                            <div className="string"></div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default BalloonPage;
