// Data access: destinations array is available globally due to data.js being imported before script.js

// App State
let favorites = JSON.parse(localStorage.getItem('wanderlust_favorites')) || [];

// DOM Elements
const navFavorites = document.getElementById('nav-favorites');
const heroFilterForm = document.getElementById('hero-filter-form');
const destinationsGrid = document.getElementById('destinations-grid');
const detailsWrapper = document.getElementById('details-wrapper');
const searchInput = document.getElementById('search-input');
const exploreType = document.getElementById('explore-type');
const exploreBudget = document.getElementById('explore-budget');

// Initialize App
function init() {
    updateFavoritesCounter();
    
    // Page routing logic
    if (heroFilterForm) {
        initHomePage();
    } else if (destinationsGrid) {
        initExplorePage();
    } else if (detailsWrapper) {
        initDetailsPage();
    }

    // Nav favorites click - filter to just favorites
    if(navFavorites) {
        navFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            if(window.location.pathname.includes('explore.html')) {
                renderDestinations(destinations.filter(d => favorites.includes(d.id)));
                // clear filters
                if(exploreType) exploreType.value = 'all';
                if(exploreBudget) exploreBudget.value = 'all';
                if(searchInput) searchInput.value = '';
            } else {
                localStorage.setItem('wanderlust_show_favorites', 'true');
                window.location.href = 'explore.html';
            }
        });
    }
}

function updateFavoritesCounter() {
    if(navFavorites) {
        navFavorites.textContent = `Favorites (${favorites.length})`;
    }
}

// ---------------- HOME PAGE ----------------
function initHomePage() {
    heroFilterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const budget = document.getElementById('budget').value;
        
        // Save to local storage
        localStorage.setItem('wanderlust_pref_type', type);
        localStorage.setItem('wanderlust_pref_budget', budget);
        localStorage.removeItem('wanderlust_show_favorites'); 
        
        // Redirect
        window.location.href = 'explore.html';
    });
}

// ---------------- EXPLORE PAGE ----------------
function initExplorePage() {
    // Check if we need to show favorites only
    const showOnlyFavorites = localStorage.getItem('wanderlust_show_favorites') === 'true';
    if(showOnlyFavorites) {
        localStorage.removeItem('wanderlust_show_favorites');
        renderDestinations(destinations.filter(d => favorites.includes(d.id)));
        return; // Don't apply default filters
    }

    // Check for saved preferences
    const prefType = localStorage.getItem('wanderlust_pref_type') || 'all';
    const prefBudget = localStorage.getItem('wanderlust_pref_budget') || 'all';
    
    // Set UI filters to match preferences
    if(exploreType) exploreType.value = prefType;
    if(exploreBudget) exploreBudget.value = prefBudget;

    // Initial Render
    filterDestinations();

    // Event Listeners for Live Filtering
    if(searchInput) searchInput.addEventListener('input', filterDestinations);
    if(exploreType) exploreType.addEventListener('change', filterDestinations);
    if(exploreBudget) exploreBudget.addEventListener('change', filterDestinations);
}

function filterDestinations() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const typeValue = exploreType ? exploreType.value : 'all';
    const budgetValue = exploreBudget ? exploreBudget.value : 'all';

    const filtered = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchTerm) || dest.country.toLowerCase().includes(searchTerm);
        const matchesType = typeValue === 'all' || dest.type === typeValue;
        const matchesBudget = budgetValue === 'all' || dest.budget === budgetValue;
        
        return matchesSearch && matchesType && matchesBudget;
    });

    renderDestinations(filtered);
}

function renderDestinations(data) {
    if(!destinationsGrid) return;
    
    destinationsGrid.innerHTML = '';

    if(data.length === 0) {
        destinationsGrid.innerHTML = `<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
            <h2>No destinations found matching your criteria.</h2>
            <p style="color: var(--text-muted); margin-top: 1rem;">Try adjusting your search filters.</p>
        </div>`;
        return;
    }

    data.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = 'fadeIn 0.5s ease-out';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${dest.image}" alt="${dest.name}" class="card-img">
                <div class="badge-wrapper">
                    <span class="badge" style="background: rgba(15,23,42,0.8);">${dest.type}</span>
                    <span class="badge" style="background: rgba(15,23,42,0.8);">${dest.budget}</span>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${dest.name}</h3>
                <div class="card-location">${dest.country}</div>
                <p class="card-desc">${dest.description.substring(0, 80)}...</p>
                <a href="details.html?id=${dest.id}" class="btn-secondary">View Details</a>
            </div>
        `;
        destinationsGrid.appendChild(card);
    });
}

// ---------------- DETAILS PAGE ----------------
function initDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    if(!id) {
        showError();
        return;
    }

    const dest = destinations.find(d => d.id === id);
    if(!dest) {
        showError();
        return;
    }

    const isFav = favorites.includes(dest.id);
    
    detailsWrapper.innerHTML = `
        <div class="details-img-container" style="animation: fadeIn 0.5s ease-out;">
            <img src="${dest.image}" alt="${dest.name}" class="details-img">
        </div>
        <div class="details-info" style="animation: fadeIn 0.7s ease-out;">
            <h1 class="details-title">${dest.name}</h1>
            <div class="details-country">${dest.country}</div>
            
            <div class="details-badges">
                <span class="badge" style="background: rgba(30,41,59,0.5); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--accent-1); color: white;">Type: ${dest.type.charAt(0).toUpperCase() + dest.type.slice(1)}</span>
                <span class="badge" style="background: rgba(30,41,59,0.5); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--accent-1); color: white;">Budget: ${dest.budget.charAt(0).toUpperCase() + dest.budget.slice(1)}</span>
            </div>
            
            <p class="details-desc">${dest.description}</p>
            
            <h3 class="highlights-title">Key Highlights:</h3>
            <ul class="highlights-list">
                ${dest.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
            
            <button id="fav-btn" class="btn-fav ${isFav ? 'active' : ''}">
                ${isFav ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
        </div>
    `;

    document.getElementById('fav-btn').addEventListener('click', (e) => {
        toggleFavorite(dest.id, e.target);
    });
}

function showError() {
    if(detailsWrapper) {
        detailsWrapper.innerHTML = `<div class="no-results" style="grid-column: 1/-1;"><h2>Destination not found.</h2><a href="explore.html" style="color: var(--accent-1); display: inline-block; margin-top: 1rem;">View all destinations</a></div>`;
    }
}

function toggleFavorite(id, btnElement) {
    const index = favorites.indexOf(id);
    if(index > -1) {
        // Remove
        favorites.splice(index, 1);
        btnElement.classList.remove('active');
        btnElement.innerHTML = '♡ Add to Favorites';
    } else {
        // Add
        favorites.push(id);
        btnElement.classList.add('active');
        btnElement.innerHTML = '♥ Remove from Favorites';
    }
    
    // Save to local storage
    localStorage.setItem('wanderlust_favorites', JSON.stringify(favorites));
    updateFavoritesCounter();
}

// Run initialization
document.addEventListener('DOMContentLoaded', init);
