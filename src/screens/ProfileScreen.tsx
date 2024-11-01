import { auth } from "../firebase";
import { useAuth } from "../components/Authentication";
import React, { useEffect, useState } from "react";
import "../styles/ProfileScreen.css";

import {
  Outside,
  AlignOutside,
  Buttons,
  BackgroundImage,
  Texts,
  CustomBox,
  AlignContent,
  ContentBox,
} from "../styles/ComponentStyle";
import { ModalBox } from "../components/Modal";
import { useQuery, useQueryClient } from "react-query";
import { getTodoProps, useDelData } from "../components/ConnectApi";
import { ApiServices } from "../components/ConnectApi";

import { Todo } from "../components/Todo";

const Profile = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTodo, setEditTodo] = useState<getTodoProps | null>(null);
  const [isComplete, setIsComplete] = useState<getTodoProps | boolean>(Boolean);
  const [isCheck, setisCheck] = useState(false);

  const { logOut } = useAuth({ setErrorMes: setError });

  const logoutUser = (e: React.FormEvent<HTMLButtonElement>) => {
    logOut();
  };

  const hideModal = (): void => {
    setOpenModal(false);
  };

  const { data: getTodos } = useQuery<getTodoProps[]>("get-todos", async () => {
    return await ApiServices.getData();
  });

  const { mutate: deletePost, isSuccess: deleteSuccess } = useDelData();

  // invalidate query to instantly remove the deleted item without refreshing
  useEffect(() => {
    if (deleteSuccess) {
      queryClient.invalidateQueries(["get-todos"]);
    }
  }, [deleteSuccess, queryClient]);

  // once edit button clicked passes the
  const handleEditClick = (todo: getTodoProps) => {
    setEditTodo(todo);
    setOpenModal(true);
  };

  const handleComplete = (todo: getTodoProps) => {
    setIsComplete(todo);
    setisCheck(!isComplete);
  };

  return (
    <Outside>
      {/* <BackgroundImage src={Background} alt="" /> */}

      <body>
        <div className="align-top">
          <CustomBox className="top-bar">
            <Texts className="title">
              Welcome, {auth.currentUser?.displayName}!
            </Texts>
          </CustomBox>
        </div>
      </body>

      <aside className="side-cluster"></aside>

      <div className="align-map">
        <ul className="mapped-table">
          {getTodos?.map((data) => {
            return (
              <li className="mapped-data">
                <Todo
                  key={data.id}
                  deletePost={() => deletePost({ id: data.id })}
                  id={data.id}
                  title={data.name}
                  description={data.description}
                  imgUrl={data.imgUrl}
                  complete={data.complete}
                  onCheck={() => {
                    handleComplete(data);

                    console.log("completed");
                  }}
                  onEdit={() => {
                    handleEditClick(data);
                    setEditModal(true);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="align-footer">
        <div className="footer-box">
          <Buttons
            className="post-button"
            onClick={() => {
              setOpenModal(true);
              setEditModal(false);
            }}
          >
            + Create New Entry
          </Buttons>
          <Buttons className="signout" onClick={logoutUser}>
            Sign Out
          </Buttons>
        </div>
      </footer>

      <CustomBox className="modal-box">
        {openModal && (
          <ModalBox
            closeModal={hideModal}
            complete={isCheck}
            isEdit={editModal}
            {...(editTodo && {
              id: editTodo.id,
              title: editTodo.name,
              description: editTodo.description,
              imgUrl: editTodo.imgUrl,
              complete: editTodo.complete,
            })}
          />
        )}
      </CustomBox>
    </Outside>
  );
};

export default Profile;
