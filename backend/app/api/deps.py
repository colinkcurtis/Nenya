from typing import Generator
from app.db.session import get_db

# Re-export get_db for use in routes
def get_db() -> Generator:
    return get_db()

# Later, when you add authentication, you'll add more dependencies here
# Such as:
# get_current_user
# get_current_active_user
# get_current_active_superuser