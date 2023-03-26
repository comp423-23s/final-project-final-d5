from fastapi import APIRouter, Depends
from ..services import PostService
from ..models import User, Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(id: int, user: User, content: str, timestamp: str, post_svc: PostService = Depends()):
    post = Post(
        id = id,
        user = user,
        content = content, 
        votes = [],
        timestamp = timestamp
    )
    return post_svc.create(user, post)
