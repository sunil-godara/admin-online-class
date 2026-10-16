import { hookstate, useHookstate } from "@hookstate/core";

const initialState = {
  snackbar: {
    status: false,
    message: "",
    color: "success",
    vertical: "top",
    horizontal: "center"
  },
  previousUrl: []
};

const bookState = hookstate(initialState);

export const Store = () => {
  const store = useHookstate(bookState);

  return {
    get: () => store.get(),
    getSnackbarDetails: () => store.snackbar.get({ noproxy: true }),
    setSnackbarDetails: value => store.snackbar.merge({ ...value }),
    getPreviousUrl: () => store.previousUrl.get({ noproxy: true }),
    setPreviousUrl: value => store.previousUrl.set([...value]),
    clear: () => store.merge(initialState)
  };
};
