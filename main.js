window.onload = () => {
  setInterval(refresh, 500);
};
const curPage = "";
function toNode(htmlRawString) {
  const doc = document.createElement("div");
  doc.innerHTML = htmlRawString;
  return doc;
}

function refresh() {
  const out = document.getElementById("out");
  const inbox = document.getElementById("inbox");
  if (!inbox.value.length) return;
  // rough processing
  const raw = inbox.value;
  const start = raw.indexOf("<main");
  const end = raw.indexOf("</main>") + 7;
  const processed = raw.slice(start, end);
  const node = toNode(processed);
  // fine processing
  const reader = node.getElementsByClassName("reader__container__right")[0];
  const headers = reader.getElementsByClassName("chapter chapter");

  let tableOfContents = "<div id='toc'>";
  for (let h of headers) {
    h.id = h.getAttribute("data-chapterno");
    const chapterTitle = h.getElementsByTagName("h1")[0].innerText;
    tableOfContents += `<p><a href='#${h.id}'>${chapterTitle}</a></p>`;
  }
  tableOfContents += "</div>";

  out.innerHTML = reader
    ? tableOfContents + reader.innerHTML
    : "Invalid HTML. Please copy the full HTML from Blinkist.";

  // clear
  inbox.value = "";
}
/*
<div>hello</div>
*/
