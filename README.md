# Sprint 5 Quality Pepe

### SetUp
First you must in the front end in the route  
`/MtdrSpring/backend/src/main/frontend`

Then you must add the .env with the following token  
`REACT_APP_CLERK_PUBLISHABLE_KEY=<YourClerkToken>`


### Build and Run
**Start the backend**

Go to the following path  
`/MtdrSpring/backend`

Run the following command  
`mvn clean install spring-boot:run`


**Start the frontend**

Go to the following path  
`/MtdrSpring/backend/src/main/frontend`

Run the following command  
`npm run start`


**Initilize playwright**

Go to the following path  
`/end-to-end`

Run the following command  
`npm i`

Now run the following command to run the test ui  
`npx playwright test --ui`