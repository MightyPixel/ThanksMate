var opencv = require('opencv');

var dirname = '../../assets/images/upload';

function uploadFile(file) {
  return new Promise(function(resolve) {
    if (!file) {
      return resolve('');
    }

    file.upload({ dirname: dirname}, function (err, files) {
      var file = files[0];

      return resolve(file);
    });
  });
};

module.exports = {
  uploadFile: uploadFile,
};
