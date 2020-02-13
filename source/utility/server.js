"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.createHttpServer = createHttpServer;var _assert = _interopRequireDefault(require("assert"));
var _http = _interopRequireDefault(require("http"));

var _net = _interopRequireDefault(require("net"));
var _koa = _interopRequireDefault(require("koa"));

const isPortTaken = (port) =>
new Promise((resolve, reject) => {

  const tester = _net.default.createServer().
  once('error', err => err.code == 'EADDRINUSE' ? resolve(false) : reject(err)).
  once('listening', () => tester.once('close', () => resolve(true)).close()).
  listen(port);
});

async function createHttpServer({ serviceName, port, host = '0.0.0.0', middlewareArray }) {
  const serverKoa = new _koa.default();
  serverKoa.subdomainOffset = 1;

  middlewareArray.forEach(middleware => serverKoa.use(middleware));

  return await new Promise(
  (resolve, reject) => {
    let server = _http.default.
    createServer(serverKoa.callback()).
    listen({ port, host }, () => {
      process.emit('service', { serviceName, host, port, status: 'ready', description: 'Server listening' });
      isPortTaken(port).then(_isPortTaken => {
        (0, _assert.default)(!_isPortTaken, `• Failed to run server on ${host}:${port}`);
        resolve({
          name: serviceName,
          connectionHandler: server,

          close: () => new Promise((resolve, reject) => {

            server.close(() => resolve());
            setImmediate(() => server.emit('close'));
          }) });

      });
    }).
    on('connection', socket => {





    });
  });








}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlsaXR5L3NlcnZlci5qcyJdLCJuYW1lcyI6WyJpc1BvcnRUYWtlbiIsInBvcnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRlc3RlciIsIk5ldCIsImNyZWF0ZVNlcnZlciIsIm9uY2UiLCJlcnIiLCJjb2RlIiwiY2xvc2UiLCJsaXN0ZW4iLCJjcmVhdGVIdHRwU2VydmVyIiwic2VydmljZU5hbWUiLCJob3N0IiwibWlkZGxld2FyZUFycmF5Iiwic2VydmVyS29hIiwiS29hIiwic3ViZG9tYWluT2Zmc2V0IiwiZm9yRWFjaCIsIm1pZGRsZXdhcmUiLCJ1c2UiLCJzZXJ2ZXIiLCJodHRwIiwiY2FsbGJhY2siLCJwcm9jZXNzIiwiZW1pdCIsInN0YXR1cyIsImRlc2NyaXB0aW9uIiwidGhlbiIsIl9pc1BvcnRUYWtlbiIsIm5hbWUiLCJjb25uZWN0aW9uSGFuZGxlciIsInNldEltbWVkaWF0ZSIsIm9uIiwic29ja2V0Il0sIm1hcHBpbmdzIjoiNE1BQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE1BQU1BLFdBQVcsR0FBRyxDQUFBQyxJQUFJO0FBQ3RCLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7O0FBRS9CLFFBQU1DLE1BQU0sR0FBR0MsYUFBSUMsWUFBSjtBQUNaQyxFQUFBQSxJQURZLENBQ1AsT0FETyxFQUNFQyxHQUFHLElBQUtBLEdBQUcsQ0FBQ0MsSUFBSixJQUFZLFlBQVosR0FBMkJQLE9BQU8sQ0FBQyxLQUFELENBQWxDLEdBQTRDQyxNQUFNLENBQUNLLEdBQUQsQ0FENUQ7QUFFWkQsRUFBQUEsSUFGWSxDQUVQLFdBRk8sRUFFTSxNQUFNSCxNQUFNLENBQUNHLElBQVAsQ0FBWSxPQUFaLEVBQXFCLE1BQU1MLE9BQU8sQ0FBQyxJQUFELENBQWxDLEVBQTBDUSxLQUExQyxFQUZaO0FBR1pDLEVBQUFBLE1BSFksQ0FHTFgsSUFISyxDQUFmO0FBSUQsQ0FORCxDQURGOztBQVNPLGVBQWVZLGdCQUFmLENBQWdDLEVBQUVDLFdBQUYsRUFBZWIsSUFBZixFQUFxQmMsSUFBSSxHQUFHLFNBQTVCLEVBQXVDQyxlQUF2QyxFQUFoQyxFQUEwRjtBQUMvRixRQUFNQyxTQUFTLEdBQUcsSUFBSUMsWUFBSixFQUFsQjtBQUNBRCxFQUFBQSxTQUFTLENBQUNFLGVBQVYsR0FBNEIsQ0FBNUI7O0FBRUFILEVBQUFBLGVBQWUsQ0FBQ0ksT0FBaEIsQ0FBd0JDLFVBQVUsSUFBSUosU0FBUyxDQUFDSyxHQUFWLENBQWNELFVBQWQsQ0FBdEM7O0FBRUEsU0FBTyxNQUFNLElBQUluQixPQUFKO0FBQ1gsR0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ25CLFFBQUltQixNQUFNLEdBQUdDO0FBQ1ZqQixJQUFBQSxZQURVLENBQ0dVLFNBQVMsQ0FBQ1EsUUFBVixFQURIO0FBRVZiLElBQUFBLE1BRlUsQ0FFSCxFQUFFWCxJQUFGLEVBQVFjLElBQVIsRUFGRyxFQUVhLE1BQU07QUFDNUJXLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLFNBQWIsRUFBd0IsRUFBRWIsV0FBRixFQUFlQyxJQUFmLEVBQXFCZCxJQUFyQixFQUEyQjJCLE1BQU0sRUFBRSxPQUFuQyxFQUE0Q0MsV0FBVyxFQUFFLGtCQUF6RCxFQUF4QjtBQUNBN0IsTUFBQUEsV0FBVyxDQUFDQyxJQUFELENBQVgsQ0FBa0I2QixJQUFsQixDQUF1QkMsWUFBWSxJQUFJO0FBQ3JDLDZCQUFPLENBQUNBLFlBQVIsRUFBdUIsNkJBQTRCaEIsSUFBSyxJQUFHZCxJQUFLLEVBQWhFO0FBQ0FFLFFBQUFBLE9BQU8sQ0FBQztBQUNONkIsVUFBQUEsSUFBSSxFQUFFbEIsV0FEQTtBQUVObUIsVUFBQUEsaUJBQWlCLEVBQUVWLE1BRmI7O0FBSU5aLFVBQUFBLEtBQUssRUFBRSxNQUFNLElBQUlULE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7O0FBRTVDbUIsWUFBQUEsTUFBTSxDQUFDWixLQUFQLENBQWEsTUFBTVIsT0FBTyxFQUExQjtBQUNBK0IsWUFBQUEsWUFBWSxDQUFDLE1BQU1YLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLE9BQVosQ0FBUCxDQUFaO0FBQ0QsV0FKWSxDQUpQLEVBQUQsQ0FBUDs7QUFVRCxPQVpEO0FBYUQsS0FqQlU7QUFrQlZRLElBQUFBLEVBbEJVLENBa0JQLFlBbEJPLEVBa0JPQyxNQUFNLElBQUk7Ozs7OztBQU0zQixLQXhCVSxDQUFiO0FBeUJELEdBM0JVLENBQWI7Ozs7Ozs7OztBQW9DRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0J1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCdcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcydcbmltcG9ydCBOZXQgZnJvbSAnbmV0J1xuaW1wb3J0IEtvYSBmcm9tICdrb2EnIC8vIEtvYSBhcHBsaWNhaXRvbiBzZXJ2ZXJcbi8vIGNoZWNrcyBpZiBwb3J0IGlzIGluIHVzZSwgdG8gdmVyaWZ5IHByb3BlciB3b3JraW5nIG9mIHNlcnZlclxuY29uc3QgaXNQb3J0VGFrZW4gPSBwb3J0ID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBjaGVja3MgaW4gMC4wLjAuMDo8cG9ydD5cbiAgICBjb25zdCB0ZXN0ZXIgPSBOZXQuY3JlYXRlU2VydmVyKClcbiAgICAgIC5vbmNlKCdlcnJvcicsIGVyciA9PiAoZXJyLmNvZGUgPT0gJ0VBRERSSU5VU0UnID8gcmVzb2x2ZShmYWxzZSkgOiByZWplY3QoZXJyKSkpXG4gICAgICAub25jZSgnbGlzdGVuaW5nJywgKCkgPT4gdGVzdGVyLm9uY2UoJ2Nsb3NlJywgKCkgPT4gcmVzb2x2ZSh0cnVlKSkuY2xvc2UoKSlcbiAgICAgIC5saXN0ZW4ocG9ydClcbiAgfSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUh0dHBTZXJ2ZXIoeyBzZXJ2aWNlTmFtZSwgcG9ydCwgaG9zdCA9ICcwLjAuMC4wJywgbWlkZGxld2FyZUFycmF5IH0pIHtcbiAgY29uc3Qgc2VydmVyS29hID0gbmV3IEtvYSgpIC8vIGNyZWF0ZSBLb2Egc2VydmVyXG4gIHNlcnZlcktvYS5zdWJkb21haW5PZmZzZXQgPSAxIC8vIGZvciBsb2NhbGhvc3QgZG9tYWluLlxuICAvLyByZWdpc3RlciBtaWRkbGV3YXJlXG4gIG1pZGRsZXdhcmVBcnJheS5mb3JFYWNoKG1pZGRsZXdhcmUgPT4gc2VydmVyS29hLnVzZShtaWRkbGV3YXJlKSlcblxuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoXG4gICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHNlcnZlciA9IGh0dHBcbiAgICAgICAgLmNyZWF0ZVNlcnZlcihzZXJ2ZXJLb2EuY2FsbGJhY2soKSlcbiAgICAgICAgLmxpc3Rlbih7IHBvcnQsIGhvc3QgfSwgKCkgPT4ge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgnc2VydmljZScsIHsgc2VydmljZU5hbWUsIGhvc3QsIHBvcnQsIHN0YXR1czogJ3JlYWR5JywgZGVzY3JpcHRpb246ICdTZXJ2ZXIgbGlzdGVuaW5nJyB9KVxuICAgICAgICAgIGlzUG9ydFRha2VuKHBvcnQpLnRoZW4oX2lzUG9ydFRha2VuID0+IHtcbiAgICAgICAgICAgIGFzc2VydCghX2lzUG9ydFRha2VuLCBg4oCiIEZhaWxlZCB0byBydW4gc2VydmVyIG9uICR7aG9zdH06JHtwb3J0fWApIC8vIG1ha2Ugc3VyZSBwb3J0IGlzIGluIHVzZSwgYW5kIHNlcnZlciBzdGFydGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIG5hbWU6IHNlcnZpY2VOYW1lLCBcbiAgICAgICAgICAgICAgY29ubmVjdGlvbkhhbmRsZXI6IHNlcnZlciwgXG4gICAgICAgICAgICAgIC8vIHByb3ZpZGUgYSBmdW5jdGlvbiB0byBjbG9zZSB0aGUgc2VydmVyIGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhIHRlY2huaXF1ZSB0byBjbG9zZSB0aGUgc2VydmVyIHdpdGhvdXQgdHJhY2tpbmcgY29ubmVjdGlvbnNcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuY2xvc2UoKCkgPT4gcmVzb2x2ZSgpKVxuICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiBzZXJ2ZXIuZW1pdCgnY2xvc2UnKSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjb25uZWN0aW9uJywgc29ja2V0ID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ1NPQ0tFVCBPUEVORUQnICsgSlNPTi5zdHJpbmdpZnkoc29ja2V0LmFkZHJlc3MoKSkpXG4gICAgICAgICAgLy8gc29ja2V0Lm9uKCdlbmQnLCAoKSA9PiBjb25zb2xlLmluZm8oJ1NPQ0tFVCBFTkQ6IG90aGVyIGVuZCBvZiB0aGUgc29ja2V0IHNlbmRzIGEgRklOIHBhY2tldCcpKVxuICAgICAgICAgIC8vIHNvY2tldC5vbigndGltZW91dCcsICgpID0+IGNvbnNvbGUuaW5mbygnU09DS0VUIFRJTUVPVVQnKSlcbiAgICAgICAgICAvLyBzb2NrZXQub24oJ2Vycm9yJywgZXJyb3IgPT4gY29uc29sZS5pbmZvKCdTT0NLRVQgRVJST1I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpKVxuICAgICAgICAgIC8vIHNvY2tldC5vbignY2xvc2UnLCBoYWRfZXJyb3IgPT4gY29uc29sZS5pbmZvKCdTT0NLRVQgQ0xPU0VELiBJcyBFUlJPUiA/OiAnICsgaGFkX2Vycm9yKSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gLnNldFRpbWVvdXQoMCwgKCkgPT4gY29uc29sZS5sb2coJ0hUVFAgc2VydmVyIGNvbm5lY3Rpb24gc29ja2V0IHdhcyB0aW1lZG91dCAoY29uc29sZS5sb2cgaW4gaHR0cFNlcnZlci5zZXRUaW1lb3V0KSEnKSksXG4gIClcblxuICAvLyBpZiAoc3NsKVxuICAvLyBodHRwc1xuICAvLyAgIC5jcmVhdGVTZXJ2ZXIoeyBrZXk6IHNlcnZpY2VDb25maWcuc3NsLmtleSwgY2VydDogc2VydmljZUNvbmZpZy5zc2wuY2VydCB9LCBzZXJ2ZXJLb2EuY2FsbGJhY2soKSlcbiAgLy8gICAub24oJ2Nvbm5lY3Rpb24nLCBzb2NrZXQgPT4gc29ja2V0LnNldFRpbWVvdXQoMTIwKSlcbiAgLy8gICAubGlzdGVuKDQ0MywgKCkgPT4gY29uc29sZS5sb2coYOKYlSAke3NlcnZpY2VOYW1lfSBsaXN0ZW5pbmcgb24gcG9ydCA0NDNgKSlcbn1cbiJdfQ==