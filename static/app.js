
// ===== GAME DATA =====
const GAMES = [
	{ id:1,  name:"Natural Disaster Survival", creator:"Stickmasterluke", plays:"1.2B", stars:4.8, color:"#7c3aed", emoji:"🌋", live:true,  desc:"Survive earthquakes, floods, and more with up to 30 players." },
	{ id:2,  name:"Work at a Pizza Place",     creator:"Dued1",           plays:"893M", stars:4.7, color:"#dc2626", emoji:"🍕", live:true,  desc:"The classic pizza roleplay game. Deliver, cook, manage." },
	{ id:3,  name:"Sword Fighting Tournament", creator:"Catium",          plays:"654M", stars:4.6, color:"#2563eb", emoji:"⚔️", live:false, desc:"Enter the arena and battle for glory in this competitive PvP game." },
	{ id:4,  name:"Escape Room",               creator:"Builderman",      plays:"432M", stars:4.5, color:"#059669", emoji:"🔐", live:false, desc:"Solve puzzles and escape devious rooms in this mind-bending challenge." },
	{ id:5,  name:"Murder Mystery 2",          creator:"Nikilis",         plays:"920M", stars:4.9, color:"#be123c", emoji:"🔪", live:true,  desc:"Who is the murderer? Deduce, survive, or eliminate in this thriller." },
	{ id:6,  name:"Lumber Tycoon 2",           creator:"Defaultio",       plays:"182M", stars:4.8, color:"#92400e", emoji:"🪵", live:false, desc:"Chop wood, build trucks, and grow your lumber empire." },
	{ id:7,  name:"Apocalypse Rising",         creator:"Gusmanak",        plays:"1B",   stars:4.9, color:"#4d4d00", emoji:"☢️", live:true,  desc:"Survival in a post-apocalyptic open world filled with zombies." },
	{ id:8,  name:"Theme Park Tycoon 2",       creator:"Den_S",           plays:"246M", stars:4.8, color:"#0369a1", emoji:"🎡", live:false, desc:"Design and build your dream amusement park from scratch." },
	{ id:9,  name:"Phantom Forces",            creator:"StyLiS Studios",  plays:"500M", stars:4.7, color:"#1f2937", emoji:"🔫", live:true,  desc:"A realistic first-person shooter with ranked matchmaking." },
	{ id:10, name:"Vehicle Simulator",         creator:"Simbuilder",      plays:"161M", stars:4.6, color:"#b45309", emoji:"🚗", live:false, desc:"Race, drift, and explore in dozens of realistic vehicles." },
	{ id:11, name:"Flood Escape 2",            creator:"Crazyblox",       plays:"276M", stars:4.6, color:"#0284c7", emoji:"🌊", live:true,  desc:"Escape rising floodwaters in increasingly difficult maps." },
	{ id:12, name:"Dragon Ball Z Final Stand",  creator:"Digital G",      plays:"143M", stars:4.5, color:"#d97706", emoji:"⚡", live:false, desc:"Train your fighter and battle in this epic DBZ fan experience." },
];

const TOP_RATED = GAMES.slice().sort((a,b) => b.stars - a.stars);
const NEW_GAMES = [
	{ id:101, name:"Super Obby 2026",        creator:"NewDev01",    plays:"4.1K", stars:3.9, color:"#7c3aed", emoji:"🏃", live:false, desc:"A fresh parkour challenge with 200 unique stages." },
	{ id:102, name:"Tycoon Factory Pro",     creator:"DevBuild",    plays:"2.2K", stars:4.1, color:"#059669", emoji:"🏭", live:true,  desc:"Build and automate your factory empire from the ground up." },
	{ id:103, name:"Capture the Flag Pro",   creator:"FlagMaster",  plays:"1.8K", stars:3.7, color:"#dc2626", emoji:"🚩", live:false, desc:"Classic team-based CTF with modern map design." },
	{ id:104, name:"Zombie Siege 2.0",       creator:"ZombieGuy9",  plays:"1.4K", stars:4.0, color:"#365314", emoji:"🧟", live:true,  desc:"Wave-based survival against hordes of the undead." },
	{ id:105, name:"Racing Island",          creator:"SpeedDemon",  plays:"980",  stars:3.8, color:"#ea580c", emoji:"🏎️", live:false, desc:"High-speed racing across a massive open island." },
	{ id:106, name:"Space Station Omega",    creator:"GalacticRbx", plays:"870",  stars:4.2, color:"#1e3a8a", emoji:"🚀", live:true,  desc:"Manage a space station and survive cosmic events." },
	{ id:107, name:"Tower Defense Xtreme",   creator:"TowerFan",    plays:"720",  stars:4.0, color:"#166534", emoji:"🗼", live:false, desc:"Place towers and defend against 50 waves of enemies." },
	{ id:108, name:"Haunted Mansion 2",      creator:"SpookyDev",   plays:"640",  stars:4.1, color:"#3b0764", emoji:"👻", live:true,  desc:"Explore a haunted mansion with friends - if you dare." },
	{ id:109, name:"Medieval Roleplay",      creator:"KnightCraft",  plays:"520", stars:3.8, color:"#78350f", emoji:"🏰", live:false, desc:"Live out your medieval fantasy in a massive open world." },
	{ id:110, name:"Diner Dash Classic",     creator:"FoodFan",     plays:"480",  stars:3.9, color:"#b91c1c", emoji:"🍔", live:false, desc:"Serve customers, manage your diner, and race the clock." },
	{ id:111, name:"Sky Wars Reloaded",      creator:"CloudPilot",  plays:"410",  stars:3.6, color:"#0ea5e9", emoji:"☁️", live:true,  desc:"PvP on floating islands with loot-based progression." },
	{ id:112, name:"Military Roleplay 2",    creator:"WarGames101", plays:"360",  stars:3.5, color:"#374151", emoji:"🪖", live:false, desc:"Tactical military roleplay with realistic factions." },
];

const HERO_GAMES = [
	{ title:"Sword Fighting Tournament", creator:"Catium",          stars:"4.9", plays:"1.2B", gradient:"135deg, #0d0d1a 0%, #1a0d2e 40%, #2d1b69 80%, #6d28d9 100%" },
	{ title:"Natural Disaster Survival", creator:"Stickmasterluke", stars:"4.8", plays:"1.2B", gradient:"135deg, #0a1a0a 0%, #0d3b0d 50%, #145214 80%, #22c55e 100%" },
	{ title:"Apocalypse Rising",         creator:"Gusmanak",        stars:"4.9", plays:"1B",   gradient:"135deg, #111100 0%, #3b3b00 50%, #555500 80%, #a3a300 100%" },
	{ title:"Murder Mystery 2",          creator:"Nikilis",         stars:"4.9", plays:"920M", gradient:"135deg, #1a0000 0%, #4d0000 50%, #8b0000 80%, #ef4444 100%" },
	{ title:"Phantom Forces",            creator:"StyLiS Studios",  stars:"4.7", plays:"500M", gradient:"135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 80%, #404040 100%" },
];

const ACTIVITY = [
	{ user: "NexusBuild", action: "published an update for", target: "Factory Tycoon Pro", time: "2m ago" },
	{ user: "Polyhex", action: "started a live event in", target: "Freeze Tag Arena", time: "7m ago" },
	{ user: "Builderman", action: "joined the studio", target: "Catium Originals", time: "15m ago" },
	{ user: "Vyriss", action: "shipped a balance patch for", target: "Disaster Survival", time: "27m ago" },
	{ user: "Simbuilder", action: "hit 10M visits in", target: "Vehicle Simulator", time: "43m ago" },
];

const STUDIOS = [
	{ name: "Catium Originals", members: "21 members", openRoles: "2 roles open", tags: ["Scripter", "Builder"] },
	{ name: "Moonlight Devs", members: "8 members", openRoles: "3 roles open", tags: ["UI", "Animator"] },
	{ name: "Skyforge Team", members: "14 members", openRoles: "1 role open", tags: ["VFX", "Scripter"] },
	{ name: "Urban Pixel", members: "11 members", openRoles: "4 roles open", tags: ["Map Design", "QA"] },
];

const CREATORS = [
	{ name: "Stickmasterluke", stat: "2.1B total plays" },
	{ name: "Nikilis", stat: "1.4B total plays" },
	{ name: "Dued1", stat: "920M total plays" },
	{ name: "Den_S", stat: "620M total plays" },
];

// ===== HERO =====
let heroIdx = 0;
let heroTimer;

function buildHeroDots() {
	const wrap = document.getElementById('hero-dots');
	if (!wrap) return;
	wrap.innerHTML = HERO_GAMES.map((_, i) =>
		`<button class="hero-dot${i===0?' active':''}" onclick="goHero(${i})"></button>`
	).join('');
}

function goHero(idx) {
	heroIdx = idx;
	const bg = document.getElementById('hero-bg');
	const title = document.getElementById('hero-title');
	const meta  = document.getElementById('hero-meta');
	const g = HERO_GAMES[idx];
	if (bg)    bg.style.background = `linear-gradient(${g.gradient})`;
	if (title) title.textContent = g.title;
	if (meta)  meta.innerHTML = `by <strong>${g.creator}</strong> &nbsp;&middot;&nbsp; <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span> ${g.stars} &nbsp;&middot;&nbsp; ${g.plays} plays`;
	document.querySelectorAll('.hero-dot').forEach((d,i) => d.classList.toggle('active', i===idx));
	clearInterval(heroTimer);
	heroTimer = setInterval(() => goHero((heroIdx+1) % HERO_GAMES.length), 6000);
}

// ===== GAME CARDS =====
function renderGames(containerId, list) {
	const el = document.getElementById(containerId);
	if (!el) return;
	const limit = containerId === 'new-games' ? 8 : 12;
	el.innerHTML = list.slice(0, limit).map(g => `
		<div class="game-card" onclick="openGameModal(${g.id})">
			<div class="game-thumb" style="background:${g.color}22; border-bottom: 3px solid ${g.color}40;">
				${g.live ? '<span class="game-live-badge">LIVE</span>' : ''}
				<span style="font-size:34px; position:relative; z-index:1;">${g.emoji}</span>
			</div>
			<div class="game-info">
				<div class="game-name" title="${g.name}">${g.name}</div>
				<div class="game-creator">${g.creator}</div>
				<div class="game-footer">
					<span class="game-plays">${g.plays} plays</span>
					<span class="game-stars-row">&#9733; ${g.stars}</span>
				</div>
			</div>
		</div>
	`).join('');
}

function renderActivity() {
	const el = document.getElementById('activity-feed');
	if (!el) return;
	el.innerHTML = ACTIVITY.map(item => `
		<div class="activity-item">
			<div class="activity-main">
				<div class="activity-avatar">${item.user.charAt(0)}</div>
				<div class="activity-text"><strong>${item.user}</strong> ${item.action} <strong>${item.target}</strong></div>
			</div>
			<div class="activity-time">${item.time}</div>
		</div>
	`).join('');
}

function renderStudios() {
	const el = document.getElementById('studio-grid');
	if (!el) return;
	el.innerHTML = STUDIOS.map(studio => `
		<div class="studio-card">
			<h4>${studio.name}</h4>
			<div class="studio-meta">${studio.members} - ${studio.openRoles}</div>
			<div class="studio-tags">
				${studio.tags.map(tag => `<span class="studio-tag">${tag}</span>`).join('')}
			</div>
			<button class="studio-join">Request Invite</button>
		</div>
	`).join('');
}

function renderCreators() {
	const el = document.getElementById('creator-list');
	if (!el) return;
	el.innerHTML = CREATORS.map(c => `
		<div class="creator-item">
			<div class="creator-profile">
				<div class="creator-avatar">${c.name.charAt(0)}</div>
				<div>
					<div class="creator-name">${c.name}</div>
					<div class="creator-stat">${c.stat}</div>
				</div>
			</div>
			<button class="creator-follow">Follow</button>
		</div>
	`).join('');
}

// ===== GAME MODAL =====
const ALL_GAMES = [...GAMES, ...NEW_GAMES];

function openGameModal(id) {
	const g = ALL_GAMES.find(x => x.id === id);
	if (!g) return;
	document.getElementById('gm-thumb').style.background = g.color + '33';
	document.getElementById('gm-thumb').innerHTML = `<span style="font-size:72px;">${g.emoji}</span>`;
	document.getElementById('gm-title').textContent = g.name;
	document.getElementById('gm-meta').innerHTML = `by <strong>${g.creator}</strong> &nbsp;&middot;&nbsp; <span style="color:var(--gold)">&#9733;</span> ${g.stars} &nbsp;&middot;&nbsp; ${g.plays} plays`;
	document.getElementById('gm-desc').textContent = g.desc;
	document.getElementById('game-modal-overlay').classList.remove('hidden');
}

function closeGameModal(e) {
	if (e === null || e.target === document.getElementById('game-modal-overlay')) {
		document.getElementById('game-modal-overlay').classList.add('hidden');
	}
}

// ===== SEARCH =====
function initSearch() {
	const input   = document.getElementById('search-input');
	const results = document.getElementById('search-results');
	if (!input || !results) return;

	input.addEventListener('input', () => {
		const q = input.value.trim().toLowerCase();
		if (!q) { results.classList.add('hidden'); return; }
		const matches = ALL_GAMES.filter(g =>
			g.name.toLowerCase().includes(q) || g.creator.toLowerCase().includes(q)
		).slice(0,6);
		if (!matches.length) { results.classList.add('hidden'); return; }
		results.innerHTML = matches.map(g =>
			`<a href="#" onclick="openGameModal(${g.id}); document.getElementById('search-results').classList.add('hidden'); document.getElementById('search-input').value=''; return false;">
				<span class="sr-icon" style="background:${g.color}33;">${g.emoji}</span>
				<span><strong>${g.name}</strong><br><small style="color:var(--text-3)">${g.creator}</small></span>
			</a>`
		).join('');
		results.classList.remove('hidden');
	});

	document.addEventListener('click', e => {
		if (!document.getElementById('search-wrap').contains(e.target)) {
			results.classList.add('hidden');
		}
	});
}

// ===== ONLINE COUNTER ANIMATION =====
function animateCounter() {
	const el = document.getElementById('stat-online');
	if (!el) return;
	let base = 142391;
	setInterval(() => {
		base += Math.floor((Math.random() - 0.45) * 30);
		el.textContent = base.toLocaleString();
	}, 3000);
}

// ===== LOGIN MODAL =====
function openModal() {
	document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() {
	document.getElementById('modal-overlay').classList.add('hidden');
}
function overlayClick(e) {
	if (e.target === document.getElementById('modal-overlay')) closeModal();
}
function switchTab(tab) {
	document.getElementById('modal-login').classList.toggle('hidden',  tab !== 'login');
	document.getElementById('modal-signup').classList.toggle('hidden', tab !== 'signup');
	document.getElementById('tab-login').classList.toggle('active',  tab === 'login');
	document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}
function doLogin() {
	const user = document.getElementById('login-user').value.trim();
	if (!user) return;
	loggedIn(user);
}
function doSignup() {
	const user = document.getElementById('signup-user').value.trim();
	if (!user) return;
	loggedIn(user);
}
function loggedIn(username) {
	closeModal();
	document.querySelector('.btn-ghost').classList.add('hidden');
	document.querySelector('.btn-primary').classList.add('hidden');
	const wrap = document.getElementById('user-avatar-wrap');
	wrap.classList.remove('hidden');
	document.getElementById('dropdown-username').textContent = username;
	document.getElementById('avatar-img').src = '';
	document.getElementById('avatar-img').onclick = () => {
		document.getElementById('user-dropdown').classList.toggle('hidden');
	};
	document.getElementById('logout-btn').onclick = (e) => {
		e.preventDefault();
		wrap.classList.add('hidden');
		document.querySelector('.btn-ghost').classList.remove('hidden');
		document.querySelector('.btn-primary').classList.remove('hidden');
	};
}

// ===== CATEGORY PILLS =====
function initPills() {
	document.querySelectorAll('.pill').forEach(p => {
		p.addEventListener('click', () => {
			document.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
			p.classList.add('active');
		});
	});
}

// ===== NAV ACTIVE =====
function initNav() {
	const path = window.location.pathname;
	document.querySelectorAll('.nav-link').forEach(link => {
		const href = link.getAttribute('href');
		if (!href) return;
		if ((href === '/' && path === '/') || (href !== '/' && path.startsWith(href))) {
			link.classList.add('active');
		} else if (href !== '/') {
			link.classList.remove('active');
		}
	});
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
	buildHeroDots();
	heroTimer = setInterval(() => goHero((heroIdx+1) % HERO_GAMES.length), 6000);
	renderActivity();
	renderStudios();
	renderCreators();
	renderGames('popular-games', GAMES);
	renderGames('new-games', NEW_GAMES);
	initSearch();
	initPills();
	initNav();
	animateCounter();
});

