const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const linkController = require('../controllers/linkController');

router.use(cors());

router.get('/:short', linkController.redirectToURL);

router.post('/', bodyParser.json(), linkController.createLink);

module.exports = router;