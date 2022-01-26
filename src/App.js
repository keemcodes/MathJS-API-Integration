import React from 'react';
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
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [ls, setLs] = React.useState("realest");

  React.useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  React.useEffect(() => {
    // setLs("lol");
  }, [ls]);

  return (
    <Container className="center">
      <Row>
        <Col>
          <h2 className="text-center"><Badge bg="secondary">{timeLeft}{timeLeft != null ? ' seconds remaining' : ''}</Badge></h2>
          <Alert variant="primary text-center">
            <Alert.Heading>2 + 2</Alert.Heading>
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
              <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault()
                setTimeLeft(30)
              }}>
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
