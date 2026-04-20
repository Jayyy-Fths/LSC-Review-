document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modal');
  var modalImage = document.getElementById('modalImage');
  var modalCaption = document.getElementById('modalCaption');
  var modalFallback = document.getElementById('modalFallback');
  var modalLink = document.getElementById('modalLink');
  var modalClose = document.getElementById('modalClose');
  var links = document.querySelectorAll('.img-link');

  if (!modal || !modalImage || !modalCaption || !modalFallback || !modalLink || !modalClose || links.length === 0) {
    return;
  }

  function findCaptionText(link) {
    var figure = link.closest('figure');
    if (figure) {
      var figcaption = figure.querySelector('figcaption');
      if (figcaption && figcaption.textContent) {
        return figcaption.textContent.trim();
      }
    }

    var highlight = link.closest('.highlight');
    if (highlight) {
      var title = highlight.querySelector('h3');
      if (title && title.textContent) {
        return title.textContent.trim();
      }
    }

    var image = link.querySelector('img');
    return image ? image.alt : '';
  }

  function openModal(link) {
    var image = link.querySelector('img');
    var imageSrc = link.getAttribute('href');
    var imageAlt = image ? image.alt : 'Expanded photo';

    modalImage.src = imageSrc;
    modalImage.alt = imageAlt || 'Expanded photo';
    modalCaption.textContent = findCaptionText(link);
    modalLink.href = imageSrc;
    modalFallback.hidden = true;

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

  modalImage.addEventListener('error', function () {
    modalFallback.hidden = false;
  });

  for (var i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', function (event) {
      event.preventDefault();
      openModal(this);
    });
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
});
