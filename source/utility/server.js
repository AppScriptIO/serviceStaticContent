"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.createHttpServer = createHttpServer;var _http = _interopRequireDefault(require("http"));

var _koa = _interopRequireDefault(require("koa"));

async function createHttpServer({ serviceName, port, host = 'localhost', middlewareArray }) {
  const serverKoa = new _koa.default();
  serverKoa.subdomainOffset = 1;

  middlewareArray.forEach(middleware => serverKoa.use(middleware));
  await new Promise(
  (resolve, reject) =>
  _http.default.
  createServer(serverKoa.callback()).
  listen({ port, host }, () => {
    process.emit('service', { serviceName, port, status: 'ready', description: 'Server listening' });
    resolve();
  }).
  on('connection', socket => {





  }));








}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlsaXR5L3NlcnZlci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVIdHRwU2VydmVyIiwic2VydmljZU5hbWUiLCJwb3J0IiwiaG9zdCIsIm1pZGRsZXdhcmVBcnJheSIsInNlcnZlcktvYSIsIktvYSIsInN1YmRvbWFpbk9mZnNldCIsImZvckVhY2giLCJtaWRkbGV3YXJlIiwidXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJodHRwIiwiY3JlYXRlU2VydmVyIiwiY2FsbGJhY2siLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW1pdCIsInN0YXR1cyIsImRlc2NyaXB0aW9uIiwib24iLCJzb2NrZXQiXSwibWFwcGluZ3MiOiI0TUFBQTs7QUFFQTs7QUFFTyxlQUFlQSxnQkFBZixDQUFnQyxFQUFFQyxXQUFGLEVBQWVDLElBQWYsRUFBcUJDLElBQUksR0FBRyxXQUE1QixFQUF5Q0MsZUFBekMsRUFBaEMsRUFBNEY7QUFDakcsUUFBTUMsU0FBUyxHQUFHLElBQUlDLFlBQUosRUFBbEI7QUFDQUQsRUFBQUEsU0FBUyxDQUFDRSxlQUFWLEdBQTRCLENBQTVCOztBQUVBSCxFQUFBQSxlQUFlLENBQUNJLE9BQWhCLENBQXdCQyxVQUFVLElBQUlKLFNBQVMsQ0FBQ0ssR0FBVixDQUFjRCxVQUFkLENBQXRDO0FBQ0EsUUFBTSxJQUFJRSxPQUFKO0FBQ0osR0FBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQ0VDO0FBQ0dDLEVBQUFBLFlBREgsQ0FDZ0JWLFNBQVMsQ0FBQ1csUUFBVixFQURoQjtBQUVHQyxFQUFBQSxNQUZILENBRVUsRUFBRWYsSUFBRixFQUFRQyxJQUFSLEVBRlYsRUFFMEIsTUFBTTtBQUM1QmUsSUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsU0FBYixFQUF3QixFQUFFbEIsV0FBRixFQUFlQyxJQUFmLEVBQXFCa0IsTUFBTSxFQUFFLE9BQTdCLEVBQXNDQyxXQUFXLEVBQUUsa0JBQW5ELEVBQXhCO0FBQ0FULElBQUFBLE9BQU87QUFDUixHQUxIO0FBTUdVLEVBQUFBLEVBTkgsQ0FNTSxZQU5OLEVBTW9CQyxNQUFNLElBQUk7Ozs7OztBQU0zQixHQVpILENBRkUsQ0FBTjs7Ozs7Ozs7O0FBdUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcydcbmltcG9ydCBLb2EgZnJvbSAna29hJyAvLyBLb2EgYXBwbGljYWl0b24gc2VydmVyXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVIdHRwU2VydmVyKHsgc2VydmljZU5hbWUsIHBvcnQsIGhvc3QgPSAnbG9jYWxob3N0JywgbWlkZGxld2FyZUFycmF5IH0pIHtcbiAgY29uc3Qgc2VydmVyS29hID0gbmV3IEtvYSgpIC8vIGNyZWF0ZSBLb2Egc2VydmVyXG4gIHNlcnZlcktvYS5zdWJkb21haW5PZmZzZXQgPSAxIC8vIGZvciBsb2NhbGhvc3QgZG9tYWluLlxuICAvLyByZWdpc3RlciBtaWRkbGV3YXJlXG4gIG1pZGRsZXdhcmVBcnJheS5mb3JFYWNoKG1pZGRsZXdhcmUgPT4gc2VydmVyS29hLnVzZShtaWRkbGV3YXJlKSlcbiAgYXdhaXQgbmV3IFByb21pc2UoXG4gICAgKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIGh0dHBcbiAgICAgICAgLmNyZWF0ZVNlcnZlcihzZXJ2ZXJLb2EuY2FsbGJhY2soKSlcbiAgICAgICAgLmxpc3Rlbih7IHBvcnQsIGhvc3QgfSwgKCkgPT4ge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgnc2VydmljZScsIHsgc2VydmljZU5hbWUsIHBvcnQsIHN0YXR1czogJ3JlYWR5JywgZGVzY3JpcHRpb246ICdTZXJ2ZXIgbGlzdGVuaW5nJyB9KVxuICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Nvbm5lY3Rpb24nLCBzb2NrZXQgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnU09DS0VUIE9QRU5FRCcgKyBKU09OLnN0cmluZ2lmeShzb2NrZXQuYWRkcmVzcygpKSlcbiAgICAgICAgICAvLyBzb2NrZXQub24oJ2VuZCcsICgpID0+IGNvbnNvbGUuaW5mbygnU09DS0VUIEVORDogb3RoZXIgZW5kIG9mIHRoZSBzb2NrZXQgc2VuZHMgYSBGSU4gcGFja2V0JykpXG4gICAgICAgICAgLy8gc29ja2V0Lm9uKCd0aW1lb3V0JywgKCkgPT4gY29uc29sZS5pbmZvKCdTT0NLRVQgVElNRU9VVCcpKVxuICAgICAgICAgIC8vIHNvY2tldC5vbignZXJyb3InLCBlcnJvciA9PiBjb25zb2xlLmluZm8oJ1NPQ0tFVCBFUlJPUjogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSkpXG4gICAgICAgICAgLy8gc29ja2V0Lm9uKCdjbG9zZScsIGhhZF9lcnJvciA9PiBjb25zb2xlLmluZm8oJ1NPQ0tFVCBDTE9TRUQuIElzIEVSUk9SID86ICcgKyBoYWRfZXJyb3IpKVxuICAgICAgICB9KSxcbiAgICAvLyAuc2V0VGltZW91dCgwLCAoKSA9PiBjb25zb2xlLmxvZygnSFRUUCBzZXJ2ZXIgY29ubmVjdGlvbiBzb2NrZXQgd2FzIHRpbWVkb3V0IChjb25zb2xlLmxvZyBpbiBodHRwU2VydmVyLnNldFRpbWVvdXQpIScpKSxcbiAgKVxuXG4gIC8vIGlmIChzc2wpXG4gIC8vIGh0dHBzXG4gIC8vICAgLmNyZWF0ZVNlcnZlcih7IGtleTogc2VydmljZUNvbmZpZy5zc2wua2V5LCBjZXJ0OiBzZXJ2aWNlQ29uZmlnLnNzbC5jZXJ0IH0sIHNlcnZlcktvYS5jYWxsYmFjaygpKVxuICAvLyAgIC5vbignY29ubmVjdGlvbicsIHNvY2tldCA9PiBzb2NrZXQuc2V0VGltZW91dCgxMjApKVxuICAvLyAgIC5saXN0ZW4oNDQzLCAoKSA9PiBjb25zb2xlLmxvZyhg4piVICR7c2VydmljZU5hbWV9IGxpc3RlbmluZyBvbiBwb3J0IDQ0M2ApKVxufVxuIl19