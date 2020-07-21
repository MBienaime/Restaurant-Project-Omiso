const logMiddleware = (store) => (next) => (action) => {

  next(action);
};

export default logMiddleware;
