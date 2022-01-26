import { useState, useEffect, useCallback } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Card,
  Alert,
  Badge,
  Accordion,
  ListGroup,
} from "react-bootstrap";

function App() {
  const url = "https://api.mathjs.org/v4/";
  const time = 8;
  let correctAnswer;
  const [history, setHistory] = useState([]);
  let correctSound = new Audio("correct.mp3");
  let incorrectSound = new Audio("incorrect.mp3");
  correctSound.volume = 0.15;
  incorrectSound.volume = 0.15;

  const generateQuestion = useCallback(() => {
    const firstNumber = Math.floor(Math.random() * 9) + 1;
    const secondNumber = Math.floor(Math.random() * 9) + 1;
    const randomOperation = Math.floor(Math.random() * 2) + 1;
    let generatedQuestion;
    if (firstNumber >= secondNumber)
      generatedQuestion = `${firstNumber} ${operations(
        randomOperation
      )} ${secondNumber}`;
    else
      generatedQuestion = `${secondNumber} ${operations(
        randomOperation
      )} ${firstNumber}`;
    setHistory([...history, generatedQuestion]);
    return generatedQuestion;
  }, [history]);

  const [timeLeft, setTimeLeft] = useState(time);
  const [question, setQuestion] = useState(generateQuestion);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState();
  const [numpadToggle, setNumpadToggle] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      let negativeFeedbackSound = new Audio("incorrect.mp3");
      negativeFeedbackSound.volume = 0.15;
      negativeFeedbackSound.play();
      setQuestion(generateQuestion);
      setTimeLeft(time);
      setPoints((points) => points - 5);
      setCorrect(false);
      setAnswer("");
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, question, generateQuestion, points, history]);

  function operations(operation) {
    switch (operation) {
      default:
        return "+";
      case 0:
        return "+";
      case 1:
        return "-";
      case 2:
        return "*";
    }
  }

  async function getAnswer() {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expr: [question] }),
    })
      .then((res) => res.json())
      .then((res) => (correctAnswer = res.result[0]));
  }

  function handleAnswerChange(e) {
    setAnswer(e.target.value);
  }
  function handleNumpadToggle(e) {
    e.preventDefault();
    setNumpadToggle((prev) => !prev);
  }

  function addDigit(digit) {
    setAnswer((prev) => prev + `${digit}`);
  }

  async function handleAnswerSubmit(e) {
    e.preventDefault();
    await getAnswer();
    console.log(answer, correctAnswer);
    if (answer === correctAnswer) {
      setCorrect(true);
      correctSound.play();
      timeLeft >= 4
        ? setPoints((points) => points + 7)
        : setPoints((points) => points + 5);
      console.log("yes");
    } else {
      setCorrect(false);
      incorrectSound.play();
      setPoints((points) => points - 4);
      console.log("no");
    }
    setAnswer("");
    setQuestion(generateQuestion);
    setTimeLeft(time);
  }
  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <h2 className="text-center">
            <Badge bg="secondary">
              {timeLeft}
              {timeLeft != null ? " seconds remaining" : ""}
            </Badge>
          </h2>
          <Alert
            variant={
              correct === true
                ? "primary text-center"
                : `${correct != null ? "danger" : "primary"} text-center`
            }
          >
            {correct != null ? (
              <Alert.Heading>
                {correct === true ? "Correct!" : "Incorrect"}
              </Alert.Heading>
            ) : (
              ""
            )}
            <Alert.Heading>{question}</Alert.Heading>
            <p>You currently have {points} points!</p>
          </Alert>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col>
          <Card>
            <Form className="p-3">
              <Form.Group className="mb-3" controlId="answer">
                <Form.Control
                  size="lg"
                  type="number"
                  placeholder="Your answer"
                  value={answer}
                  onChange={handleAnswerChange}
                />
                <Form.Text className="text-muted">
                  Please input your answer above
                </Form.Text>
              </Form.Group>
              <Row>
                {numpadToggle === true ? (
                  <ButtonGroup
                    vertical
                    className="btn-group-vertical ml-4 mt-4"
                    role="group"
                    aria-label="Basic example"
                  >
                    <div>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(1)}
                      >
                        1
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(2)}
                      >
                        2
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(3)}
                      >
                        3
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="m-1 py-3 "
                        onClick={() => addDigit(4)}
                      >
                        4
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(5)}
                      >
                        5
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(6)}
                      >
                        6
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(7)}
                      >
                        7
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(8)}
                      >
                        8
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(9)}
                      >
                        9
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => {
                          setAnswer((prev) => prev.slice(0, -1));
                        }}
                      >
                        &lt;
                      </Button>
                      <Button
                        type="button"
                        className="m-1 py-3"
                        onClick={() => addDigit(0)}
                      >
                        0
                      </Button>
                    </div>
                  </ButtonGroup>
                ) : (
                  ""
                )}
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleAnswerSubmit}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="ml-1"
                    variant="primary"
                    type="submit"
                    onClick={handleNumpadToggle}
                  >
                    Numpad
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How to play</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>You have 8 seconds per question</ListGroup.Item>
                <ListGroup.Item>
                  Answering within 4 seconds will grant you 7 points.
                </ListGroup.Item>
                <ListGroup.Item>
                  Anything after the first 4 seonds will grant you 5 points.
                </ListGroup.Item>
                <ListGroup.Item>
                  If you don't answer within the time limit you will lose 5
                  points.
                </ListGroup.Item>
                <ListGroup.Item>
                  If your answer is wrong, you will lose 4 points.
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Question History</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {history.map((item, index) => (
                  <ListGroup.Item key={index}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Buttons</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
}

export default App;
