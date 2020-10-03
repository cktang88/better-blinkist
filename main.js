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
  const reader = node.getElementsByClassName("reader__container")[0];
  out.innerHTML = reader
    ? reader.innerHTML
    : "Invalid HTML. Please copy the full HTML from Blinkist.";
  // clear
  inbox.value = "";
}
/*
<div>hello</div>
*/
