"""User API

This API is used to create, retrieve, and delete posts for CSXL forum page"""

from fastapi import APIRouter, Depends
from ..services import UserService
from ..models import User
from .authentication import registered_user

api = APIRouter(prefix="/api/user")


@api.get("", response_model=list[User], tags=['User'])
def search(q: str, subject: User = Depends(registered_user), user_svc: UserService = Depends()):
    """Search for users by their name, onyen, email.

        Args:
            q: The search query.
            subject: The user performing the action.
            user_svc: The UserService object.

        Returns:
            list[User]: The list of users matching the query.
    """
    return user_svc.search(subject, q)
