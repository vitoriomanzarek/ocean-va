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
          padding: 16px 20px;
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

  // Function to filter VA cards
  function filterVACards() {
    const cards = document.querySelectorAll('.va-grid-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.querySelector('.va-grid-card-name')?.textContent.toLowerCase() || '';
      const availability = card.querySelector('.va-grid-availability')?.textContent || '';
      const language = card.querySelector('.va-grid-card-info')?.textContent || '';

      // Check search filter
      const searchMatch = name.includes(activeFilters.search.toLowerCase());

      // Check availability filter
      const availabilityMatch = activeFilters.availability === 'All' || availability.includes(activeFilters.availability);

      // Check language filter
      const languageMatch = activeFilters.language === 'All' || language.includes(activeFilters.language);

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
