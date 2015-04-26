var opencv = require('opencv');

function preprocessImage(file) {
  return new Promise(function(resolve) {
    opencv.readImage(file.fd, function(err, img) {
      img.detectObject(opencv.FACE_CASCADE, {}, function(err, faces) {
        for (var i=0;i<faces.length; i++){
          var x = faces[i];
          img.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
        }

        var preprocImg = './assets/images/pre/' + file.filename;
        img.save(preprocImg);

        return resolve(preprocImg);
      });
    });
  });
};


function registerAction(action, recipient) {
  return new Promise(function(resolve) {
    UtilService.uploadFile(action.file).then(function(file) {
      preprocessImage(file).then(function(preprocImg) {

        identifyUser(preprocImg).then(function(actor) {
          Action.create({ photo: preprocImg.fd, agent: actor.id, description: action.description, tags: extractTags(action.description)}).then(function(action) {
            return resolve(action);
          });
        });

      });
    });
  });
};

function registerActor(image) {
  sails.log('register actor: ', image);

  return new Promise(function(resolve) {
    preprocessImage(image).then(function(preprocImg) {
      identifyUser(image).then(function(user) {
        if (user) {
          return resolve(user);
        }

        // TODO

        return resolve(null);
      });
    });
  });
};

function identifyUser(image) {
  sails.log('register actor: ', image);

  return new Promise(function(resolve) {
    opencv.readImage(image, function(err, img) {

      User.find().then(function(users) {
        var user = users[0];

        sails.log('USER: ', user);
        return resolve(user);
      });
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
  registerActor: registerActor,
};
