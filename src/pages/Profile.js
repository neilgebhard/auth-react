import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth";
import { Container, Row, Col } from "reactstrap";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h1>Profile</h1>
          <div>
            <strong>Name</strong>
          </div>
          <p>{authCtx.name}</p>
          <div>
            <strong>Email</strong>
          </div>
          <p>{authCtx.email}</p>
          <Link to="/change-password">Change Password</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
