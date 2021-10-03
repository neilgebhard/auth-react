import { Container } from "reactstrap";

const Footer = () => {
  return (
    <Container className="position-absolute bottom-0 end-0">
      <footer>
        <p className="text-center text-muted">
          Made with ❤️ by Neil Gebhard. The code is on{" "}
          <a href="https://github.com/neilgebhard/auth-react">Github</a>.
        </p>
      </footer>
    </Container>
  );
};
export default Footer;
