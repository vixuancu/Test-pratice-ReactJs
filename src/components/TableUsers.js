import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // call api
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUser(res.total);
      setTotalPages(res.total_pages);
    }
    console.log("check res:", res);
  };
  const handlePageClick = (event) => {
    // console.log(event);
    getUsers(+event.selected + 1);
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
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        // forcePage={props.currentPage - 1}
      />
    </>
  );
};
export default TableUsers;
