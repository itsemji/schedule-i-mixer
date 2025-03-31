# Schedule I Mix Simulator

Welcome to the **Schedule I Mix Simulator** – a fun, interactive web tool for all the dealers who love simulating high-stakes mixes! This project lets you experiment with various ingredients to transform your mix, calculate final prices and profits, and even reverse-engineer the cheapest ingredient chains to reach your desired final effects.

## Purpose

This project was built out of a love for the game's deep and chaotic mixing mechanics. While there are already excellent tools available, I wanted a calculator that allowed for a bit more interactivity. Something that shows, in real-time, how each ingredient affects the stack and transformations. It's designed for theorycrafting, price optimization, and effect tracking.

## Mixing Logic Source

All mixing transformation logic is based on **Shibka and team's** comprehensive breakdown in the ["How Mixing Works" guide](https://schedule1-calculator.com/howitworks).  
Much of the original idea and structure is inspired by their *Schedule I* calculator. Major props to them for doing the heavy lifting on documenting the effect interactions and ingredient rules!

## Overview

The simulator consists of several core pages:

- **Home/Landing Page:** A quick intro and navigation to the different sections.
- **Mix Calculator:** Select a base drug, choose starting effects, and iteratively apply ingredients (with real-time preview) to evolve your mix. Final pricing and profit are calculated based on the total effect multipliers.
- **Reverse Engineer:** Select desired final effects and let the tool search for the top 3 cost-efficient ingredient chains that produce a strain containing (or exceeding) those effects.
- **Strain History:** Save your finalized mixes (with custom names) for later review, deletion, or sharing.
- **Help/Documentation:** A guide on how the simulator works, including transformation rules, FAQs, and troubleshooting tips.

## Features

- Live ingredient mixing with real-time effect transformation preview
- Price and profit calculator (based on base drug and final effects)
- Chain mixing across multiple ingredients
- Reverse-engineering tool to find ingredient chains that lead to specific desired effects
- Strain saver with history lookup
- Clean and themed UI inspired by the game's aesthetic
- Mobile-friendly layout

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

## Credits

- Core logic based on the work of **Shibka** and contributors at [Schedule1-Calculator.com](https://schedule1-calculator.com/)
- UX/UI + advanced features developed and iterated with love by degens on Discord
