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


// Embed images directly into the page
(function() {
  // Poll every 500ms to see if both required elements are loaded.
  const pollInterval = 500; // milliseconds
  const maxAttempts = 60;   // e.g., 60 attempts = 30 seconds max (adjust as needed)
  let attempts = 0;
  
  const intervalId = setInterval(() => {
    attempts++;
    
    const pager = document.querySelector("div.item-detail__pager");
    const itemAbout = document.querySelector("section.item-about");
    
    // When both elements exist, clear the polling and execute the script.
    if (pager && itemAbout) {
      clearInterval(intervalId);
      
      // Gather image URLs from each <a> element.
      const imageLinks = pager.querySelectorAll("a");
      const imageUrls = [];
      
      imageLinks.forEach(link => {
        // Try to read the URL from the custom 'src' attribute.
        let url = link.getAttribute("src");
        if (!url) {
          // Fallback: try getting it from the inner <img> tag.
          const img = link.querySelector("img");
          if (img) {
            url = img.src;
          }
        }
        if (url) {
          imageUrls.push(url);
        }
      });
      
      // If there is only one image, do nothing.
      if (imageUrls.length <= 1) {
        return;
      }
      
      // Omit the first image from the list.
      const imagesToDisplay = imageUrls.slice(1);
      
      // Create a container for the additional images.
      const imageContainer = document.createElement("div");
      imageContainer.style.marginTop = "20px"; // Add spacing at the top
      
      // Create an image element for each URL.
      imagesToDisplay.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Additional image";
        img.style.maxWidth = "100%";  // Responsive images
        img.style.display = "block";
        img.style.marginBottom = "10px"; // Spacing between images
        imageContainer.appendChild(img);
      });
      
      // Append the container to the end of the 'item-about' section.
      itemAbout.appendChild(imageContainer);
    }
    
    // Stop polling after a maximum number of attempts.
    if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      console.warn("AmiAmi Image Embedder: Required elements not found after maximum attempts.");
    }
  }, pollInterval);
})();


// Refresh page if System Error Occured happens
(function () {
  // Poll every 500ms looking for the error
  const interval = setInterval(() => {
    if (document.body.innerText.includes("Please try again a little later.")) {
      location.reload();
      clearInterval(interval);
    }
  }, 500);

  // Stop polling after 10 seconds if element never appears
  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
})();