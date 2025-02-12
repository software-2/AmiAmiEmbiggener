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

// JAN code links to MyFigureCollection
(function () {
  function modifyJanCode() {
    const dtElements = document.querySelectorAll('dt.item-about__data-title');
    for (let dt of dtElements) {
      if (dt.textContent.trim() === "JAN code") {
        const dd = dt.nextElementSibling;
        if (dd && dd.classList.contains('item-about__data-text')) {
          const janCode = dd.textContent.trim();
          if (/^\d+$/.test(janCode)) {
            const a = document.createElement("a");
            a.href = `https://myfigurecollection.net/?keywords=${janCode}&_tb=item`;
            a.setAttribute("class", "");
            
            const span = document.createElement("span");
            span.className = "item-about__data-gray";
            span.textContent = janCode;
            
            a.appendChild(span);
            dd.textContent = "";
            dd.appendChild(a);
          }
        }
        break;
      }
    }
  }

  // Poll every 500ms until at least one dt element is found
  const interval = setInterval(() => {
    if (document.querySelector('dt.item-about__data-title')) {
      modifyJanCode();
      clearInterval(interval);
    }
  }, 500);

  // Stop polling after 10 seconds if dt element never appears
  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
})();