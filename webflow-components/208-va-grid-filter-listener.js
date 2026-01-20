/**
 * VA Grid Filter Listener
 * Listens to filter changes from 207-filters-va-page.html and filters the VA grid
 * 
 * Usage: Include this script after the grid HTML (208-va-grid-part1.html and 208-va-grid-part2.html)
 */

(function() {
  // Store current filters
  let activeFilters = {
    search: '',
    availability: 'All',
    language: 'All'
  };

  // Function to update results counter
  function updateResultsCounter(visibleCount, totalCount) {
    let counter = document.getElementById('va-results-counter');
    
    if (!counter) {
      // Create counter element if it doesn't exist
      const gridSection = document.querySelector('.va-grid-section');
      if (gridSection) {
        counter = document.createElement('div');
        counter.id = 'va-results-counter';
        counter.style.cssText = `
          text-align: center;
          padding: 24px 20px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          border-bottom: 1px solid #e5e7eb;
        `;
        gridSection.insertBefore(counter, gridSection.querySelector('.va-grid-container'));
      }
    }
    
    if (counter) {
      if (visibleCount === 0) {
        counter.textContent = 'No VAs found matching your filters';
        counter.style.color = '#ef4444';
      } else {
        counter.textContent = `Showing ${visibleCount} of ${totalCount} VA${totalCount !== 1 ? 's' : ''}`;
        counter.style.color = '#6b7280';
      }
    }
  }

  // Function to extract all searchable text from a card
  function extractSearchableText(card) {
    const searchableData = {
      name: '',
      mainCategory: '',
      experience: '',
      language: '',
      specializations: [],
      role: '',
      skills: []
    };

    // Extract name
    searchableData.name = (card.querySelector('.va-grid-card-name')?.textContent || '').toLowerCase();
    
    // Extract main category / role
    searchableData.role = (card.querySelector('.va-grid-card-role')?.textContent || '').toLowerCase();
    
    // Extract availability
    const availability = card.querySelector('.va-grid-availability')?.textContent || '';
    
    // Extract experience (from info section)
    const experienceElement = card.querySelector('.va-grid-card-info');
    if (experienceElement) {
      const experienceText = experienceElement.textContent || '';
      const experienceMatch = experienceText.match(/(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i);
      if (experienceMatch) {
        searchableData.experience = experienceMatch[0].toLowerCase();
      }
    }

    // Extract language
    const languageElement = card.querySelector('.va-grid-card-info');
    if (languageElement) {
      const languageText = languageElement.textContent || '';
      // Try to extract language after "LANGUAGE" label or emoji
      if (languageText.includes('🌐') || languageText.includes('Language')) {
        const parts = languageText.split(/🌐|Language/i);
        if (parts.length > 1) {
          searchableData.language = parts[1].trim().toLowerCase();
        }
      }
    }

    // Extract specializations (tags)
    const specializationTags = card.querySelectorAll('.va-grid-tag, .va-tag-premium, [class*="tag"]');
    specializationTags.forEach(tag => {
      const tagText = tag.textContent.trim().toLowerCase();
      if (tagText) {
        searchableData.specializations.push(tagText);
      }
    });

    // Get all text content from card (fallback for any other data)
    const allText = card.textContent || '';
    
    return {
      searchableText: [
        searchableData.name,
        searchableData.role,
        searchableData.experience,
        searchableData.language,
        ...searchableData.specializations,
        allText.toLowerCase() // Include all text as fallback
      ].join(' ').toLowerCase(),
      availability: availability,
      language: searchableData.language || allText.toLowerCase()
    };
  }

  // Function to filter VA cards
  function filterVACards() {
    const cards = document.querySelectorAll('.va-grid-card');
    let visibleCount = 0;

    cards.forEach(card => {
      // Extract all searchable data from card
      const cardData = extractSearchableText(card);
      
      // Check search filter - search in ALL fields
      const searchTerm = activeFilters.search.toLowerCase().trim();
      const searchMatch = !searchTerm || cardData.searchableText.includes(searchTerm);

      // Check availability filter
      const availabilityMatch = activeFilters.availability === 'All' || 
                               cardData.availability.includes(activeFilters.availability);

      // Check language filter
      const languageMatch = activeFilters.language === 'All' || 
                           cardData.language.includes(activeFilters.language.toLowerCase());

      // Show/hide card based on all filters
      const shouldShow = searchMatch && availabilityMatch && languageMatch;
      
      if (shouldShow) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update counter
    updateResultsCounter(visibleCount, cards.length);
    console.log(`Showing ${visibleCount} out of ${cards.length} VA cards`);
  }

  // Listen for filter changes from 207
  document.addEventListener('vaFiltersChanged', (e) => {
    activeFilters = e.detail;
    console.log('Grid received filter update:', activeFilters);
    filterVACards();
  });

  console.log('VA Grid Filter Listener initialized');
})();
