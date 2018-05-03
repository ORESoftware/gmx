

module.exports = function () {

  console.log('the args:', arguments);

  return {

    dependencies: {

      foo: function () {
        return Promise.resolve('dog');
      },

      bar: function (cb) {
        process.nextTick(cb, null, 'blue');
      }
    }

  }

};