const listEl = document.getElementById("snippetList");
const searchEl = document.getElementById("searchInput");

async function loadSnippets() {
  const res = await fetch("/snippets.json");
  const names = await res.json();

  listEl.innerHTML = "";
  names.forEach(name => {
    const li = document.createElement("li");
    li.innerHTML = \`<a href="snippets/\${name}" target="_blank" rel="noopener noreferrer">\${name}</a>\`;
    listEl.appendChild(li);
  });
}

searchEl.addEventListener("input", async () => {
  const res = await fetch("/snippets.json");
  const names = await res.json();
  const search = searchEl.value.toLowerCase();
  listEl.innerHTML = "";
  names.filter(n => n.toLowerCase().includes(search)).forEach(name => {
    const li = document.createElement("li");
    li.innerHTML = \`<a href="snippets/\${name}" target="_blank" rel="noopener noreferrer">\${name}</a>\`;
    listEl.appendChild(li);
  });
});

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const status = document.getElementById("uploadStatus");

  status.textContent = "Uploading...";

  const res = await fetch("/upload", {
    method: "POST",
    body: data
  });

  if (res.ok) {
    status.textContent = "Upload successful!";
    loadSnippets();
  } else {
    status.textContent = "Upload failed.";
  }

  form.reset();
});

loadSnippets();
