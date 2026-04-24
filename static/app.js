// ---- Game Data ----
const COLORS = [
  '#e94560','#0f3460','#00cc88','#ff6600','#9933ff',
  '#0073e6','#cc0000','#ff9900','#006600','#cc6699'
];

const games = [
  { name: "Natural Disaster Survival", creator: "Stickmasterluke", plays: "1.2B", stars: 4.8, color: "#e94560" },
  { name: "Work at a Pizza Place",     creator: "Dued1",           plays: "893M", stars: 4.7, color: "#ff6600" },
  { name: "Sword Fighting Tournament", creator: "Catium",          plays: "654M", stars: 4.6, color: "#0052cc" },
  { name: "Escape Room",               creator: "Builderman",      plays: "432M", stars: 4.5, color: "#008800" },
  { name: "The Quarry",                creator: "Quenty",          plays: "378M", stars: 4.4, color: "#9933ff" },
  { name: "Welcome to the Town",       creator: "litozinnamon",    plays: "312M", stars: 4.3, color: "#cc6600" },
  { name: "Survive the Disasters",     creator: "VyrissPlays",     plays: "298M", stars: 4.7, color: "#cc0000" },
  { name: "Flood Escape",              creator: "crazyblox",       plays: "276M", stars: 4.6, color: "#00aacc" },
  { name: "Paintball!",                creator: "daxter33",        plays: "241M", stars: 4.4, color: "#006633" },
  { name: "Freeze Tag",                creator: "Polyhex",         plays: "218M", stars: 4.5, color: "#aa0066" },
  { name: "Build to Survive",          creator: "nosniy",          plays: "195M", stars: 4.3, color: "#cc8800" },
  { name: "Lumber Tycoon",             creator: "Defaultio",       plays: "182M", stars: 4.8, color: "#664400" },
];

const topRated = [
  { name: "Murder Mystery",            creator: "Nikilis",         plays: "920M", stars: 4.9, color: "#aa0000" },
  { name: "Base Wars",                 creator: "ScriptGuider",    plays: "301M", stars: 4.7, color: "#334455" },
  { name: "Restaurant Tycoon",         creator: "ultraw",          plays: "265M", stars: 4.6, color: "#ff6600" },
  { name: "Theme Park Tycoon",         creator: "Den_S",           plays: "246M", stars: 4.8, color: "#0088ff" },
  { name: "Apocalypse Rising",         creator: "Gusmanak",        plays: "#1M",  stars: 4.9, color: "#555533" },
  { name: "Phantom Forces Beta",       creator: "StyLiS Studios",  plays: "189M", stars: 4.7, color: "#333333" },
  { name: "City Life",                 creator: "BloxCity",        plays: "172M", stars: 4.5, color: "#0044aa" },
  { name: "Vehicle Simulator",         creator: "Simbuilder",      plays: "161M", stars: 4.6, color: "#aa5500" },
  { name: "Jailbreak Classic",         creator: "asimo3089",       plays: "155M", stars: 4.4, color: "#880000" },
  { name: "Dragon Ball Z Final Stand", creator: "Digital G",       plays: "143M", stars: 4.5, color: "#ff8800" },
  { name: "Pirate Wars",               creator: "Seaworthy",       plays: "138M", stars: 4.3, color: "#004488" },
  { name: "Sky Wars",                  creator: "Noobmaster69",    plays: "#115M",stars: 4.4, color: "#00aaff" },
];

const newGames = [
  { name: "Super Obby 2013",           creator: "NewDev01",        plays: "2.4K", stars: 3.9, color: "#e94560" },
  { name: "Tycoon Factory",            creator: "DevBuild",        plays: "1.1K", stars: 4.1, color: "#009944" },
  { name: "Capture the Flag Pro",      creator: "FlagMaster",      plays: "843",  stars: 3.7, color: "#cc0000" },
  { name: "Zombie Survival 2.0",       creator: "ZombieGuy9",      plays: "625",  stars: 4.0, color: "#555500" },
  { name: "Racing Island",             creator: "SpeedDemon",      plays: "512",  stars: 3.8, color: "#ff6600" },
  { name: "Space Station",             creator: "GalacticRbx",     plays: "488",  stars: 4.2, color: "#000066" },
  { name: "Tower Defense Simulator",   creator: "towerfan",        plays: "401",  stars: 4.0, color: "#006633" },
  { name: "Treasure Hunt Tycoon",      creator: "GoldDigger",      plays: "389",  stars: 3.9, color: "#aa8800" },
  { name: "Sky Wars New Edition",      creator: "CloudPilot",      plays: "#275", stars: 3.6, color: "#0055cc" },
  { name: "Diner Dash Classic",        creator: "FoodFan",         plays: "261",  stars: 3.8, color: "#cc4400" },
  { name: "Military Roleplay",         creator: "WarGames101",     plays: "198",  stars: 3.5, color: "#334400" },
  { name: "Haunted Mansion",           creator: "SpookyDev",       plays: "154",  stars: 4.1, color: "#330066" },
];

// ---- Render Game Cards ----
function starsDisplay(n) {
  const full = Math.floor(n);
  const half = (n - full) >= 0.5 ? 1 : 0;
  return '&#9733;'.repeat(full) + (half ? '&#9734;' : '') + ' ' + n.toFixed(1);
}

function renderGames(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map(g => `
    <div class="game-card" onclick="gameClick(this, '${g.name.replace(/'/g,"\\'")}')">
      <div class="game-thumb" style="background:${g.color}20; border-bottom:3px solid ${g.color}">
        <div style="width:64px;height:64px;background:${g.color};border-radius:8px;
             display:flex;align-items:center;justify-content:center;
             font-size:24px;color:#fff;font-weight:bold;">
          ${g.name.charAt(0)}
        </div>
      </div>
      <div class="game-info">
        <div class="game-name" title="${g.name}">${g.name}</div>
        <div class="game-creator">by ${g.creator}</div>
        <div class="game-plays">${g.plays} plays</div>
        <div class="game-stars">${starsDisplay(g.stars)}</div>
      </div>
    </div>
  `).join('');
}

function gameClick(el, name) {
  el.style.opacity = '0.6';
  setTimeout(() => { el.style.opacity = '1'; }, 200);
  // Simulate "Play" dialog
  if (confirm(`Play "${name}"?\n\n(This would launch ROBLOX Player on the real site.)`)) {
    alert('Launching ROBLOX Player... (demo only)');
  }
}

// ---- Featured Banner ----
const featuredGames = [
  { title: "Sword Fighting Tournament", sub: "by Catium  |  ★★★★★  |  1,204,532 plays", gradient: "135deg, #1a1a2e 0%, #0f3460 60%, #e94560 100%" },
  { title: "Natural Disaster Survival", sub: "by Stickmasterluke  |  ★★★★★  |  1.2B plays", gradient: "135deg, #003300 0%, #006600 60%, #ccff00 100%" },
  { title: "Work at a Pizza Place",     sub: "by Dued1  |  ★★★★½  |  893M plays", gradient: "135deg, #330000 0%, #884400 60%, #ff6600 100%" },
  { title: "Apocalypse Rising",         sub: "by Gusmanak  |  ★★★★★  |  1B plays", gradient: "135deg, #111100 0%, #555533 60%, #aaaa00 100%" },
  { title: "Lumber Tycoon",             sub: "by Defaultio  |  ★★★★★  |  182M plays", gradient: "135deg, #1a0e00 0%, #5c3d1e 60%, #a0622b 100%" },
];

let featuredIdx = 0;

function switchFeatured(idx) {
  featuredIdx = idx;
  const fi = document.getElementById('featured-image');
  const ft = document.getElementById('featured-title');
  const fs = document.getElementById('featured-sub');
  const f  = featuredGames[idx];
  fi.style.background = `linear-gradient(${f.gradient})`;
  ft.textContent = f.title;
  fs.textContent = f.sub;
  document.querySelectorAll('.ftab').forEach((b, i) => b.classList.toggle('active', i === idx));
}

// Auto-rotate featured
setInterval(() => {
  switchFeatured((featuredIdx + 1) % featuredGames.length);
}, 5000);

// ---- Login Modal ----
function openModal() {
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// Hook "Log In" links
document.addEventListener('DOMContentLoaded', () => {
  renderGames('popular-games', games);
  renderGames('top-rated', topRated);
  renderGames('new-games', newGames);

  document.querySelectorAll('a').forEach(a => {
    if (a.textContent.trim() === 'Log In') {
      a.addEventListener('click', e => { e.preventDefault(); openModal(); });
    }
  });

  // Nav link active toggle
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  // Login submit (demo)
  document.querySelector('.login-submit-btn').addEventListener('click', () => {
    const user = document.querySelector('#modal-body input[type="text"]').value.trim();
    if (!user) { alert('Please enter a username.'); return; }
    document.getElementById('username').textContent = user;
    closeModal();
  });
});
