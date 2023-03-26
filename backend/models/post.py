"""Post model serves as data model for posts in the Forum"""

from pydantic import BaseModel
from . import User


class Post(BaseModel):
    id: int | None = None
    content: str
    user: User

