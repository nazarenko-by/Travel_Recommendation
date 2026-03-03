# ✈️ TravelCo — Travel Recommendation Website

A multi-page travel recommendation website with destination search, interactive flip cards, city tours, and a contact form. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

## Screenshots

> _Add screenshots here_

## Pages

- **Home** (`index.html`) — hero section, flip card recommendations (beaches, temples, countries), city tours grid, search
- **About** (`about.html`) — team and mission info
- **Contact** (`contact.html`) — validated contact form with toast notification, FAQ accordion

## Features

- **Destination search** — keyword search by city or country name with smooth scroll and highlight; works from any page via URL params (`?search=tokyo`)
- **Flip cards** — hover-to-flip cards for beaches, temples, and countries loaded dynamically from JSON
- **City tours grid** — card layout for 6 cities loaded from `city_tours.json`
- **Contact form** — client-side validation (name, email, message) with inline error messages and success toast
- **FAQ accordion** — single-open accordion on the contact page
- **Social sidebar** — fixed social links, hover-animated via CSS
- **Responsive layout** — hamburger menu with mobile search for smaller screens

## Project Structure

```
Travel_Recommendation-main/
├── index.html
├── about.html
├── contact.html
├── styles.css
├── data/
│   ├── beaches.json
│   ├── temples.json
│   ├── countries.json
│   └── city_tours.json
└── js/
    ├── data.js           # Static fallback data (beaches, temples, countries, city tours)
    ├── main.js           # Core logic: search, flip cards, FAQ, URL params
    ├── contact.js        # Contact form validation and toast
    └── socialSidebar.js  # Social sidebar init
```

## Data

Recommendation content is loaded from JSON files in `/data` via `fetch()`. `js/data.js` holds the same data as a static fallback. Four categories are available:

| File | Type | Cards |
|---|---|---|
| `beaches.json` | Flip card | 3 |
| `temples.json` | Flip card | 3 |
| `countries.json` | Flip card | 3 |
| `city_tours.json` | City card | 6 |

Each flip card has a front image, back image, title, description, and additional info. City cards include city name, country, description, and image.

## Getting Started

No build step needed — open any `.html` file directly in a browser.

> **Note:** Because the app fetches JSON via `fetch()`, you need to serve the files over HTTP (not `file://`). Use any static server:

```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8080

# Using VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8080` in your browser.

## Search

Search works from any page — if triggered outside the home page, it redirects to `index.html?search=<query>`. On the home page it scrolls to and highlights the matching city card. Searches are matched against both city name and country name (case-insensitive).
