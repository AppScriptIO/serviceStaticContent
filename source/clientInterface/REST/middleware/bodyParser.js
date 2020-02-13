"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.bodyParserMiddleware = void 0;
var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

const bodyParserMiddleware = async (context, next) => {

  if (context.request.method !== 'OPTIONS') {

    await (0, _koaBodyparser.default)()(context, next);
  } else {
    await next();
  }
};exports.bodyParserMiddleware = bodyParserMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jbGllbnRJbnRlcmZhY2UvUkVTVC9taWRkbGV3YXJlL2JvZHlQYXJzZXIuanMiXSwibmFtZXMiOlsiYm9keVBhcnNlck1pZGRsZXdhcmUiLCJjb250ZXh0IiwibmV4dCIsInJlcXVlc3QiLCJtZXRob2QiXSwibWFwcGluZ3MiOiI7QUFDQTs7QUFFTyxNQUFNQSxvQkFBb0IsR0FBRyxPQUFPQyxPQUFQLEVBQWdCQyxJQUFoQixLQUF5Qjs7QUFFM0QsTUFBSUQsT0FBTyxDQUFDRSxPQUFSLENBQWdCQyxNQUFoQixLQUEyQixTQUEvQixFQUEwQzs7QUFFeEMsVUFBTSw4QkFBYUgsT0FBYixFQUFzQkMsSUFBdEIsQ0FBTjtBQUNELEdBSEQsTUFHTztBQUNMLFVBQU1BLElBQUksRUFBVjtBQUNEO0FBQ0YsQ0FSTSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlIGZyb20gJ2NvLWJvZHknIC8vIHRocm93cyBvbiB1bnN1cHBvcnRlZCBjb250ZW50IHR5cGUuXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdrb2EtYm9keXBhcnNlcicgLy8gQnJpbmdzIGV4dHJhIG9wdGlvbiBmb3IgaGFuZGxpbmcgZXJyb3IgYW5kIHVuc3VwcG9ydGVkIGNvbnRlbnQtdHlwZXMuXG5cbmV4cG9ydCBjb25zdCBib2R5UGFyc2VyTWlkZGxld2FyZSA9IGFzeW5jIChjb250ZXh0LCBuZXh0KSA9PiB7XG4gIC8vIHBhcnNlIHJlcXVlc3QgYm9keVxuICBpZiAoY29udGV4dC5yZXF1ZXN0Lm1ldGhvZCAhPT0gJ09QVElPTlMnKSB7XG4gICAgLy8gY29udGV4dC5yZXF1ZXN0LmJvZHkgPSBhd2FpdCBwYXJzZSh7IHJlcTogY29udGV4dC5yZXF1ZXN0IH0pIC8vIGRlYnVnXG4gICAgYXdhaXQgYm9keVBhcnNlcigpKGNvbnRleHQsIG5leHQpIC8vIHNhbWUgYXMgY28tYm9keSBidXQgc2tpcHMgY28tYm9keSBwYXJzZXIgZm9yIHVuc3VwcG9ydGVkIGNvbnRlbnQtdHlwZSwgd2hpY2ggcHJldmVudHMgY28tYm9keSBmcm9tIHRocm93aW5nIGVycm9yLlxuICB9IGVsc2Uge1xuICAgIGF3YWl0IG5leHQoKVxuICB9XG59XG4iXX0=