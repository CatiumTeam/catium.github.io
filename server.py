import sqlite3
from pathlib import Path

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
DB_PATH = Path(__file__).with_name("catium.db")

AI_CREATORS = [
    "ChatGPT",
    "Claude",
    "Grok",
    "Gemini",
    "GitHub Copilot",
    "Perplexity",
    "Mistral",
    "Llama",
    "DeepSeek",
    "Qwen",
    "Command R",
    "Pi",
    "YouChat",
    "Jasper",
    "Character.AI",
    "Phind",
]

SEED_GAMES = [
    ("Natural Disaster Survival", "ChatGPT", 1200000000, 4.8, "#7c3aed", "🌋", 1, "Survive earthquakes, floods, and more with up to 30 players."),
    ("Work at a Pizza Place", "Claude", 893000000, 4.7, "#dc2626", "🍕", 1, "The classic pizza roleplay game. Deliver, cook, manage."),
    ("Sword Fighting Tournament", "Grok", 654000000, 4.6, "#2563eb", "⚔️", 0, "Enter the arena and battle for glory in this competitive PvP game."),
    ("Escape Room", "Gemini", 432000000, 4.5, "#059669", "🔐", 0, "Solve puzzles and escape devious rooms in this mind-bending challenge."),
    ("Murder Mystery 2", "GitHub Copilot", 920000000, 4.9, "#be123c", "🔪", 1, "Who is the murderer? Deduce, survive, or eliminate in this thriller."),
    ("Lumber Tycoon 2", "Perplexity", 182000000, 4.8, "#92400e", "🪵", 0, "Chop wood, build trucks, and grow your lumber empire."),
    ("Apocalypse Rising", "Mistral", 1000000000, 4.9, "#4d4d00", "☢️", 1, "Survival in a post-apocalyptic open world filled with zombies."),
    ("Theme Park Tycoon 2", "Llama", 246000000, 4.8, "#0369a1", "🎡", 0, "Design and build your dream amusement park from scratch."),
    ("Phantom Forces", "DeepSeek", 500000000, 4.7, "#1f2937", "🔫", 1, "A realistic first-person shooter with ranked matchmaking."),
    ("Vehicle Simulator", "Qwen", 161000000, 4.6, "#b45309", "🚗", 0, "Race, drift, and explore in dozens of realistic vehicles."),
    ("Flood Escape 2", "Command R", 276000000, 4.6, "#0284c7", "🌊", 1, "Escape rising floodwaters in increasingly difficult maps."),
    ("Dragon Ball Z Final Stand", "Pi", 143000000, 4.5, "#d97706", "⚡", 0, "Train your fighter and battle in this epic DBZ fan experience."),
]


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                creator TEXT NOT NULL,
                plays INTEGER NOT NULL,
                stars REAL NOT NULL,
                color TEXT NOT NULL,
                emoji TEXT NOT NULL,
                live INTEGER NOT NULL DEFAULT 0,
                description TEXT NOT NULL
            )
            """
        )
        count = conn.execute("SELECT COUNT(*) FROM games").fetchone()[0]
        if count == 0:
            conn.executemany(
                """
                INSERT INTO games (name, creator, plays, stars, color, emoji, live, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                SEED_GAMES,
            )
        conn.commit()


def fetch_games(limit=12, sort_by="plays"):
    sort_whitelist = {"plays", "stars", "name", "id"}
    safe_sort = sort_by if sort_by in sort_whitelist else "plays"
    with get_db_connection() as conn:
        rows = conn.execute(
            f"SELECT * FROM games ORDER BY {safe_sort} DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(row) for row in rows]


def apply_ai_creator_credits():
    with get_db_connection() as conn:
        rows = conn.execute("SELECT id FROM games ORDER BY id ASC").fetchall()
        for idx, row in enumerate(rows):
            creator = AI_CREATORS[idx % len(AI_CREATORS)]
            conn.execute("UPDATE games SET creator = ? WHERE id = ?", (creator, row["id"]))
        conn.commit()

users_db = [
    {"id": 1, "username": "Builderman",     "online": True},
    {"id": 2, "username": "Stickmasterluke","online": True},
    {"id": 3, "username": "Merely",         "online": True},
    {"id": 4, "username": "1x1x1x1",        "online": False},
    {"id": 5, "username": "Telamon",        "online": False},
]

# ---- Page Routes ----
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/games")
def games_page():
    return render_template("games.html")


@app.route("/client")
def client_page():
    return render_template("client.html")


@app.route("/experiences")
def experiences_page():
    return render_template("experiences.html")


@app.route("/community")
def community_page():
    return render_template("community.html")


@app.route("/studio")
def studio_page():
    return render_template("studio.html")


@app.route("/premium")
def premium_page():
    return render_template("premium.html")

# ---- API: Games ----
@app.route("/api/games")
def api_games():
    sort_by = request.args.get("sort", "plays")
    limit = min(int(request.args.get("limit", 12)), 50)
    return jsonify(fetch_games(limit=limit, sort_by=sort_by))

@app.route("/api/games/<int:game_id>")
def api_game(game_id):
    with get_db_connection() as conn:
        row = conn.execute("SELECT * FROM games WHERE id = ?", (game_id,)).fetchone()
    game = dict(row) if row else None
    if not game:
        return jsonify({"error": "Game not found"}), 404
    return jsonify(game)

# ---- API: Users / Friends ----
@app.route("/api/users")
def api_users():
    online_only = request.args.get("online") == "true"
    data = [u for u in users_db if u["online"]] if online_only else users_db
    return jsonify(data)

# ---- API: Search ----
@app.route("/api/search")
def api_search():
    q = request.args.get("q", "").lower()
    if not q:
        return jsonify([])
    with get_db_connection() as conn:
        rows = conn.execute(
            """
            SELECT * FROM games
            WHERE lower(name) LIKE ? OR lower(creator) LIKE ?
            ORDER BY plays DESC
            LIMIT 20
            """,
            (f"%{q}%", f"%{q}%"),
        ).fetchall()
    results = [dict(row) for row in rows]
    return jsonify(results)

# ---- API: Stats ----
@app.route("/api/stats")
def api_stats():
    with get_db_connection() as conn:
        row = conn.execute("SELECT COUNT(*) AS total_games, COALESCE(SUM(plays), 0) AS total_players FROM games").fetchone()
    return jsonify({
        "total_games": row["total_games"],
        "total_players": row["total_players"],
        "online_users": sum(1 for u in users_db if u["online"]),
    })


init_db()
apply_ai_creator_credits()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
