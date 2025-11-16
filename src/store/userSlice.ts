import { createSlice } from "@reduxjs/toolkit";

export interface Profile {
  profile: {
    email: string;
    rememberMe: boolean;
    loggedIn: boolean;
    token: string;
  };
}

const initialState: Profile = {
  profile: {
    email: "",
    rememberMe: false,
    loggedIn: false,
    token: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.profile = action.payload;
    },
    setLogout: (state) => {
      state.profile = initialState.profile;
    },
    setToken: (state, action) => {
      state.profile.token = action.payload;
    },
  },
});

export const { setLogin, setLogout, setToken } = userSlice.actions;
export default userSlice.reducer;
