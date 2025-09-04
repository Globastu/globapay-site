// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initAnimatedCounters();
    initDemoTabs();
    initInsuranceDemo();
    initRecreationDemo();
    initScrollAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            navToggle.classList.toggle('nav-toggle-open');
        });
    }
}

// Animated counters for metrics
function initAnimatedCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const metricNumbers = document.querySelectorAll('.metric-number');
    metricNumbers.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Demo tabs functionality
function initDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoScenarios = document.querySelectorAll('.demo-scenario');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const scenario = this.dataset.scenario;
            
            // Remove active class from all tabs and scenarios
            demoTabs.forEach(t => t.classList.remove('active'));
            demoScenarios.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding scenario
            this.classList.add('active');
            const targetScenario = document.getElementById(scenario + '-demo');
            if (targetScenario) {
                targetScenario.classList.add('active');
            }
            
            // Reset any active demos
            resetAllDemos();
        });
    });
}

// Insurance demo functionality
function initInsuranceDemo() {
    const issuePaymentBtn = document.getElementById('issue-payment-btn');
    const paymentForm = document.getElementById('payment-form');
    const sendPaymentLinkBtn = document.getElementById('send-payment-link');
    const paymentFlow = document.getElementById('payment-flow');
    const resetBtn = document.getElementById('reset-insurance-demo');
    
    // Delivery method buttons
    const deliveryBtns = document.querySelectorAll('.delivery-btn');
    
    if (issuePaymentBtn) {
        issuePaymentBtn.addEventListener('click', function() {
            this.style.display = 'none';
            paymentForm.style.display = 'block';
            animateElement(paymentForm, 'fadeInUp');
        });
    }
    
    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deliveryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    if (sendPaymentLinkBtn) {
        sendPaymentLinkBtn.addEventListener('click', function() {
            paymentForm.style.display = 'none';
            paymentFlow.style.display = 'block';
            animateElement(paymentFlow, 'fadeInUp');
            animatePaymentFlow();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetInsuranceDemo();
        });
    }
}

function animatePaymentFlow() {
    const flowSteps = document.querySelectorAll('#payment-flow .flow-step');
    let currentStep = 0;
    
    const stepTimer = setInterval(function() {
        if (currentStep < flowSteps.length) {
            flowSteps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(stepTimer);
        }
    }, 1000);
}

function resetInsuranceDemo() {
    const issuePaymentBtn = document.getElementById('issue-payment-btn');
    const paymentForm = document.getElementById('payment-form');
    const paymentFlow = document.getElementById('payment-flow');
    const flowSteps = document.querySelectorAll('#payment-flow .flow-step');
    
    // Reset visibility
    issuePaymentBtn.style.display = 'inline-flex';
    paymentForm.style.display = 'none';
    paymentFlow.style.display = 'none';
    
    // Reset flow steps
    flowSteps.forEach(step => step.classList.remove('active'));
    
    // Reset delivery buttons
    const deliveryBtns = document.querySelectorAll('.delivery-btn');
    deliveryBtns.forEach(btn => btn.classList.remove('active'));
    deliveryBtns[0]?.classList.add('active'); // Make first one active
}

// Recreation demo functionality
function initRecreationDemo() {
    const processBookingBtn = document.getElementById('process-booking');
    const routingViz = document.getElementById('routing-viz');
    const resetBtn = document.getElementById('reset-recreation-demo');
    
    // Payment method buttons
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    if (processBookingBtn) {
        processBookingBtn.addEventListener('click', function() {
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                routingViz.style.display = 'block';
                animateElement(routingViz, 'fadeInUp');
                animateRoutingSteps();
            }, 1500);
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetRecreationDemo();
        });
    }
}

function animateRoutingSteps() {
    const routingSteps = document.querySelectorAll('.routing-step');
    let currentStep = 0;
    
    const stepTimer = setInterval(function() {
        if (currentStep < routingSteps.length) {
            routingSteps[currentStep].style.transform = 'scale(1.05)';
            routingSteps[currentStep].style.background = 'var(--primary-green)';
            routingSteps[currentStep].style.color = 'white';
            
            // Reset previous step
            if (currentStep > 0) {
                const prevStep = routingSteps[currentStep - 1];
                prevStep.style.transform = 'scale(1)';
                prevStep.style.background = 'var(--white)';
                prevStep.style.color = 'var(--dark-gray)';
            }
            
            currentStep++;
        } else {
            clearInterval(stepTimer);
        }
    }, 1200);
}

function resetRecreationDemo() {
    const processBookingBtn = document.getElementById('process-booking');
    const routingViz = document.getElementById('routing-viz');
    const routingSteps = document.querySelectorAll('.routing-step');
    
    // Reset button
    processBookingBtn.textContent = 'Process Payment';
    processBookingBtn.disabled = false;
    
    // Hide routing visualization
    routingViz.style.display = 'none';
    
    // Reset routing steps
    routingSteps.forEach(step => {
        step.style.transform = 'scale(1)';
        step.style.background = 'var(--white)';
        step.style.color = 'var(--dark-gray)';
    });
    
    // Reset payment options
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => option.classList.remove('active'));
    paymentOptions[0]?.classList.add('active'); // Make first one active
}

function resetAllDemos() {
    resetInsuranceDemo();
    resetRecreationDemo();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .value-prop-item,
        .trust-item,
        .demo-dashboard,
        .metric-item
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to animate elements
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 1000);
}

// Button hover effects with ripple
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Form validation for demo forms
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form is valid, proceed with submission logic
                console.log('Form is valid');
            }
        });
    });
}

// Lazy loading for images (if added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS animation classes
const animationStyles = `
    .fadeInUp {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .fadeInRight {
        animation: fadeInRight 0.6s ease forwards;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .nav-menu-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: var(--shadow-lg);
        padding: var(--spacing-md);
        z-index: 1000;
    }
    
    .nav-toggle-open span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle-open span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle-open span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

// Add animation styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize button effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
    initFormValidation();
    initLazyLoading();
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyles = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-green);
        outline-offset: 2px;
    }
`;

const keyboardStyleSheet = document.createElement('style');
keyboardStyleSheet.textContent = keyboardStyles;
document.head.appendChild(keyboardStyleSheet);