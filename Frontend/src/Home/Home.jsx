import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AddButton,
  BodyLayout,
  EditTitle,
  FormWrapper,
  InputElement,
  InputWrapper,
  Tab,
  TabButton,
} from "./HomeV2.styles";
import {
  CardLayout,
  Title,
  CheckBox,
  Description,
  UserName,
  HeaderLayout,
  UserNameWrapper,
  LogoutButton,
} from "./Home.styles";
import { useParams } from "react-router-dom";
import Modal from "../common/Modal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { myContext } from "../ContextProvider/MyProvider";
import { AuthContext } from "../common/AuthContext";
import axios from "axios";
import { Button } from "../Auth/Auth.styles";
import { LogOutIcon } from "lucide-react";
import NotificationBubble from "../common/NotificationBubble";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [taskData, setTaskData] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isEditId, setIsEditId] = useState("");
  // const [openModal, setOpenModal]=useState(false)
  const titleRef = useRef("");
  const descRef = useRef("");
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setmodalTilte] = useState("");
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const {openModal, updateModalState}=useContext(myContext)
  const auth = useContext(AuthContext);


  const url=`${process.env.REACT_APP_API_URL}/api/tasks`


  const { userId } = useParams();

  useEffect(() => {
    handleGetTaskData();
  }, [auth.token, activeTab]);

  const handleGetTaskData = async () => {
    try {
      auth.showLoaderHandler(true);
      const res = await axios.get(`${url}/${userId}?tab=${activeTab}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setTaskData(res.data);
    } catch (err) {
      console.error("Get Error", err);
    } finally {
      auth.showLoaderHandler(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        titleRef.current = value;
        setTitle(value);
        break;
      case "description":
        descRef.current = value;
        setDesc(value);
        break;
      default:
        return;
    }

    setErrorMsg("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // titleRef.current=''
    // descRef.current=''
    try {
      auth.showLoaderHandler(true);
      if (isEditId) {
        const res = await axios.patch(
          `${url}/${isEditId}`,
          { title: titleRef.current, description: descRef.current },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        alert("Task Updated successfully");
        setIsEditId("");
      } else {
        const res = await axios.post(
          `${url}`,
          {
            title: titleRef.current,
            description: descRef.current,
            isCompleted: false,
            userId: userId,
          },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        alert("Task added successfully");
      }
      setTitle("");
      setDesc("");
      titleRef.current = "";
      descRef.current = "";
      // e.target.reset()
      handleGetTaskData();
    } catch (err) {
      console.error("Post error", err);
      setIsEditId("");
    } finally {
      auth.showLoaderHandler(false);
    }
  };

  const handleCompletedTasks = () => {
    setActiveTab("Tab2");
  };

  const handlePendingTasks = () => {
    setActiveTab("Tab1");
  };

  const formatDate = (date) => {
    const curDate = new Date(date);
    const dd = curDate.getDate();
    let mm = curDate.getMonth();
    if (mm > 12) {
      mm = 1;
    } else {
      mm = mm + 1;
    }
    const yyyy = curDate.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleDelete = async (id) => {
    try {
      auth.showLoaderHandler(true);
      const res = await axios.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      alert(res.data.message);
      handleGetTaskData();
    } catch (err) {
      console.error("Delete axios route", err);
    } finally {
      auth.showLoaderHandler(false);
    }
    // updateModalState(true)
  };

  const handleEdit = (id, titleToEdit, DescToEdit) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTitle(titleToEdit);
    setDesc(DescToEdit);
    titleRef.current = titleToEdit;
    descRef.current = DescToEdit;
    setIsEditId(id);
  };

  const handleLogoutButton = () => {
    setOpenModal(true);
    setmodalTilte("Are you sure you would like to Log Off?");
    setPrimaryButtonText("Yes, Logout");
    setSecondaryButtonText("Cancel");
    setButtonName("logout");
  };

  const handleDeleteButton = (_id) => {
    setOpenModal(true);
    setmodalTilte("Are you sure you would like to Delete the Task?");
    setPrimaryButtonText("Yes, Delete");
    setSecondaryButtonText("Cancel");
    setButtonName("delete");
    setDeleteId(_id);
  };

  const handlePrimaryButtonHandler = (buttonName, _id) => {
    if (buttonName === "delete") {
      handleDelete(_id);
    } else if (buttonName === "logout") {
      auth.logout();
    }
    setOpenModal(false);
  };

  const handleCheckBox = async (e, isEditId) => {
    if (e.target.checked) {
      try {
        auth.showLoaderHandler(true);
        const res = await axios.patch(
          `${url}/${isEditId}`,
          { isCompleted: e.target.name === "isCompleted" ? true : false },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        handleGetTaskData();
      } catch (err) {
        console.log("Patch err checkbox", err);
      } finally {
        auth.showLoaderHandler(false);
      }
    }
  };

  const handleInvalid = () => {
    setErrorMsg("Sorry! No special characters are allowed");
  };

  return (
    <>
      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={modalTitle}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          primaryButtonHandler={() =>
            handlePrimaryButtonHandler(buttonName, deleteId)
          }
        />
      )}
      {errorMsg && (
        <NotificationBubble width="50%" textColor="black">
          {errorMsg}
        </NotificationBubble>
      )}
      <HeaderLayout>
        <UserNameWrapper>
          <UserName>Welcome {auth.userName}</UserName>
        </UserNameWrapper>
        <h1>Task Creator</h1>
        <LogoutButton onClick={() => handleLogoutButton()}>
          <LogOutIcon size={20} />
          Logout
        </LogoutButton>
      </HeaderLayout>
      <BodyLayout>
        <FormWrapper onSubmit={(e) => handleSubmit(e)}>
          {isEditId && <EditTitle>Edit your task</EditTitle>}
          <InputElement
            pattern="[a-zA-Z0-9 ]+"
            onInvalid={() => handleInvalid()}
            required={true}
            name="title"
            placeholder="Add title"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <InputElement
            pattern="[a-zA-Z0-9 ]+"
            onInvalid={() => handleInvalid()}
            name="description"
            placeholder="Add description"
            onChange={(e) => handleChange(e)}
            value={desc}
          />
          <AddButton type="submit">Add Task</AddButton>
        </FormWrapper>

        <Tab>
          <TabButton
            isActive={activeTab === "Tab1"}
            onClick={() => handlePendingTasks()}
          >
            Pending Tasks
          </TabButton>
          <TabButton
            isActive={activeTab === "Tab2"}
            onClick={() => handleCompletedTasks()}
          >
            Completed Tasks
          </TabButton>
        </Tab>
        {taskData &&
          taskData.map((data, index) => {
            return (
              <CardLayout key={index}>
                <Title>{data.title}</Title>
                <CheckBox>
                  <input
                    onChange={(e) => {
                      handleCheckBox(e, data._id);
                    }}
                    type="checkbox"
                    id="completed"
                    checked={activeTab === "Tab1" ? data.isCompleted : !data.isCompleted}
                    name={activeTab === "Tab1" ? "isCompleted" : "isPending"}
                  ></input>
                  <span>
                    {activeTab === "Tab1"
                      ? "Mark as completed"
                      : "Move to pending"}
                  </span>
                </CheckBox>
                <Description>{data.description}</Description>
                <div>
                  <span>
                    <GrEdit />
                  </span>
                  <Link
                    color="white"
                    onClick={() =>
                      handleEdit(data._id, data.title, data.description)
                    }
                  >
                    Edit
                  </Link>
                </div>
                <div>Date Added :{formatDate(data.dateCreated)} </div>
                <div>
                  <span>
                    <RiDeleteBin5Line />
                  </span>
                  <Link
                    color="white"
                    onClick={() => handleDeleteButton(data._id)}
                  >
                    Delete
                  </Link>
                </div>
              </CardLayout>
            );
          })}
      </BodyLayout>
    </>
  );
};

export default Home;
