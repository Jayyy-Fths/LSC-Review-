document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModalButton = document.getElementById('modalClose');
  const modalCaption = document.getElementById('modalCaption');
  const clickableImages = document.querySelectorAll('.photo-grid img, .highlight img');

  if (!modal || !modalImage || !closeModalButton || !modalCaption || clickableImages.length === 0) {
    return;
  }

  function openModal(imageElement) {
    modalImage.src = imageElement.src;
    modalImage.alt = imageElement.alt || 'Expanded image';
    const figcaption = imageElement.closest('figure')?.querySelector('figcaption');
    modalCaption.textContent = figcaption ? figcaption.textContent : imageElement.alt || '';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalCaption.textContent = '';
    document.body.style.overflow = '';
  }

  clickableImages.forEach((img) => {
    img.addEventListener('click', () => openModal(img));
  });

  closeModalButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // IntersectionObserver for nav
  const sections = [...document.querySelectorAll('main section[id]')];

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navLinks = document.querySelectorAll('.topbar a');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.setAttribute('aria-current', isMatch ? 'page' : 'false');
          });
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
