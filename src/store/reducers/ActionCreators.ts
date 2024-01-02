import axios from "axios";
import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import { userSlice } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const res = await axios.get<IUser[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch(userSlice.actions.usersFetchingSuccess(res.data));
//   } catch (error) {
//     dispatch(userSlice.actions.usersFetchingError(error.message));
//   }
// };

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);
