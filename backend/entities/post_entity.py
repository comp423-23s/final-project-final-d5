'''User accounts for all registered users in the application.'''


from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
#from ..models import User
from ..models import Post
from fastapi import Depends
from .user_entity import UserEntity
from .post_votes_entity import post_votes_table
#from ..services import UserPostService

__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class PostEntity(EntityBase):
    __tablename__ = 'posts'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable = False, default = '')
    content: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped[UserEntity] = relationship("UserEntity",back_populates='posts')
 
    votes: Mapped[list[UserEntity]] = relationship(secondary=post_votes_table)

    timestamp: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    @classmethod
    def from_model(cls, model: Post, user: UserEntity ) -> Self:
        #user_svc: UserPostService = Depends()
        return cls(
            id=model.id,
            title = model.title,
            content=model.content,
            user = user,
            votes= [],
            timestamp=model.timestamp,

            #user_svc.findUser(model.user)
            #[user_svc.findUser(vote) for vote in model.votes]
        )

    def to_model(self) -> Post:
        vote_num = [vote.to_model() for vote in self.votes]
        return Post(
            id=self.id,
            title = self.title,
            content=self.content,
            user=self.user.to_model(),
            votes=vote_num,
            timestamp=self.timestamp,
        )

    def update(self, model: Post) -> None:
        self.content = model.content


