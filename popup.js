// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  var cover = document.createElement("div");
  let css = `
      position: fixed;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: white;
      mix-blend-mode: difference;
      z-index: 1;
  `
  cover.setAttribute("style", css);
  document.body.appendChild(cover);
}
