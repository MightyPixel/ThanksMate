var opencv = require('opencv');

function registerAction(action, recipient) {
  return new Promise(function(resolve) {
    UtilService.uploadFile(action.file).then(function(file) {
      opencv.readImage(file.fd, function(err, img) {
        img.detectObject(opencv.FACE_CASCADE, {}, function(err, faces) {

          console.log('ERROR: ', err);

          for (var i=0;i<faces.length; i++){
            var x = faces[i]
          img.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          }

          var preprocImg = './assets/images/pre/' + file.filename;
          console.log(preprocImg)
          img.save(preprocImg);

          identifyUser(preprocImg).then(function(actor) {
            Action.create({ photo: preprocImg.fd, agent: actor.id, description: action.description, tags: extractTags(action.description)}).then(function(action) {
              return resolve(action);
            });
          });
        });
      });
    });
  });
};

function identifyUser(image) {
  return new Promise(function(resolve) {
    User.find().then(function(users) {
      var user = users[0];

      sails.log('USER: ', user);
      return resolve(user);
    });
  });
};

function extractTags(description){
  var tagsRegex = /\S*#(?:\[[^\]]+\]|\S+)/ig;
  return description ? description.match(tagsRegex) : '';
};

module.exports = {
  registerAction: registerAction,
  identifyUser: identifyUser,
};
