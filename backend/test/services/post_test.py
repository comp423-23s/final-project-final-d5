import pytest

from sqlalchemy.orm import Session
from ...models import User, Post, Role
from ...entities import UserEntity, RoleEntity
from ...services import PostService, UserService
from sqlalchemy.exc import IntegrityError

# Mock Models
user = User(id=1, pid=111111111, onyen='onyen',first_name="first", last_name = "last",  email='user@unc.edu', pronouns="He/Him/His", permissions = [])

post_0 = Post(id = 1, content = "post", user = user, votes = [], timestamp = "date0")
post_1 = Post(id = 2, content = "content", user = user, votes = [], timestamp = "date1")

@pytest.fixture(autouse=True)
def setup_teardown(test_session: Session):
    # Bootstrap root User without any perms/roles
    user_entity = UserEntity.from_model(user)
    test_session.add(user_entity)

    test_session.commit()
    yield

@pytest.fixture()
def postservice(test_session: Session):
    return PostService(test_session)

@pytest.fixture()
def userservice(test_session: Session):
    return UserService(test_session)

def test_create_single_post_pass(postservice: PostService, userservice: UserService):
    user_entity: UserEntity = userservice.findUser(user)
    post_entity: Post = postservice.create(post_0, user_entity)
    assert post_entity == post_0

def test_create_two_posts_pass(postservice: PostService, userservice: UserService):
    user_entity: UserEntity = userservice.findUser(user)
    post_entity_0: Post = postservice.create(post_0, user_entity)
    post_entity_1: Post = postservice.create(post_1, user_entity)
    assert post_entity_0 == post_0
    assert post_entity_1 == post_1

def test_getall_posts_pass(postservice: PostService, userservice: UserService):
    user_entity: UserEntity = userservice.findUser(user)
    post_entity_0: Post = postservice.create(post_0, user_entity)
    post_entity_1: Post = postservice.create(post_1, user_entity)
    posts = postservice.getAll()
    assert posts[0] == post_0
    assert posts[1] == post_1