import React, { useState } from "react";
import { ModalBox } from "./Modal";
import {
  AlignContent,
  Buttons,
  ContentBox,
  CustomBox,
  Texts,
} from "../styles/ComponentStyle";
import "../styles/TodoList.css";

interface TodoProps {
  id: string;
  title: string;
  description: string;
  imgUrl: any;
  complete: boolean;
  onCheck: () => void;
  deletePost: () => void;
  onEdit: () => void;
}

export const Todo = ({
  id,
  title,
  description,
  imgUrl,
  complete,
  onCheck,
  deletePost,
  onEdit,
}: TodoProps) => {
  return (
    // displaying the todo lists
    <div>
      <div className="todo-box">
        <div className="align-inside">
          <input type="checkbox" checked={complete} onChange={onCheck} />
          <p>{complete.toString()} </p>

          <Texts className="todo-title">{title}</Texts>
          <div className="buttons">
            <Buttons className="update-btn" onClick={onEdit}>
              update
            </Buttons>
            <Buttons className="del-btn" onClick={deletePost}>
              del
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};
