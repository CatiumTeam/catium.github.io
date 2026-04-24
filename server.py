from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# ---- In-memory "database" ----
games_db = [
    {"id": 1, "name": "Natural Disaster Survival", "creator": "Stickmasterluke", "plays": 1200000000, "stars": 4.8},
    {"id": 2, "name": "Work at a Pizza Place",     "creator": "Dued1",           "plays": 893000000,  "stars": 4.7},
    {"id": 3, "name": "Sword Fighting Tournament", "creator": "ROBLOX",          "plays": 654000000,  "stars": 4.6},
    {"id": 4, "name": "Escape Room",               "creator": "Builderman",      "plays": 432000000,  "stars": 4.5},
    {"id": 5, "name": "Murder Mystery",            "creator": "Nikilis",         "plays": 920000000,  "stars": 4.9},
    {"id": 6, "name": "Lumber Tycoon",             "creator": "Defaultio",       "plays": 182000000,  "stars": 4.8},
]

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

# ---- API: Games ----
@app.route("/api/games")
def api_games():
    sort_by = request.args.get("sort", "plays")
    limit   = min(int(request.args.get("limit", 12)), 50)
    data = sorted(games_db, key=lambda g: g.get(sort_by, 0), reverse=True)
    return jsonify(data[:limit])

@app.route("/api/games/<int:game_id>")
def api_game(game_id):
    game = next((g for g in games_db if g["id"] == game_id), None)
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
    results = [g for g in games_db if q in g["name"].lower() or q in g["creator"].lower()]
    return jsonify(results)

# ---- API: Stats ----
@app.route("/api/stats")
def api_stats():
    return jsonify({
        "total_games":   len(games_db),
        "total_players": sum(g["plays"] for g in games_db),
        "online_users":  sum(1 for u in users_db if u["online"]),
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
