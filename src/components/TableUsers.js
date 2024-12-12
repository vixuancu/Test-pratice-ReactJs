import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
import "./TableUsers.scss";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
    // viết hàm close tránh bị loop vô hạn
  };
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
    // console.log("check res:", res);
  };
  const handlePageClick = (event) => {
    // console.log(event);
    getUsers(+event.selected + 1);
  };
  const handleUpdateTable = (user) => {
    let _listUsers = _.cloneDeep(listUsers);
    setListUsers([user, ..._listUsers]);
  };
  const handleDeleteTable = (user) => {
    // phải dùng lodash copy toán tử ... thì copy luôn cả địa chỉ bị sai

    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUsers(cloneListUser);
  };
  const handleEditUserTable = (user) => {
    // phải dùng lodash copy toán tử ... thì copy luôn cả địa chỉ bị sai
    let index = listUsers.findIndex((item) => item.id === user.id);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser[index].first_name = user.first_name;
    setListUsers(cloneListUser);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    console.log(cloneListUser);
    setListUsers(cloneListUser);
  };
  return (
    <>
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
      {/* avatar,email,first_name,id,last_name */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                {" "}
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>Email</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
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
                  <td>{item.last_name}</td>
                  <td className="actions d-flex ">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                  </td>
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
      {/* truyền trực tiếp hàm setShow thì bị loop vô hạn */}
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserTable={handleEditUserTable}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteTable={handleDeleteTable}
      />
    </>
  );
};
export default TableUsers;
