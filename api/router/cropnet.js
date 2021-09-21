'use strict'

module.exports = (router, options) => {
    const { repo, controllers} = options;

    router.get('/', (req, res, next) => {
        res.status(200).json("Welcome to cropnet")
    });

    // `/diagnose` route handles `multipart/form-data` image uploads, storing them
    // on the server and feeding them into the classification model for diagnosis
    // the `req.file` will contain the resulting file that multer parses from
    // the form
    router.post('/diagnose', controllers.ImageUpload.single("crop_image"));

    return router;
}
