import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./TableUsers";
import Container from "react-bootstrap/Container";
function App() {
  return (
    <div className="app-container">
      {/* <Container> */}
      <Header />
      <TableUsers />
      {/* </Container> */}
    </div>
  );
}

export default App;
