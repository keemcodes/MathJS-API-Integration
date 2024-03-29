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
  * The user will have 8 seconds to solve the question
  * If the user does not solve within 8 seconds, the user will be prompted a new question
  * User will receive +7 points if question is completed in first 4 seconds.
  * User will receive +5 points otherwise
  * User will lose -4 point for a wrong answer
  * No solution will result in -5 points

* Data storage
  * Data will be stored via sessionStorage JSON object

* Data Schema
  * points (int)
  * history (array of strings)

### High Level Code Implementation
* When user visits page a timer will begin
* A random question will be generated via a custom random function
  * Function will use math.random to generate two numbers and an operation
  * The generated problem will be stored to state and added to the user's sessionStorage object for historical tracking
* Once the user enters their answer and hit submit, the user's input will be sent to mathjs API via a post request.
* The results of the post request will be used to check if the user has the right answer
  * If the answer is correct, we will add points to the user's state and maybe sessionStorage for historical tracking
  * If the answer is incorrect, we will deduct points

### UI Implementation
* UI will be created using React Bootstrap for ease of implementation.
  * UI will consist of prompt alert box with a random math question
    * The box will appear gray by default when a question is prompted
    * If the answer is right the box will turn green
    * If the answer is wrong the box will turn red
  * Submit button


## Technology Used

Application Stack
* Javascript **(Frontend)**
* React JS **(Frontend)**
* [Math JS API](https://api.mathjs.org/) **(Backend)**
