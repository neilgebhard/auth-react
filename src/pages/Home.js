import { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import AuthContext from "../store/auth";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          {!isLoggedIn && <h3>Try signing up or logging in</h3>}
          {isLoggedIn && <h3>You're logged in!</h3>}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
