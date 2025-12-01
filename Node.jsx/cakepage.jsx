import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CakePage.css';

const CakePage = ({ onComplete }) => {
    const [candles, setCandles] = useState([true, true, true, true, true]); // 5 candles, all lit

    const blowCandle = (index) => {
        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);
    };

    useEffect(() => {
        if (candles.every((c) => !c)) {
            setTimeout(onComplete, 2000); // Wait 2 seconds after all candles are out
        }
    }, [candles, onComplete]);

    return (
        <div className="cake-container">
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="instruction"
            >
                Make a Wish & Blow Out the Candles!
            </motion.h2>

            <div className="cake-wrapper">
                <div className="cake">
                    <div className="plate"></div>
                    <div className="layer layer-bottom"></div>
                    <div className="layer layer-middle"></div>
                    <div className="layer layer-top"></div>
                    <div className="icing"></div>

                    <div className="candles">
                        {candles.map((isLit, index) => (
                            <div key={index} className="candle">
                                <div className="wax"></div>
                                <AnimatePresence>
                                    {isLit && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="flame"
                                            onClick={() => blowCandle(index)}
                                        ></motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for AnimatePresence
import { AnimatePresence } from 'framer-motion';

export default CakePage;
