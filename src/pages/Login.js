import { useState, useContext } from "react";
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

const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnPIfy83KDsLc_qK8WIEJwkDJbQplsOY0",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
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
      alert(e);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h1>Login</h1>
          <Form onSubmit={submitHandler}>
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
              Login
            </Button>
            <div>
              <Link to="/signup">Create new account</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
