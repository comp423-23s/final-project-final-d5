## Overview
The CSXL forum is a tool for students and faculty to share and promote resources about technology and computer science. Having this forum would faciliate increased communication in what resources were helpful for a certain class, how a student could prepare for a class they are planning to take next semester, or just in general curiousity about topics in computer science and technology.

## Features available for Registered Users:
* Post resources and information to the forum
* View posts from other users
* Delete posts from forum (***Admin Users Only***)
* View only a given number of forums on a single page (through in-built pagination)

## Implementation notes

### Database Representation:
Post objects in our database contain the following fields:
* id - integer
* title - string
* content - string
* user - User Object
* votes - array of user objects
* timestamp - string

We represent all of these fields as mapped columns within the PostEntity. However, two columns represent special cases:
* The user column of PostEntity back populates the user field of the UserEntity table, allowing for users to access all of the posts that they have created
  * The goal of this implementation is to establish a one-to-many relationship between a post and a user
* The votes column of PostEntity populates a secondary table to establish a bi-directional relationship between users and posts



### Design Choices: 

One design choice that we thought of was to allow only admin users (Merritt Manager and Super User) to access a delete button  on the page where they can view every users' posts. We deliberately chose the delete button, because it allows admin users to remove posts that may be insensitive, inappropriate, or against XL community guidelines. 

Another design choice was implementing a paginator that allows users to view only five posts on a page at a time. Even though we could have allowed users to view more posts at time, we realized that limiting each page to five posts allowed users to browse the resources listed on the posts without feeling overwhelmed. The user would be able to navigate through the pages through a "next" and "previous" button at the bottom of the webpage; the further back they go in the posts and pages, the earlier the posts were made.

## Development Concerns

Clone the repository below, which contains the basic code to make and view a post, and features to modify and delete those posts.

### Getting Started

#### Clone the Repository
```
git clone https://github.com/comp423-23s/final-project-final-d5.git

```
Open your project locally, without opening it in a Dev Container at first, and follow the instructions to get started found in the project’s docs directory: docs/get_started.md

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


### Tips for adding a new feature: 
1) Look through the files and trace through how a post is created and posted on the forum on both the frontend and backend. 
  * Most of the current features contain frontend and backend concerns. 
  * Understanding this process on both ends will give more clarity in how to implement new features/improve existing features, regardless of if your proposed changes effect the frontend or backend.

2) Determine how responsibilities are split in your team, or if you are working solo, the tasks you will need to complete. 
  * Implementing a steady workflow requires choosing which tasks to prioritize and doing them on time: using the project board on GitHub is a good way of ensuring you are staying on track. 

3) Documentation on the code, code commits, and GitHub are excellent ways of tracking where you are on the implementation and what task to tackle next -- especially when it involves a lot of dynamic parts. 
  * Good documentation allows for future devs to understand what changes you made / how they might be able to improve upon said changes 

## Future Work

### New Feature Ideas:
* Post Sorting:
  * Add categories or tags to post entities, allowing users to sort posts by topic

* Post Saving:
  * Allow users to save posts that interest them to view later

* Post Voting:
  * Enable users to vote for posts that they found particularly helpful
  * Users can see # of votes each post has
  * Posts with many votes appear higher in search results
  * Indicate if a post has been votes for by an instructor/admin  
  * Entity/database representation for votes is already implemented, just need ot create api route, service, and integrate with frontend


