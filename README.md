

# OpenAPI URL Resolver

`openapi-url-resolver` is a lightweight NPM package that provides a simple and efficient way to resolve URLs from OpenAPI specifications. It also removes protocols from the resolved URLs and allows you to easily extract host information from OpenAPI definitions. This package is ideal for developers working with APIs that conform to the [OpenAPI specification](https://swagger.io/specification/) and need to extract server information to make API calls.

## 📦 Installation

You can install `openapi-url-resolver` via NPM:

```sh
npm install openapi-url-resolver
```

## 💻 Usage

To use `openapi-url-resolver`, you need to pass an OpenAPI 3.x specification object to the `resolve()` function. This function will return an array of resolved server URLs:

```javascript
const openapiUrlResolver = require('./src')

// add complete spec
const spec = {
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
      description: 'The production API server',
      variables: {
        username: {
          default: 'demo',
          description: 'this value is assigned by the service provider, in this example `gigantic-server.com`'
        },
        port: {
          enum: ['8443', '443'],
          default: '8443'
        },
        basePath: {
          default: 'v2'
        }
      }
    }
  ]
}

const hosts = openapiUrlResolver.resolve(spec)

/*

[
  'demo.gigantic-server.com:8443/v2',
  'demo.gigantic-server.com:443/v2'
]

*/
console.log(hosts)

```

Pass `false` as second parameter to get the server URLs with protocols.

```javascript
const serverUrls = openapiUrlResolver.resolve(spec, false)

/*

[
  'https://demo.gigantic-server.com:8443/v2',
  'https://demo.gigantic-server.com:443/v2'
]

*/
console.log(serverUrls)

```

## Testing

You can test using the below command or write your own tests using the OpenAPI specifications [examples](./definitions/).

```sh
npm test
```

## Limitations

It does not validate or support only format of OpenAPI definitions.

- It does not validate the OpenAPI definition. You can use for validating the OpenAPI definition.
- It only works with OpenAPI specification object(JSON format).
  - Use js-yml to convert yml to json
  - Use postman-converter for Postman collection to OpenAPI json

The above are the known limitations and it is not handled to keep it lightweight and focused module to just extract the server information.

## 🤝 Contributing

Contributions to openapi-url-resolver are welcome! If you find a bug or want to suggest a new feature, please open an issue on the GitHub repository. If you want to contribute code, please fork the repository, make your changes, and submit a pull request. Your contributions and feedback are most welcome!

## ❤️ Support

If you find this package useful, please consider:

- Following me on Twitter for updates and package releases.
- Starring this repository on GitHub to show your appreciation.
- Sponsoring me on GitHub to support ongoing development.
- Buying me a coffee via PayPal or Ko-fi to help me stay fueled and focused.

Thank you for your support!

## 📝 License

`openapi-url-resolver` is released under the MIT License.
