const canvas = document.getElementById("client-canvas");
const statusEl = document.getElementById("client-status");
const titleEl = document.getElementById("client-game-title");
const subEl = document.getElementById("client-game-sub");
const lobbyListEl = document.getElementById("lobby-list");
const chatLogEl = document.getElementById("chat-log");
const chatInputEl = document.getElementById("chat-input");
const chatSendEl = document.getElementById("chat-send");

const params = new URLSearchParams(window.location.search);
const gameName = params.get("game") || "Catium Experience";
const creator = params.get("creator") || "Unknown Creator";

titleEl.textContent = gameName;
subEl.textContent = `Creator - ${creator}`;
statusEl.textContent = "Loading world geometry...";

if (!window.THREE) {
  statusEl.textContent = "Three.js failed to load - check internet access and refresh.";
  throw new Error("Three.js not available on window.THREE");
}

const lobbyUsers = [
  { name: "You", role: "Player" },
  { name: creator, role: "Creator" },
  { name: "Claude", role: "Builder" },
  { name: "Grok", role: "Tester" },
  { name: "Gemini", role: "Spectator" },
];

const starterMessages = [
  { user: creator, text: `Welcome to ${gameName} - client is live.` },
  { user: "Claude", text: "Camera feels good - movement is responsive." },
  { user: "Grok", text: "Testing collisions next - world loaded cleanly." },
];

function renderLobby() {
  if (!lobbyListEl) return;
  lobbyListEl.innerHTML = lobbyUsers.map((user) => `
    <div class="lobby-user">
      <div><strong>${user.name}</strong></div>
      <span class="lobby-badge">${user.role}</span>
    </div>
  `).join("");
}

function appendChatMessage(user, text) {
  if (!chatLogEl) return;
  const row = document.createElement("div");
  row.className = "chat-message";
  row.innerHTML = `<strong>${user}</strong> - ${text}`;
  chatLogEl.appendChild(row);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
}

function initChat() {
  starterMessages.forEach((msg) => appendChatMessage(msg.user, msg.text));

  if (!chatSendEl || !chatInputEl) return;
  const send = () => {
    const value = chatInputEl.value.trim();
    if (!value) return;
    appendChatMessage("You", value);
    chatInputEl.value = "";
    window.setTimeout(() => {
      appendChatMessage(creator, `Copy that - ${value.toLowerCase()}.`);
    }, 700);
  };

  chatSendEl.addEventListener("click", send);
  chatInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}

renderLobby();
initChat();

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0b);
scene.fog = new THREE.Fog(0x0b0b0b, 30, 120);

const camera = new THREE.PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
camera.position.set(0, 6, 12);

const hemi = new THREE.HemisphereLight(0x94a3b8, 0x111111, 0.7);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.85);
dir.position.set(8, 14, 6);
scene.add(dir);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200, 10, 10),
  new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.95, metalness: 0.05 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const grid = new THREE.GridHelper(200, 60, 0x2b2b2b, 0x222222);
scene.add(grid);

const worldGroup = new THREE.Group();
scene.add(worldGroup);

for (let i = 0; i < 45; i += 1) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2 + Math.random() * 3, 2 + Math.random() * 8, 2 + Math.random() * 3),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.58 + Math.random() * 0.1, 0.5, 0.35),
      roughness: 0.8,
      metalness: 0.15,
    })
  );
  box.position.set((Math.random() - 0.5) * 120, box.geometry.parameters.height / 2, (Math.random() - 0.5) * 120);
  worldGroup.add(box);
}

const player = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.45, 1.2, 4, 10),
  new THREE.MeshStandardMaterial({ color: 0x0d6efd, roughness: 0.4, metalness: 0.2 })
);
player.position.set(0, 1.2, 0);
scene.add(player);

const keys = { w: false, a: false, s: false, d: false, shift: false };
let yaw = 0;
let pitch = -0.2;
let pointerLocked = false;

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "w") keys.w = true;
  if (e.key.toLowerCase() === "a") keys.a = true;
  if (e.key.toLowerCase() === "s") keys.s = true;
  if (e.key.toLowerCase() === "d") keys.d = true;
  if (e.key === "Shift") keys.shift = true;
  if (e.key.toLowerCase() === "r") {
    player.position.set(0, 1.2, 0);
    statusEl.textContent = "Position reset.";
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "w") keys.w = false;
  if (e.key.toLowerCase() === "a") keys.a = false;
  if (e.key.toLowerCase() === "s") keys.s = false;
  if (e.key.toLowerCase() === "d") keys.d = false;
  if (e.key === "Shift") keys.shift = false;
});

canvas.addEventListener("click", async () => {
  try {
    await canvas.requestPointerLock();
  } catch {
    statusEl.textContent = "Pointer lock unavailable - camera still works.";
  }
});

document.addEventListener("pointerlockchange", () => {
  pointerLocked = document.pointerLockElement === canvas;
  statusEl.textContent = pointerLocked ? "Pointer locked - control active." : "Click canvas to lock pointer.";
});

window.addEventListener("mousemove", (e) => {
  if (!pointerLocked) return;
  yaw -= e.movementX * 0.0022;
  pitch -= e.movementY * 0.0018;
  pitch = Math.max(-1.15, Math.min(0.25, pitch));
});

const clock = new THREE.Clock();

function updatePlayer(dt) {
  const speed = keys.shift ? 10.5 : 6.8;
  const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const move = new THREE.Vector3();

  if (keys.w) move.add(forward);
  if (keys.s) move.sub(forward);
  if (keys.d) move.add(right);
  if (keys.a) move.sub(right);

  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar(speed * dt);
    player.position.add(move);
  }
}

function updateCamera() {
  const distance = 6.2;
  const height = 2.8;
  const target = new THREE.Vector3(player.position.x, player.position.y + 0.8, player.position.z);

  const camOffset = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch) * distance,
    Math.sin(-pitch) * distance + height,
    Math.cos(yaw) * Math.cos(pitch) * distance
  );

  const desired = target.clone().add(camOffset);
  camera.position.lerp(desired, 0.13);
  camera.lookAt(target);
}

function animate() {
  const dt = Math.min(clock.getDelta(), 0.033);
  updatePlayer(dt);
  updateCamera();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function handleResize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", handleResize);
handleResize();
statusEl.textContent = "Client ready - click the canvas to start moving.";
animate();
