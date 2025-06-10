import sqlite3

def init_db():
    conn = sqlite3.connect("marketplace.db")
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        api_key TEXT,
        usage_count INTEGER DEFAULT 0
    )
    """)
    conn.commit()
    conn.close()

def register_user(email, api_key):
    conn = sqlite3.connect("marketplace.db")
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO users (email, api_key) VALUES (?, ?)", (email, api_key))
    conn.commit()
    conn.close()

def get_user(api_key):
    conn = sqlite3.connect("marketplace.db")
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE api_key=?", (api_key,))
    user = c.fetchone()
    conn.close()
    return user
