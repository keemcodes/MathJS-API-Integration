import { useState, useEffect, useCallback } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Badge,
} from "react-bootstrap";

function App() {
  const time = 5;

  const generateQuestion = useCallback(() => {
    const firstNumber = Math.floor(Math.random() * 9) + 1;
    const secondNumber = Math.floor(Math.random() * 9) + 1;
    const randomOperation = Math.floor(Math.random() * 2) + 1;
    if (firstNumber >= secondNumber)
      return `${firstNumber} ${operations(randomOperation)} ${secondNumber}`;
    else return `${secondNumber} ${operations(randomOperation)} ${firstNumber}`;
  }, []);

  const [timeLeft, setTimeLeft] = useState(time);
  const [question, setQuestion] = useState(generateQuestion);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) {
      setQuestion(generateQuestion);
      setTimeLeft(time);
      setPoints((points) => points-1)
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, question, generateQuestion, points]);

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
  return (
    <Container className="center">
      <Row>
        <Col>
          <h2 className="text-center">
            <Badge bg="secondary">
              {timeLeft}
              {timeLeft != null ? " seconds remaining" : ""}
            </Badge>
          </h2>
          <Alert variant="primary text-center">
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
                <Form.Control size="lg" type="text" placeholder="Your answer" />
                <Form.Text className="text-muted">
                  Please input your answer above
                </Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeLeft(time);
                  setQuestion(generateQuestion)
                  setPoints(points => points+10)
                }}
              >
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
