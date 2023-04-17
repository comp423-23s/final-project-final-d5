"""Post API

This API is used to create, retrieve, and delete posts for CSXL forum page"""

from fastapi import APIRouter, Depends, HTTPException
from ..services import PostService, UserService
from ..models import Post
from .authentication import registered_user

api = APIRouter(prefix="/api/post")


@api.post("", response_model=Post, tags=['Post'])
def create(post: Post, post_svc: PostService = Depends(), usr_svc: UserService = Depends()):
    """Create a new post in the database

        Args:
            post: The post to create.
            post_svc: The PostService object.
            usr_svc: The UserService object.

        Returns:
            Post: The newly created post.

        Raises:
            HTTPException: 422, If the user is not registered.
    """
    try:
        user_entity = usr_svc.findUser(post.user)
    except:
        raise HTTPException(status_code=422, detail=str("User Not Registered"))
    return post_svc.create(post,user_entity)

@api.get("", response_model=list[Post], tags=['Post'])
def getAll(post_svc: PostService = Depends()):
    """Retrieve all forum posts to be displayed in viewForum

        Args:
            post_svc: The PostService object.

        Returns:
            list[Post]: The created posts.
    """
    return post_svc.getAll()

@api.delete("/{id}", tags=['Post'])
def delete(id: int, post_svc: PostService = Depends()) -> bool:
    """Delete a specific forum post from database by id

        Args:
            id: The id of the post to delete.
            post_svc: The PostService object.

        Returns:
            bool: If the post has been deleted.

        Raises:
            HTTPException: 422, If the post is not found.
    """
    try:
        return post_svc.delete(id=id)
    except:
        raise HTTPException(status_code=422, detail=str("Post not found"))
