document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeButton = document.getElementById('modalClose');
  const zoomable = document.querySelectorAll('.gallery img, .cards img');

  if (!modal || !modalImage || !closeButton) {
    return;
  }

  const openModal = (image) => {
    modalImage.src = image.src;
    modalImage.alt = image.alt || 'Expanded image';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    document.body.style.overflow = '';
  };

  zoomable.forEach((image) => {
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
});
