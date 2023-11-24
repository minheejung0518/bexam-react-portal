export function getTokenFromState(state) {
  return state.auth.token;
}

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  pending: prevState => ({
    ...prevState,
    loading: true,
    error: null,
  }),
  success: payload => ({
    loading: false,
    data: payload,
    error: null,
  }),
  fail: error => ({
    loading: false,
    data: null,
    error,
  }),
};
