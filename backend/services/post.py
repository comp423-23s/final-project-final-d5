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
        post_entity = PostEntity.from_model(post,user)
        self._session.add(post_entity)
        self._session.commit()
        return post_entity.to_model()
    
    def getAll(self) -> list[Post]:
        query = select(PostEntity)
        entities = self._session.scalars(query).all()
        return [entity.to_model() for entity in entities]