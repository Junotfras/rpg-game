// ======================================================
// RPG Creature Search App (Fixed Version)
// ======================================================

// --- API ---
// ✅ FIX 1: Use the REAL API endpoint (The other one was just a placeholder)
const API_BASE = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// --- DOM ---
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const errorMsg = document.getElementById("error-msg");

// ✅ FIX 2: Removed the duplicate "creatureName" line here
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  default: '#A040A0'
};

// --- helpers ---
const clearTypes = () => {
  types.innerHTML = "";
};

const setText = (el, value) => {
  el.textContent = value;
};

const getStatValue = (statsArr, statName) => {
  // FIX: Change 's.name' to 's.stat.name'
  const statObj = statsArr.find((s) => s.stat.name === statName);
  return statObj ? statObj.base_stat : "";
};

const renderCreature = (data) => {
  // Name + ID
  setText(creatureName, data.name.toUpperCase());
  setText(creatureId, `#${data.id}`);

  // Weight + Height
  setText(weight, `Weight: ${data.weight}`);
  setText(height, `Height: ${data.height}`);

  // Types
  clearTypes();
  data.types.forEach((t) => {
    const chip = document.createElement("span");
    chip.className = "type-chip";
    chip.textContent = t.type.name.toUpperCase(); // Note: API structure is t.type.name

    // THE TWIST: Set color dynamically
    const color = typeColors[t.type.name.toLowerCase()] || typeColors.default;
    chip.style.backgroundColor = color;
    chip.style.borderColor = color;
    
    types.appendChild(chip);
  });

  // Stats
  setText(hp, getStatValue(data.stats, "hp"));
  setText(attack, getStatValue(data.stats, "attack"));
  setText(defense, getStatValue(data.stats, "defense"));
  setText(specialAttack, getStatValue(data.stats, "special-attack"));
  setText(specialDefense, getStatValue(data.stats, "special-defense"));
  setText(speed, getStatValue(data.stats, "speed"));
};

const searchCreature = async (query) => {
  errorMsg.textContent = "";
  errorMsg.className = "error-hidden";
  
  try {
    const normalized = query.trim().toLowerCase();
    const res = await fetch(`${API_BASE}${normalized}`);

    if (!res.ok) {
      throw new Error("Creature not found");
    }

    const data = await res.json();
    renderCreature(data);
  } catch (e) {
    errorMsg.textContent = "Creature not found. Try 'Pikachu' or '1'.";
    errorMsg.className = "error-visible";
    console.error(e);
  }
};

// --- events ---
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  clearTypes();
  if (!query) return;
  searchCreature(query);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});
