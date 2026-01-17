// CODENOUR - Main JavaScript Module
// Handles dynamic content loading for games and news

const CodenourApp = (() => {
    'use strict';

    // Configuration
    const CONFIG = {
        markdownLib: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
        errorMessages: {
            server: 'Please run a local web server to view this page.',
            quickStart: `
                <strong>Quick start:</strong><br>
                1. Open Terminal in this folder<br>
                2. Run: <code>python3 -m http.server 8000</code><br>
                3. Open: <code>http://localhost:8000</code>
            `
        }
    };

    // Utility Functions
    const utils = {
        // Sanitize HTML to prevent XSS
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        // Create element with attributes
        createElement(tag, attributes = {}, innerHTML = '') {
            const element = document.createElement(tag);
            Object.entries(attributes).forEach(([key, value]) => {
                if (key === 'class') element.className = value;
                else if (key === 'style') element.style.cssText = value;
                else element.setAttribute(key, value);
            });
            if (innerHTML) element.innerHTML = innerHTML;
            return element;
        },

        // Show error in container
        showError(container, title, message) {
            container.innerHTML = `
                <div class="card" style="grid-column: 1/-1;">
                    <div class="card-content">
                        <h3 style="color: #ff4444;">⚠️ ${title}</h3>
                        <p style="color: var(--secondary-text);">
                            ${message}<br><br>
                            ${CONFIG.errorMessages.quickStart}
                        </p>
                    </div>
                </div>
            `;
        },

        // Extract first paragraph from markdown
        extractPreview(markdown) {
            const lines = markdown.split('\n');
            return lines.find(line => line.trim() && !line.startsWith('#')) || '';
        },

        // Check if markdown library is loaded
        checkMarkdownLibrary() {
            if (typeof marked === 'undefined') {
                throw new Error('Marked library failed to load');
            }
        },

        // Fetch markdown file
        async fetchMarkdown(path) {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return response.text();
        },

        // Fetch JSON file
        async fetchJson(path) {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return response.json();
        }
    };

    // News Module
    const NewsModule = {
        async init() {
            const container = document.getElementById('news-container');
            if (!container) return;

            try {
                utils.checkMarkdownLibrary();
                const newsList = await utils.fetchJson('news/index.json');
                await this.renderNews(container, newsList);
            } catch (error) {
                console.error('Error initializing news:', error);
                utils.showError(container, 'Unable to Load News', CONFIG.errorMessages.server);
            }
        },

        async renderNews(container, newsList) {
            container.innerHTML = '';

            const newsPromises = newsList.map(newsItem =>
                this.renderNewsItem(container, newsItem)
            );

            await Promise.allSettled(newsPromises);
        },

        async renderNewsItem(container, newsItem) {
            try {
                const markdown = await utils.fetchMarkdown(`news/${newsItem.file}`);
                const card = utils.createElement('div', { class: 'card' }, `
                    <div class="card-content">
                        <span class="card-tag">${utils.escapeHtml(newsItem.date)}</span>
                        <div class="markdown-content">
                            ${marked.parse(markdown)}
                        </div>
                    </div>
                `);
                container.appendChild(card);
            } catch (error) {
                console.error(`Error loading ${newsItem.file}:`, error);
                const errorCard = utils.createElement('div', { class: 'card' }, `
                    <div class="card-content">
                        <p style="color: #ff4444;">Error loading ${utils.escapeHtml(newsItem.file)}</p>
                    </div>
                `);
                container.appendChild(errorCard);
            }
        }
    };

    // Games Module
    const GamesModule = {
        async init() {
            const container = document.getElementById('games-container');
            if (!container) return;

            try {
                utils.checkMarkdownLibrary();
                const gamesList = await utils.fetchJson('games/index.json');
                await this.renderGames(container, gamesList);
            } catch (error) {
                console.error('Error initializing games:', error);
                utils.showError(container, 'Unable to Load Games', CONFIG.errorMessages.server);
            }
        },

        async renderGames(container, gamesList) {
            container.innerHTML = '';

            gamesList.forEach(game => {
                const card = this.createGameCard(game);
                container.appendChild(card);
                this.loadGamePreview(game);
            });
        },

        createGameCard(game) {
            return utils.createElement('div', { class: 'card' }, `
                <div class="card-img">
                    <img src="${utils.escapeHtml(game.image)}" alt="${utils.escapeHtml(game.title)}">
                </div>
                <div class="card-content">
                    <span class="card-tag" style="${game.statusStyle || ''}">${utils.escapeHtml(game.status)}</span>
                    <h3>${utils.escapeHtml(game.title)}</h3>
                    <div id="${game.id}-preview" class="game-preview"></div>
                    <button class="btn" data-game-id="${game.id}" data-game-file="${game.file}">LEARN MORE</button>
                </div>
            `);
        },

        async loadGamePreview(game) {
            try {
                const markdown = await utils.fetchMarkdown(`games/${game.file}`);
                const preview = utils.extractPreview(markdown);
                const previewEl = document.getElementById(`${game.id}-preview`);
                if (previewEl) {
                    previewEl.innerHTML = `<p style="font-size: 0.9rem; margin-top: 10px; color: var(--secondary-text);">${utils.escapeHtml(preview)}</p>`;
                }
            } catch (error) {
                console.error(`Error loading preview for ${game.id}:`, error);
            }
        },

        async showGameDetails(file) {
            try {
                const markdown = await utils.fetchMarkdown(`games/${file}`);
                this.openModal(marked.parse(markdown));
            } catch (error) {
                console.error('Error loading game details:', error);
                alert('Failed to load game details. Please try again.');
            }
        },

        openModal(content) {
            const modal = utils.createElement('div', {
                style: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; overflow-y: auto; padding: 20px;'
            }, `
                <div class="modal-content" style="max-width: 800px; margin: 50px auto; background: var(--card-bg); padding: 40px; border-radius: 8px; position: relative;">
                    <button class="modal-close" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--primary-text); font-size: 2rem; cursor: pointer; line-height: 1;">&times;</button>
                    <div class="markdown-content">${content}</div>
                </div>
            `);

            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            // Close on button click
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => modal.remove());

            // Close on Escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);

            document.body.appendChild(modal);
        }
    };

    // Event Delegation for buttons
    function setupEventListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-game-file]');
            if (btn) {
                e.preventDefault();
                const file = btn.getAttribute('data-game-file');
                GamesModule.showGameDetails(file);
            }
        });
    }

    // Scroll Animations
    const AnimationModule = {
        init() {
            this.setupScrollProgress();
            this.setupScrollAnimations();
            this.setupPageTransitions();
        },

        // Scroll Progress Bar
        setupScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);

            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
            });
        },

        // Scroll-triggered animations
        setupScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe all elements that need scroll animations
            const elements = document.querySelectorAll('.section-title, .card, footer');
            elements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(el);
            });
        },

        // Page Transitions
        setupPageTransitions() {
            // Create transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'page-transition';
            document.body.appendChild(overlay);

            // Handle navigation clicks
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="index.html"], a[href^="games.html"], a[href^="news.html"], a[href^="about.html"]');

                if (link && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    const href = link.getAttribute('href');

                    // Trigger transition
                    overlay.classList.add('active');

                    // Navigate after animation
                    setTimeout(() => {
                        window.location.href = href;
                    }, 400);
                }
            });
        }
    };

    // Public API
    return {
        init() {
            setupEventListeners();
            AnimationModule.init();
            NewsModule.init();
            GamesModule.init();
        }
    };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CodenourApp.init());
} else {
    CodenourApp.init();
}
