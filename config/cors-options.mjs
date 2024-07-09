const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = (req, callback) => {
  if (allowedOrigins.indexOf(req.header("origin")) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("this origin is not allowed"), false);
  }
};

export default corsOptions;
