# Task Manager

## Purpose
This is my attempt to demonstrate to Voice Foundary that they should hire me for their Node.js 
developer position.  The project accurately depicts my skill set.  I hope that the skills on display show an aptitude for the skills needed in the role.

## The Problem
I was given a great deal of latitude, with hints - but limited specific direction.

The stated task is:

_Using NodeJS and other supporting tools, write a command line app or web API to manage tasks. 
Specifically, focus on task recurrence; the other features can be VERY minimalist 
(or even missing!!). The goal is to show how you would design something that can be very complex. 
We want to see creativity, use of tools such as Typescript and unit-testing frameworks, 
well-structured code, and attention to maintainability. This is your chance to show-off._

My summation of this is "A node.js based task management system that demonstrates the ability
to design and code complex systems."

I choose the web API approach because that is what I am most confident in.

## The Tools
The tool set that I have chosen is:
* Node.js
* Express
* MongoDB
* Mongoose
* Mocha
* Chai

## The Design
There are hundreds of examples of tutorials on-line for making a ToDo list.  They aren't particularly
complex, nor are they interesting.  The API portion of these examples are very simplistic.

So instead I decided to play with what an enterprise level task management system might look like.

A robust task management application will broadly have 2 systems.  The **User** system and the **Project** system.

### The User System
The user system needs an application admin component and a client componenet.
Further the client component can be broken into:
* Organizations - assuming various departments will have their own projects not 
visible to other departments.
* Organization Admins
* Oganization Super Users
* Organization Users

This will require a roll based permission system.  For example, organization a's 
projects and users shouldn't be visible to other organizations.  Projects should
only be visible to those in the organization who can create projects and those users who are
assigned to the project.  Various aspects of the users and the projects can only be edited
by specific types of users, etc.

In my opinion this is the most complex aspect of a task management system.  This 
roll based permission system is essential for protecting the API routes and verbs on those
on those routes.

### The Project System
There are 4 components to the project system.
* Projects
* Teams - _although this is starting to feel like a prehensile tail_
* Tasks
* Attachments - _documents attached to tasks and projects_

All tasks belong to a project.  All projects have teams.  All attachments belong to 
a task or a project.

The permission system described above controls who can access, create, edit and delete
the project components.

## How far did I get?

**Data Models -** I created data models for Users, Organizations, Projects, Teams, Tasks 
and Attachments.

**Authentication System -** I created and implemented a user authentication system
that relies on the users in the database and passes security tokens back and forth.

**User Registration -** I created a user registration system that allows for 3 seperate 
conditions:
* Starting the app for the first time and creating the initial admin user.
* Creating a new organization and organization admin user.
* The typical signup procedure for everyone else.

**Routes -** I have laid out all of the routes and their permission systems. I have
implemented a CORs system on all routes.  I have finalized routes for: 
* indexRouter
* organizationsRouter 
* usersRouter.  

Completed endpoints are:
* `/`
* `/first-admin`
* `/signup`
* `/login`
* `/logout` - is only useful to the front end
* `/checkJWTToken` - for testing
* `/duplicate-check?query` - for front end testing
* `/v1/organization/`
* `/v1/organization/new`
* `/v1/organization/new/initialize`
* `/v1/organization/:organizationId`
* `/v1/user/`
* `/v1/user/new`
* `/v1/user/:userId`

**Authorization -** I have created much of the roll base authorization system. This includes all authorization for the routes that are completed.

## Did I hit the target?
I think I mostly hit it.

* **The goal is to show how you would design something that can be very complex -**
 I think I nailed this one.  The system I imagined, the structure of the project and the
 code that I wrote all reflect a complex design.
* **We want to see creativity, use of tools such as Typescript and unit-testing frameworks -** 
 I feel good about the creativity part but I've never used Typescript with Node, only with
 Angular. So I chose to show you what I really can do, rather than something I would
 have to learn real quick.  I used Mocha and Chai for unit testing. I wrote 18 unit tests
  for the authorization rules.  
 * **well-structured code, and attention to maintainability -**  I think I did fine on this.
 This seems to be a typical arrangement for a Node based web API.  Nothing fancy or creative here.
 
 # Setting it up
 1. Clone the repository
 2. Install package.json
 3. Create a database and a user with full priveleges
 4. Change the config.js to reflect that database connection string
 5. Start the app - `set DEBUG=app:* & npm start`
 6. In Postman create your initial app admin user at `/first-admin`.  I suggest importing
 the Task Manager.postman_collection.json file into Postman.  It has all of the formats for 
 creating users and projects.
 7. In Postman create your first client organization and org-admin user.  Do that
 at `/v1/organization/new/initialize`.
 

