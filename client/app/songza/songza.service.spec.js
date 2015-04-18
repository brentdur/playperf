'use strict';

describe('Service: songza', function () {

  // load the service's module
  beforeEach(module('musicApp'));

  // instantiate service
  var songza;
  beforeEach(inject(function (_songza_) {
    songza = _songza_;
  }));

  it('should do something', function () {
    expect(!!songza).toBe(true);
  });

});
