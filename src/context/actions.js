// Perform complex logic before dispatching to reducer

export const useActions = (state, dispatch) => {
  const switchWorkspace = (newWorkSpaceId) => {
    // Some logic check before allowing to switch workspace
    dispatch({ type: 'SWITCH_WORKSPACE', payload: newWorkSpaceId });
  };

  return { switchWorkspace };
};
