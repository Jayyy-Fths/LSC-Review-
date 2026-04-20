document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalFallback = document.getElementById('modalFallback');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.getElementById('modalClose');
  const images = document.querySelectorAll('.highlights-grid img, .gallery-grid img');

  if (!modal || !modalImage || !modalCaption || !modalFallback || !modalLink || !modalClose || images.length === 0) {
    return;
  }

  function openModal(image) {
    const imageSrc = image.getAttribute('src') || image.currentSrc || image.src;
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || image.alt || '';

    modalImage.src = imageSrc;
    modalImage.alt = image.alt || 'Expanded photo';
    modalCaption.textContent = caption;
    modalFallback.hidden = true;
    modalLink.href = imageSrc;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalCaption.textContent = '';
    modalFallback.hidden = true;
    document.body.style.overflow = '';
  }

  modalImage.addEventListener('error', () => {
    modalFallback.hidden = false;
  });

  images.forEach((image) => {
    image.addEventListener('click', () => openModal(image));
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
});
