/**
 * VA Card Specializations Filter - Custom Code for Webflow
 * 
 * DESCRIPTION:
 * Limita la visualización de specializations en las cards a solo 4 elementos.
 * En las páginas de perfil se muestran todas las specializations.
 * 
 * INSTRUCCIONES:
 * 1. Añadir este código en Settings > Custom Code > Footer Code de la página de categorías
 * 2. Asegurarse de que las cards tengan la clase "va-card-premium" o "va-grid-card"
 * 3. Las specializations deben estar dentro de un contenedor con clase "va-tags-premium" o "va-grid-tags"
 */

(function() {
  'use strict';

  // Configuración
  const MAX_SPECIALIZATIONS_IN_CARD = 4;
  
  // Selectores para las cards (ajustar según tu estructura)
  const CARD_SELECTORS = [
    '.va-card-premium',
    '.va-grid-card',
    '[class*="va-card"]'
  ];

  /**
   * Limita las specializations visibles en una card
   * @param {HTMLElement} card - Elemento de la card
   */
  function limitSpecializationsInCard(card) {
    // Buscar contenedor de tags de specializations
    const tagsContainer = card.querySelector('.va-tags-premium, .va-grid-tags, [class*="tags"]');
    
    if (!tagsContainer) {
      return; // No hay tags en esta card
    }

    // Obtener todos los tags de specialization
    const tags = Array.from(tagsContainer.children);
    
    if (tags.length <= MAX_SPECIALIZATIONS_IN_CARD) {
      return; // Ya tiene 4 o menos, no hacer nada
    }

    // Ocultar tags después del límite
    tags.forEach((tag, index) => {
      if (index >= MAX_SPECIALIZATIONS_IN_CARD) {
        tag.style.display = 'none';
        // Opcional: Añadir clase para estilizado
        tag.classList.add('va-spec-hidden');
      }
    });

    // Opcional: Añadir indicador de que hay más specializations
    // Solo si quieres mostrar "..." o un contador
    const totalCount = tags.length;
    if (totalCount > MAX_SPECIALIZATIONS_IN_CARD) {
      const remainingCount = totalCount - MAX_SPECIALIZATIONS_IN_CARD;
      
      // Crear elemento indicador (opcional)
      const indicator = document.createElement('span');
      indicator.className = 'va-spec-more-indicator';
      indicator.textContent = `+${remainingCount}`;
      indicator.style.cssText = `
        background: #e8f7f6;
        color: #049d98;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid #b3e5e0;
        margin-left: 4px;
      `;
      
      tagsContainer.appendChild(indicator);
    }
  }

  /**
   * Procesar todas las cards en la página
   */
  function processAllCards() {
    // Buscar todas las cards en la página
    let cards = [];
    
    CARD_SELECTORS.forEach(selector => {
      const found = document.querySelectorAll(selector);
      if (found.length > 0) {
        cards = Array.from(found);
        return;
      }
    });

    // Si no se encontraron cards, buscar por estructura CMS de Webflow
    if (cards.length === 0) {
      // Buscar elementos que contengan specializations (Webflow CMS structure)
      const cmsCards = document.querySelectorAll('[class*="collection-item"], [data-wf-collection-item]');
      cards = Array.from(cmsCards);
    }

    // Procesar cada card
    cards.forEach(card => {
      limitSpecializationsInCard(card);
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processAllCards);
  } else {
    // DOM ya está listo
    processAllCards();
  }

  // Opcional: Re-ejecutar si el contenido se carga dinámicamente (CMS de Webflow)
  // Webflow a veces carga contenido dinámicamente, así que observamos cambios
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      let shouldReprocess = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              // Verificar si es una card nueva
              const isCard = node.matches && (
                node.matches('.va-card-premium, .va-grid-card') ||
                node.querySelector('.va-card-premium, .va-grid-card')
              );
              
              if (isCard) {
                shouldReprocess = true;
              }
            }
          });
        }
      });
      
      if (shouldReprocess) {
        processAllCards();
      }
    });

    // Observar cambios en el body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
