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
        return user_svc.findUser(_subject)
    



    

