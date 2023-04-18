from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import User, Role, RoleDetails, Permission, Post
from ..entities import RoleEntity, PermissionEntity, UserEntity
from ..entities.post_entity import PostEntity
from .permission import PermissionService, UserPermissionError


class PostService:

    def __init__(self, session: Session = Depends(db_session), permission: PermissionService = Depends()):
        self._session = session
        self._permission = permission

    def create(self, post: Post, user: UserEntity) -> Post:
        """Creates a new user.

        Args:
            post: The post to create.
            user: The user making the request.

        Returns:
            Post: The newly created post.
        """
        post_entity = PostEntity.from_model(post,user)
        self._session.add(post_entity)
        self._session.commit()
        return post_entity.to_model()
    
    def getAll(self) -> list[Post]:
        """Gets all posts.

        Args:
            None

        Returns:
            list[Post]: The list of posts.
        """
        query = select(PostEntity)
        entities = self._session.scalars(query).all()
        return [entity.to_model() for entity in entities]
    
    def delete(self, id: int) -> bool:
        """Deletes a post.

        Args:
            id: The id of the post to delete.

        Returns:
            bool: True if the post was deleted.

        Raises:
            Exception: If the post is not found.
        """
        query = select(PostEntity).filter_by(post_id=id)
        post = self._session.execute(query).scalar_one()
        if (post == None): 
            raise Exception("Post not found")
        self._session.delete(post)
        self._session.commit()
        return True