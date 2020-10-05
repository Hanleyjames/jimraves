# jimraves
This project is for a client who is looking to run their merch store and display artist under their brand.

## Roadmap
V1: Our MVP is a landing page with a semi-complete express js api
V2: Full landing page with complete express js api
V3: Redesign and implement the api in rust
# Running Dev
To run the expressjs api, navigate to the middleware folder and run "npm run dev".
# Building a ppe branch for deployment
From whatever branch you're looking to build, go to the root folder and use the command:
git subtree push --prefix middleware origin heroku-express-ppe
This will push any changes to this which will then be picked up by heroku's pipeline to build.
For the React project, go to the root folder and use the following command from the master branch: 
git subtree push --prefix frontend/raves-react origin test-react-pipeline
