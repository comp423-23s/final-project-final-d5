'''User accounts for all registered users in the application.'''


from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from .user_role_entity import user_role_table
from ..models import User
from ..models import Post


__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class PostEntity(EntityBase):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    content: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    user: Mapped[User] = mapped_column(User, nullable=False, default='')
    votes: Mapped[list[User]]
    timestamp: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    @classmethod
    def from_model(cls, model: Post) -> Self:
        return cls(
            id=model.id,
            content=model.content,
            user=model.user,
            votes=model.votes,
        )

    def to_model(self) -> Post:
        return Post(
            id=self.id,
            content=self.content,
            user=self.user,
            votes=self.votes,
        )

    def update(self, model: Post) -> None:
        self.content = model.content
