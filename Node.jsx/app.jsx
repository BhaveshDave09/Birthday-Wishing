import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import LandingPage from './components/LandingPage';
import BalloonPage from './components/BalloonPage';
import CakePage from './components/CakePage';
import MessagePage from './components/MessagePage';

function App() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');

  const handleNameSubmit = (userName) => {
    setName(userName);
    setPage(1);
  };

  const handleBalloonComplete = () => {
    setPage(2);
  };

  const handleCakeComplete = () => {
    setPage(3);
  };

  return (
    <>
      <Background />
      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onComplete={handleNameSubmit} />
          </motion.div>
        )}

        {page === 1 && (
          <motion.div
            key="balloons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BalloonPage onComplete={handleBalloonComplete} />
          </motion.div>
        )}

        {page === 2 && (
          <motion.div
            key="cake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CakePage onComplete={handleCakeComplete} />
          </motion.div>
        )}

        {page === 3 && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MessagePage name={name} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
