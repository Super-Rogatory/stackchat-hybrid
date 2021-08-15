const express = require('express');
const router = express.Router();

router.use('/channels', require('./channels'));
router.use('/messages', require('./messages'));

router.use((req, res, next) => {
    const err = new Error('file not found');
    err.status = 404;
    next(err);
})
module.exports = router;