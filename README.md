# 🐉 RPG Creature Search (PokéDex Style App)

A dynamic web application that fetches and displays creature data from an external API. This project demonstrates mastery of **Asynchronous JavaScript**, **DOM Manipulation**, and **Responsive CSS**.

🔗 **[Live Demo](https://junotfras.github.io/rpg-game/)**

![Project Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot+Here)
*(Note: Replace this link with a real screenshot after you deploy)*

## 🚀 Key Features

* **Real-time Data Fetching:** Uses `async/await` to consume a RESTful API.
* **Search Functionality:** Supports queries by both Creature Name (e.g., "Pikachu") and ID (e.g., "25").
* **Dynamic UI:** The interface updates instantly to display stats, types, and physical attributes without a page reload.
* **Error Handling:** Gracefully manages 404 errors for invalid search terms.
* **Keyboard Support:** Users can search by pressing the `Enter` key.

## 🛠️ Technologies Used

* **JavaScript (ES6+):** `fetch` API, Promises, Arrow Functions, DOM manipulation.
* **CSS3:** CSS Variables, Grid/Flexbox layouts, and Mobile-First responsive design.
* **HTML5:** Semantic markup structure.

## 💻 How It Works

1.  User inputs a name or ID.
2.  The app sanitizes the input (`trim()` and `toLowerCase()`).
3.  A `fetch` request is sent to the proxy API.
4.  **If found:** The DOM is cleared and repopulated with the new data.
5.  **If not found:** A user-friendly error message is displayed.

## 📂 Project Structure

```text
/
├── index.html      # Main markup
├── styles.css      # Styling & Animations
├── script.js       # Search logic & API handling
└── README.md       # Documentation
