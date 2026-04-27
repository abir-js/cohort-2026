const express = require("express");

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const routes = {
      1: {
        id: 1,
        name: "Hazar Duari Express",
        direction: "North",
      },
      2: {
        id: 2,
        name: "Gitanjali Express",
        direction: "South",
      },
    };

    let nextId = 3;

    // List all trains
    app.get("/routes", (req, res) => {
      res.json(Object.values(routes));
    });

    // Single train details
    app.get("/routes/:id", (req, res) => {
      const route = routes[req.params.id];
      if (route) {
        res.json(route);
      } else {
        res.status(404).json({ error: "Route not found" });
      }
    });

    // Create a new train route
    app.post("/routes", (req, res) => {
      const { name, direction } = req.body;
      if (!name || !direction) {
        return res
          .status(400)
          .json({ error: "Name and direction are required" });
      }
      const newRoute = { id: nextId++, name, direction };
      routes[newRoute.id] = newRoute;
      res.status(201).json(newRoute);
    });

    // Update an existing train route
    app.put("/routes/:id", (req, res) => {
      const route = routes[req.params.id];
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      const { name, direction } = req.body;
      if (!name || !direction) {
        return res
          .status(400)
          .json({ error: "Name and direction are required" });
      }
      route.name = name;
      route.direction = direction;
      res.json(route);
    });

    // Delete a train route
    app.delete("/routes/:id", (req, res) => {
      const route = routes[req.params.id];
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      delete routes[req.params.id];
      res.sendStatus(204);
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;

      try {
        // List all routes
        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();
        console.log("GET /routes", JSON.stringify(listData));

        // Get single route
        const singleRes = await fetch(`${base}/routes/1`);
        const singleData = await singleRes.json();
        console.log("GET /routes/1", JSON.stringify(singleData));

        // Create new route
        const createRes = await fetch(`${base}/routes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Duronto Express", direction: "East" }),
        });
        const createData = await createRes.json();
        console.log("POST /routes", JSON.stringify(createData));

        // Update route
        const updateRes = await fetch(`${base}/routes/1`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Hazar Duari Express Updated",
            direction: "North-East",
          }),
        });
        const updateData = await updateRes.json();
        console.log("PUT /routes/1", JSON.stringify(updateData));
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

function block_2_response() {
  return new Promise((resolve) => {
    const app = express();

    app.get("/text", (req, res) => {
      res.send("Hello, this is a plain text response!");
    });

    app.get("/json", (req, res) => {
      res.json({
        framework: "Express",
        version: "6.0.0",
      });
    });

    app.get("/not-found", (req, res) => {
      res.status(404).json({
        error: "page not found",
      });
    });

    app.get("/health", (req, res) => {
      res.sendStatus(200); // sets status code and sends response
    });

    app.get("/old-menu", (req, res) => {
      // add entry in db to check how many users are still visiting old menu endpoint
      res.redirect(301, "/menu"); // redirect to new menu endpoint
    });

    app.get("/xml", (req, res) => {
      res.type("application/xml").send(`
          <menu>
            <item>Biriyani</item>
            <item>Chicken</item>
          </menu>`);
    });

    app.get("/custom-header", (req, res) => {
      res.set("X-Powered-By", "Chai Aur Code");
      res.set("X-Request-Id", "1234567890");
      res.json({
        message: "Custom headers set in the response",
      });
    });

    app.get("/no-content", (req, res) => {
      res.status(204).end(); // No content to send in response
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;

      try {
        // TODO:
        const res = await fetch(`${base}/text`);
        const textData = await res.text();
        console.log("GET /text", textData);

        console.log("+".repeat(40));

        const jsonRes = await fetch(`${base}/json`);
        const jsonData = await jsonRes.json();
        console.log("GET /json", JSON.stringify(jsonData));

        console.log("+".repeat(40));

        const notFoundRes = await fetch(`${base}/not-found`);
        const notFoundData = await notFoundRes.json();
        console.log("GET /not-found", JSON.stringify(notFoundData));

        console.log("+".repeat(40));

        const healthRes = await fetch(`${base}/health`);
        console.log("GET /health", healthRes.status);

        console.log("+".repeat(40));

        const oldMenuRes = await fetch(`${base}/old-menu`, {
          redirect: "manual",
        });
        console.log(
          "GET /old-menu",
          oldMenuRes.status,
          oldMenuRes.headers.get("location"),
        );

        console.log("+".repeat(40));

        const xmlRes = await fetch(`${base}/xml`);
        const xmlData = await xmlRes.text();
        console.log("GET /xml", xmlData);

        console.log("+".repeat(40));

        const customHeaderRes = await fetch(`${base}/custom-header`);
        const customHeaderData = await customHeaderRes.json();
        console.log(
          "GET /custom-header",
          customHeaderRes.headers.get("X-Powered-By"),
          customHeaderRes.headers.get("X-Request-Id"),
          JSON.stringify(customHeaderData),
        );

        console.log("+".repeat(40));

        const noContentRes = await fetch(`${base}/no-content`);
        console.log("GET /no-content", noContentRes);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    });
  });
}

async function main() {
  await block_1_httpMethods();
  await block_2_response();
}

main();
