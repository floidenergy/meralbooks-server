class ReqError extends Error{
  constructor(message, status){
    super(message);
    this.status = status;
  }
}

const TryCatch = (Controller) => async (req, res, next) => {
  try {
    await Controller(req, res, next);
  } catch (err) {
    next(err);
  }
}

module.exports = {ReqError, TryCatch};