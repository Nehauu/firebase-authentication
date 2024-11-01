import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiApp } from "../hooks/ApiInstance";

export interface getTodoProps {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  complete: boolean;
}

export interface postTodoProps {
  title: string;
  description: string;
  complete: boolean;
  imgUrl: any;
}

export interface updateTodoProps {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  imgUrl: any;
}

const getData = async () => {
  const res = await apiApp.get<getTodoProps[]>("/get-todo");
  console.log(res.data);
  return res.data;
};

const postData = ({ title, description, complete, imgUrl }: postTodoProps) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("complete", complete.toString());
  formData.append("file", imgUrl);

  console.log(imgUrl);

  return apiApp.post(`/add-todo`, formData);
};

const updateData = async ({
  id,
  title,
  description,
  complete,
  imgUrl,
}: updateTodoProps) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("complete", complete.toString());
  formData.append("file", imgUrl);
  const res = await apiApp.put(`/${id}/update-todo`, formData);
  return res.data;
};

const deleteData = async (id: string) => {
  const res = await apiApp.delete(`/${id}/delete-todo`);
  return res.data;
};

export const ApiServices = {
  getData,
  postData,
  updateData,
  deleteData,
};

export const usePostData = () => {
  return useMutation<any, unknown, postTodoProps>(
    async ({ title, description, complete, imgUrl }) => {
      await ApiServices.postData({
        title: title,
        description: description,
        complete: complete,
        imgUrl: imgUrl,
      });
    }
  );
};

export const useUpdateData = () => {
  return useMutation<any, unknown, updateTodoProps>(
    async ({ id, title, description, complete, imgUrl }) => {
      await ApiServices.updateData({
        title: title,
        description: description,
        complete: complete,
        imgUrl: imgUrl,
        id: id,
      });
    }
  );
};

export const useDelData = () => {
  return useMutation(async ({ id }: { id: string }) => {
    await ApiServices.deleteData(id);
  });
};
