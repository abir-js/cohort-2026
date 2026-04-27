const express = require("express");

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();

    const logs = [];

    app.use(express.json({ limit: "50kb" }));
    app.use(express.urlencoded({ extended: true, limit: "50kb" })); // for urlencoded form data eg.(fullname = abir%20bhattacharjee)
    app.use(
      express.static(root, {
        dotfiles: "ignore",
        maxAge: 0,
      }),
    );

    app.use((req, res, next, err) => {
      const logEntry = `${req.method} ${req.url} - ${new Date().toISOString()}`;
      logs.push(logEntry);
      console.log(`[LOG] --> ${logEntry}`);
      next();
    });

    app.use((req, res, next, err) => {
      req.startTime = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - req.startTime;
        console.log(`[TIMER] ${req.method} ${req.url} took ${duration}ms`);
      });

      next();
    });

    function authMiddleware(req, res, next) {
      const authToken = req.headers["x-auth-token"];

      if (!authToken) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      if (authToken !== "secret-token") {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }

      // In a real application, you would verify the token and possibly attach user info to req.user
      // take data (id, email) from token and attach to req.user
      req.user = { id: 1, email: "admin@example.com", role: "admin" }; // these data will come from token in real application, here we are hardcoding for demo purpose

      // in future, we can check in all routes, if there is req.user then the user is logged in and authenticated, otherwise not authenticated
      next();
    }

    app.get("/profile", authMiddleware, () => {});

    function getRole(role) {
      return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
          return res
            .status(403)
            .json({ error: `Forbidden: Requires ${role} role` });
        }
        next();
      };
    }

    function rateLimiter(maxRequests) {
      let count = 0;
      return (req, res, next) => {
        if (count >= maxRequests) {
          return res
            .status(429)
            .json({ error: "Too many requests, please try again later" });
        }
        count++;
        next();
      };
    }

    app.get("/profile", authMiddleware, getRole("admin"), (req, res) => {});

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;

      try {
        // Make some test requests
      } catch (error) {
        console.error("Error fetching menu:", error);
      }

      server.close(() => {
        console.log("Server closed");
        resolve();
      });
    });
  });
}

async function main() {
  await block_1_basicServer();
}

main();
