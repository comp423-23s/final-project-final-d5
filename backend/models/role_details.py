from pydantic import BaseModel
from . import User, Permission

__authors__ = ["Warren Quadland, Will Astilla"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

class RoleDetails(BaseModel):
    id: int | None = None
    name: str
    permissions: list[Permission]
    users: list[User]