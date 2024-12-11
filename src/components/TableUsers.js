import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetAllUser } from "../services/UserService";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    // call api
    getUsers();
  }, []);
  const getUsers = async () => {
    let res = await fetAllUser();
    if (res && res.data) {
      setListUsers(res.data);
    }
    console.log("check res:", res);
  };

  return (
    <>
      {/* avatar,email,first_name,id,last_name */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>@{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default TableUsers;