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
} from "react-bootstrap";

function App() {
  return (
    <Container className="center">
      <Row className="pt-5">
        <Col>
          <Alert variant="primary">2 + 2</Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control size="lg" type="text" placeholder="Your answer" />
              <Form.Text className="text-muted">
                Please input your answer above
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
