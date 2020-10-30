# http://www.raves.party
This project is for a client who is looking to run their merch store and display artist under their co-op.

## Roadmap
V1: Our MVP is a landing page with a semi-complete express js api
* This will be a basic MERN stack app which will allow us time to develop the data structure while providing basic needs for the client.
V2: Finished site with complete express js api
## Prereqs
Install the PPE SQL dump on the target server. Make sure you have node js installed and run node start dev for both the react/ravesreact and nodeapi folder. You will have to provide .env key pair values required to connect to mysql. The documentation for this will be updated in the readme later.
## Building a ppe branch for deployment
From whatever branch you're looking to build, go to the root folder and use the command:
git subtree push --prefix nodeapi origin heroku-express-ppe
This will push any changes to this which will then be picked up by heroku's pipeline to build.
For the React project, go to the root folder and use the following command from the master branch:
git subtree push --prefix frontend/raves-react origin test-react-pipeline

