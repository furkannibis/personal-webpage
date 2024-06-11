import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager

@contextmanager
def get_curr():
    try:
        conn = psycopg2.connect(
            user = "postgres",
            password = "postgres",
            host = "localhost",
            port = "5432",
            database = "personal"
        )
        curr = conn.cursor(cursor_factory=RealDictCursor)
        yield curr
    except Exception as err:
        print(err)
        raise
    finally:
        curr.close()
        conn.close()