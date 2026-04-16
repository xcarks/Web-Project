/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Carousel Logic [cite: 103, 123]
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let index = 0;

        function showSlide(i) {
            index = (i + items.length) % items.length;
            carouselInner.style.transform = `translateX(${-index * 100}%)`;
        }

        nextBtn.addEventListener('click', () => showSlide(index + 1));
        prevBtn.addEventListener('click', () => showSlide(index - 1));
    }

    // 2. Form Validation [cite: 123]
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
            } else if (!email.includes("@")) {
                alert("Please enter a valid email address.");
            } else {
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset();
            }
        });
    }
});