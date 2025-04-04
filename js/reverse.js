// reverse.js

// 1) Effects multipliers (same as in the calculator)
const effects = {
  "Anti-Gravity": 0.54, "Athletic": 0.32, "Balding": 0.30, "Bright-Eyed": 0.40,
  "Calming": 0.10, "Calorie-Dense": 0.28, "Cyclopean": 0.56, "Disorienting": 0.00,
  "Electrifying": 0.50, "Energizing": 0.22, "Euphoric": 0.18, "Explosive": 0.00,
  "Focused": 0.16, "Foggy": 0.36, "Gingeritis": 0.20, "Glowing": 0.48,
  "Jennerising": 0.42, "Laxative": 0.00, "Long Faced": 0.52, "Munchies": 0.12,
  "Paranoia": 0.00, "Refreshing": 0.14, "Schizophrenia": 0.00, "Sedating": 0.26,
  "Seizure-Inducing": 0.00, "Shrinking": 0.60, "Slippery": 0.34, "Smelly": 0.00,
  "Sneaky": 0.24, "Spicy": 0.38, "Thought-Provoking": 0.44, "Toxic": 0.00,
  "Tropic Thunder": 0.46, "Zombifying": 0.58
};

// NEW: Effect difficulty mapping – higher values indicate effects that are harder to achieve.
const effectDifficulty = {
  "Anti-Gravity": 1.5, "Athletic": 1, "Balding": 1, "Bright-Eyed": 1,
  "Calming": 1, "Calorie-Dense": 1, "Cyclopean": 1.2, "Disorienting": 1,
  "Electrifying": 1.3, "Energizing": 1, "Euphoric": 1.5, "Explosive": 1,
  "Focused": 2.0, "Foggy": 1, "Gingeritis": 1.2, "Glowing": 1.2,
  "Jennerising": 1.5, "Laxative": 1, "Long Faced": 1.2, "Munchies": 1,
  "Paranoia": 1, "Refreshing": 1, "Schizophrenia": 2.0, "Sedating": 1,
  "Seizure-Inducing": 2.0, "Shrinking": 2.0, "Slippery": 1.2, "Smelly": 1,
  "Sneaky": 1.3, "Spicy": 1, "Thought-Provoking": 1.5, "Toxic": 1,
  "Tropic Thunder": 1.2, "Zombifying": 1.5
};

// 2) Ingredients array (identical to the calculator)
const ingredients = [
  {
    name: "Addy",
    baseEffect: "Thought-Provoking",
    cost: 9,
    rules: [
      { if: "Sedating", then: "Gingeritis" },
      { if: "Long Faced", then: "Electrifying" },
      { if: "Glowing", then: "Refreshing" },
      { if: "Foggy", then: "Energizing" },
      { if: "Explosive", then: "Euphoric" }
    ]
  },
  {
    name: "Banana",
    baseEffect: "Gingeritis",
    cost: 2,
    rules: [
      { if: "Energizing", unless: ["Cyclopean"], then: "Thought-Provoking" },
      { if: "Calming", then: "Sneaky" },
      { if: "Toxic", then: "Smelly" },
      { if: "Long Faced", then: "Refreshing" },
      { if: "Cyclopean", then: "Thought-Provoking" },
      { if: "Disorienting", then: "Focused" },
      { if: "Focused", then: "Seizure-Inducing" },
      { if: "Paranoia", then: "Jennerising" },
      { if: "Smelly", then: "Anti-Gravity" }
    ]
  },
  {
    name: "Battery",
    baseEffect: "Bright-Eyed",
    cost: 8,
    rules: [
      { if: "Munchies", then: "Tropic Thunder" },
      { if: "Euphoric", unless: ["Electrifying"], then: "Zombifying" },
      { if: "Electrifying", unless: ["Zombifying"], then: "Euphoric" },
      { if: "Laxative", then: "Calorie-Dense" },
      { if: "Cyclopean", then: "Glowing" },
      { if: "Shrinking", then: "Munchies" }
    ]
  },
  {
    name: "Chili",
    baseEffect: "Spicy",
    cost: 3,
    rules: [
      { if: "Athletic", then: "Euphoric" },
      { if: "Anti-Gravity", then: "Tropic Thunder" },
      { if: "Sneaky", then: "Bright-Eyed" },
      { if: "Munchies", then: "Toxic" },
      { if: "Laxative", then: "Long Faced" },
      { if: "Shrinking", then: "Refreshing" }
    ]
  },
  {
    name: "Cuke",
    baseEffect: "Energizing",
    cost: 2,
    rules: [
      { if: "Toxic", then: "Euphoric" },
      { if: "Slippery", then: "Munchies" },
      { if: "Sneaky", then: "Paranoia" },
      { if: "Foggy", then: "Cyclopean" },
      { if: "Gingeritis", then: "Thought-Provoking" },
      { if: "Munchies", then: "Athletic" },
      { if: "Euphoric", then: "Laxative" }
    ]
  },
  {
    name: "Donut",
    baseEffect: "Calorie-Dense",
    cost: 3,
    rules: [
      { if: "Calorie-Dense", unless: ["Explosive"], add: "Explosive" },
      { if: "Balding", then: "Sneaky" },
      { if: "Anti-Gravity", then: "Slippery" },
      { if: "Jennerising", then: "Gingeritis" },
      { if: "Focused", then: "Euphoric" },
      { if: "Shrinking", then: "Energizing" }
    ]
  },
  {
    name: "Energy Drink",
    baseEffect: "Athletic",
    cost: 8,
    rules: [
      { if: "Sedating", then: "Munchies" },
      { if: "Euphoric", then: "Energizing" },
      { if: "Spicy", then: "Euphoric" },
      { if: "Tropic Thunder", then: "Sneaky" },
      { if: "Glowing", then: "Disorienting" },
      { if: "Foggy", then: "Laxative" },
      { if: "Disorienting", then: "Electrifying" },
      { if: "Schizophrenia", then: "Balding" },
      { if: "Focused", then: "Shrinking" }
    ]
  },
  {
    name: "Flu Medicine",
    baseEffect: "Sedating",
    cost: 5,
    rules: [
      { if: "Calming", then: "Bright-Eyed" },
      { if: "Athletic", then: "Munchies" },
      { if: "Thought-Provoking", then: "Gingeritis" },
      { if: "Cyclopean", then: "Foggy" },
      { if: "Munchies", then: "Slippery" },
      { if: "Laxative", then: "Euphoric" },
      { if: "Euphoric", then: "Toxic" },
      { if: "Focused", then: "Calming" },
      { if: "Electrifying", then: "Refreshing" },
      { if: "Shrinking", then: "Paranoia" }
    ]
  },
  {
    name: "Gasoline",
    baseEffect: "Toxic",
    cost: 5,
    rules: [
      { if: "Energizing", then: "Euphoric" },
      { if: "Gingeritis", then: "Smelly" },
      { if: "Jennerising", then: "Sneaky" },
      { if: "Sneaky", then: "Tropic Thunder" },
      { if: "Munchies", then: "Sedating" },
      { if: "Energizing", then: "Spicy" },
      { if: "Euphoric", unless: ["Energizing"], then: "Spicy" },
      { if: "Laxative", then: "Foggy" },
      { if: "Disorienting", then: "Glowing" },
      { if: "Paranoia", then: "Calming" },
      { if: "Electrifying", then: "Disorienting" },
      { if: "Shrinking", then: "Focused" }
    ]
  },
  {
    name: "Horse Semen",
    baseEffect: "Long Faced",
    cost: 2,
    rules: [
      { if: "Anti-Gravity", then: "Calming" },
      { if: "Gingeritis", then: "Refreshing" },
      { if: "Thought-Provoking", then: "Electrifying" }
    ]
  },
  {
    name: "Iodine",
    baseEffect: "Jennerising",
    cost: 6,
    rules: [
      { if: "Calming", then: "Balding" },
      { if: "Toxic", then: "Sneaky" },
      { if: "Foggy", then: "Paranoia" },
      { if: "Calorie-Dense", then: "Gingeritis" },
      { if: "Euphoric", then: "Seizure-Inducing" },
      { if: "Refreshing", then: "Thought-Provoking" }
    ]
  },
  {
    name: "Mega Bean",
    baseEffect: "Foggy",
    cost: 7,
    rules: [
      { if: "Energizing", unless: ["Thought-Provoking"], then: "Cyclopean" },
      { if: "Calming", then: "Glowing" },
      { if: "Sneaky", then: "Calming" },
      { if: "Jennerising", then: "Paranoia" },
      { if: "Athletic", then: "Laxative" },
      { if: "Slippery", then: "Toxic" },
      { if: "Thought-Provoking", then: "Energizing" },
      { if: "Thought-Provoking", then: "Cyclopean" },
      { if: "Seizure-Inducing", then: "Focused" },
      { if: "Focused", then: "Disorienting" },
      { if: "Shrinking", then: "Electrifying" }
    ]
  },
  {
    name: "Motor Oil",
    baseEffect: "Slippery",
    cost: 6,
    rules: [
      { if: "Energizing", then: "Munchies" },
      { if: "Foggy", then: "Toxic" },
      { if: "Energizing", then: "Schizophrenia" },
      { if: "Euphoric", then: "Sedating" },
      { if: "Paranoia", then: "Anti-Gravity" },
      { if: "Munchies", unless: ["Energizing"], then: "Schizophrenia" }
    ]
  },
  {
    name: "Mouth Wash",
    baseEffect: "Balding",
    cost: 4,
    rules: [
      { if: "Calming", then: "Anti-Gravity" },
      { if: "Calorie-Dense", then: "Sneaky" },
      { if: "Explosive", then: "Sedating" },
      { if: "Focused", then: "Jennerising" }
    ]
  },
  {
    name: "Paracetamol",
    baseEffect: "Sneaky",
    cost: 3,
    rules: [
      { if: "Energizing", unless: ["Munchies"], then: "Paranoia" },
      { if: "Calming", then: "Slippery" },
      { if: "Toxic", then: "Tropic Thunder" },
      { if: "Spicy", then: "Bright-Eyed" },
      { if: "Glowing", then: "Toxic" },
      { if: "Foggy", then: "Calming" },
      { if: "Munchies", then: "Anti-Gravity" },
      { if: "Energizing", and: "Paranoia", then: "Balding" },
      { if: "Electrifying", then: "Athletic" }
    ]
  },
  {
    name: "Viagra",
    baseEffect: "Tropic Thunder",
    cost: 4,
    rules: [
      { if: "Athletic", then: "Sneaky" },
      { if: "Euphoric", then: "Bright-Eyed" },
      { if: "Laxative", then: "Calming" },
      { if: "Disorienting", then: "Toxic" }
    ]
  }
];

// 4) Optional effectColors for logs
const effectColors = {
  "Anti-Gravity": "#8be9fd", "Athletic": "#f1fa8c", "Balding": "#f8f8f2", "Bright-Eyed": "#ffb86c",
  "Calming": "#6272a4", "Calorie-Dense": "#ff79c6", "Cyclopean": "#bd93f9", "Disorienting": "#44475a",
  "Electrifying": "#f8f8f2", "Energizing": "#fffa65", "Euphoric": "#50fa7b", "Explosive": "#ff5555",
  "Focused": "#8be9fd", "Foggy": "#bbbbbb", "Gingeritis": "#ff9e6e", "Glowing": "#ffff99",
  "Jennerising": "#ffb6c1", "Laxative": "#964B00", "Long Faced": "#aaaaaa", "Munchies": "#fca3b7",
  "Paranoia": "#ff2f2f", "Refreshing": "#aaf0d1", "Schizophrenia": "#222", "Sedating": "#cba6f7",
  "Seizure-Inducing": "#dd00ff", "Shrinking": "#6699cc", "Slippery": "#89cff0", "Smelly": "#aaff00",
  "Sneaky": "#fabebe", "Spicy": "#ff6f61", "Thought-Provoking": "#d291bc", "Toxic": "#00ff00",
  "Tropic Thunder": "#ffcc00", "Zombifying": "#708090"
};

// 5) Weed strain mapping (for reverse engineering starting state)
// This mapping defines the base effect for each weed strain.
const weedStrainMapping = {
  "OG Kush": "Calming",
  "Green Crack": "Energizing",
  "Sour Diesel": "Refreshing",
  "Grandaddy Purp": "Sedating"
};

// ===============================
//    REVERSE ENGINEERING LOGIC
// ===============================

// Reverse-engineering transformation function (iterative rule application)
function applyRulesWithLog(rules, stack, ingredientName, ingredientBaseEffect) {
  let newStack = [...stack];
  let log = [];
  let changed = true;
  const overwritten = new Set();

  while (changed) {
    changed = false;
    for (const rule of rules) {
      const { if: ifEffect, then: thenEffect, add: addEffect, and, unless } = rule;
      const hasIf = newStack.includes(ifEffect);
      const hasAnd = and ? newStack.includes(and) : true;
      const lacksUnless = !unless || !newStack.some(e => unless.includes(e));

      // Replacement rule
      if (ifEffect && thenEffect && hasIf && hasAnd && lacksUnless) {
        const idx = newStack.indexOf(ifEffect);
        if (idx !== -1 && newStack[idx] !== thenEffect) {
          log.push(`${ingredientName} replaces ${ifEffect} with ${thenEffect}`);
          overwritten.add(ifEffect);
          newStack[idx] = thenEffect;
          changed = true;
        }
      }

      // Add rule
      if (ifEffect && addEffect && hasIf && hasAnd && lacksUnless) {
        if (!newStack.includes(addEffect)) {
          log.push(`${ingredientName} adds ${addEffect}`);
          newStack.push(addEffect);
          changed = true;
        }
      }
    }
  }

  // Ensure the ingredient's base effect is added if missing.
  if (!newStack.includes(ingredientBaseEffect)) {
    log.push(`${ingredientName} adds ${ingredientBaseEffect}`);
    newStack.push(ingredientBaseEffect);
  }

  newStack = [...new Set(newStack)];
  return { newStack, log, overwritten };
}

// ------------------------------
//    REFINED A* REVERSE ENGINEERING SEARCH
// ------------------------------

// Refined heuristic using effect difficulty mapping.
function refinedHeuristic(node, targetEffects, minCost) {
  let h = 0;
  targetEffects.forEach(effect => {
    if (!node.effects.includes(effect)) {
      const difficulty = effectDifficulty[effect] || 1;
      const lostPenalty = node.lost?.has(effect) ? 1.5 : 1.0;
      h += difficulty * minCost * 0.5 * lostPenalty;
    }
  });
  return h;
}

// Standard A* search that returns the single most cost-effective chain.
function aStarReverseEngineer(targetEffects, startingEffect, callback) {
  const minCost = Math.min(...ingredients.map(i => i.cost));
  // Initialize the frontier; if startingEffect is empty, start with an empty effects array.
  let frontier = [];
  frontier.push({ effects: startingEffect ? [startingEffect] : [], chain: [], cost: 0 });
  const visited = {};

  function stateKey(effectsArr) {
    return effectsArr.slice().sort().join("|");
  }

  function goalTest(node) {
    return targetEffects.every(e => node.effects.includes(e));
  }

  const maxChainLength = 50;
  const timeLimit = 60000; // 1 minute
  const startTime = Date.now();

  function processBatch() {
    if (Date.now() - startTime > timeLimit) {
      console.warn("Search timed out.");
      callback(null);
      return;
    }
    frontier.sort((a, b) =>
      (a.cost + refinedHeuristic(a, targetEffects, minCost)) -
      (b.cost + refinedHeuristic(b, targetEffects, minCost))
    );
    let current = frontier.shift();
    if (!current) {
      callback(null);
      return;
    }
    let key = stateKey(current.effects);
    if (visited[key] !== undefined && visited[key] <= current.cost) {
      setTimeout(processBatch, 0);
      return;
    }
    visited[key] = current.cost;
    if (goalTest(current)) {
      callback(current);
      return;
    }
    if (current.chain.length >= maxChainLength) {
      setTimeout(processBatch, 0);
      return;
    }
    ingredients.forEach(ing => {
      const result = applyRulesWithLog(ing.rules, current.effects, ing.name, ing.baseEffect);
      const newEffects = result.newStack;
      if (newEffects.toString() === current.effects.toString()) return;
      const newChain = current.chain.concat(ing.name);
      const newCost = current.cost + ing.cost;
      const newLost = new Set([...(current.lost || []), ...result.overwritten]);

// Recovery boost if this ingredient can restore a lost target
const recovering = Array.from(newLost).some(lost =>
  ing.baseEffect === lost ||
  ing.rules.some(r => r.then === lost || r.add === lost)
);

const newNode = {
  effects: newEffects,
  chain: newChain,
  cost: recovering ? newCost - 0.5 : newCost,
  lost: newLost
};
      frontier.push(newNode);
    });
    setTimeout(processBatch, 0);
  }
  
  processBatch();
}

// ------------------------------
//    UI INTEGRATION
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Populate target effects buttons.
  const targetContainer = document.getElementById("targetEffects");
  if (!targetContainer) {
    console.error("No element with id 'targetEffects' found.");
    return;
  }
  Object.keys(effects).forEach(effect => {
    const btn = document.createElement("button");
    btn.textContent = effect;
    btn.className = "effect-button effect-checkbox";
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
    targetContainer.appendChild(btn);
  });
  
  // Create the base product dropdown in the new "baseSelection" container.
  const baseSelectionContainer = document.getElementById("baseSelection");
  if (baseSelectionContainer && !document.getElementById("baseProductSelection")) {
    const baseDiv = document.createElement("div");
    baseDiv.id = "baseProductSelection";
    baseDiv.className = "dropdown-container"; // Uses existing CSS.
    baseDiv.innerHTML = `
      <label for="baseProductSelect">Select Base Product: </label>
      <select id="baseProductSelect">
        <option value="OG Kush">OG Kush</option>
        <option value="Green Crack">Green Crack</option>
        <option value="Sour Diesel">Sour Diesel</option>
        <option value="Grandaddy Purp">Grandaddy Purp</option>
        <option value="Meth">Meth</option>
        <option value="Coke">Coke</option>
      </select>
    `;
    baseSelectionContainer.appendChild(baseDiv);
  }
});

// Event listener for the "Reverse Engineer" button.
document.getElementById("reverseBtn").addEventListener("click", () => {
  const targetEffects = [];
  const buttons = document.querySelectorAll("#targetEffects .effect-button.active");
  buttons.forEach(btn => targetEffects.push(btn.textContent));
  
  const resultContainer = document.getElementById("reverseResult");
  if (targetEffects.length === 0) {
    resultContainer.innerText = "Please select at least one effect.";
    return;
  }
  
  // Get the selected base product.
  const baseSelect = document.getElementById("baseProductSelect");
  const selectedProduct = baseSelect ? baseSelect.value : "OG Kush";
  let startingEffect;
  if (weedStrainMapping[selectedProduct]) {
      startingEffect = weedStrainMapping[selectedProduct];
  } else {
      startingEffect = ""; // No base effect for Meth or Coke.
  }
  
  resultContainer.innerHTML = "";
  showLoadingIndicator();
  
  aStarReverseEngineer(targetEffects, startingEffect, (solution) => {
    let output = "";
    if (!solution) {
      output = "No solution found. Try selecting different/fewer effects.";
    } else {
      output += `<strong>Optimal Solution Found:</strong><br>`;
      output += `Chain: ${solution.chain.join(" → ")}<br>`;
      output += `Final Effects: ${solution.effects.join(", ")}<br>`;
      output += `Total Ingredient Cost: $${solution.cost}<br>`;
    }
    resultContainer.innerHTML = output;
    hideLoadingIndicator();
    document.querySelectorAll("#targetEffects .effect-button.active")
      .forEach(btn => btn.classList.remove("active"));
  });
});

// Loading indicator functions.
function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "flex";
  }
}

function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }
}
// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', (event) => {
    event.preventDefault();
    navMenu.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('popupModal');
  const openModalBtn = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');

  // Open modal on button click
  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Close modal on close button click
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
