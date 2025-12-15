document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Live Age Counter ---
    const birthDate = new Date('2001-12-19T00:00:00'); 
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        if(countdownElement) {
            countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    setInterval(updateAge, 1000);
    updateAge();

    // --- 2. Animations (AOS) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    // --- 3. Gallery ---
    const galleryEl = document.getElementById('lightgallery');
    if(galleryEl && typeof lightGallery !== 'undefined') {
        try {
            lightGallery(galleryEl, {
                speed: 500,
                download: false,
                mode: 'lg-fade'
            });
        } catch (e) {
            console.warn('lightGallery init failed:', e);
        }
    }

    // --- 4. Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: 300, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // --- 5. Sakura Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext && canvas.getContext('2d');
        if (!ctx) {
            console.warn('Canvas 2D context not available.');
        } else {
            let petals = [];
            const numPetals = 40; 

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            function Petal() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.w = 20 + Math.random() * 15;
                this.h = 15 + Math.random() * 10;
                this.opacity = Math.min(1, this.w / 50);
                this.flip = Math.random();
                this.xSpeed = 0.5 + Math.random() * 1.2;
                this.ySpeed = 0.5 + Math.random() * 1.2;
            }

            Petal.prototype.draw = function() {
                // Reset if off-screen (use logical OR)
                if (this.y > canvas.height || this.x > canvas.width) {
                    this.x = -this.w;
                    this.y = Math.random() * canvas.height * 2 - canvas.height;
                }
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.fillStyle = '#ffb7c5';
                // rotate ellipse a tiny bit by using flip as rotation
                ctx.ellipse(this.x, this.y, this.w/2, this.h/2, this.flip, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            Petal.prototype.update = function() {
                this.x += this.xSpeed;
                this.y += this.ySpeed;
                this.flip += 0.01;
                this.draw();
            }

            function createPetals() {
                petals = [];
                for (let i = 0; i < numPetals; i++) {
                    petals.push(new Petal());
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                petals.forEach(petal => {
                    try { petal.update(); } catch(e) { console.warn('petal update error', e); }
                });
                requestAnimationFrame(animate);
            }

            createPetals();
            animate();
        }
    }
});

// --- 6. Global Functions (For HTML onclick events) ---

function togglePlaylist() {
    const modal = document.getElementById('playlist-modal');
    if(modal) {
        if(modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

function playSong(songFile) {
    const player = document.getElementById('audio-player');
    if(player) {
        player.src = songFile; 
        player.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
    }
}

function unwrapGift(element) {
    const lid = element.querySelector('.gift-lid');
    if(lid) {
        lid.style.transform = 'translateY(-110%) rotate(-5deg)';
        lid.style.opacity = '0';
    }
}
