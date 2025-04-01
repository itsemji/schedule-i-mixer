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
  
  // 3) Transformation function: Iterative rule application with deduplication.
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
        // Replace rule
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
  
  // 4) Utility: Get selected target effects from buttons.
  function getSelectedTargetEffects() {
    const buttons = document.querySelectorAll("#targetEffects .effect-button.active");
    let selected = [];
    buttons.forEach(btn => {
      selected.push(btn.textContent);
    });
    return selected;
  }
  
  // 5) Asynchronous Reverse Engineering Algorithm using batch processing and timeout.
  function asynchronousReverseEngineerChain(targetEffects, callback) {
    const minCost = Math.min(...ingredients.map(i => i.cost));
    function heuristic(state) {
      let missing = targetEffects.filter(e => !state.effects.includes(e)).length;
      const penaltyFactor = 0.5;
      return missing * minCost;
    }
    
    let frontier = [];
    frontier.push({ effects: [], chain: [], cost: 0 });
    let solutions = [];
    let iterations = 0;
    const maxIterations = 50000;
    const batchSize = 500;
    const timeLimit = 120000; // 2 minutes
    const startTime = Date.now();
    
    // Deduplicate solutions that use the same set of ingredients (regardless of order).
function deduplicateSolutions(solutions) {
    const seen = new Set();
    const unique = [];
    for (const sol of solutions) {
      // Create a signature by sorting the chain (ignoring order)
      const signature = sol.chain.slice().sort().join("|");
      if (!seen.has(signature)) {
        seen.add(signature);
        unique.push(sol);
      }
    }
    return unique;
  }
  
  function processBatch() {
    let batchCount = 0;
    while (frontier.length > 0 && batchCount < batchSize && iterations < maxIterations) {
      if (Date.now() - startTime > timeLimit) {
        console.warn("Search timed out.");
        solutions.sort((a, b) => a.cost - b.cost);
        solutions = deduplicateSolutions(solutions);
        callback(solutions.slice(0, 3));
        return;
      }
      frontier.sort((a, b) => (a.cost + heuristic(a)) - (b.cost + heuristic(b)));
      let current = frontier.shift();
      iterations++;
      batchCount++;
      if (targetEffects.every(e => current.effects.includes(e))) {
        solutions.push(current);
        if (solutions.length >= 3) break;
        continue;
      }
      if (current.chain.length > 25) continue;
      ingredients.forEach(ing => {
        let result = applyRulesWithLog(ing.rules, current.effects, ing.name, ing.baseEffect);
        let newEffects = result.newStack;
        let newChain = current.chain.concat(ing.name);
        let newCost = current.cost + ing.cost;
        frontier.push({ effects: newEffects, chain: newChain, cost: newCost });
      });
    }
    if (solutions.length >= 3 || frontier.length === 0 || iterations >= maxIterations) {
      solutions.sort((a, b) => a.cost - b.cost);
      solutions = deduplicateSolutions(solutions);
      callback(solutions.slice(0, 3));
    } else {
      setTimeout(processBatch, 0);
    }
  }
  
    processBatch();
  }
  
  // 6) Loading Popup: Show and hide the loading indicator.
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
  
  // 7) Event listener for the "Reverse Engineer" button.
  document.getElementById("reverseBtn").addEventListener("click", () => {
    const targetEffects = getSelectedTargetEffects();
    const resultContainer = document.getElementById("reverseResult");
    
    if (targetEffects.length === 0) {
      resultContainer.innerText = "Please select at least one effect.";
      return;
    }
    
    // Clear previous results and show the loading popup.
    resultContainer.innerHTML = "";
    showLoadingIndicator();
    
    asynchronousReverseEngineerChain(targetEffects, (solutions) => {
      let output = "";
      if (solutions.length === 0) {
        output = "No solution found (try selecting more effects or relaxing constraints).";
      } else {
        solutions.forEach((sol, index) => {
          output += `<strong>Solution ${index + 1}:</strong><br>`;
          output += `Chain: ${sol.chain.join(" → ")}<br>`;
          output += `Final Effects: ${sol.effects.join(", ")}<br>`;
          output += `Total Ingredient Cost: $${sol.cost}<br><br>`;
        });
      }
      resultContainer.innerHTML = output;
      hideLoadingIndicator();
      // Clear the active state from all effect buttons so they are no longer highlighted.
        document.querySelectorAll("#targetEffects .effect-button.active")
        .forEach(btn => btn.classList.remove("active"));
    });
  });
  
  // 8) Populate target effects buttons when the DOM loads.
  document.addEventListener("DOMContentLoaded", () => {
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
  });
  