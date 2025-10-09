import { createSlice } from "@reduxjs/toolkit";

export interface Profile {
  profile: {
    email: string;
    rememberMe: boolean;
    loggedIn: boolean;
  };
}

const initialState: Profile = {
  profile: {
    email: "",
    rememberMe: false,
    loggedIn: false,
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
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
