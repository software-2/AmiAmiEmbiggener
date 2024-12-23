// Style Changes
window.addEventListener("load", () => {
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (min-width: 768px) {
        .newly-added-items__item__image_item img {
          max-height: 250px !important;
        }

        .newly-added-items__item {
            width: 250px !important;
          }
      }
    `;
    document.head.appendChild(style);
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;
  
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const currentPage = parseInt(params.get("pagecnt")) || 1;
  
    if (event.key === "ArrowRight") {
      params.set("pagecnt", currentPage + 1);
    } else if (event.key === "ArrowLeft" && currentPage > 1) {
      params.set("pagecnt", currentPage - 1);
    }
  
    window.location.href = url.toString();
  });