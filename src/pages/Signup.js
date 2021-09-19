import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../store/auth";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const API_KEY = process.env.REACT_APP_AUTH_API_KEY;

const Signup = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
            displayName: name
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString());
      authCtx.setEmail(data.email);
      authCtx.setName(data.displayName);
      history.replace("/");
    } catch (e) {
      alert("Signup failed.");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-2">
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={nameChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={emailChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={passwordChangeHandler}
                required
              />
            </FormGroup>
            <Button className="mb-2" color="primary" size="lg">
              Create Account
            </Button>
            <div>
              <Link to="/login">Login with existing account</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
