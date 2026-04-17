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
