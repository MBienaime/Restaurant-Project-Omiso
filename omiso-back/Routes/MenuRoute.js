const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET request to /menu",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "POST request to /menu",
  });
});

router.get("/:menuId", (req, res, next) => {
  const id = req.params.menuId;
  if (id === "1") {
    res.status(200).json({
      message: "GET request to menu/1",
    });
  } else {
    res.status(200).json({
      message: "new ID passed",
    });
  }
});

router.patch("/:menuId", (req, res, next) => {
  res.status(200).json({
    message: "Updated menu",
  });
});

router.delete("/:menuId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted menu",
  });
});

module.exports = router;
