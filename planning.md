<div align="center">
  <img alt="Logo" src="logo.svg" width="100" />
</div>
<h1 align="center">
  Math JS API Integration
</h1>

<!-- ![Screenshot](application.png) -->

### What is this?
A React JS Application that ingests data from the [Math JS API](https://api.mathjs.org/) to provide users with practice math problems! 

Implementation details and application functionality is described in more detail in my [planning.md](planning.md)

### Planning 
* Single question will be prompted to the user
  * The user will have 30 seconds to solve the question
  * User will be given 3 attempts at answering the question
  * If the user does not solve within 30 seconds, the user will be prompted a new question
  * User will receive +7 points if question is completed in first 10 seconds.
  * User will receive +5 points otherwise
  * User will lost a point for each failed attempt
  * No solution will result in +0 points


## Technology Used

Application Stack
* Javascript **(Frontend)**
* React JS **(Frontend)**
* [Math JS API](https://api.mathjs.org/) **(Backend)**
