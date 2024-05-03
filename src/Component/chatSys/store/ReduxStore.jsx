import create from 'zustand';

const ReduxStore = create((set) => ({
  authReducer: {
    username: '',
    active: false
  },
  setUsername: (name) =>
    set((state) => ({
      authReducer: { ...state.authReducer, username: name }
    }))
}));


export default ReduxStore;