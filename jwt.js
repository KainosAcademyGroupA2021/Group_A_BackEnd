const _jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');

const renameFunction = (name, func) => {
    Object.defineProperty(func, 'name', { writable: true });
    func.name = name;
    return func;
}

const replaceMiddleware = (router, method, path, from, to) => {
    const layer = router.stack.filter(layer => {
        if (layer.route) {
            return layer.route.path === path && layer.route.methods[method] === true;
        } else {
            return false;
        }
    });

    if (layer.length === 0) {
        throw new Error(`Cloudln't find ${method}:${path}`);
    }

    if (layer.length > 1) {
        throw new Error(`Duplicated routes ${method}:${path}`);
    }

    const route = layer[0].route;

    const middleware = route.stack.filter(layer => layer.name === from);

    if (middleware.length === 0) {
        throw new Error(`${method}:${path} doesn't contain ${from} middleware`);
    }

    if (middleware.length > 1) {
        throw new Error(`${method}:${path} contains duplicated ${from} middlewares`);
    }

    middleware[0].handle = to;
}

const JWT = (options) => renameFunction('JWT', _jwt(options));
const JWTscopes = (scopes, options) => renameFunction('JWTscopes', jwtAuthz(scopes, options));

module.exports = {
    renameFunction,
    replaceMiddleware,
    JWT,
    JWTscopes,
}
