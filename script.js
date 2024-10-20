const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const titleInput = document.getElementById("titleInput");
const listInput = document.getElementById("listInput");
const stickyContainer = document.getElementById("stickyContainer");

let notesCount = 0;

addBtn.addEventListener("click", () => {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  titleInput.value = "";
  listInput.value = "";
});

saveBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const items = listInput.value.split(",").map((item) => item.trim());

  if (title && items.length > 0) {
    createStickyNote(title, items);
    closeBtn.click(); // Close the popup
  } else {
    alert("Please fill in both the title and the list items.");
  }
});

function createStickyNote(title, items) {
  const stickyNote = document.createElement("div");
  stickyNote.className = "sticky-note";
  stickyNote.innerHTML = `<strong>${title}</strong><br>${items.join("<br>")}`;

  stickyNote.addEventListener("dblclick", () => {
    if (confirm("Do you want to delete this note?")) {
      stickyContainer.removeChild(stickyNote);
    }
  });

  stickyContainer.appendChild(stickyNote);
  notesCount++;
}
