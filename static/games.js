function formatPlays(value) {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}

function renderDbGames(games) {
  const grid = document.getElementById("games-db-grid");
  if (!grid) return;
  grid.innerHTML = games.map((g) => `
    <div class="game-card">
      <div class="game-thumb" style="background:${g.color}22; border-bottom: 3px solid ${g.color}55;">
        ${g.live ? '<span class="game-live-badge">LIVE</span>' : ''}
        <span style="font-size:34px; position:relative; z-index:1;">${g.emoji}</span>
      </div>
      <div class="game-info">
        <div class="game-name" title="${g.name}">${g.name}</div>
        <div class="game-creator">${g.creator}</div>
        <div class="game-footer">
          <span class="game-plays">${formatPlays(g.plays)} plays - 🎮</span>
          <span class="game-stars-row">&#9733; ${Number(g.stars).toFixed(1)}</span>
        </div>
      </div>
    </div>
  `).join("");
}

async function loadGames() {
  const sort = document.getElementById("games-sort")?.value || "plays";
  const limit = document.getElementById("games-limit")?.value || "12";
  const res = await fetch(`/api/games?sort=${encodeURIComponent(sort)}&limit=${encodeURIComponent(limit)}`);
  const data = await res.json();
  renderDbGames(data);
}

function setupControls() {
  const sortEl = document.getElementById("games-sort");
  const limitEl = document.getElementById("games-limit");
  const searchEl = document.getElementById("games-search");

  if (sortEl) sortEl.addEventListener("change", loadGames);
  if (limitEl) limitEl.addEventListener("change", loadGames);

  if (searchEl) {
    searchEl.addEventListener("input", async () => {
      const q = searchEl.value.trim();
      if (!q) {
        loadGames();
        return;
      }
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      renderDbGames(data);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupControls();
  loadGames();
});
