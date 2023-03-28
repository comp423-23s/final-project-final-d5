from fastapi import APIRouter, Depends
from ..services import PostService
from ..models import User, Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(post: Post, post_svc: PostService = Depends()):
    return post_svc.create(post)

@api.get("", response_model=list[Post], tags=['Post'])
def getAll(post_svc: PostService = Depends()):
    return post_svc.getAll()
