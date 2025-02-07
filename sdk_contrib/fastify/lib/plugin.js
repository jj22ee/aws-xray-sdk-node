// @ts-check
const fp = require('fastify-plugin').default;
const configureAWSXRaySync = require('./private/configure-aws-x-ray-sync');
const onRequestHook = require('./hooks/on-request.hook');
const onResponseHook = require('./hooks/on-response.hook');
const onErrorHook = require('./hooks/on-error.hook');

/** @type {import('fastify').FastifyPluginAsync} */
const xRayFastifyPlugin = fp(async (fastify, opts) => {
  configureAWSXRaySync(fastify, opts);

  fastify.decorateRequest('segment', null);
  fastify
    .addHook('onRequest', onRequestHook)
    .addHook('onResponse', onResponseHook)
    .addHook('onError', onErrorHook);
});

module.exports = xRayFastifyPlugin;

exports.xRayFastifyPlugin = xRayFastifyPlugin;
