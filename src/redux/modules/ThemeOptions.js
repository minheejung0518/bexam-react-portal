// Sidebar
export const SET_SIDEBAR_TOGGLE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE';

export const setSidebarToggle = sidebarToggle => ({
  type: SET_SIDEBAR_TOGGLE,
  sidebarToggle,
});

const initialState = {
  sidebarToggle: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Sidebar
    case SET_SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.sidebarToggle,
      };
    default:
      break;
  }
  return state;
}
