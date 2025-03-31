// history.js

// Key in localStorage where strains are saved
const storageKey = "strainHistory";

// Function to retrieve saved strains from localStorage
function loadStrains() {
  let history = localStorage.getItem(storageKey);
  if (history) {
    try {
      return JSON.parse(history);
    } catch (e) {
      console.error("Error parsing saved strains:", e);
      return [];
    }
  }
  return [];
}

// Function to save the updated history to localStorage
function saveStrains(strains) {
  localStorage.setItem(storageKey, JSON.stringify(strains));
}

// Function to create a strain element for display
function createStrainElement(strain, index) {
    const container = document.createElement("div");
    container.className = "strain-entry";
    
    // Create a clickable header.
    const header = document.createElement("h3");
    header.textContent = `Strain ${index + 1} (Saved on ${new Date(strain.timestamp).toLocaleString()})`;
    header.style.cursor = "pointer";
    container.appendChild(header);
    
    // Create a details div (hidden by default) containing all strain info.
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "strain-details";
    detailsDiv.style.display = "none";
    detailsDiv.innerHTML = `
      <p><strong>Ingredient Chain:</strong> ${strain.chain.join(" → ") || "N/A"}</p>
      <p><strong>Final Effects:</strong> ${strain.finalEffects.join(", ")}</p>
      <p><strong>Total Cost:</strong> $${strain.totalCost}</p>
      <p><strong>Final Price:</strong> $${strain.finalPrice}</p>
      <p><strong>Total Profit:</strong> $${strain.totalProfit}</p>
    `;
    container.appendChild(detailsDiv);
    
    // Toggle the details when the header is clicked.
    header.addEventListener("click", () => {
      detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
    });
    
    // Create and append a delete button.
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteStrainBtn";
    deleteBtn.setAttribute("data-index", index);
    deleteBtn.textContent = "Delete";
    container.appendChild(deleteBtn);
    
    return container;
  }
 
// Function to render the strain history on the page
function renderHistory() {
  const historyContainer = document.getElementById("historyContainer");
  historyContainer.innerHTML = ""; // clear existing
  const strains = loadStrains();
  
  if (strains.length === 0) {
    historyContainer.innerHTML = "<p>No strains saved yet.</p>";
    return;
  }
  
  strains.forEach((strain, index) => {
    const strainElement = createStrainElement(strain, index);
    historyContainer.appendChild(strainElement);
  });
  
  // Attach event listeners for delete buttons
  document.querySelectorAll(".deleteStrainBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      deleteStrain(idx);
    });
  });
}

// Function to delete a strain at a given index
function deleteStrain(index) {
  let strains = loadStrains();
  strains.splice(index, 1);
  saveStrains(strains);
  renderHistory();
}

// Event listener for clearing all history
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all saved strains?")) {
    localStorage.removeItem(storageKey);
    renderHistory();
  }
});

// Initialize history display on page load
document.addEventListener("DOMContentLoaded", renderHistory);
