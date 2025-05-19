document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu functionality
  initMobileMenu();

  // Initialize search functionality
  initSearchFunctionality();

  // Setup social sidebar
  initSocialSidebar();

  // Check if we're on the homepage
  if (document.querySelector('.beaches-cards')) {
    // Create flip cards for recommendations
    createFlipCards("beaches", '.beaches-cards');
    createFlipCards("temples", '.temples-cards');
    createFlipCards("countries", '.countries-cards');
    createFlipCards("city_tours", '.city-cards');
  }

  // Initialize FAQ functionality on contact page
  if (document.querySelector('.faq-item')) {
    initFAQ();
  }

  // Handle URL parameters (search via URL)
  handleUrlParameters();
});

const getCardsData = async (url) => {
  try {
    return await fetch(url).then(response => response.json());
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Mobile Menu Functionality
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// Search Functionality
function initSearchFunctionality() {
  // Desktop search
  const searchInput = document.getElementById('search-input');
  const clearSearch = document.getElementById('clear-search');
  const submitSearch = document.getElementById('submit-search');
  
  // Mobile search
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileClearSearch = document.getElementById('mobile-clear-search');
  const mobileSubmitSearch = document.getElementById('mobile-submit-search');

  if (searchInput && clearSearch && submitSearch) {
    // Show clear button when text is entered
    searchInput.addEventListener('input', function() {
      clearSearch.style.display = this.value ? 'block' : 'none';
    });

    // Clear search input
    clearSearch.addEventListener('click', function() {
      searchInput.value = '';
      clearSearch.style.display = 'none';
    });

    // Handle search submission
    submitSearch.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });

    // Handle Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(this.value);
      }
    });
  }

  if (mobileSearchInput && mobileClearSearch && mobileSubmitSearch) {
    // Show clear button when text is entered
    mobileSearchInput.addEventListener('input', function() {
      mobileClearSearch.style.display = this.value ? 'block' : 'none';
    });

    // Clear search input
    mobileClearSearch.addEventListener('click', function() {
      mobileSearchInput.value = '';
      mobileClearSearch.style.display = 'none';
    });

    // Handle search submission
    mobileSubmitSearch.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch(mobileSearchInput.value);
      document.querySelector('.mobile-menu').classList.remove('active');
      document.querySelector('.hamburger').classList.remove('active');
    });

    // Handle Enter key in search input
    mobileSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(this.value);
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
      }
    });
  }
}

// Social Sidebar
function initSocialSidebar() {
  // No additional JS needed as hover functionality is handled by CSS
}

// Handle URL Parameters
function handleUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  
  if (searchQuery) {
    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
      performSearch(searchQuery);
    }, 1000);
  }
}

const setFlipCard = (flipCard, item) => {
  flipCard.classList.add('flip-card');
  flipCard.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${item.frontImage}" alt="${item.title}">
        <div class="flip-card-front-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="flip-card-back">
        <img src="${item.backImage}" alt="${item.title} details">
        <div class="flip-card-back-content">
          <h3>${item.title}</h3>
          <p>${item.additionalInfo}</p>
          <button class="btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  `;
};

const setCityCard = (cityCard, city) => {
  cityCard.classList.add('city-card');
  cityCard.dataset.city = city.name.toLowerCase();
  cityCard.dataset.country = city.country.toLowerCase();
  
  cityCard.innerHTML = `
    <div class="city-image">
      <img src="${city.image}" alt="${city.name}, ${city.country}">
    </div>
    <div class="city-content">
      <span class="city-country">${city.country}</span>
      <h3 class="city-name">${city.name}</h3>
      <p class="city-description">${city.description}</p>
      <button class="btn-primary">Explore Tour</button>
    </div>
  `;
};

// Create Flip Cards
const createFlipCards = async (type, containerSelector) => {
  const loadingSpinner = document.querySelector(`#${type}-loading-spinner`);
  const data = await getCardsData(`./data/${type}.json`);
  console.log(data, type);
  
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const setCard = type === 'city_tours' ? setCityCard : setFlipCard;

  data.forEach(item => {
    const card = document.createElement('div');
    setCard(card, item);
    container.appendChild(card);
  });
}


// Perform Search
function performSearch(query) {
  if (!query) return;
  
  const lowercaseQuery = query.toLowerCase().trim();
  
  // If not on home page, redirect to home with search parameter
  if (!document.querySelector('.city-cards')) {
    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    return;
  }
  
  // Find matching city card
  const cityCards = document.querySelectorAll('.city-card');
  let found = false;
  
  // Remove any previous highlighting
  cityCards.forEach(card => {
    card.classList.remove('highlight-card');
  });
  
  // Search through city cards
  cityCards.forEach(card => {
    const cityName = card.dataset.city;
    const countryName = card.dataset.country;
    
    if (cityName.includes(lowercaseQuery) || countryName.includes(lowercaseQuery)) {
      found = true;
      
      // Scroll to the matching card
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight the card
      card.classList.add('highlight-card');
      
      // Apply temporary visual highlight
      card.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.5)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 3000);
    }
  });
  
  // If no matches found, show message
  if (!found) {
    alert(`No destinations found matching "${query}"`);
  }
}

// FAQ Functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Toggle current FAQ item
      item.classList.toggle('active');
      
      // Close other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}
