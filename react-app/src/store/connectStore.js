export const mapStateToPropsAuth = (state) => {
  return {
    auth: state.auth,
  };
};

export const mapStateToPropsAdverts = (state) => {
  return {
    auth: state.auth,
    adverts: state.adverts,
    filters: state.filters,
  };
};
