"""Post model serves as data model for posts in the Forum"""

from pydantic import BaseModel
from . import User

__authors__ = ["Warren Quadland, Will Astilla"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

class Post(BaseModel):
    id: int | None = None
    title: str
    content: str
    user: User
    votes: list[User] = []
    timestamp: str