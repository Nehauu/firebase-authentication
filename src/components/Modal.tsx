import React, { useEffect, useRef, useState } from "react";
import {
  AlignContent,
  Buttons,
  ContentBox,
  CustomBox,
  ModalBackground,
  Texts,
  UserInput,
} from "../styles/ComponentStyle";
import "../styles/ModalStyle.css";
import { usePostData, useUpdateData } from "./ConnectApi";
import { useQueryClient } from "react-query";

export interface ModalProps {
  isOpen?: boolean;
  closeModal: () => void;
}
interface TodoProps {
  isEdit?: boolean;
  id?: string;
  title?: string;
  description?: string;
  imgUrl?: any;
  complete?: boolean;
}

export const ModalBox = ({
  isOpen = false,
  isEdit = false,
  id,
  title,
  description,
  imgUrl,
  complete,
  closeModal,
}: ModalProps & TodoProps) => {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [updateInfo, setUpdateInfo] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
  });

  const { isSuccess: updateSuccess, mutate: updateTodo } = useUpdateData();

  useEffect(() => {
    if (isEdit) {
      if (id && title && description) {
        setUpdateInfo({ id: id, title: title, description: description });
        // console.log(true);
      }
    }
  }, [isEdit, id, title, description]);

  const {
    isLoading: postingTodo,
    isSuccess: postSuccess,
    mutate: postTodo,
  } = usePostData();

  useEffect(() => {
    if (postSuccess || updateSuccess) {
      queryClient.invalidateQueries(["get-todos"]);
    }
  }, [postSuccess, updateSuccess, queryClient]);

  const HandleCreatePost = (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      postTodo({
        title: postInfo.title,
        description: postInfo.description,
        complete: false,
        imgUrl: postImage,
      });
      console.log("creating");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPost = (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      updateTodo({
        id: id as string,
        title: updateInfo.title,
        description: updateInfo.description,
        complete: false,
        imgUrl: postImage,
      });
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalBackground>
      <ContentBox className="modal-backdrop" onClick={closeModal}></ContentBox>
      <div className="align-container">
        <CustomBox className="modal-container">
          <div className="align-all">
            <div className="modal-input-wrap">
              <UserInput
                className="modal-title-input"
                type="text"
                placeholder="Title"
                value={isEdit ? updateInfo.title : postInfo.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  isEdit
                    ? setUpdateInfo({ ...updateInfo, title: e.target.value })
                    : setPostInfo({ ...postInfo, title: e.target.value });
                }}
              />
              <UserInput
                className="modal-description-input"
                type="text"
                placeholder="Description"
                value={isEdit ? updateInfo.description : postInfo.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  isEdit
                    ? setUpdateInfo({
                        ...updateInfo,
                        description: e.target.value,
                      })
                    : setPostInfo({ ...postInfo, description: e.target.value });
                }}
              />
            </div>

            <div className="right-cluster">
              <div className="image-cluster">
                <img className="preview-img" src={previewImage} alt="" />

                <UserInput
                  className="file-picker"
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const selectImage = e.target.files as FileList;
                    setPostImage(selectImage?.[0]);
                    setPreviewImage(URL.createObjectURL(selectImage?.[0]));
                  }}
                />
              </div>

              <Buttons
                className="submit-btn"
                onClick={isEdit ? handleEditPost : HandleCreatePost}
              >
                Done
              </Buttons>
            </div>
          </div>

          {/* 
        {postingTodo ? (
          <ContentBox className="post-condition">
            <Texts>Creating......</Texts>
          </ContentBox>
        ) : (
          <ContentBox className="post-condition">
            {postSuccess ? <Texts>Successfully created!</Texts> : null}
          </ContentBox>
        )} */}
        </CustomBox>
      </div>
    </ModalBackground>
  );
};
