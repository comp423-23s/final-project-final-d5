import pytest

from sqlalchemy.orm import Session
from ...models import User, Post
from ...entities import UserEntity
from ...services import PostService, UserService

user = User(id=3, pid=111111111,onyen='user',first_name="user",
    last_name = "guy",  email='user@unc.edu', pronouns="He/Him/His")

def single_post_test(service: PostService, test_session: Session):
    post = Post(id = 5, content = "post", user = user, votes = [], timestamp = "date")
    root_user_entity = UserEntity.from_model(user)
    test_session.add(root_user_entity)
    service.create(post,root_user_entity)
