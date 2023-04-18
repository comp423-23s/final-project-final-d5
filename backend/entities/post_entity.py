'''Entity for all Posts in application'''


from sqlalchemy import Integer, String, ForeignKey, Text
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

    post_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable = False, default = '')
    content: Mapped[str] = mapped_column(Text, nullable=False, default='')
    
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped[UserEntity] = relationship("UserEntity",back_populates='posts')
 
    votes: Mapped[list[UserEntity]] = relationship(secondary=post_votes_table)

    timestamp: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    @classmethod
    def from_model(cls, model: Post, user: UserEntity ) -> Self:
        #user_svc: UserPostService = Depends()
        """Create a PostEntity from a Post model.

        Args:
            model: The Post model.
            user: The UserEntity making the post.

        Returns:
            PostEntity (Self): The PostEntity object.
        """
        return cls(
            post_id=model.id,
            title = model.title,
            content=model.content,
            user = user,
            votes= [],
            timestamp=model.timestamp,

            #user_svc.findUser(model.user)
            #[user_svc.findUser(vote) for vote in model.votes]
        )

    def to_model(self) -> Post:
        """Create a Post from a PostEntity model.

        Args:
            None

        Returns:
            Post (Self): The Post object.
        """
        vote_num = [vote.to_model() for vote in self.votes]
        return Post(
            id=self.post_id,
            title = self.title,
            content=self.content,
            user=self.user.to_model(),
            votes=vote_num,
            timestamp=self.timestamp,
        )

    def update(self, model: Post) -> None:
        """Updates a PostEntity's content from a Post model's content.

        Args:
            model: The Post model.

        Returns:
            None
        """
        self.content = model.content


