from fastapi import APIRouter, Depends, HTTPException
from ..services import PostService, UserService
from ..models import Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(post: Post, post_svc: PostService = Depends(), usr_svc: UserService = Depends()):
    try:
        user_entity = usr_svc.findUser(post.user)
    except:
        raise HTTPException(status_code=422, detail=str("User Not Registered"))
    return post_svc.create(post,user_entity)

@api.get("", response_model=list[Post], tags=['Post'])
def getAll(post_svc: PostService = Depends()):
    return post_svc.getAll()

@api.delete("", tags=['Post'])
def delete(id: int, post_svc: PostService = Depends()):
    try:
        post_svc.delete(id)
    except:
        raise HTTPException(status_code=422, detail=str("Post not found"))
