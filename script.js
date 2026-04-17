document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  const images = document.querySelectorAll(".gallery img, .card img");

  if (!modal || !modalImg || !closeBtn || images.length === 0) {
    return;
  }

  const openModal = (image) => {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modalImg.src = image.src;
    modalImg.alt = image.alt || "Expanded gallery image";
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };

  images.forEach((img) => {
    img.addEventListener("click", () => openModal(img));
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
});
