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
      <Row>
        <Col>
          <Alert variant="primary">2 + 2</Alert>
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
            <Button variant="primary" type="submit">
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
