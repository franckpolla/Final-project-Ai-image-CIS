//JWT is great for stateless authentication in APIs, scalable systems, or single-page applications (SPAs), and can be passed via HTTP headers.

import jwt from "jsonwebtoken";
//A cookie is a small piece of data sent from a server to a client and stored in the client’s browser.
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "You are not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Token is not valid" });
    }

    // req.userId = data._id;
    // console.log("Token verification successful, userId:", req.userId);
    next();
  });
};

export default verifyToken;
