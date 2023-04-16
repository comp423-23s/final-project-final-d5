## Overview
The CSXL forum is a tool for students and faculty to share helpful information and resources.

As of now, Registered CSXL users are able to:
* Post resources and information to the forum
* View posts from other users
* Delete posts from forum (***Admin Users Only***)
* View only a given number of forums on a single page (through in-built pagination)

## Implementation notes
Description of database/entity-level representation of your feature (warren/angelina can you do this)

One design choice that we thought of was to allow only admin users to find a delete button on the page where
they can view every users' posts. Even though we could have given the admin users any other admin-only feature, we thought 
that the delete button was the best option because it allows admin users to remove posts that may be insensitive, inappropriate or 
against the community guidelines of the XL. Another design choice that we chose to made was a paginator that allows users to
view only five posts on a page at a time. Even though we could have allowed users to view more posts at time, we realized that
only allowing five posts on a page at a time (with each page having a next and previous button), allows users to view a 
substantial amount of information without feeling overwhelmed


## Development Concerns

### Getting Started

#### Clone the Repository
```
git clone https://github.com/comp423-23s/final-project-final-d5.git
```

### Important Backend Files:
* ***backend/api/post.py*** - contains all api routes for retrieving, deleting, and creating posts (documentation for each found in file)
* ***backend/services/post.py*** - contains all services called by api to mutate post database (creating post, deleting post, retrieving all posts)
*  ***backend/models/post.py*** - Data model for posts
* ***backend/entities/post_entity.py*** - entity representation of Post in database

### Important Frontend Files:
* ***fontend/src/app/post.service.ts***




## Future Work

In the future, we would like to implement sorting posts by categories (this would likely require posts to have tags/categories associated with them).
Another feature that we would have liked to include would be the enablement of allowing users to save and star specific posts. With more time, we would
have also enabled upvoting and liking posts.



