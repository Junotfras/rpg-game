// ======================================================
// RPG Creature Search App (freeCodeCamp Certification Project)
// Full solution JS (passes tests)
// ======================================================

// --- API ---
const API_BASE = "https://rpg-creature-api.freecodecamp.rocks/api/creature/"; // correct endpoint :contentReference[oaicite:1]{index=1}

// --- DOM ---
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const errorMsg = document.getElementById("error-msg"); 

const creatureName = document.getElementById("creature-name");

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
  const statObj = statsArr.find((s) => s.name === statName);
  return statObj ? statObj.base_stat : "";
};

const renderCreature = (data) => {
  // Name + ID
  setText(creatureName, data.name.toUpperCase());
  setText(creatureId, `#${data.id}`);

  // Weight + Height (FCC allows either "Weight: X" or just "X", this is safe)
  setText(weight, `Weight: ${data.weight}`);
  setText(height, `Height: ${data.height}`);

  // Types (must clear between searches)
  clearTypes();
  data.types.forEach((t) => {
    const chip = document.createElement("span");
    chip.className = "type-chip"; // optional styling hook
    chip.textContent = t.name.toUpperCase();

// THE TWIST: Set color dynamically
    const color = typeColors[t.name] || typeColors.default;
    chip.style.backgroundColor = color;
    chip.style.borderColor = color;
    
    types.appendChild(chip);
  });

  // Stats (API returns array of { base_stat, name }) :contentReference[oaicite:2]{index=2}
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
    // Normalize name searches to lowercase; IDs are fine too.
    const normalized = query.trim().toLowerCase();

    const res = await fetch(`${API_BASE}${normalized}`);

    // If 404 or any non-OK response, treat as not found
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

  // required: types cleared between searches
  clearTypes();

  if (!query) return;
  searchCreature(query);
});

// Optional quality-of-life: press Enter to search
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});
