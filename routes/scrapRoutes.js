const express = require("express");
const router = express.Router();
const {
  findInsight,
  getAllInsights,
  deleteInsight,
  updateInsight,
  addToFavourite,
  removeFromFavourite,
} = require("../controller/webScrappController");

// @desc To find all the details  regarding the insights and to get all the insights from history/database.
// @route POST & GET
// @access public

router.route("/insights").post(findInsight).get(getAllInsights);

// @desc To delete a insights from a history or database.
// @route  DElETE
// @access public

router.route("/insights/:id").delete(deleteInsight);

// @desc To add / remove a insight from a favourite list.
// @route PUT
// @access public

router.put("/add-to-favourite/:id/", addToFavourite);

// @desc To add / remove a insight from a favourite list.
// @route PUT
// @access public

router.put("/remove-from-favorite/:id", removeFromFavourite);

module.exports = router;
