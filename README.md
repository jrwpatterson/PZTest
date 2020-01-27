### Patient Zero Test

## Starting and running

go to the PZTest/PZTest folder
run `docker build -t pztest .`
then `docker run -it -p 5001:80 pztest`

to test the swagger please go to http://localhost:5001/swagger

go to the PZTest/PZTest.client
run `docker build -t pztest.client .`
then `docker run -it -p 5000:5000 pztest.client`

## Things to test

Go to http://localhost:5000

- home screen has all the cheeses
- home screen icon has the colour of the cheese
- click through to details
- details has calculator
- details has add to basket
- admin has full crud allowing admin (security not setup) to cheeses

## To test

- testing has not been wired up to a docker filed yet
- testing the client side - go to PZTest/PZTest.client and run `yarn test`
- testing the server side - go to PZTest/PZTest.tests and run `dotnet test`

## Limitations

- due to family reasons I could only work on this for two days so I cut back on the styling. It should be functional but just basic UX
- I did not add any persistance
- There are areas with lighter than I would like testing due to limitations (Mostly material-ui/core is not very testable in the way it has been written in the new behavior paradyme of testing)
- I did not wire up the assets I'm using the string to Cheese.com for the images
- I did not add the mechanicals that I normally like due to time considerations
- Time - I had to set up a new dotnet enviroment
