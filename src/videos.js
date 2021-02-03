const util = require('util');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readJSON() {
  return JSON.parse(await readFileAsync('./videos.json'));
}

async function list(req, res) {
  const title = 'Fræðslumyndbandaleigan';
  const { categories, videos } = await readJSON();
  res.render('videos', { title, categories, videos });
}

async function video(req, res, next) {
  const { id } = req.params;
  const { videos } = await readJSON();
  /* eslint-disable eqeqeq */
  const foundVideo = videos.find((a) => a.id == id);
  if (!foundVideo) {
    return next();
  }
  const { title } = foundVideo;
  return res.render('video', { title, videos, video: foundVideo });
}

router.get('/', catchErrors(list));
router.get('/:id', catchErrors(video));

module.exports = router;
