from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import User, Role, RoleDetails, Permission, Post
from ..entities import RoleEntity, PermissionEntity, UserEntity, PostEntity
from .permission import PermissionService, UserPermissionError

class PostService:

    def __init__(self, session: Session = Depends(db_session), permission: PermissionService = Depends()):
        self._session = session
        self._permission = permission

    def create(self, subject: User, post: Post) -> User:
    
        # if subject != user:
        #     self._permission.enforce(subject, 'user.create', 'user/')
        entity = PostEntity.from_model(post)
        self._session.add(entity)
        self._session.commit()
        return entity.to_model()