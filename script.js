document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModalButton = document.getElementById('closeModal');
  const clickableImages = document.querySelectorAll('.gallery-grid img, .highlight img');

  if (!modal || !modalImage || !closeModalButton || clickableImages.length === 0) {
    return;
  }

  function openModal(imageElement) {
    modalImage.src = imageElement.src;
    modalImage.alt = imageElement.alt || 'Expanded image';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    document.body.style.overflow = '';
  }

  clickableImages.forEach((img) => {
    img.addEventListener('click', () => openModal(img));
  });

  closeModalButton.addEventListener('click', closeModal);
  const modalCaption = document.getElementById('modalCaption');
  const closeButton = document.getElementById('modalClose');
  const zoomableImages = document.querySelectorAll('.photo-grid img, .highlight img');
  const navLinks = document.querySelectorAll('.topbar a');

  if (!modal || !modalImage || !modalCaption || !closeButton) {
    return;
  }

  const openModal = (image) => {
    modalImage.src = image.src;
    modalImage.alt = image.alt || 'Expanded photo';
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
    modalCaption.textContent = caption || image.alt || '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalCaption.textContent = '';
    document.body.style.overflow = '';
  };

  zoomableImages.forEach((image) => {
    image.addEventListener('click', () => openModal(image));
  });

  closeButton.addEventListener('click', closeModal);

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
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  const sections = [...document.querySelectorAll('main section[id]')];

  if ('IntersectionObserver' in window && sections.length > 0 && navLinks.length > 0) {
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
