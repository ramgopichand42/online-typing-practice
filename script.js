document.getElementById('year').textContent = new Date().getFullYear();

// --- DARK MODE TOGGLE FIX ---
const darkModeBtn = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.documentElement;

function setDarkMode(on) {
    if (on) {
        body.classList.add('dark-mode');
        darkModeIcon.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        darkModeIcon.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Initial check
if (localStorage.getItem('darkMode') === 'enabled') {
    setDarkMode(true);
} else {
    // Check for system preference if no localStorage setting exists
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setDarkMode(true);
    } else {
        setDarkMode(false);
    }
}

darkModeBtn.addEventListener('click', function () {
    setDarkMode(!body.classList.contains('dark-mode'));
});

// --- CARD AND BUTTON ANIMATIONS & REDIRECT ---

// Button Animation (using main-btn-card as the wrapper)
document.querySelectorAll('.main-btn-card').forEach(card => {
    // Add data-href to button's click behavior
    const targetUrl = card.getAttribute('data-href');

    card.addEventListener('click', function() {
        // Animation: Add and remove 'pressed' class
        card.classList.add('pressed');
        setTimeout(() => {
            card.classList.remove('pressed');
            // Redirect after a short delay for animation visibility
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        }, 200); 
    });

    // Hover/Touch effects for visual feedback
    card.addEventListener('mousedown', () => card.classList.add('pressed'));
    card.addEventListener('mouseup', () => setTimeout(() => card.classList.remove('pressed'), 100)); // Delay to allow the click effect to take over
    card.addEventListener('mouseleave', () => card.classList.remove('pressed'));
    card.addEventListener('touchstart', () => card.classList.add('pressed'));
    card.addEventListener('touchend', () => setTimeout(() => card.classList.remove('pressed'), 100));
});

// Card Click: Clicking the achievement card also redirects to the test page
document.getElementById('achievementCard').addEventListener('click', function() {
    this.classList.add('pressed'); // Reuse the 'pressed' class for a generic click feel
    setTimeout(() => {
        this.classList.remove('pressed');
        window.location.href = "test.html";
    }, 200);
});


// --- NAVIGATION LINKS FIX ---
document.getElementById('testPageLink').addEventListener('click', function(e) {
    // Prevent default only if the link is not already the current page (e.g., in a multi-page setup)
    if(window.location.pathname.endsWith("test.html") || window.location.pathname.endsWith("test")) {
        e.preventDefault();
        return;
    }
    window.location.href = "test.html";
});

document.getElementById('gamePageLink').addEventListener('click', function(e) {
    if(window.location.pathname.endsWith("games.html") || window.location.pathname.endsWith("games")) {
        e.preventDefault();
        return;
    }
    window.location.href = "games.html";
});

// Setting active class on menu links
document.querySelectorAll('.menu-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    // Check if the current URL path matches the link's href
    if (window.location.pathname.endsWith(linkPath) || (linkPath === 'index.html' && (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === ''))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});


// --- SCROLL/SHARE BUTTON LOGIC ---
const scrollDownBtn = document.getElementById('scrollDownBtn');
const scrollUpBtn = document.getElementById('scrollUpBtn');
const shareBtn = document.getElementById('shareBtn');
const sharePopup = document.getElementById('sharePopup');

document.getElementById('scrollDownBtn').addEventListener('click', function () {
    const footer = document.querySelector('.main-footer');
    footer.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scrollUpBtn').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Share button toggle
shareBtn.addEventListener('click', function() {
    sharePopup.classList.toggle('show');
});

// Hide/Show scroll buttons system
function updateScrollButtons() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Show/Hide Up button
    scrollUpBtn.style.display = (scrollY > 10) ? "flex" : "none";

    // Show/Hide Down button (only if not at the bottom)
    const isAtBottom = (scrollY + winHeight >= docHeight - 10);
    scrollDownBtn.style.display = isAtBottom ? "none" : "flex";
    
    // Always show share button
    shareBtn.style.display = "flex";
}

window.addEventListener('scroll', updateScrollButtons);
window.addEventListener('load', updateScrollButtons); // Initial check on load
window.addEventListener('resize', updateScrollButtons);
