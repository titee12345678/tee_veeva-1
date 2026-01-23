/* Ultra-Smooth Interactive Engine */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Glow Effect
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // 2. Reveal Elements on Scroll
    const revealElements = () => {
        const elements = document.querySelectorAll('.glass-card, .gallery-item, .btn-premium, h1, h2, p');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                el.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check

    // 3. Floating Particles Generator
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random heart or circle
        const isHeart = Math.random() > 0.5;
        if (isHeart) {
            particle.innerHTML = '❤';
            particle.style.color = `hsl(${Math.random() * 20 + 340}, 100%, 70%)`;
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        } else {
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 0.3)`;
            particle.style.borderRadius = '50%';
        }

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '110vh';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 20000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 300);
    }
    // Continue creating particles
    setInterval(createParticle, 2000);

    // 4. Parallax Effect for Glass Cards
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.glass-card');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        cards.forEach(card => {
            // Only apply if not on mobile
            if (window.innerWidth > 768) {
                card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });
    });
});
