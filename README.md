# Sprint Challenge: Express and Node.js - Projects & Actions

## Description

In this challenge, you design and create a web API to manage the following resources: `Projects` and `Actions`.

## Instructions

**Read these instructions carefully**. Understand exactly what is expected **_before_** starting to code.

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency of the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

-   [ ] Create a forked copy of this project.
-   [ ] Add your _Team Lead_ as collaborator on Github.
-   [ ] Clone your forked version of the Repository.
-   [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
-   [ ] Implement the project on this Branch, committing changes regularly.
-   [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

-   [ ] Submit a Pull-Request to merge `firstName-lastName` Branch into `main` on **your fork, don't make Pull Requests against Lambda's repository**.
-   [ ] Please don't merge your own pull request.
-   [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
-   [ ] Your _Team Lead_ will count the challenge as done by merging the branch into `main`.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

-   [ ] Mention two parts of Express that you learned about this week.
        Express makes it so you can work with routs so you can break to project up into
        folders.
        Express makes use of Middleware easily as it is built into the framework

-   [ ] Describe Middleware?
        Middleware are functions that get executed in the order that they come up in the server code. You may want to write up a middleware function to keep your code "dry"
-   [ ] Describe a Resource?

-   [ ] What can the API return to help clients know if a request was successful?

-   [ ] How can we partition our application into sub-applications?

1. The core features of Node.js and Express and why they are useful.
    In Express it is useful to use routes because it will break up your project folders so you will not have a massive server.js file.

    The use of Middleware that is built into Express is amazing. I learned about the middleware Helmet, this is nice because it adds a lair of security on your server.

2. Understand and explain the use of Middleware.
    Middleware are functions that get executed in the order that they come up in the server code. You may want to write up a middleware function to keep your code "dry"

3. The basic principles of the REST architectural style.
    Everything is a resource
    each resource is accessible via a unique URL
    resources can have multiple representations
    communication happens over a stateless protocol
    resource management happens via HTTP methods

4. Understand and explain the use of Express Routers.
    The Express Routes clean up your code. In a normal node app all the code pretty much stays in the server js file. With the use of Express you can clean up your code and move each start of an end point (ie /users, /projects) to its own folder and file. You can even do this with middleware and call it from a different folder.

5. Describe tooling used to manually test the correctness of an API.
    I use insomnia this tool is pretty nice you can set up multiple enviroments for different projects. You just need to create the end point to get the data. Then it will ask for the url and you just have to paste it in. If the end point works you can hit send and see the data on the right hand side.

## Minimum Viable Product

-   [x] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
-   [x] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

-   [x] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
-   [x] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

-   `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
-   `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
-   `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
-   `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Please ignore any terminal warnings about returning() not supported by SQLite.**

## Stretch Goal

-   Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
-   From the React application show a list of all _projects_ using the API you built.
-   Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
-   Add styling!
