import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { useState } from "react";
function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    // viết hàm close tránh bị loop vô hạn
  };
  return (
    <div className="app-container">
      {/* <Container> */}
      <Header />
      <Container>
        <div className="my-2 addnew">
          <h4>List User</h4>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            {" "}
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      {/* truyền trực tiếp hàm setShow thì bị loop vô hạn */}
      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
      {/* </Container> */}
    </div>
  );
}

export default App;
