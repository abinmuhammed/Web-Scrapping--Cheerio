const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const webScrappModel = require("../model/webScrappModel");

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const findInsight = asyncHandler(async (req, res) => {
  const url = req.body.url;

  if (url && !isValidUrl(url)) {
    throw new Error("Insert a valid URL");
  }

  const response = await axios.get(url);

  const html = response.data;
  const parsedHtml = cheerio.load(html);
  const text = parsedHtml("body").text();
  const count = text.split(/\s+/).length;

  const linksInPage = [];

  parsedHtml("a").each((key, element) => {
    const singleLinks = parsedHtml(element).attr("href");
    if (singleLinks && isValidUrl(singleLinks)) {
      linksInPage.push(singleLinks);
    }
  });
  const mediaLinks = [];
  parsedHtml("img, video, audio").each((key, element) => {
    const mediaLink = parsedHtml(element).attr("src");
    if (mediaLink && isValidUrl(mediaLink)) {
      mediaLinks.push(mediaLink);
    }
  });

  const ScrapDocument = await webScrappModel.create({
    urlName: url,
    wordCount: count,
    linksInPages: linksInPage,
    mediaLinks: mediaLinks,
  });

  if (ScrapDocument) {
    res.status(200).json({
      msg: "WEBSCRAP-Document created successfully",
      urlName: ScrapDocument.urlName,
      wordCount: ScrapDocument.wordCount,
      linksInPages: ScrapDocument.linksInPages,
      mediaLinks: ScrapDocument.mediaLinks,
      Favourite: ScrapDocument.Favourite,
      _id: ScrapDocument._id,
    });
  } else {
    throw new Error(error);
  }
});

const getAllInsights = asyncHandler(async (req, res) => {
  const allInsights = await webScrappModel.find();
  if (allInsights) {
    res.status(200).json({ msg: "List of all insights", data: allInsights });
  } else {
    res.status(401);
    throw new Error("No insights found");
  }
});

const deleteInsight = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Oops ! invalid object ID found");
  }
  const deleteDocument = await webScrappModel.deleteOne({ _id: id });
  if (deleteDocument) {
    res.status(200).json({ msg: "Insight has been deleted successfully " });
  } else {
    res.status(401);
    throw new Error("failed to delete, try again !");
  }
});

const addToFavourite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await webScrappModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { Favourite: true },
    },
    { new: true }
  );
  if (result) {
    res.json({ res: result });
  } else {
    throw new Error("Sorry !Couldn't update the document");
  }
});

const removeFromFavourite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await webScrappModel.findOneAndUpdate(
    { _id: id },
    {
      $set: { Favourite: false },
    },
    { new: true }
  );
  if (result) {
    res.json({ res: result });
  } else {
    throw new Error("Sorry !Couldn't update the document ");
  }
});

module.exports = {
  findInsight,
  getAllInsights,
  deleteInsight,
  addToFavourite,
  removeFromFavourite,
};
