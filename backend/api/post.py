from fastapi import APIRouter, Depends
from ..services import PostService, UserService
from ..models import Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(post: Post, post_svc: PostService = Depends(), usr_svc: UserService = Depends()):
    user_entity = usr_svc.findUser(post.user)
    return post_svc.create(post,user_entity)

@api.get("", response_model=list[Post], tags=['Post'])
def getAll(post_svc: PostService = Depends()):
    return post_svc.getAll()
