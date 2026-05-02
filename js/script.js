// Custom JavaScript for Karim Abd Hussein Portfolio

$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');
        }
    });

    // Navbar background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }

        // Show/hide scroll to top button
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').addClass('show');
        } else {
            $('#scrollTop').removeClass('show');
        }
    });

    // Scroll to top functionality
    $('#scrollTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Active navigation link highlighting
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            var target = $(this).attr('id');
            var offset = $(this).offset().top - 100;
            var height = $(this).height();
            
            if (scrollPosition >= offset && scrollPosition < offset + height) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + target + '"]').addClass('active');
            }
        });
    });

    // Contact form validation and submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        
        // Validate form
        var isValid = true;
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        
        // Name validation
        if (name === '') {
            $('#name').addClass('is-invalid').after('<div class="invalid-feedback">Please enter your name</div>');
            isValid = false;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#email').addClass('is-invalid').after('<div class="invalid-feedback">Please enter your email</div>');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid').after('<div class="invalid-feedback">Please enter a valid email</div>');
            isValid = false;
        }
        
        // Subject validation
        if (subject === '') {
            $('#subject').addClass('is-invalid').after('<div class="invalid-feedback">Please enter a subject</div>');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            $('#message').addClass('is-invalid').after('<div class="invalid-feedback">Please enter your message</div>');
            isValid = false;
        } else if (message.length < 10) {
            $('#message').addClass('is-invalid').after('<div class="invalid-feedback">Message must be at least 10 characters</div>');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            var submitBtn = $(this).find('button[type="submit"]');
            var originalText = submitBtn.text();
            submitBtn.html('Sending<span class="spinner"></span>').prop('disabled', true);
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(function() {
                // Reset form
                $('#contactForm')[0].reset();
                
                // Reset button
                submitBtn.text(originalText).prop('disabled', false);
                
                // Show success message
                $('.success-message').fadeIn().delay(3000).fadeOut();
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted:', {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                });
            }, 2000);
        }
    });

    // Animate skill bars when they come into view
    function animateSkillBars() {
        $('.skill-item').each(function() {
            var skillBar = $(this).find('.progress-bar');
            var skillTop = $(this).offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            
            if (skillTop < scrollTop + windowHeight - 100) {
                if (!skillBar.hasClass('animate-progress')) {
                    skillBar.addClass('animate-progress');
                }
            }
        });
    }

    // Check skill bars on scroll
    $(window).scroll(animateSkillBars);
    animateSkillBars(); // Initial check

    // Project card hover effects
    $('.project-card').hover(
        function() {
            $(this).find('.tech-tags .badge').each(function(index) {
                $(this).delay(index * 50).animate({ opacity: 1 }, 200);
            });
        },
        function() {
            $(this).find('.tech-tags .badge').css('opacity', '0.8');
        }
    );

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        var i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect on page load
    var heroTitle = $('.hero-content h1');
    if (heroTitle.length) {
        var originalText = heroTitle.text();
        setTimeout(function() {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-section').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // Mobile menu handling
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').removeClass('active');
    });

    // Add some interactive elements
    $('.contact-item').hover(
        function() {
            $(this).find('i').addClass('fa-bounce');
        },
        function() {
            $(this).find('i').removeClass('fa-bounce');
        }
    );

    // Timeline animation on scroll
    function animateTimeline() {
        $('.timeline-item').each(function(index) {
            var itemTop = $(this).offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            
            if (itemTop < scrollTop + windowHeight - 100) {
                $(this).delay(index * 200).queue(function() {
                    $(this).addClass('timeline-animate').dequeue();
                });
            }
        });
    }

    $(window).scroll(animateTimeline);
    animateTimeline();

    // Add CSS for timeline animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .timeline-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            .timeline-item.timeline-animate {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    // Console welcome message
    console.log('%c Welcome to Karim Abd Hussein Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%c Feel free to explore my projects and skills! ', 'background: #0d6efd; color: white; font-size: 14px; padding: 8px; border-radius: 3px;');
});

// Add scroll to top button dynamically
$(document).ready(function() {
    $('body').append('<button id="scrollTop"><i class="fas fa-arrow-up"></i></button>');
});

// Add CSS for navbar scrolled state
$(document).ready(function() {
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .navbar.scrolled {
                background-color: rgba(33, 37, 41, 0.98) !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
        `)
        .appendTo('head');
});
