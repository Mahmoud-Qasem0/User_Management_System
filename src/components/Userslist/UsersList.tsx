import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./userslist.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  role: string;
  company: {
    title: string;
  };
}


function UsersList() {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);
  // store users data
  const [users, setUsers] = useState<User[]>([]);

  // use navigate to add new users and update users
  const navigate = useNavigate();
  // store and handle Modal for delete users
  const [user, setUser] = useState<User | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(0);

  const handleClose = () => setShow(false);

  const handleShow = (user: User) => {
    setShow(true);
    setId(user.id);
    setUser(user);
  };

  // get users data from api
  const getUsers = async () => {
    // try to fetch users data from api and catch errors
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/users");
      const data = res?.data?.users;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handle update user
  const updateUser = (user: User) => {
    navigate("/dashboard/edit-user", { state: { user } });
  };
  // handling confim delete users on modal
  const deleteUser = () => {
    // delete users data from api and catch errors
    try {
      const deleteResponse = axios.delete(`https://dummyjson.com/users/${id}`);
      console.log(deleteResponse);
      handleClose();
      toast.success("You Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Sorry Faild");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="user-list" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="users-head d-flex justify-content-between mx-2">
            <h3 className="users-title my-3">Users List</h3>
            <button
              className="btn rounded text-white my-3"
              onClick={() => navigate("/dashboard/edit-user")}
              style={{ backgroundColor: "#FEAF00" }}>
              Add New User
            </button>
          </div>
          <hr className="mx-2 mt-0" />
          <div className="table-box mx-2 overflow-y-scroll">
            <table className="">
              <thead className="text-black-50">
                <tr className="border-0">
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col" colSpan={2}>
                    Email
                  </th>
                  <th scope="col" colSpan={2}>
                    Phone
                  </th>
                  <th scope="col">Role</th>
                  <th scope="col">Title</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white rounded border-0">
                    <td>
                      <img
                        className="rounded-circle"
                        src={user.image}
                        alt="user img"
                      />
                    </td>
                    <td data-label="Name" scope="row">
                      {user.firstName} {user.lastName}
                    </td>
                    <td data-label="Email" colSpan={2} className="d-none  d-sm-block d-lg-table-cell">
                      {user.email}
                    </td>
                    <td data-label="Phone" colSpan={2}>
                      {user.phone}
                    </td>
                    <td data-label="Role">{user.role}</td>
                    <td data-label="Title">{user.company.title}</td>
                    <td data-label="Action">
                      <GoPencil
                        className="text-warning"
                        size={30}
                        onClick={() => updateUser(user)}
                      />
                      <FiTrash
                        className="mx-2 text-warning"
                        size={30}
                        onClick={() => handleShow(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>delete {user?.firstName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure You Want Delete {user?.firstName} {user?.lastName}?!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" className="text-white" onClick={() => deleteUser()}>
                Yes
              </Button>
              <Button variant="danger" className="text-white" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default UsersList;
