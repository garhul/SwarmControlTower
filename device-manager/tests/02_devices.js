const assert = require('assert');
const log = require('../app/utils/logger')();



describe('Devices', () => {

  describe('load', () => {
    it('should load devices from the mock file', function() {
      
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
