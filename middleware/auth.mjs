import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    console.log("request header", req.headers);
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

        if (!authHeader || typeof authHeader !== "string") {
          return res
            .status(403)
            .json({
              success: false,
              err_msg: "Unauthorized: Missing or invalid authorization header",
            });
        }


    if ( !authHeader.startsWith("Bearer")) {
      return res
        .status(403)
        .json({
          succes: false,
          err_msg: "Unauthorized :Malformed authorization header'",
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res
        .json({
          success: false,
          auth: false,
          err_msg: "your login has expired",
        });
      } else {
        req.validUser=decode
        next();
      }
    });
  } catch (err) {
    console.log(err);
        console.error("Error in verifyUser middleware:", err);
        return res
          .status(500)
          .json({ success: false, err_msg: "Internal Server Error" });

  }
};
