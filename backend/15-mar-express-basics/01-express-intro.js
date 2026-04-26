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

async function main() {
  await block_1_basicServer();
}

main();
