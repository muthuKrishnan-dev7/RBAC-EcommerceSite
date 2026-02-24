import { useEffect, useState } from "react";
import "./App.css";
import "./Admin.css";
import logo from "./assets/Logo.svg";
import Me from "./assets/Me.jpeg";
import { RxDashboard } from "react-icons/rx";
import { TbTableShortcut } from "react-icons/tb";
import { IoBarChartSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiContactsLine } from "react-icons/ri";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Admin() {
  let [status, setStatus] = useState(false);
  let [temp, setTemp] = useState({
    name: "",
    brand: "",
    price: "",
    des1: "",
    des2: "",
    rating: "",
    prdimg: "",
  });
  const [show, setShow] = useState(false);
  const Close = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
    fetch(
      `https://69805d0a6570ee87d50eebdd.mockapi.io/Cruddata/Products/${temp.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(temp),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        alert("Ubdate Successful 😇");
        setStatus(!status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow = (abc) => {
    setTemp(abc);
    setShow(true);
  };

  const DeleteData = (abc) => {
    setTemp(abc);
    setShow(false);
    fetch(
      `https://69805d0a6570ee87d50eebdd.mockapi.io/Cruddata/Products/${temp.id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        alert("Delete Product Successful 🗑️");
        setStatus(!status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [Prddata, SetData] = useState([]);
  useEffect(
    function () {
      fetch("https://69805d0a6570ee87d50eebdd.mockapi.io/Cruddata/Products", {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          SetData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [status],
  );

  let [page, setPage] = useState("div3");
  const pageclick = (abc) => {
    setPage(abc);
  };

  return (
    <>
      <div className="parent">
        {/* Left Slide Bar and Logo */}
        <div className="div1 dash">
          <div className="ad-logo">
            <img src={logo} alt="" />
          </div>
          <div className="flex">
            <h5>Menu</h5>
            <div
              className={
                page == "div1" ? "flex bar-btn bar-btn2 " : "flex bar-btn "
              }
              // onClick={() => pageclick("div1")}
            >
              <RxDashboard className="ad-icon" /> Dashboard
            </div>
            <div
              className={
                page == "div2" ? "flex bar-btn bar-btn2" : "flex bar-btn"
              }
              onClick={() => pageclick("div2")}
            >
              <TbTableShortcut className="ad-icon" /> Tables
            </div>
            <div
              className={
                page == "div3" ? "flex bar-btn bar-btn2" : "flex bar-btn"
              }
              onClick={() => pageclick("div3")}
            >
              <CgProfile className="ad-icon" /> User Profile
            </div>
            {/* <div className="flex bar-btn" onClick={() => pageclick("div4")}>
              <RiContactsLine className="ad-icon" /> Contact
            </div> */}
          </div>
        </div>

        {/* Nav Bar of Admin Panel */}
        <div className="div2 nav">
          <div className="Adnavuser">
            <img src={Me} alt="" />
            Krishna
          </div>
        </div>

        {/* Section Of the Admin Panel Page */}
        <div className="div3 section">
          <div
            className="ins3 dashboard"
            style={{ zIndex: page === "div1" ? 5 : -1 }}
          ></div>

          {/* --- Tables --- */}
          <div
            className="ins3 table"
            style={{ zIndex: page === "div2" ? 5 : -1 }}
          >
            <h3 className="mb-4">Product Tables </h3>
            <Button variant="primary" onClick={handleShow} name="add">
              Add Product
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Description 1</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>ProductImg</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Prddata.map(function (item, i) {
                  return (
                    <>
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.price}</td>
                        <td>{item.des1}</td>
                        <td>{item.category}</td>
                        <td>{item.rating}</td>
                        <td>
                          <img src={item.prdimg} className="table-img" alt="" />
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            name="edit"
                            onClick={() => handleShow(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleShow(item)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>

            {/* Modal For Edit or Delete The Data */}

            <Modal show={show} onHide={Close} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Data✍🏻</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      onChange={(e) =>
                        setTemp({ ...temp, name: e.target.value })
                      }
                      defaultValue={temp.name}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Brand"
                      onChange={(e) =>
                        setTemp({ ...temp, brand: e.target.value })
                      }
                      defaultValue={temp.brand}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      onChange={(e) =>
                        setTemp({ ...temp, price: e.target.value })
                      }
                      defaultValue={temp.price}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Description"
                      onChange={(e) =>
                        setTemp({ ...temp, des1: e.target.value })
                      }
                      defaultValue={temp.des1}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Category"
                      onChange={(e) =>
                        setTemp({ ...temp, des2: e.target.value })
                      }
                      defaultValue={temp.categor}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Rating"
                      onChange={(e) =>
                        setTemp({ ...temp, rating: e.target.value })
                      }
                      defaultValue={temp.rating}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Image url"
                      onChange={(e) =>
                        setTemp({ ...temp, prdimg: e.target.value })
                      }
                      defaultValue={temp.prdimg}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={Close}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
                <Button variant="primary" onClick={DeleteData}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Div 3 Profile */}
          <div
            className="ins3 profile"
            style={{ zIndex: page === "div3" ? 5 : -1 }}
          >
            <h4 className="mb-4">User Profile</h4>
            <div className="profilediv flex">
              <img src={Me} alt="" />
              <div>
                <h4 className="mb-4">Muthu Krishnan R</h4>
                <h6>Owner Of Site | Tenkasi, Tamilnadu</h6>
              </div>
              <div className="flex profileicons">
                <span className="flex">
                  <FaFacebookF className="profic" />
                </span>
                <span className="flex">
                  <FaXTwitter className="profic" />
                </span>
                <span className="flex">
                  <FaLinkedinIn className="profic" />
                </span>
                <span className="flex">
                  <FaInstagram className="profic" />
                </span>
              </div>
            </div>

            <div className="profilediv mt-4">
              <h4 className="mb-4">Personal Information</h4>
              <div className="flex personalinfo">
                <div>
                  <h6>First Name</h6>
                  <h5 className="mb-4">Muthu Krishnan R</h5>
                  <h6>Email</h6>
                  <h5 className="mb-4">muthukrishnanm827@gmail.com</h5>
                  <h6>Bio</h6>
                  <h5 className="mb-4">Founder</h5>
                </div>
                <div>
                  <h6>Role</h6>
                  <h5 className="mb-4">Founder</h5>
                  <h6>Phone</h6>
                  <h5 className="mb-4">+91 7418601571</h5>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="ins3 contact"
            style={{ zIndex: page === "div4" ? 5 : -1 }}
          ></div> */}
        </div>
      </div>
    </>
  );
}
