// === SCHEDULE I MIX CALCULATOR — GOODLOGIC + REAL-TIME PREVIEW COMBINED ===

// 1) Effect multipliers
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

// 2) Base prices
const basePrices = {
  "Weed": 35,
  "Meth": 70,
  "Cocaine": 150
};

// 3) Full ingredient data with updated costs & transformation rules
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

// ===============================
//    GLOBALS FOR CHAIN + PREVIEW
// ===============================
let chainMode = false;            // Indicates a finalized mix
let currentStack = [];            // Final effect stack
let currentChain = [];            // Ingredient chain used (initialize as empty)
let totalIngredientCost = 0;      // Cumulative cost of ingredients
let finalPrice = 0;               // Global final price
let totalProfit = 0;              // Global total profit

// For real-time preview
let previewStack = [];
let previewLog = [];
let selectedIngredient = null;

// Keep track of user-chosen starting effects (Set of effect strings)
let selectedEffects = new Set();

// ===============================
//   LOGIC FUNCTIONS
// ===============================

// Iterative rule application with deduplication & logging
function applyRulesWithLog(rules, stack, ingredientName, ingredientBaseEffect) {
  let newStack = [...stack];
  let log = [];
  let changed = true;
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
  // Deduplicate effects.
  newStack = [...new Set(newStack)];
  return { newStack, log };
}

// Render the current mix result and transformation log.
function renderResult(before, after, log) {
  const stackContainer = document.getElementById("effectStack");
  stackContainer.innerHTML = `
    <div>Before: ${before.join(", ") || "none"}</div>
    <div>After: ${after.join(", ") || "none"}</div>
  `;
  const logContainer = document.getElementById("effectLog");
  logContainer.innerHTML = log.map(line => {
    const foundEffect = Object.keys(effectColors).find(e => line.includes(e));
    const color = foundEffect ? effectColors[foundEffect] : "#ccc";
    return `<div style="color:${color}">${line}</div>`;
  }).join("");
}

// Determine the base stack for applying a new ingredient.
function getBaseStack() {
  return chainMode ? currentStack : Array.from(selectedEffects);
}

// Real-time preview: when an ingredient is selected.
function previewIngredient(ingredient) {
  const baseStack = getBaseStack();
  const { newStack, log } = applyRulesWithLog(
    ingredient.rules,
    baseStack,
    ingredient.name,
    ingredient.baseEffect
  );
  previewStack = newStack;
  previewLog = log;
  renderResult(baseStack, previewStack, previewLog);
  
  // Preview price calculation (not permanently added)
  const baseDrug = document.getElementById("baseDrug").value;
  const basePrice = basePrices[baseDrug];
  const totalMultiplier = previewStack.reduce((sum, eff) => sum + (effects[eff] || 0), 0);
  const calcPrice = Math.round(basePrice * (1 + totalMultiplier) * 100) / 100;
  const previewProfit = Math.round((calcPrice - ingredient.cost) * 20 * 100) / 100;
  document.getElementById("finalPrice").textContent = `Final Price (Preview): $${calcPrice.toFixed(2)}`;
  document.getElementById("totalProfit").textContent = `Total Profit (Preview): $${previewProfit.toFixed(2)}`;
}

// Finalize the currently selected ingredient.
function calculateEffects() {
  if (!selectedIngredient) return;
  
  // If first time, initialize chain mode.
  if (!chainMode) {
    chainMode = true;
    currentStack = Array.from(selectedEffects);
    currentChain = [];
    totalIngredientCost = 0;
  }
  
  // Finalize the previewed transformation.
  currentStack = previewStack;
  currentChain = currentChain.concat(selectedIngredient.name);
  totalIngredientCost += selectedIngredient.cost;
  
  renderResult(getBaseStack(), currentStack, previewLog);
  
  // Final price & profit calculations:
  const baseDrug = document.getElementById("baseDrug").value;
  const basePrice = basePrices[baseDrug];
  const totalMultiplier = currentStack.reduce((sum, eff) => sum + (effects[eff] || 0), 0);
  const calcPrice = Math.round(basePrice * (1 + totalMultiplier) * 100) / 100;
  const finalProfit = Math.round((calcPrice - totalIngredientCost) * 20 * 100) / 100;
  // Update global finalPrice and totalProfit variables for saving purposes.
  finalPrice = calcPrice;
  totalProfit = finalProfit;
  document.getElementById("finalPrice").textContent = `Final Price: $${calcPrice.toFixed(2)}`;
  document.getElementById("totalProfit").textContent = `Total Profit (20 units): $${finalProfit.toFixed(2)}`;
  
  previewStack = [];
  previewLog = [];
  document.querySelectorAll(".ingredient-button").forEach(btn => btn.classList.remove("selected"));
  selectedIngredient = null;
}

// Clear all selections and reset the calculator.
function clearStack() {
  chainMode = false;
  currentStack = [];
  currentChain = [];
  totalIngredientCost = 0;
  finalPrice = 0;
  totalProfit = 0;
  previewStack = [];
  previewLog = [];
  selectedIngredient = null;
  selectedEffects.clear();
  
  document.querySelectorAll(".effect-button").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".ingredient-button").forEach(btn => btn.classList.remove("selected"));
  
  document.getElementById("effectStack").innerHTML = "Effect Stack Result";
  document.getElementById("effectLog").innerHTML = "Transformation Log";
  document.getElementById("finalPrice").textContent = "Final Price: $0.00";
  document.getElementById("totalProfit").textContent = "Total Profit (20 units): $0.00";
}

// Toggle a starting effect on/off.
function toggleEffect(btn, effect) {
  if (selectedEffects.has(effect)) {
    selectedEffects.delete(effect);
    btn.classList.remove("active");
  } else {
    selectedEffects.add(effect);
    btn.classList.add("active");
  }
}

// Modal popup for messages.
function showModal(message, duration = 3000) {
  const modal = document.getElementById("modalMessage");
  if (modal) {
    modal.querySelector("p").innerText = message;
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.display = "none";
    }, duration);
  } else {
    console.log(message);
  }
}

// Save strain function using localStorage.
function saveCurrentStrain() {
  if (!chainMode || currentStack.length === 0) {
    showModal("No strain to save! Please calculate your mix first.");
    return;
  }
  
  const strainName = document.getElementById("strainNameInput").value.trim() ||
                     `Strain ${new Date().toLocaleString()}`;
  
  const strain = {
    name: strainName,
    startingEffects: Array.from(selectedEffects),
    chain: currentChain || [],
    finalEffects: currentStack,
    totalCost: totalIngredientCost || 0,
    finalPrice: finalPrice || 0,
    totalProfit: totalProfit || 0,
    timestamp: Date.now()
  };
  
  let strainHistory = localStorage.getItem("strainHistory");
  strainHistory = strainHistory ? JSON.parse(strainHistory) : [];
  strainHistory.push(strain);
  localStorage.setItem("strainHistory", JSON.stringify(strainHistory));
  
  showModal("Strain saved successfully!");
  document.getElementById("strainNameInput").value = "";
}

// Attach event listener for Save Strain button.
document.getElementById("saveStrainBtn").addEventListener("click", saveCurrentStrain);

// When an ingredient button is clicked, select it and preview transformation.
function selectIngredient(button, name) {
  document.querySelectorAll(".ingredient-button").forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  
  const ing = ingredients.find(i => i.name === name);
  if (!ing) return;
  
  selectedIngredient = ing;
  previewIngredient(ing);
}

// Populate starting effects and ingredient buttons when DOM loads.
document.addEventListener("DOMContentLoaded", () => {
  const startingEffectsContainer = document.getElementById("startingEffects");
  Object.keys(effects).forEach(effect => {
    const btn = document.createElement("button");
    btn.textContent = effect;
    btn.className = "effect-button effect-checkbox";
    btn.addEventListener("click", () => toggleEffect(btn, effect));
    startingEffectsContainer.appendChild(btn);
  });
  
  const ingredientsContainer = document.getElementById("ingredients");
  ingredients.forEach(ing => {
    const btn = document.createElement("button");
    btn.textContent = `${ing.name} ($${ing.cost})`;
    btn.className = "ingredient-button ingredient";
    btn.dataset.name = ing.name;
    btn.addEventListener("click", () => selectIngredient(btn, ing.name));
    ingredientsContainer.appendChild(btn);
  });
  
  document.getElementById("calculateBtn").addEventListener("click", calculateEffects);
  document.getElementById("clearBtn").addEventListener("click", clearStack);
});