# Schedule I Mix Simulator

Welcome to the **Schedule I Mix Simulator** – a fun, interactive web tool for all the degens who love simulating high-stakes mixes! This project lets you experiment with various ingredients to transform your mix, calculate final prices and profits, and even reverse-engineer the cheapest ingredient chains to reach your desired final effects.

## Overview

The simulator consists of several core pages:

- **Home/Landing Page:** A quick intro and navigation to the different sections.
- **Mix Calculator:** Select a base drug, choose starting effects, and iteratively apply ingredients (with real-time preview) to evolve your mix. Final pricing and profit are calculated based on the total effect multipliers.
- **Reverse Engineer:** Select desired final effects and let the tool search for the top 3 cost-efficient ingredient chains that produce a strain containing (or exceeding) those effects.
- **Strain History:** Save your finalized mixes (with custom names) for later review, deletion, or sharing.
- **Help/Documentation:** A guide on how the simulator works, including transformation rules, FAQs, and troubleshooting tips.

## Features

- **Real-Time Transformation Preview:** Watch your mix evolve as you add ingredients.
- **Iterative Rule Application:** Ingredients transform the current effect stack through a series of predefined rules (e.g., Cuke replaces Toxic with Euphoric).
- **Price & Profit Calculation:** Final price is determined by the formula:
- ```bash
  Final Price = Base Price * (1 + Total Effect Multiplier)
  ```
- Profit is calculated after subtracting cumulative ingredient costs.
- **Reverse Engineering:** Uses an asynchronous best-first search algorithm to find the cheapest chains that yield your desired effects.
- **Strain Saving:** Save your custom mixes (with optional names) directly to your browser's local storage.
- **Multi-Page Structure:** Navigate easily between different sections of the tool.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- (Optional) Git for version control and collaboration

### Installation

1. **Clone the repository:**

 ```bash
 git clone https://github.com/itsemji/schedule-i-mix-simulator.git
 cd schedule-i-mix-simulator
```
Open the index.html file in your browser:

You can open it directly from your file system or use a local server (e.g., VS Code's Live Server extension).
