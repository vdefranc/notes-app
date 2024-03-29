## takehome solution

Hello! thanks for taking the time to review my notes app. I'd like to share a few things. First, here's how to run
the app locally:

## running the project
### recommended
If you have docker installed, it will be very simple to run the application.
Simply run `docker-compose up`. This will start a development server on http://localhost:3000 
that has hot reload enabled.

### another option
If you want to run the application outside a docker container:

1. Ensure you have a local instance of postgres running. If you're on OSX, the best way to do that is [to use homebrew](https://wiki.postgresql.org/wiki/Homebrew)
1. You'll also need to edit `PGHOST` in`.env.local` to point to `localhost`.
1. Run `nvm install 20.5.0 && nvm use 20.5.0` to switch to the node version I used to develop the app. 
1. Run `npm i` to install dependencies.
1. Run `npm run dev` to start the dev server.

## project approach
I decided to build the app using Next.js. I did that for a couple of reasons. First, I know that it's a part of your
tech stack. Also, I've never built anything with React Server Components, so I thought I'd give that a
try in combination with Next!

The app itself is, obviously, a pretty straightforward CRUD application. I aimed to meet the requirements
while also adding some behaviors that are similar to those of the Apple Notes OSX app. Specifically,
the most-recently updated note will appear at the top of the list of notes. And there's sort of a similar layout and feel.

It's deployed on Vercel, and it uses a postgres data store. I felt uncomfortable deploying the app publicly
on the internet without user authentication set up, but ultimately I felt that building auth was out
of scope here. This means that all users will be able to view and edit all notes.

One more note is that I chose to use the [Mantine](https://mantine.dev/) UI library. It definitely saved me a lot of 
time. Being a UI component framework, it's fairly complex by necessity. But I found it intuitive to use, especially 
when compared to my experiences with other libraries over the past few years. It also looks pretty nice!

## thoughts on Next.js with RSC
This was my first foray into building something with both Next and RSC. I have thoughts!

Next has powerful features, but those features come with an increase in complexity. I felt this tradeoff even
more when using RSC as well. The paradigm is novel. And a huge amount of critical functionality in 
this notes app is obfuscated behind an opinionated framework. 

Server actions have further blurred boundary between client and server. They make it harder to understand and
debug network requests that your application is making. It feels to me that the concept of interleaving 
client and server components invites misunderstanding.  

I'd be hesitant to recommend this technology when working with a team or group of teams with a lot of more-junior 
engineers because I think they might have a tough time understanding the contexts in which their various bits of 
code are executing.

I enjoyed building this app, and I'd definitely be willing to use the technologies again. But they would have to offer
significant use-case advantages for me to pick them over simpler, more mature alternatives.

