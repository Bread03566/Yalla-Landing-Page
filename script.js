/**
 * YALLA HABIBI - VANILLA JAVASCRIPT
 * Modular, event-driven client logic for interactive components:
 * - Mobile Navigation Toggle
 * - Light/Dark Theme Switcher with LocalStorage
 * - Category Filter for Menu Items
 * - 4-Step Interactive "Build Your Own Bowl" Customizer & Price Calculator
 * - Accessible FAQ Accordion
 * - Modal Dialog with Focus Management
 * - Accessible Form Validation & Feedback
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. LIGHT / DARK THEME TOGGLE
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('yh-theme');

  // Detect system preference or saved theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to light theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to dark theme');
    }
    localStorage.setItem('yh-theme', theme);
  }

  applyTheme(initialTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

  // =========================================================================
  // 2. MOBILE HAMBURGER MENU NAVIGATION
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const primaryNav = document.getElementById('primary-nav');
  const navLinks = primaryNav?.querySelectorAll('.nav-link');

  function toggleMobileMenu(open) {
    const shouldOpen = open !== undefined ? open : !primaryNav?.classList.contains('is-open');
    if (shouldOpen) {
      primaryNav?.classList.add('is-open');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
    } else {
      primaryNav?.classList.remove('is-open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());

  // Close menu when clicking navigation links on mobile
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMobileMenu(false);
      }
    });
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav?.classList.contains('is-open')) {
      toggleMobileMenu(false);
      hamburgerBtn?.focus();
    }
  });

  // =========================================================================
  // 3. MENU CATEGORY FILTER
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-item-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedCategory = tab.getAttribute('data-category');

      // Update active state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter grid cards
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 4. INTERACTIVE "BUILD YOUR OWN BOWL" RECEIPT SLIP & CALCULATOR
  // =========================================================================
  const builderForm = document.getElementById('bowl-builder-form');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const copyOrderBtn = document.getElementById('copy-order-btn');
  const builderFeedback = document.getElementById('builder-feedback');

  // Receipt DOM Elements
  const receiptOrderNum = document.getElementById('receipt-order-number');
  const receiptTimestamp = document.getElementById('receipt-timestamp');
  const receiptBase = document.getElementById('receipt-base');
  const receiptProtein = document.getElementById('receipt-protein');
  const receiptProteinPrice = document.getElementById('receipt-protein-price');
  const receiptToppings = document.getElementById('receipt-toppings');
  const receiptSauce = document.getElementById('receipt-sauce');
  const receiptItemTotal = document.getElementById('receipt-item-total');
  const receiptGrandTotal = document.getElementById('receipt-grand-total');
  const receiptVatExclusive = document.getElementById('receipt-vat-exclusive');
  const receiptVatAmount = document.getElementById('receipt-vat-amount');

  let currentOrderNumber = '#YH-' + Math.floor(1000 + Math.random() * 9000);

  function getFormattedTimestamp() {
    const now = new Date();
    try {
      return now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return 'Today • Fresh Order';
    }
  }

  function calculateBowlSummary() {
    if (!builderForm) return;

    const baseInput = builderForm.querySelector('input[name="bowl-base"]:checked');
    const proteinInput = builderForm.querySelector('input[name="bowl-protein"]:checked');
    const sauceInput = builderForm.querySelector('input[name="bowl-sauce"]:checked');
    const toppingInputs = builderForm.querySelectorAll('input[name="bowl-toppings"]:checked');

    const baseVal = baseInput ? baseInput.value : 'Basmati Rice';
    const proteinVal = proteinInput ? proteinInput.value : 'Chicken Shawarma';
    const sauceVal = sauceInput ? sauceInput.value : 'Garlic Toum Sauce';

    const selectedToppings = [];
    toppingInputs.forEach(input => selectedToppings.push(input.value));
    const toppingsText = selectedToppings.length > 0 ? selectedToppings.join(', ') : 'No extra toppings';

    // Calculate dynamic pricing
    let grandTotal = 189.00;
    let proteinExtra = '(Incl.)';

    if (proteinVal === 'Kofta Kebab' || proteinVal === 'Beef Taco') {
      grandTotal += 20.00;
      proteinExtra = '(+₱20.00)';
    }

    // Philippine 12% EVAT calculation
    const vatExclusive = grandTotal / 1.12;
    const vatAmount = grandTotal - vatExclusive;

    // Update Receipt DOM elements
    if (receiptOrderNum) receiptOrderNum.textContent = currentOrderNumber;
    if (receiptTimestamp) receiptTimestamp.textContent = getFormattedTimestamp();
    if (receiptBase) receiptBase.textContent = baseVal;
    if (receiptProtein) receiptProtein.textContent = proteinVal;
    if (receiptProteinPrice) receiptProteinPrice.textContent = proteinExtra;
    if (receiptToppings) receiptToppings.textContent = toppingsText;
    if (receiptSauce) receiptSauce.textContent = sauceVal;

    const formattedTotal = `₱${grandTotal.toFixed(2)}`;
    if (receiptItemTotal) receiptItemTotal.textContent = formattedTotal;
    if (receiptGrandTotal) receiptGrandTotal.textContent = formattedTotal;
    if (receiptVatExclusive) receiptVatExclusive.textContent = `₱${vatExclusive.toFixed(2)}`;
    if (receiptVatAmount) receiptVatAmount.textContent = `₱${vatAmount.toFixed(2)}`;
  }

  builderForm?.addEventListener('change', calculateBowlSummary);
  
  builderForm?.addEventListener('reset', () => {
    // Generate fresh order ID on reset
    currentOrderNumber = '#YH-' + Math.floor(1000 + Math.random() * 9000);
    setTimeout(calculateBowlSummary, 50);
  });

  // Print Receipt Button Action
  printReceiptBtn?.addEventListener('click', () => {
    showBuilderFeedback('Preparing printable thermal receipt slip...', 'info');
    setTimeout(() => {
      window.print();
    }, 250);
  });

  // Copy customized order text to clipboard
  copyOrderBtn?.addEventListener('click', () => {
    const diningTypeInput = document.querySelector('input[name="receipt-dining-type"]:checked');
    const diningMode = diningTypeInput ? diningTypeInput.value : 'DINE-IN';

    const base = receiptBase?.textContent || 'Basmati Rice';
    const protein = receiptProtein?.textContent || 'Chicken Shawarma';
    const toppings = receiptToppings?.textContent || 'Standard Fresh Toppings';
    const sauce = receiptSauce?.textContent || 'Garlic Toum';
    const total = receiptGrandTotal?.textContent || '₱189.00';
    const orderNo = receiptOrderNum?.textContent || '#YH-4821';
    const time = receiptTimestamp?.textContent || 'Today';

    const receiptSlip = 
`========================================
         YALLA HABIBI LUCENA
    Mediterranean × Mexican Fusion
========================================
ORDER NO: ${orderNo}
DATE:     ${time}
OPTION:   ${diningMode}
SERVER:   POS KITCHEN #01
----------------------------------------
1x CUSTOM HABIBI BOWL          ${total}
   • Base:     ${base}
   • Protein:  ${protein}
   • Toppings: ${toppings}
   • Sauce:    ${sauce}
----------------------------------------
SUBTOTAL (VAT Excl.):          ${receiptVatExclusive?.textContent || '₱168.75'}
12% EVAT:                      ${receiptVatAmount?.textContent || '₱20.25'}
TOTAL AMOUNT DUE:              ${total}
----------------------------------------
Maraming Salamat, Habibi! ❤️
Show this ticket at cashier or via chat!
========================================`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(receiptSlip).then(() => {
        showBuilderFeedback('Full receipt copied to clipboard! Ready to send or show at the counter.', 'success');
      }).catch(() => {
        fallbackCopyText(receiptSlip);
      });
    } else {
      fallbackCopyText(receiptSlip);
    }
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showBuilderFeedback('Receipt details copied to clipboard!', 'success');
    } catch (err) {
      showBuilderFeedback('Please print or take a screenshot of your receipt!', 'info');
    }
    document.body.removeChild(textArea);
  }

  function showBuilderFeedback(msg, type) {
    if (!builderFeedback) return;
    builderFeedback.textContent = msg;
    builderFeedback.style.color = type === 'success' ? 'var(--color-success)' : 'var(--color-accent)';
    setTimeout(() => {
      builderFeedback.textContent = '';
    }, 4500);
  }

  // =========================================================================
  // 5. ACCESSIBLE FAQ ACCORDION
  // =========================================================================
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // Close other panels if single-accordion behavior is preferred
      faqToggles.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherBtn.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      // Toggle current panel
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.hidden = false;
      }
    });
  });

  // =========================================================================
  // 6. ACCESSIBLE DISH MODAL DIALOG
  // =========================================================================
  const modal = document.getElementById('dish-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentArea = document.getElementById('modal-content');
  const modalOpenBtns = document.querySelectorAll('.open-modal-btn');
  let previouslyFocusedElement = null;

  const dishData = {
    wrap: {
      title: 'Signature Shawarma Wrap',
      price: '₱149.00',
      badge: 'New Item',
      image: 'assets/800275457_1496946245785496_5178054049255909124_n.jpg',
      alt: 'Juicy chicken shawarma wrap halves cut cleanly showing delicious fillings',
      desc: 'Our latest signature street-food creation! Loaded with spiced marinated chicken shavings, authentic garlic toum, salty pickles, shoestring fries, and melty mozzarella wrapped in a toasted tortilla.',
      tags: ['100% Halal Certified', 'Spiced Chicken', 'House Pickles', 'Hand-Held']
    },
    fries: {
      title: 'Loaded Habibi Fries & Salad',
      price: '₱189.00',
      badge: 'Crowd Favorite',
      image: 'assets/642359699_17875232058520632_6829404238685055257_n.jpg',
      alt: 'Loaded shoestring fries platter with shawarma meat and fresh sweet corn salad',
      desc: 'Crispy seasoned fries smothered with slow-roasted shawarma cuts, savory cheese sauce, fresh herbs, and served alongside a crisp salad bowl packed with sweet corn, onions, and cucumbers.',
      tags: ['Sharing Portion', 'Cheesy Sauce', 'Crisp Fries', 'Includes Salad']
    },
    matcha: {
      title: 'Shawarma Bowl & Matcha Swirl Combo',
      price: '₱229.00',
      badge: 'Combo Deal',
      image: 'assets/642119347_17875051863520632_3456016616253996285_n.jpg',
      alt: 'Mediterranean shawarma rice bowl paired with matcha swirl soft serve',
      desc: 'The best of both worlds: a savory, high-protein customized basmati bowl loaded with meat and veggies, accompanied by our signature chilled Japanese matcha & vanilla soft-serve dessert.',
      tags: ['Bowl + Dessert', 'Matcha Soft Serve', 'Best Value', 'Lucena Specialty']
    },
    takeaway: {
      title: 'Habibi Family & Office Packs',
      price: 'Starting at ₱499.00',
      badge: 'Party Size',
      image: 'assets/660427105_17879556843520632_7744609485749811534_n.jpg',
      alt: 'Sealed brown paper takeaway bags containing Yalla Habibi party bowls and boxes',
      desc: 'Planning a group lunch, office celebration, or weekend family gathering? Order our tamper-sealed party packs with assorted bowls, wraps, dips, and loaded fries.',
      tags: ['Catering Ready', 'Spill-Proof Packaging', 'Serves 4 to 12', 'Delivery Friendly']
    }
  };

  function openModal(dishKey) {
    const data = dishData[dishKey];
    if (!data || !modal || !modalContentArea) return;

    previouslyFocusedElement = document.activeElement;

    modalContentArea.innerHTML = `
      <div style="margin-bottom: 1rem; border-radius: 12px; overflow: hidden; height: 220px;">
        <img src="${data.image}" alt="${data.alt}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
        <h3 id="modal-dish-title" style="font-size: 1.35rem; color: var(--color-primary);">${data.title}</h3>
        <span style="font-size: 1.25rem; font-weight: 800; color: var(--color-accent);">${data.price}</span>
      </div>
      <p style="font-size: 0.925rem; color: var(--color-text-muted); margin-bottom: 1rem; line-height: 1.5;">${data.desc}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${data.tags.map(t => `<span class="tag" style="background: var(--color-surface-alt);">${t}</span>`).join('')}
      </div>
      <a href="#bowl-builder" class="btn btn-cta btn-block" id="modal-order-btn" style="text-align:center;">Customize In Bowl Builder</a>
    `;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to close button
    modalCloseBtn?.focus();

    // Hook modal action button
    const modalOrderBtn = document.getElementById('modal-order-btn');
    modalOrderBtn?.addEventListener('click', () => {
      closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dishKey = btn.getAttribute('data-dish');
      openModal(dishKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
      closeModal();
    }
  });

  // =========================================================================
  // 7. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const channelInput = document.getElementById('contact-channel');
    const messageInput = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const contactError = document.getElementById('contact-error');
    const messageError = document.getElementById('message-error');

    let isValid = true;

    // Reset error states
    if (nameError) nameError.textContent = '';
    if (contactError) contactError.textContent = '';
    if (messageError) messageError.textContent = '';
    nameInput?.classList.remove('input-error');
    channelInput?.classList.remove('input-error');
    messageInput?.classList.remove('input-error');

    if (!nameInput?.value.trim()) {
      isValid = false;
      nameInput?.classList.add('input-error');
      if (nameError) nameError.textContent = 'Please enter your name.';
    }

    if (!channelInput?.value.trim()) {
      isValid = false;
      channelInput?.classList.add('input-error');
      if (contactError) contactError.textContent = 'Please provide an email address or mobile number.';
    }

    if (!messageInput?.value.trim()) {
      isValid = false;
      messageInput?.classList.add('input-error');
      if (messageError) messageError.textContent = 'Please write your message or reservation request.';
    }

    if (isValid && formFeedback) {
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! We received your message. Our Lucena team will contact you shortly via ${channelInput.value.trim()}.`;
      contactForm.reset();

      setTimeout(() => {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';
      }, 7000);
    }
  });

  // Initial calculation
  calculateBowlSummary();

})();
