from sqlalchemy import Table, Column, ForeignKey
from .entity_base import EntityBase

post_votes_table = Table(
    "post_votes",
    EntityBase.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('post_id', ForeignKey('posts.post_id'), primary_key=True)
)