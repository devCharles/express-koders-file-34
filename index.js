const express = require("express");

const kodersUseCase = require("./koders");
const db = require("./db");

const server = express();
const port = 8080;

db.init();
server.use(express.json());

server.get("/koders", (request, response) => {
  const koders = kodersUseCase.getAll();

  response.json({
    message: "all koders get",
    success: true,
    data: { koders },
  });
});

server.post("/koders", (request, response) => {
  const name = request.body.name;

  try {
    const koders = kodersUseCase.add(name);

    response.json({
      message: "koder created",
      success: true,
      data: { koders },
    });
  } catch (error) {
    response.status(400);
    response.json({
      message: error.message,
      success: false,
    });
  }
});

server.delete("/koders/:name", (request, response) => {
  const name = request.params.name;

  try {
    const koders = kodersUseCase.removeByName(name);

    response.json({
      message: "koder deleted",
      success: true,
      data: { koders },
    });
  } catch (error) {
    response.status(400);
    response.json({
      message: error.message,
      success: false,
    });
  }
});

server.delete("/koders", (request, response) => {
  kodersUseCase.removeAll();

  response.json({
    message: "all koders deleted",
    success: true,
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
