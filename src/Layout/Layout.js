import Nav from "./Nav";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
