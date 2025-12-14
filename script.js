document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Live Age Counter ---
    const birthDate = new Date('2006-08-14T00:00:00'); // Ensure this date is correct
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
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // --- 3. Gallery ---
    const galleryEl = document.getElementById('lightgallery');
    if(galleryEl) {
        lightGallery(galleryEl, {
            speed: 500,
            download: false,
            mode: 'lg-fade'
        });
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
        const ctx = canvas.getContext('2d');
        let petals =;
        const numPetals = 40; // Reduced count for performance

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
            this.opacity = this.w / 50;
            this.flip = Math.random();
            this.xSpeed = 1 + Math.random() * 1;
            this.ySpeed = 1 + Math.random() * 1;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height |

| this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.fillStyle = '#ffb7c5';
            ctx.ellipse(this.x, this.y, this.w/2, this.h/2, this.flip, 0, Math.PI * 2);
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += 0.01;
            this.draw();
        }

        function createPetals() {
            petals =;
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => petal.update());
            requestAnimationFrame(animate);
        }
        createPetals();
        animate();
    }
});

// --- 6. New Features Logic (Outside DOMContentLoaded to be accessible globally) ---

// Toggle Playlist Modal
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

// Play Song
function playSong(songFile) {
    const player = document.getElementById('audio-player');
    if(player) {
        // You can add a path prefix if your songs are in a folder, e.g., 'assets/music/' + songFile
        player.src = songFile; 
        player.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
    }
}

// Unwrap Gift Box
function unwrapGift(element) {
    const lid = element.querySelector('.gift-lid');
    const content = element.querySelector('.gift-content');
    
    if(lid && content) {
        // Slide lid up
        lid.style.transform = 'translateY(-110%) rotate(-5deg)';
        lid.style.opacity = '0';
        // Reveal content is already handled by Z-index, but we can animate it if needed
    }
}
