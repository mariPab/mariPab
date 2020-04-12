
/* selectors */
export const getViewportMode = ({ mobile }) => mobile;

/* action name creator */
const reducerName = 'viewport';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const CHANGE_VIEWPORT = createActionName('CHANGE_VIEWPORT');

/* action creators */
export const changeViewport = payload => ({ payload, type: CHANGE_VIEWPORT });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_VIEWPORT: {
      return action.payload;
    }
    default:
      return statePart;
  }
};
