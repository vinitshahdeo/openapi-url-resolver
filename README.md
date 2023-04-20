

# OpenAPI URL Resolver

**openapi-url-resolver** is a **lightweight** NPM package that provides a simple and efficient way to resolve server URLs from OpenAPI specifications. It also removes protocols from the resolved URLs and allows you to **easily extract host information from OpenAPI definitions**. This package is ideal for developers working with APIs that conform to the [OpenAPI 3.x specification](https://swagger.io/specification/) and need to extract [server information](https://spec.openapis.org/oas/v3.1.0#server-object) to make API calls.

## 📦 Installation

You can install `openapi-url-resolver` via NPM:

```bash
npm install openapi-url-resolver
```

## 💻 Usage

To use `openapi-url-resolver`, you need to pass an [OpenAPI 3.x specification](https://swagger.io/specification/) object to the `resolve()` function. This function will return an array of resolved server URLs:

```javascript
const openapiUrlResolver = require('openapi-url-resolver')

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

## 🧪 Testing

You can test using the below command or write your own tests using the OpenAPI specifications [examples](./definitions/).

```bash
npm test
```

## 🚫 Limitations

The below are the known limitations, and they are not handled to keep it a lightweight and focused module to just extract the [server information](https://spec.openapis.org/oas/v3.1.0#server-object).

- It does not validate the OpenAPI definition. You can use [openapi-schema-validator](https://www.npmjs.com/package/openapi-schema-validator) for validating the OpenAPI definition.
- It only works with JSON format.
  - Use [yaml-to-json-schema](https://www.npmjs.com/package/yaml-to-json-schema) to convert YAML to JSON.
  - Use [postman-to-openapi](https://www.npmjs.com/package/postman-to-openapi) to Postman collection to OpenAPI 3.x

## 🤝 Contributing

**Contributions to `openapi-url-resolver` are most welcome!** 

If you find a bug or want to suggest a new feature, [please open an issue](https://github.com/vinitshahdeo/openapi-url-resolver/issues/new) on the GitHub repository. If you want to contribute code, [please fork the repository](https://github.com/vinitshahdeo/openapi-url-resolver/fork), make your changes, and **submit a pull request**. Your contributions and feedback are most welcome!

## 📝 License

[openapi-url-resolver](https://github.com/vinitshahdeo/openapi-url-resolver) is released under the [MIT License](./LICENSE).

## ❤️ Support

If you find this package useful, please consider [starring this repository]() on GitHub to show your appreciation. You can stay connected with me on Twitter—[@vinit_shahdeo](https://twitter.com/Vinit_Shahdeo).

<a href="https://www.buymeacoffee.com/vinitshahdeo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Thank you for your support! 🙏
