## Overview
The CSXL forum is a tool for students and faculty to share and promote resources about technology and computer science. Having this forum would faciliate increased communicatiion in what resources were helpful for a certain class, how a student could prepare for a class they are planning to take next semester, or just fuel general curiousity about topics in computer science and technology.

As of now, registered CSXL users are able to:
* Post resources and information to the forum
* View posts from other users
* Delete posts from forum (***Admin Users Only***)
* View only a given number of forums on a single page (through in-built pagination)

## Implementation notes
Description of database/entity-level representation of your feature.

One design choice that we thought of was to allow only admin users (Merritt Manager and Super User) to access a delete button  on the page where they can view every users' posts. We deliberately chose the delete button, because it allows admin users to remove posts that may be insensitive, inappropriate, or against XL community guidelines. 

Another design choice was implementing a paginator that allows users to view only five posts on a page at a time. Even though we could have allowed users to view more posts at time, we realized that limiting each page to five posts allowed users to browse the resources listed on the posts without feeling overwhelmed. The user would be able to navigate through the pages through a "next" and "previous" button at the bottom of the webpage; the further back they go in the posts and pages, the earlier the posts were made.

## Development Concerns

Clone the repository below, which contains the basic code to make and view a post, and features to modify and delete those posts.

### Getting Started

#### Clone the Repository
```
git clone https://github.com/comp423-23s/final-project-final-d5.git
```

### Important Backend Files:
* ***backend/api/post.py*** - contains all API routes for retrieving, deleting, and creating posts (documentation for each found in file)
* ***backend/services/post.py*** - contains all services called by API to mutate post database (creating post, deleting post, retrieving all posts)
*  ***backend/models/post.py*** - data model for posts
* ***backend/entities/post_entity.py*** - entity representation of Post in database

### Important Frontend Files:
* ***frontend/src/app/post.service.ts*** - contains functions that make API calls, allowing the frontend to access and mutate database
* ***frontend/src/app/viewforum*** - component for viewing posts 
* ***frontend/src/app/makeforum*** - component for creating a new forum post
* ***frontend/src/app/pagination*** - component for pagination

For starters, look through the files and trace through how a post is created and posted on the forum on both the frontend and backend. Most of the features implemented right now contain both parts. Understanding this process on both ends will give more clarity in how to implement improvements on the features, regardless of what side the changes end up.

The next step, accordingly, would be to figure out if your proposed feature change involves frontend, backend, or both. This will determine how responsibilities are split in your team, or if you are working solo, the tasks you will need to complete. Implementing a steady workflow requires choosing which tasks to prioritize and doing them on time: using the project board on GitHub is a good way of ensuring you are staying on track. 

As always, documentation on the code, code commits, and GitHub are excellent ways of tracking where you are on the implementation and what task to tackle next -- especially when it involves a lot of dynamic parts. 

## Future Work

In the future, we would like to implement more features for increased user convenience and accessibility. One feature would be to sort posts by categories: this would likely require posts to have keywords associated with them, and having a filter option to only show posts that contain those keywords. 

Another feature that we would like to create is allowing users to save and favorite posts. Similar to social media, this would allow them to see which posts were most helpful to them or which posts they want to save to read and use later. 

The last feature that we had in mind was creating upvotes for posts, which bump them to the top of the forum for other users to access more easily. Additionally, it would track when registered professors or teaching assistants endorsed a post to give more credibility to the usefulness of the resource. 
