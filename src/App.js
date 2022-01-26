import { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [question, setQuestion] = useState(generateQuestion);
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  // function getSolution() {
  //   fetch()
  // }
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
      // case 3: return '/'
    }
  }
  function generateQuestion() {
    const firstNumber = Math.floor(Math.random() * 9) + 1;
    const secondNumber = Math.floor(Math.random() * 9) + 1;
    const randomOperation = Math.floor(Math.random() * 2) + 1;
    if (firstNumber >= secondNumber)
      return(`${firstNumber} ${operations(randomOperation)} ${secondNumber}`);
    else return(`${secondNumber} ${operations(randomOperation)} ${firstNumber}`);
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
            <p>You currently have 34 points!</p>
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
                  setTimeLeft(30)
                  // setQuestion(generateQuestion)
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
