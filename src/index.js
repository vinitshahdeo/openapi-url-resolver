/**
 * Returns an array of hosts from the Open API Definition provided in JSON format.
 *
 * @param {Object} spec - Open API Definition in JSON format
 * @returns {Array} - Array containing host
 */
function getHosts(spec = {}) {
    /**
     * OpenAPI 2 (aka Swagger) contains host, the schemes like HTTP, HTTPS are present as a separate field.
     * Learn more: https://swagger.io/specification/v2/
     */
    if (spec.version === '2.0') {
        return spec.host;
    }

    // Get the server URLs
    const serverUrls = getServerUrls(spec);

    // Remove protocols (e.g. http://, https://) to get the host
    const hosts = [];

    for (const url of serverUrls) {
        const host = url ? url.replace(/(^\w+:|^)\/\//, ''): '';
        if (host && !hosts.includes(host)) {
            hosts.push(host);
        }
    }

    return hosts;
}

/**
 * Resolves URLs for the OpenAPI spec's servers field.
 * Learn about the server object: https://swagger.io/specification/
 *
 * @param {object} spec - The OpenAPI specification object.
 * @param {object|array} spec.servers - The server object.
 * @returns {string[]} An array of resolved server URLs.
 */
function getServerUrls(spec) {
    const servers = Array.isArray(spec.servers) ? spec.servers : [spec.servers];

    // Loop through each server object and resolve its URL
    const serverUrls = [];
    for (const server of servers) {
        const { url, variables } = server;

        if (!url) {
            console.info('No URL found in server object:', server);
            continue;
        }

        // Replace the variables in the URL with their values
        let resolvedUrls = [url];

        if (variables) {
            for (const [varName, varValue] of Object.entries(variables)) {
                let { default: defaultValue, enum: enumValues } = varValue;

                if (!defaultValue && !enumValues) {
                    console.info(`No default value or enumeration found for variable ${varName} in server object:`, server);
                    continue;
                }

                if (!enumValues && defaultValue) {
                    enumValues = [defaultValue];
                } else if (!enumValues) {
                    console.info(`No enumeration found for variable ${varName} in server object:`, server);
                    continue;
                }

                // Replace the variable in the URL with each of its enumeration values
                const valuesToReplace = [];

                for (const value of enumValues) {
                    for (const resolvedUrl of resolvedUrls) {
                        const newUrl = resolvedUrl.replace(`{${varName}}`, value);
                        if (!valuesToReplace.includes(newUrl)) {
                            valuesToReplace.push(newUrl);
                        }
                    }
                }

                resolvedUrls = valuesToReplace;
            }
        }

        serverUrls.push(...resolvedUrls);
    }

    return serverUrls;
}

module.exports = {
    getServerUrls,
    getHosts
};
