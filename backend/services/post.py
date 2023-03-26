from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import User, Role, RoleDetails, Permission
from ..entities import RoleEntity, PermissionEntity, UserEntity
from .permission import PermissionService, UserPermissionError

class PostService:

    def __init__(self, session: Session = Depends(db_session), permission: PermissionService = Depends()):
        self._session = session
        self._permission = permission