# OpenAPI URL Resolver

`openapi-url-resolver` is an NPM package that provides a simple and efficient way to resolve URLs from OpenAPI specifications. It also removes protocols from the resolved URLs and allows you to easily extract host information from OpenAPI definitions. This package is ideal for developers working with APIs that conform to the OpenAPI specification and need to extract server information to make API calls.

## Installation

You can install `openapi-url-resolver` via NPM:

```sh
npm install openapi-url-resolver
```

##

Add notes about yaml parser, postman collection


## Usage

It supports two methods:

- `getServerUrls` - Return the server URLs from the OpenAPI 3.x specification.
- `extractHosts` - Get hosts information from OpenAPI & Swagger definitions.

```javascript
const openapiUrlResolver = require('openapi-url-resolver');

openapiUrlResolver.resolve(spec, false);
const serverUrls = openapiUrlResolver.getServerUrls(spec, false);

```


To use `openapi-url-resolver`, you need to pass an OpenAPI specification object to the resolveServerUrls() function. This function will return an array of resolved server URLs:

```javascript
const openapiUrlResolver = require('openapi-url-resolver');

// add complete spec
const spec = {
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://api.example.com/v1',
      description: 'Production server'
    },
    {
      url: 'https://staging-api.example.com/v1',
      description: 'Staging server'
    }
  ]
};

const serverUrls = openapiUrlResolver.getServerUrls(spec);

console.log(serverUrls); // ['api.example.com/v1', 'staging-api.example.com/v1']
```

To extract host information from an OpenAPI specification, you can use the getHosts() function:

```javascript
const openapiUrlResolver = require('openapi-url-resolver');

// add complete spec
const spec = {
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://api.example.com/v1',
      description: 'Production server'
    },
    {
      url: 'https://staging-api.example.com/v1',
      description: 'Staging server'
    }
  ]
};

const hosts = openapiUrlResolver.getHosts(spec);

console.log(hosts); // ['api.example.com', 'staging-api.example.com']

```

## Contributing

Contributions to openapi-url-resolver are welcome! If you find a bug or want to suggest a new feature, please open an issue on the GitHub repository. If you want to contribute code, please fork the repository, make your changes, and submit a pull request. Your contributions and feedback are most welcome!

## Support

If you find this package useful, please consider:

- Following me on Twitter for updates and package releases.
- Starring this repository on GitHub to show your appreciation.
- Sponsoring me on GitHub to support ongoing development.
- Buying me a coffee via PayPal or Ko-fi to help me stay fueled and focused.

Thank you for your support!

## License

`openapi-url-resolver` is released under the MIT License.
