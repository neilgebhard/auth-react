import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "..//store/auth";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const ChangePassword = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const newPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const res = fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDnPIfy83KDsLc_qK8WIEJwkDJbQplsOY0",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      history.replace("/");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h1>Change Password</h1>
          <Form onSubmit={submitHandler}>
            <FormGroup className="mb-2">
              <Label for="new-password">New Password</Label>
              <Input
                type="password"
                id="new-password"
                minLength="7"
                value={newPassword}
                onChange={newPasswordChangeHandler}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                minLength="7"
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
                required
              />
              {!passwordsMatch && (
                <FormText color="danger">Passwords don't match.</FormText>
              )}
            </FormGroup>
            <Button className="mb-2" color="primary" size="lg">
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
