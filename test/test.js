const assert = require('assert'),
    openapiUrlResolver = require('../src'),
    petstore = require('../definitions/openapi/petstore.json'),
    payments = require('../definitions/openapi/payments.json'),
    pestoreSimple = require('../definitions/openapi/petstore-simple.json'),
    uber = require('../definitions/swagger/uber.json');

describe('OpenAPI URL Resolver', function () {
    it('should return hosts after resolving variables', function () {
        const hosts = openapiUrlResolver.resolve(petstore);

        assert.deepEqual(hosts, [
            'development.gigantic-server.com/v1',
            'staging.gigantic-server.com/v1',
            'api.gigantic-server.com/v1'
        ]);
    });
    it('should return server URLs if removeProtocol is sent as false', function () {
        const serverUrls = openapiUrlResolver.resolve(petstore, false);

        assert.deepEqual(serverUrls, [
            'https://development.gigantic-server.com/v1',
            'https://staging.gigantic-server.com/v1',
            'https://api.gigantic-server.com/v1'
        ]);
    });
    it('should resolve all the enum values', function () {
        const hosts = openapiUrlResolver.resolve(payments);

        assert.deepEqual(hosts, [
            'demo.gigantic-server.com:8443/v2',
            'demo.gigantic-server.com:443/v2'
        ]);
    });
    it('should return the host if only one server URL is present', function () {
        const hosts = openapiUrlResolver.resolve(pestoreSimple);

        assert.deepEqual(hosts, [
            'petstore.swagger.io/v1'
        ]);
    });
    it('should return the host for OpenAPI 2.0 definitions', function () {
        const hosts = openapiUrlResolver.resolve(uber);

        assert.deepEqual(hosts, 'api.uber.com');
    });
});