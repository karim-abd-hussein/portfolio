// Custom JavaScript for Karim Abd Hussein Portfolio

$(document).ready(function() {
    console.log('Portfolio script loaded');
    
    // Wait a bit for everything to be ready
    setTimeout(function() {
        console.log('Initializing navigation after delay');
        initNavigation();
    }, 100);
    
    function initNavigation() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var target = $(targetId);
        console.log('Clicked link:', targetId, 'Target found:', target.length > 0);
        
        if (target.length) {
            var navbarHeight = $('.navbar').outerHeight() || 70;
            var targetPosition = target.offset().top - navbarHeight;
            console.log('Target element:', target[0], 'Target offset:', target.offset().top);
            console.log('Scrolling to:', targetPosition, 'Navbar height:', navbarHeight);
            
            // Fast smooth scrolling
            $('html, body').animate({
                scrollTop: targetPosition
            }, 100, function() {
                console.log('Scroll animation completed');
            });
        } else {
            console.log('Target element not found for:', targetId);
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
        var navbarHeight = $('.navbar').outerHeight() || 70;
        
        $('section').each(function() {
            var target = $(this).attr('id');
            var offset = $(this).offset().top - navbarHeight - 50;
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

    // Initialize rotating typing effect on page load
    var heroTitle = $('.hero-content h1');
    if (heroTitle.length) {
        var phrases = [
            "Karim Abd Hussein",
            "Building Web Applications",
            "Ready to Help You",
            "Available for Projects"
        ];
        var currentPhraseIndex = 0;
        var isDeleting = false;
        var charIndex = 0;
        var typingSpeed = 100;
        var deletingSpeed = 50;
        var pauseDuration = 2000;
        var pauseBetweenPhrases = 500;
        
        function typeRotatingText() {
            var currentPhrase = phrases[currentPhraseIndex];
            
            if (!isDeleting) {
                // Typing phase
                if (charIndex < currentPhrase.length) {
                    var displayText = currentPhrase.substring(0, charIndex + 1);
                    heroTitle.html(displayText + '<span class="cursor">|</span>');
                    charIndex++;
                    setTimeout(typeRotatingText, typingSpeed);
                } else {
                    // Finished typing, pause before deleting
                    heroTitle.html(currentPhrase + '<span class="cursor">|</span>');
                    setTimeout(function() {
                        isDeleting = true;
                        typeRotatingText();
                    }, pauseDuration);
                }
            } else {
                // Deleting phase
                if (charIndex > 0) {
                    var displayText = currentPhrase.substring(0, charIndex - 1);
                    if (displayText.length === 0) {
                        heroTitle.html('&nbsp;<span class="cursor">|</span>');
                    } else {
                        heroTitle.html(displayText + '<span class="cursor">|</span>');
                    }
                    charIndex--;
                    setTimeout(typeRotatingText, deletingSpeed);
                } else {
                    // Finished deleting, move to next phrase
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    heroTitle.html('&nbsp;<span class="cursor">|</span>');
                    setTimeout(typeRotatingText, pauseBetweenPhrases);
                }
            }
        }
        
        // Start the animation
        setTimeout(function() {
            typeRotatingText();
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

    // Project details functionality
    window.showProjectDetails = function(projectName) {
        const projectDetails = {
            teacherprivate: {
                title: 'Teacher Private Platform & Backend API',
                description: 'Comprehensive educational platform with backend API for Flutter mobile app, serving 100K+ users and 50K+ teachers through web and mobile applications.',
                challenges: ['Legacy codebase refactoring', 'Backend API integration for Flutter team', 'Performance optimization', 'Cross-platform synchronization'],
                solutions: ['Complete MVC pattern implementation', 'REST API development for mobile app', 'Database optimization', 'Real-time sync between web and mobile'],
                results: ['100K+ platform users', '5K+ mobile app downloads', '50K+ registered teachers', '60% performance improvement', '40% faster development with AI tools']
            },
            daafoor: {
                title: 'Daafoor Marketplace',
                description: 'Large-scale educational marketplace connecting tutors with students through digital learning resources.',
                challenges: ['Payment gateway integration', 'Content management system', 'User role management', 'Scalability concerns'],
                solutions: ['Stripe payment integration', 'Custom CMS development', 'Role-based access control', 'AI-assisted rapid prototyping'],
                results: ['100K+ learning resources', '5K+ active tutors', '24/7 platform availability', 'Automated payment processing', '35% faster time-to-market with AI tools']
            },
            edutor: {
                title: 'Edutor SaaS Platform',
                description: 'Multi-tenant SaaS CMS platform designed specifically for tutors to create their own branded websites.',
                challenges: ['Multi-tenant architecture', 'Template engine development', 'Affiliate system implementation', 'Subscription management'],
                solutions: ['Data isolation architecture', 'Customizable template system', 'Real-time commission tracking', 'AI-enhanced development workflow'],
                results: ['10+ professional templates', 'Automated subscription billing', 'Real-time affiliate tracking', 'White-label solution', '50% reduction in development time with AI tools']
            }
        };

        const project = projectDetails[projectName];
        if (!project) return;

        // Create modal content
        const modalContent = `
            <div class="modal fade" id="projectModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${project.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="lead">${project.description}</p>
                            
                            <div class="row mt-4">
                                <div class="col-md-4">
                                    <h6><i class="fas fa-exclamation-triangle text-warning me-2"></i>Challenges</h6>
                                    <ul class="small">
                                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6><i class="fas fa-lightbulb text-info me-2"></i>Solutions</h6>
                                    <ul class="small">
                                        ${project.solutions.map(solution => `<li>${solution}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <h6><i class="fas fa-chart-line text-success me-2"></i>Results</h6>
                                    <ul class="small">
                                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        $('#projectModal').remove();

        // Add modal to body and show
        $('body').append(modalContent);
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();
    };

    // Console welcome message
    console.log('%c Welcome to Karim Abd Hussein Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%c Feel free to explore my projects and skills! ', 'background: #0d6efd; color: white; font-size: 14px; padding: 8px; border-radius: 3px;');
    }
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
