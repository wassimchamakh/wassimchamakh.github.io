// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll sections

let sections= document.querySelectorAll('section');
let navLinks= document.querySelectorAll('header nav a');
window.onscroll =() => {
    sections.forEach(section=> {
        let top=window.scrollY;
        let offset= section.offsetTop - 100 ;
        let height= section.offsetHeight;
        let id = section.getAttribute('id');

        if ( top >= offset && top < offset+height ) {
            //active navbar lines
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id + ']').classList.add('active');
            });
            // active sections for animations on scroll 
            section.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this  
        else {
            section.classList.remove('show-animate');
        }
    });
    //sticky header

    let header= document.querySelector('header') ;
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // remove toggle icon and navbar when click navbar links(scroll) 
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn');
        const originalBtnText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.innerHTML = '<p style="color: #00ff00;">✓ Thank you! Your message has been sent successfully.I will contact you soon.</p>';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.innerHTML = '<p style="color: #ff0000;">✗ Oops! There was a problem sending your message. Please try again.</p>';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
