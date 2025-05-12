// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle dark mode';
    document.body.appendChild(darkModeToggle);

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
    });
}

// Search functionality
function initSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search posts..." class="search-input">
        <div id="searchResults" class="search-results"></div>
    `;
    document.querySelector('main').insertBefore(searchContainer, document.querySelector('.timeline'));

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const posts = document.querySelectorAll('.timeline-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = Array.from(posts).filter(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            return title.includes(searchTerm) || content.includes(searchTerm);
        });

        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.forEach(post => {
                const link = document.createElement('a');
                link.href = `#${post.id}`;
                link.textContent = post.querySelector('h2').textContent;
                link.className = 'search-result-item';
                searchResults.appendChild(link);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });
}

// Reading time estimator
function calculateReadingTime() {
    const posts = document.querySelectorAll('.timeline-item');
    posts.forEach(post => {
        const content = post.querySelector('.timeline-content');
        const text = content.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.textContent = `${readingTime} min read`;
        post.querySelector('.timeline-date').appendChild(readingTimeElement);
    });
}

// Back to top button
function initBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.title = 'Back to top';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSearch();
    calculateReadingTime();
    initBackToTop();
}); 