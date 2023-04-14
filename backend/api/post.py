"""Post API

This API is used to create, retrieve, and delete posts for CSXL forum page"""

from fastapi import APIRouter, Depends, HTTPException
from ..services import PostService, UserService
from ..models import Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(post: Post, post_svc: PostService = Depends(), usr_svc: UserService = Depends()):
    """Create a new post     
    If post author is not registered in CSXL User database, throw 422 Error
    Verify author is registered by calling findUser method form UserService"""

    try:
        user_entity = usr_svc.findUser(post.user)
    except:
        raise HTTPException(status_code=422, detail=str("User Not Registered"))
    return post_svc.create(post,user_entity)

@api.get("", response_model=list[Post], tags=['Post'])
def getAll(post_svc: PostService = Depends()):
    """Retrieve all forum posts to be displayed in viewForum""" 
    return post_svc.getAll()

@api.delete("/{id}", tags=['Post'])
def delete(id: int, post_svc: PostService = Depends()) -> bool:
    """Delete a specific forum post from database by id
    If post with associated id does not exist, throw 422 error""" 
    try:
        return post_svc.delete(id=id)
    except:
        raise HTTPException(status_code=422, detail=str("Post not found"))
