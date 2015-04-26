/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var upload = './assets/images/upload/';
var predir = './assets/images/pre/';
var usersdir = './assets/images/users/';

Promise = require('bluebird');
cv = opencv = require('opencv');
fr = opencv.FaceRecognizer.createLBPHFaceRecognizer();
trainSet = [];

function train(userPhotos) {
  return new Promise(function(resolve) {

    _.each(userPhotos, function(photo, id) {
      opencv.readImage(upload + photo, function(err, img) {
        if (err) throw err;
        if (img.width() < 1 || img.height() < 1) throw new Error('Image has no size');

        //img.inRange(lower_threshold, upper_threshold);
        //img.save(predir + picname);

        img.convertGrayscale();
        img.save(predir + photo);

        opencv.readImage(predir + photo, function(err, img) {

          img.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
            if (err || !faces.length || faces.length > 1) {
              sails.log.error(err, faces, photo);
              return sails.log("Take another photo");
            }

            var face = faces[0];
            var ims = img.size();

            var diffX = Math.abs(200 - face.width);
            var diffY = Math.abs(200 - face.height);

            var im2 = img.roi(face.x, face.y, face.width, face.height)

            im2.resize(200, 200);
            im2.save(usersdir + '/' + id + '/' + photo)

            trainSet.push([parseInt(id), im2]);

            console.log('Image saved');
          });
        });
      });

      setTimeout(function(){
        console.log('Training with: ' + photo);
      },1000);
    });

    return resolve();
  });
};


module.exports.bootstrap = function(cb) {
  //fr.trainSync([[0, img], [1, img1], [2, img2]]);

  var lower_threshold = [46, 57, 83];
  var upper_threshold = [80, 96, 115];

  train({
    '0': 'ogy.jpg',
    '1': 'ivan.jpg',
    '2': 'user.jpg',
  }).then(cb);

  //var whoisit = fr.predictSync(img4);
  // console.log("Identified image", whoisit);
};
