## takehome solution

Hello! Thank you for taking the time to review my notes app. I'd like to share a few things.

## project approach
I decided to build the app using Next.js. I did that for a couple of reasons. First, I know that it's a part of your tech 
stack. Also, I've never built anything with React Server Components, so I thought I'd give that a try in combination 
with Next! I'll share some my thoughts on the tech stack later on in the README.

The app itself is, obviously, a pretty straightforward CRUD application. I aimed to satisfy the requirements while also 
adding some behaviors that are similar to those of the Apple Notes OSX app. Specifically, the most-recently updated
note will appear at the top of the list of notes. And there's sort of a similar layout and feel.

It's deployed on Vercel, and it uses a postgres data store. I felt weird about deploying the app publicly on the 
internet without user authentication set up, but ultimately I felt that building auth was out of scope here. 
This means that all users will be able to view and edit all notes.

## running the project

### recommended
If you have docker installed, it will be very simple to run the application. 
Simply run `docker-compose up`. This will start a development server that has hot reload enabled.
It will also start an accompanying postgres container that contains a `notes` table with one row.

### an alternate approach
If you want to run the application outside a docker container,
you'll need to have a local instance of postgres running. You'll also need to edit `PGHOST` in
`.env.local` to point to `localhost`. After that:

1. `npm i` to install dependencies.
2. `npm run dev` to run the application.

## Thoughts on Next.js with RSC