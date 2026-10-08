import json, sys, urllib.request, urllib.parse
T = open(sys.argv[1]).read().strip()
API = "http://localhost:3333"
GAMES = [
  ("Dobble", "LATAO", 3.0), ("Love Letter", "LATAO", 3.0), ("Uno", "LATAO", 2.0), ("Codenames", "LATAO", 4.0),
  ("Dixit", "BRONZE", 5.0), ("Azul", "BRONZE", 5.0), ("Carcassonne", "BRONZE", 5.0), ("King of Tokyo", "BRONZE", 5.0),
  ("Catan: O Jogo", "PRATA", 7.0), ("Ticket to Ride", "PRATA", 7.0), ("Splendor", "PRATA", 6.0), ("7 Wonders", "PRATA", 7.0),
  ("Wingspan", "OURO", 9.0), ("Terraforming Mars", "OURO", 9.0), ("Everdell", "OURO", 9.0),
  ("Gloomhaven", "DIAMANTE", 12.0), ("Brass: Birmingham", "DIAMANTE", 12.0), ("Scythe", "DIAMANTE", 12.0),
]
def req(method, path, body=None, q=None):
    url = API + path + ("?" + urllib.parse.urlencode(q) if q else "")
    r = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body else None,
        headers={"Authorization": "Bearer " + T, "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=60) as resp:
        return json.loads(resp.read() or "null")
out = []
for title, tier, price in GAMES:
    res = req("GET", "/games/search-ludopedia", q={"q": title})
    hit = next((g for g in res if g["name"].lower() == title.lower()), res[0])
    cover = (hit.get("image") or "").replace("_t.jpg", ".jpg") or None
    g = req("POST", "/games", {"ludopediaId": hit["id"], "title": hit["name"], "price": price, "cover": cover})
    gid = g.get("id") or g.get("game", {}).get("id")
    out.append({"id": gid, "title": hit["name"], "tier": tier})
    print(tier, hit["name"], gid)
json.dump(out, open(sys.argv[2], "w"))
