/**
 * Returns an array of hosts from the Open API Definition provided in JSON format.
 * 
 * @author Vinit Shahdeo <https://github.com/vinitshahdeo>
 * @param {Object} spec - Open API Definition in JSON format
 * @returns {Array} - Array containing host
 */
function getHosts(spec = {}, removeProtocol = true) {
    /**
     * OpenAPI 2 (aka Swagger) contains host, the schemes like HTTP, HTTPS are present as a separate field.
     * Learn more: https://swagger.io/specification/v2/
     */
    if (spec.swagger === '2.0') {
        return spec.host;
    }

    // Get the server URLs
    const serverUrls = getServerUrls(spec);

    if (!removeProtocol) {
        return serverUrls;
    }

    const hosts = [];

    for (const url of serverUrls) {
        // Remove protocols (e.g. http://, https://) to get the host
        const host = url ? url.replace(/(^\w+:|^)\/\//, '') : '';

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
 * @author Vinit Shahdeo <https://github.com/vinitshahdeo>
 * @param {object} spec - The OpenAPI specification object.
 * @param {object|array} spec.servers - The server object.
 * @returns {string[]} An array of resolved server URLs.
 */
function getServerUrls(spec) {
    const servers = Array.isArray(spec.servers) ? spec.servers : [spec.servers],
        serverUrls = [];

    // Loop through each server object and resolve its URL
    for (const server of servers) {
        const { url, variables } = server || {};

        if (!url) {
            console.info('No URL found in server object:', server);
            return [];
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
    resolve: getHosts
};
