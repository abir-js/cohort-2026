const express = require("express");

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();

    app.get("/menu", (req, res) => {
      // created an get endpoint which will register a handler function on "/menu"
      res.json({
        // sets content type to application/json and serializes the object
        items: ["biriyani", "chicken", "mutton", "fish"],
      });
    });

    // Query parameters
    //* query params - /search?q=biriyani&limit=5
    app.get("/search", (req, res) => {
      const { q, limit } = req.query; // query params are always string
      res.json({
        query: q,
        limit: limit || `10`,
      });
    });

    // Route parameters or Path parameters
    app.get("/menu/:id", (req, res) => {
      // created an get endpoint which will register a handler function on "/menu/:id"
      const { id } = req.params;
      res.json({
        item: id,
        price: 100,
      });
    });

    // Post endpoint
    app.post("/order", (req, res) => {
      const order = req.body;
      res.json({
        message: "Order placed successfully",
        order: order,
      });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;

      try {
        const menuRes = await fetch(`${base}/menu`);
        const menuData = await menuRes.json();
        console.log("GET /menu", JSON.stringify(menuData));

        console.log("+".repeat(40));

        // search endpoint
        const searchRes = await fetch(`${base}/search?q=biriyani&limit=5`);
        const searchData = await searchRes.json();
        console.log("GET /search", JSON.stringify(searchData));

        console.log("+".repeat(40));

        // menu with id
        const menuIdRes = await fetch(`${base}/menu/123`);
        const menuIdData = await menuIdRes.json();
        console.log("GET /menu/:id", JSON.stringify(menuIdData));

        console.log("+".repeat(40));

        // POST order endpoint
        const orderRes = await fetch(`${base}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({
              dish: "Biriyani",
              quantity: 2,
            }),
          },
        });

        const orderData = await orderRes.json();
        console.log("POST /order", JSON.stringify(orderData));
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
  await block_1_basicServer();
  await block_2_response();
}

main();
