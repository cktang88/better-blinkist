window.onload = () => {
  setInterval(refresh, 500);
};
let currentHTML = "";
function toNode(htmlRawString) {
  const doc = document.createElement("div");
  doc.innerHTML = htmlRawString;
  return doc;
}

const STORAGE_KEY = "better-blinkist";

function addTOC(readerElem) {
  const headers = readerElem.getElementsByClassName("chapter chapter");

  const toc = document.getElementById("toc");
  let tableOfContents = "";
  for (let h of headers) {
    h.id = h.getAttribute("data-chapterno");
    const chapterTitle = h.getElementsByTagName("h1")[0].innerText;
    tableOfContents += `<p><a href='#${h.id}'>${chapterTitle}</a></p>`;
  }
  toc.innerHTML = tableOfContents;
}

function refresh() {
  const out = document.getElementById("out");
  const inbox = document.getElementById("inbox");
  // if input is blank, try to get from localstorage
  const raw = inbox.value || localStorage.getItem(STORAGE_KEY);

  if (!raw?.length) {
    // skip render if empty input
    console.log("empty");
    return;
  }
  // clear input
  inbox.value = "";
  if (currentHTML === raw) {
    // skip render if same input
    console.log("same");
    return;
  }
  currentHTML = raw;

  // rough processing
  const start = raw.indexOf("<main");
  const end = raw.indexOf("</main>") + 7;
  const processed = raw.slice(start, end);
  const node = toNode(processed);
  // fine processing
  const reader = node.getElementsByClassName("reader__container__right")[0];
  if (!reader) {
    out.innerHTML = "Invalid HTML. Please copy the full HTML from Blinkist.";
    return;
  }
  addTOC(reader);

  localStorage.setItem(STORAGE_KEY, currentHTML);
  out.innerHTML = reader.innerHTML;
}
/*
<div>hello</div>
*/
