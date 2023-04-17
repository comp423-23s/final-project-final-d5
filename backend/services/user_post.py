from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import User, Paginated, PaginationParams
from ..entities import UserEntity
from .permission import PermissionService
from . import *

class UserPostService:

    _session: Session
    _permission: PermissionService

    def findUser(self, _subject: User, user_svc: 'UserService' = Depends()) -> UserEntity:
        """Locates a specific UserEntity.

        Args:
            _subject: User object of the user making the request.
            user_svc: UserService object for dependency injection.

        Returns:
            UserEntity object of the user being requested.
        """
        return user_svc.findUser(_subject)
    



    

