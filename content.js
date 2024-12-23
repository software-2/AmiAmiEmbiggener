// Wait for the DOM and styles to load
window.addEventListener("load", () => {
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (min-width: 768px) {
        .newly-added-items__item__image_item img {
          max-height: 350px !important;
        }
      }
    `;
    document.head.appendChild(style);
  });