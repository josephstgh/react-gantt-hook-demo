const reducer = (state, action) => {
  console.log(`old state: ${JSON.stringify(state)}, type: ${action.type}, payload: ${action.payload}`);
  switch (action.type) {
    case 'SWITCH_WORKSPACE':
      return { ...state, workspaceId: action.payload };
    default:
      throw new Error('Unexpected action');
  }
};

export { reducer };