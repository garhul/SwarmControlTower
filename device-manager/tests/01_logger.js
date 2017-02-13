const assert = require('assert');
const log = require('../app/utils/logger')();


//TODO:: write a proper test (?)
describe('Logger', () => {

  describe('w', () => {
    it('should output a warning styled log', function() {
      log.w('THIS IS A WARNING', 'THIS IS THE TAG');
      console.log('---------');

      assert.equal(1,1);
    });
  });

  describe('e', () => {
    it('should output an error styled log', function() {
      log.e('THIS IS AN ERROR');
      console.log('---------');

      assert.equal(1,1);
    });
  });

  describe('i', () => {
    it('should output an info styled log', function() {
      log.i('THIS IS INFO', 'THIS IS THE TAG');
      console.log('---------');

      assert.equal(1,1);
    });
  });
});
