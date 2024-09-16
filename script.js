document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Smooth scroll function
  function smoothScroll(event) {
      event.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href'); // Get the target section id
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  }

  // Add event listener to each nav link
  navLinks.forEach(link => {
      link.addEventListener('click', smoothScroll);
  });
});






document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const counters = entry.target.querySelectorAll('.stat h3');
          counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
              animateCounter(counter);
              counter.classList.add('animated');
            }
          });
        } else {
          entry.target.classList.remove('visible');
          entry.target.querySelectorAll('.stat h3').forEach(counter => {
            counter.classList.remove('animated');
            counter.textContent = '0+';
          });
        }
      });
    }, {
      threshold: 0.5 // Adjust if necessary to control when the animation starts
    });
  
    const aboutSection = document.querySelector('#about');
    observer.observe(aboutSection);
  });
  
  function animateCounter(element) {
    const target = +element.parentElement.getAttribute('data-target');
    const duration = 1000; // Duration in milliseconds (1 second)
    const increment = target / (duration / 30); // Number of increments in the duration
    let current = 0;
  
    function updateCount() {
      current += increment;
      if (current < target) {
        element.textContent = `${Math.ceil(current)}+`;
        setTimeout(updateCount, 30);
      } else {
        element.textContent = `${target}+`;
      }
    }
  
    updateCount();
  }
  document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector('.about');
    const sectorsSection = document.querySelector('.sectors');

    // Function to add the 'visible' class when a section is in view
    function handleVisibility(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally, stop observing the section once it's visible
                observer.unobserve(entry.target);
            }
        });
    }

    // Create the IntersectionObserver to observe when sections are in view
    const options = {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver(handleVisibility, options);

    // Observe both sections
    observer.observe(aboutSection);
    observer.observe(sectorsSection);
});
// Toggle the menu on mobile
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    // Function to toggle the navigation links
    function toggleMenu() {
        navLinks.classList.toggle('show');  // Toggle visibility of nav links
        menuIcon.classList.toggle('active');  // Animate the menu icon (bars)
    }

    menuIcon.addEventListener('click', toggleMenu);
});




document.addEventListener('DOMContentLoaded', function () {
    const blogCards = document.querySelectorAll('.blog-card');
    const blogsContainer = document.getElementById('blogs-slider');
    const totalBlogs = blogCards.length / 2; // Only count the original cards, not the duplicates
    let currentIndex = 0;
    const blogWidth = blogCards[0].clientWidth + 20; // Includes gap of 20px

    // Function to update slider position
    function updateSlider() {
        blogsContainer.style.transition = 'transform 0.5s ease-in-out';
        blogsContainer.style.transform = `translateX(${-currentIndex * blogWidth}px)`;
    }

    // Looping mechanism for seamless infinite scrolling
    blogsContainer.addEventListener('transitionend', () => {
        if (currentIndex >= totalBlogs) {
            blogsContainer.style.transition = 'none'; // Disable transition for the jump
            currentIndex = 0;
            blogsContainer.style.transform = `translateX(0)`; // Reset to first
        } else if (currentIndex < 0) {
            blogsContainer.style.transition = 'none';
            currentIndex = totalBlogs - 1;
            blogsContainer.style.transform = `translateX(${-currentIndex * blogWidth}px)`; // Jump to last card
        }
    });

    // Next and Previous Functions
    document.querySelector('.next-btn').addEventListener('click', function () {
        currentIndex++;
        updateSlider();
    });

    document.querySelector('.prev-btn').addEventListener('click', function () {
        currentIndex--;
        updateSlider();
    });

    // Automatic slideshow (optional)
    let intervalId = setInterval(function() {
        currentIndex++;
        updateSlider();
    }, 4000); // Change slides every 4 seconds

    // Touch Controls for Mobile
    let touchStartX = 0;

    blogsContainer.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
    });

    blogsContainer.addEventListener('touchend', function (e) {
        let touchEndX = e.changedTouches[0].clientX;

        if (touchStartX > touchEndX + 50) {
            currentIndex++;
        } else if (touchStartX < touchEndX - 50) {
            currentIndex--;
        }
        updateSlider();
    });

    // Pause slideshow on hover (for desktop)
    const blogsSection = document.querySelector('.blogs-section');
    blogsSection.addEventListener('mouseenter', function () {
        clearInterval(intervalId); // Stop the slideshow
    });

    blogsSection.addEventListener('mouseleave', function () {
        intervalId = setInterval(function() {
            currentIndex++;
            updateSlider();
        }, 4000); // Restart slideshow
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const totalReviews = reviewCards.length;
    const reviewsContainer = document.querySelector('.reviews-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isTouching = false;

    // Clone the review cards to create a seamless loop
    function cloneCards() {
        reviewCards.forEach(card => {
            const clone = card.cloneNode(true);
            reviewsContainer.appendChild(clone);
        });
    }

    // Initialize the slider with cloned cards
    function initSlider() {
        cloneCards();
        const cardWidth = reviewCards[0].clientWidth + 30; // Includes gap of 30px
        reviewsContainer.style.width = `${cardWidth * reviewCards.length * 2}px`; // Double the width for seamless loop
        updateSlider();
    }

    // Function to update slider
    function updateSlider() {
        const cardWidth = reviewCards[0].clientWidth + 30; // Includes gap of 30px
        reviewsContainer.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    // Function to go to the next review
    function nextReview() {
        currentIndex++;
        if (currentIndex >= totalReviews) {
            currentIndex = 0;
            reviewsContainer.style.transition = 'none'; // Disable transition for instant jump
            reviewsContainer.style.transform = `translateX(0)`;
            // Re-enable transition after instant jump
            setTimeout(() => {
                reviewsContainer.style.transition = 'transform 0.5s ease';
                updateSlider();
            }, 50);
        } else {
            updateSlider();
        }
    }

    // Function to go to the previous review
    function prevReview() {
        if (currentIndex <= 0) {
            currentIndex = totalReviews - 1;
            reviewsContainer.style.transition = 'none'; // Disable transition for instant jump
            reviewsContainer.style.transform = `translateX(-${totalReviews * (reviewCards[0].clientWidth + 30)}px)`;
            // Re-enable transition after instant jump
            setTimeout(() => {
                reviewsContainer.style.transition = 'transform 0.5s ease';
                updateSlider();
            }, 50);
        } else {
            currentIndex--;
            updateSlider();
        }
    }

    // Automatic slideshow function
    function startSlideshow() {
        setInterval(nextReview, 4000); // Change slide every 4 seconds
    }

    // Initialize slider
    initSlider();
    startSlideshow();

    // Touch controls for mobile
    reviewsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isTouching = true;
    });

    reviewsContainer.addEventListener('touchend', (e) => {
        if (!isTouching) return;
        touchEndX = e.changedTouches[0].clientX;
        const touchDifference = touchStartX - touchEndX;

        if (Math.abs(touchDifference) > 50) {
            if (touchDifference > 0) {
                nextReview(); // Swipe left
            } else {
                prevReview(); // Swipe right
            }
        }
        isTouching = false;
    });

    // Add event listeners to navigation buttons
    prevBtn.addEventListener('click', prevReview);
    nextBtn.addEventListener('click', nextReview);
});


// Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
  
    form.addEventListener('submit', (event) => {
      let valid = true;
      const formGroups = form.querySelectorAll('.form-group');
  
      formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorMessage = group.querySelector('.error-message');
        if (!input.checkValidity()) {
          errorMessage.style.display = 'block';
          valid = false;
        } else {
          errorMessage.style.display = 'none';
        }
      });
  
      if (!valid) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const alert = document.getElementById('custom-alert');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission
        
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            showAlert('Thank you! Your message has been sent.');
            form.reset();  // Reset the form
            setTimeout(() => {
                window.location.reload();  // Reload the page after a delay
            }, 2000); // Adjust delay as needed
        })
        .catch(error => {
            showAlert('Sorry, something went wrong. Please try again.');
            console.error('Error:', error);
        });
    });

    function showAlert(message) {
        const alertMessage = alert.querySelector('.alert-message');
        alertMessage.textContent = message;
        alert.classList.remove('hidden');
    }

    function closeAlert() {
        alert.classList.add('hidden');
    }
});

