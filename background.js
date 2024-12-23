// Set up a listener to receive messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startReloading") {
      // Refresh the page every 3 seconds
      const intervalId = setInterval(() => {
        chrome.tabs.reload(sender.tab.id);
      }, 3000);
  
      // Stop reloading when "banana" is no longer found
      chrome.runtime.onMessage.addListener((stopMessage) => {
        if (stopMessage.action === "stopReloading") {
          clearInterval(intervalId);
        }
      });
    }
  });