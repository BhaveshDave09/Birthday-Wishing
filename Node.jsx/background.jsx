import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const particleCount = 100;
        const heartCount = 20;

        class Particle {
            constructor(type) {
                this.type = type; // 'sparkle' or 'heart'
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = type === 'sparkle' ? Math.random() * 2 + 1 : Math.random() * 15 + 10;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random();
                this.fadeSpeed = Math.random() * 0.02 + 0.005;
                this.fadingIn = Math.random() > 0.5;
                this.color = type === 'sparkle' ? '#C0C0C0' : '#FF1493'; // Silver or DeepPink
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Twinkle effect for sparkles
                if (this.type === 'sparkle') {
                    if (this.fadingIn) {
                        this.opacity += this.fadeSpeed;
                        if (this.opacity >= 1) this.fadingIn = false;
                    } else {
                        this.opacity -= this.fadeSpeed;
                        if (this.opacity <= 0) this.fadingIn = true;
                    }
                }
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                if (this.type === 'sparkle') {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Draw Heart
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    const topCurveHeight = this.size * 0.3;
                    ctx.moveTo(this.x, this.y + topCurveHeight);
                    // top left curve
                    ctx.bezierCurveTo(
                        this.x, this.y,
                        this.x - this.size / 2, this.y,
                        this.x - this.size / 2, this.y + topCurveHeight
                    );
                    // bottom left curve
                    ctx.bezierCurveTo(
                        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
                        this.x, this.y + (this.size + topCurveHeight) / 2,
                        this.x, this.y + this.size
                    );
                    // bottom right curve
                    ctx.bezierCurveTo(
                        this.x, this.y + (this.size + topCurveHeight) / 2,
                        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
                        this.x + this.size / 2, this.y + topCurveHeight
                    );
                    // top right curve
                    ctx.bezierCurveTo(
                        this.x + this.size / 2, this.y,
                        this.x, this.y,
                        this.x, this.y + topCurveHeight
                    );
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle('sparkle'));
            }
            for (let i = 0; i < heartCount; i++) {
                particles.push(new Particle('heart'));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                background: 'black',
            }}
        />
    );
};

export default Background;
