import express from "express";
import team from "../data/teamData.js"
const router = express.Router();


router.get("/", (req, res) => {
  res.json(team);
});

export default router;
