var opencv = require('opencv');

var dirname = '../../assets/images/upload';

function registerAction(action, recipient) {
  return new Promise(function(resolve) {
    action.file.upload({ dirname: dirname}, function (err, files) {
      var file = files[0];

      opencv.readImage(file.fd, function(err, img) {
        img.detectObject(opencv.FACE_CASCADE, {}, function(err, faces){

          console.log('ERROR: ', err);

          for (var i=0;i<faces.length; i++){
            var x = faces[i]
            img.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          }

          var preprocImg = './assets/images/pre/' + file.filename;
          console.log(preprocImg)
          img.save(preprocImg);

          identifyUser(preprocImg).then(function(actor) {
            Action.create({ photo: preprocImg.fd, agent: action.id }).then(function(action) {
              return resolve(action);
            });
          });
        });
      });
    });
  });
};

function identifyUser() {
  return new Promise(function(resolve) {
    
    return resolve();
  });
};

module.exports = {
  registerAction: registerAction,
  identifyUser: identifyUser,
};
