"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.renderTemplateUsingKoaViews = exports.renderJsTemplateUsingUnderscore = exports.renderJSImportWebcomponent = exports.renderHTMLImportWebcomponent = exports.renderFileAsJSModule = exports.renderSharedStyle = exports.serveStaticFile = exports.serveServerSideRenderedFile = void 0;var _path = _interopRequireDefault(require("path"));
var _assert = _interopRequireDefault(require("assert"));
var _fs = _interopRequireDefault(require("fs"));



var _koaSendfile = _interopRequireDefault(require("koa-sendfile"));

var symbol = _interopRequireWildcard(require("../symbol.reference.js"));
var renderFile = _interopRequireWildcard(require("../../../functionality/renderFile.js"));













function extractDollarSignKeyword(string) {
  if (string.lastIndexOf('$') == -1) return false;
  let keyword = string.substr(string.lastIndexOf('$') + 1, string.length);
  string = string.substr(0, string.lastIndexOf('$'));
  return { signKeyword: keyword, stringWithRemovedSign: string };
}

const serveServerSideRenderedFile = ({ basePath, filePath, renderType, mimeType = 'application/javascript' } = {}) => async (context, next) => {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);

  filePath || (filePath = context.path);
  basePath || (basePath = '');

  if (!renderType) {
    let { signKeyword, stringWithRemovedSign } = extractDollarSignKeyword(filePath);
    filePath = stringWithRemovedSign;
    renderType || (renderType = signKeyword);
  }

  let absoluteFilePath = _path.default.join(context[symbol.context.clientSideProjectConfig].path, basePath, filePath);

  let functionReference = renderFile[renderType];
  (0, _assert.default)(functionReference, `• function keyword in the url must have an equivalent in the function reference.`);
  context.body = await functionReference({ filePath: absoluteFilePath });
  context.response.type = mimeType;
  await next();
};exports.serveServerSideRenderedFile = serveServerSideRenderedFile;
















const serveStaticFile = ({ filePath, basePath } = {}) =>
async function serveStaticFile(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let absoluteFilePath = _path.default.join(
  context[symbol.context.clientSideProjectConfig].path,
  basePath || '',
  filePath || context.path);

  let fileStats = await (0, _koaSendfile.default)(context, absoluteFilePath);

  if (!fileStats || !fileStats.isFile()) await next();
};exports.serveStaticFile = serveStaticFile;









const renderSharedStyle = ({ filePath, basePath, mimeType = 'application/javascript' }) =>
async function renderSharedStyle(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);

  context.body = await (0, renderFile.convertSharedStylesToJS)({ filePath: absoluteFilePath });
  context.response.type = mimeType;
  await next();
};exports.renderSharedStyle = renderSharedStyle;

const renderFileAsJSModule = ({ filePath, basePath, mimeType = 'application/javascript' }) =>
async function renderFileAsJSModule(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);

  context.body = await (0, renderFile.covertTextFileToJSModule)({ filePath: absoluteFilePath });
  context.response.type = mimeType;
  await next();
};exports.renderFileAsJSModule = renderFileAsJSModule;

const renderHTMLImportWebcomponent = ({ filePath, basePath }) =>
async function renderHTMLImportWebcomponent(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);

  context.body = await (0, renderFile.combineHTMLImportWebcomponent)({ filePath: absoluteFilePath });
  await next();
};exports.renderHTMLImportWebcomponent = renderHTMLImportWebcomponent;

const renderJSImportWebcomponent = ({ filePath, basePath }) =>
async function renderJSImportWebcomponent(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);

  context.body = await (0, renderFile.combineJSImportWebcomponent)({ filePath: absoluteFilePath });
  await next();
};exports.renderJSImportWebcomponent = renderJSImportWebcomponent;


const renderJsTemplateUsingUnderscore = ({ filePath, basePath }) =>
async function renderJsTemplateUsingUnderscore(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);

  try {
    context.body = (0, renderFile.renderTemplateEvaluatingJs)({ filePath: absoluteFilePath, argument: { context } });
    context.response.type = mimeType;
  } catch (error) {
    console.log(error);
    await next();
  }
};exports.renderJsTemplateUsingUnderscore = renderJsTemplateUsingUnderscore;



const renderTemplateUsingKoaViews = ({ filePath, basePath }) =>
async function renderTemplateUsingKoaViews(context, next) {
  (0, _assert.default)(context[symbol.context.clientSideProjectConfig], `• clientSideProjectConfig must be set by a previous middleware.`);
  let clientSidePath = context[symbol.context.clientSideProjectConfig].path;
  let filePath_ = filePath || context.path;
  let absoluteFilePath = _path.default.join(
  clientSidePath,
  basePath || '',
  filePath_);


  if (_fs.default.existsSync(absoluteFilePath) && _fs.default.statSync(absoluteFilePath).isFile()) {
    await context.render(absoluteFilePath, { argument: { context } });
    context.response.type = _path.default.extname(absoluteFilePath);
    await next();
  } else await next();
};exports.renderTemplateUsingKoaViews = renderTemplateUsingKoaViews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jbGllbnRJbnRlcmZhY2UvUkVTVC9taWRkbGV3YXJlL3NlcnZlRmlsZS5qcyJdLCJuYW1lcyI6WyJleHRyYWN0RG9sbGFyU2lnbktleXdvcmQiLCJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImtleXdvcmQiLCJzdWJzdHIiLCJsZW5ndGgiLCJzaWduS2V5d29yZCIsInN0cmluZ1dpdGhSZW1vdmVkU2lnbiIsInNlcnZlU2VydmVyU2lkZVJlbmRlcmVkRmlsZSIsImJhc2VQYXRoIiwiZmlsZVBhdGgiLCJyZW5kZXJUeXBlIiwibWltZVR5cGUiLCJjb250ZXh0IiwibmV4dCIsInN5bWJvbCIsImNsaWVudFNpZGVQcm9qZWN0Q29uZmlnIiwicGF0aCIsImFic29sdXRlRmlsZVBhdGgiLCJqb2luIiwiZnVuY3Rpb25SZWZlcmVuY2UiLCJyZW5kZXJGaWxlIiwiYm9keSIsInJlc3BvbnNlIiwidHlwZSIsInNlcnZlU3RhdGljRmlsZSIsImZpbGVTdGF0cyIsImlzRmlsZSIsInJlbmRlclNoYXJlZFN0eWxlIiwiY2xpZW50U2lkZVBhdGgiLCJmaWxlUGF0aF8iLCJyZW5kZXJGaWxlQXNKU01vZHVsZSIsInJlbmRlckhUTUxJbXBvcnRXZWJjb21wb25lbnQiLCJyZW5kZXJKU0ltcG9ydFdlYmNvbXBvbmVudCIsInJlbmRlckpzVGVtcGxhdGVVc2luZ1VuZGVyc2NvcmUiLCJhcmd1bWVudCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInJlbmRlclRlbXBsYXRlVXNpbmdLb2FWaWV3cyIsImZpbGVzeXN0ZW0iLCJleGlzdHNTeW5jIiwic3RhdFN5bmMiLCJyZW5kZXIiLCJleHRuYW1lIl0sIm1hcHBpbmdzIjoicWhCQUFBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0Esd0JBQVQsQ0FBa0NDLE1BQWxDLEVBQTBDO0FBQ3hDLE1BQUlBLE1BQU0sQ0FBQ0MsV0FBUCxDQUFtQixHQUFu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Z0JBQWIsQ0FBeEI7QUFDQSxVQUFNSixJQUFJLEVBQVY7QUFDRCxHQUpELE1BSU8sTUFBTUEsSUFBSSxFQUFWO0FBQ1IsQ0FoQkksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcbmltcG9ydCBmaWxlc3lzdGVtIGZyb20gJ2ZzJ1xuaW1wb3J0IFN0cmVhbSBmcm9tICdzdHJlYW0nXG5pbXBvcnQgbXVsdGlzdHJlYW0gZnJvbSAnbXVsdGlzdHJlYW0nXG5pbXBvcnQgdW5kZXJzY29yZSBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IHNlbmQgZnJvbSAna29hLXNlbmRmaWxlJyAvLyBTdGF0aWMgZmlsZXMuXG5pbXBvcnQgeyB3cmFwU3RyaW5nU3RyZWFtIH0gZnJvbSAnQGRlcGVuZGVuY3kvaGFuZGxlSlNOYXRpdmVEYXRhU3RydWN0dXJlJ1xuaW1wb3J0ICogYXMgc3ltYm9sIGZyb20gJy4uL3N5bWJvbC5yZWZlcmVuY2UuanMnXG5pbXBvcnQge1xuICBjb252ZXJ0U2hhcmVkU3R5bGVzVG9KUyxcbiAgY292ZXJ0VGV4dEZpbGVUb0pTTW9kdWxlLFxuICByZW5kZXJUZW1wbGF0ZUV2YWx1YXRpbmdKcyxcbiAgcmVuZGVyVGVtcGxhdGVJbnNlcnRpb25Qb3NpdGlvbixcbiAgY29tYmluZUpTSW1wb3J0V2ViY29tcG9uZW50LFxuICBjb21iaW5lSFRNTEltcG9ydFdlYmNvbXBvbmVudCxcbiAgcmVuZGVyR3JhcGhUZW1wbGF0ZSxcbn0gZnJvbSAnLi4vLi4vLi4vZnVuY3Rpb25hbGl0eS9yZW5kZXJGaWxlLmpzJ1xuaW1wb3J0ICogYXMgcmVuZGVyRmlsZSBmcm9tICcuLi8uLi8uLi9mdW5jdGlvbmFsaXR5L3JlbmRlckZpbGUuanMnXG5cbi8qKiBleHRyYWN0IGZ1bmN0aW9uIG5hbWUgZnJvbSBrZXl3b3JkIGZvbGxvd2luZyAkIHNpZ25hdHVyZS5cbiAqIFVzYWdlOiBgaW1wb3J0IGh0bWwgZnJvbSAnLi8uaHRtbCRjb252ZXJ0VGV4dFRvSlNNb2R1bGUnYFxuICovXG5mdW5jdGlvbiBleHRyYWN0RG9sbGFyU2lnbktleXdvcmQoc3RyaW5nKSB7XG4gIGlmIChzdHJpbmcubGFzdEluZGV4T2YoJyQnKSA9PSAtMSkgcmV0dXJuIGZhbHNlXG4gIGxldCBrZXl3b3JkID0gc3RyaW5nLnN1YnN0cihzdHJpbmcubGFzdEluZGV4T2YoJyQnKSArIDEsIHN0cmluZy5sZW5ndGgpIC8vICRmdW5jdGlvbiBleHRyYWN0ZWQgZnJvbSB1cmwgYWZ0ZXIgJyQnIHNpZ25hdHVyZVxuICBzdHJpbmcgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5sYXN0SW5kZXhPZignJCcpKSAvLyByZW1vdmUgZnVuY3Rpb24gbmFtZVxuICByZXR1cm4geyBzaWduS2V5d29yZDoga2V5d29yZCwgc3RyaW5nV2l0aFJlbW92ZWRTaWduOiBzdHJpbmcgfVxufVxuXG5leHBvcnQgY29uc3Qgc2VydmVTZXJ2ZXJTaWRlUmVuZGVyZWRGaWxlID0gKHsgYmFzZVBhdGgsIGZpbGVQYXRoLCByZW5kZXJUeXBlLCBtaW1lVHlwZSA9ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9ID0ge30pID0+IGFzeW5jIChjb250ZXh0LCBuZXh0KSA9PiB7XG4gIGFzc2VydChjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXSwgYOKAoiBjbGllbnRTaWRlUHJvamVjdENvbmZpZyBtdXN0IGJlIHNldCBieSBhIHByZXZpb3VzIG1pZGRsZXdhcmUuYClcblxuICBmaWxlUGF0aCB8fD0gY29udGV4dC5wYXRoIC8vIGEgcHJlZGVmaW5lZCBwYXRoIG9yIGFuIGV4dHJhY3RlZCB1cmwgcGF0aFxuICBiYXNlUGF0aCB8fD0gJycgLy8gYWRkaXRpb25hbCBmb2xkZXIgcGF0aC5cblxuICBpZiAoIXJlbmRlclR5cGUpIHtcbiAgICBsZXQgeyBzaWduS2V5d29yZCwgc3RyaW5nV2l0aFJlbW92ZWRTaWduIH0gPSBleHRyYWN0RG9sbGFyU2lnbktleXdvcmQoZmlsZVBhdGgpXG4gICAgZmlsZVBhdGggPSBzdHJpbmdXaXRoUmVtb3ZlZFNpZ24gLy8gaWYgc2lnbiBleGlzdCB0aGUgYWN0dWFsIGZpbGUgcGF0aCB3b3VsZSBiZSB3aGF0IGNvbWVzIGJlZm9yZSBgLi8uaHRtbCRjb252ZXJ0VGV4dFRvSlNNb2R1bGVgXG4gICAgcmVuZGVyVHlwZSB8fD0gc2lnbktleXdvcmRcbiAgfVxuXG4gIGxldCBhYnNvbHV0ZUZpbGVQYXRoID0gcGF0aC5qb2luKGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLnBhdGgsIGJhc2VQYXRoLCBmaWxlUGF0aClcbiAgLy9UT0RPOiAtIHJlY29uc2lkZXIgdGhlIGZ1bmN0aW9uIGNvbnRleHQgdXNlZCBmb3IgcmVmZXJlbmNpbmcgdGhlIGRvbGxhciBleHRyYWN0ZWQgZnVuY3Rpb24ga2V5d29yZC5cbiAgbGV0IGZ1bmN0aW9uUmVmZXJlbmNlID0gcmVuZGVyRmlsZVtyZW5kZXJUeXBlXSAvLyB0aGUgcmVmZXJlbmNlIGNvbnRleHQgaXMgYWN0dWFsbHkgdGhlIG1vZHVsZSBcInJlbmRlckZpbGUuanNcIlxuICBhc3NlcnQoZnVuY3Rpb25SZWZlcmVuY2UsIGDigKIgZnVuY3Rpb24ga2V5d29yZCBpbiB0aGUgdXJsIG11c3QgaGF2ZSBhbiBlcXVpdmFsZW50IGluIHRoZSBmdW5jdGlvbiByZWZlcmVuY2UuYClcbiAgY29udGV4dC5ib2R5ID0gYXdhaXQgZnVuY3Rpb25SZWZlcmVuY2UoeyBmaWxlUGF0aDogYWJzb2x1dGVGaWxlUGF0aCB9KVxuICBjb250ZXh0LnJlc3BvbnNlLnR5cGUgPSBtaW1lVHlwZVxuICBhd2FpdCBuZXh0KClcbn1cblxuLy8gaW1wb3J0IHNlcnZlclN0YXRpYyBmcm9tICdrb2Etc3RhdGljJyAvLyBTdGF0aWMgZmlsZXMuXG4vLyBpbXBvcnQgbW91bnQgZnJvbSAna29hLW1vdW50J1xuLy8gZXhwb3J0IGxldCBzZXJ2ZXJEaXJlY3RvcnkoKSB7XG4vLyBQcmV2aW91c2x5IHVzZWQgLSBzZXJ2aW5nIGRpcmVjdG9yeVBhdGg6XG4vLyBsZXQgZGlyZWN0b3J5UGF0aCA9IGF3YWl0IHBhdGgucmVzb2x2ZShwYXRoLm5vcm1hbGl6ZShgJHtjb250ZXh0Lmluc3RhbmNlLmNvbmZpZy5jbGllbnRCYXNlUGF0aH0ke3NldHRpbmcuZGlyZWN0b3J5UGF0aH1gKSlcbi8vIGxldCBtb3VudE1pZGRsZXdhcmUgPSBtb3VudChzZXR0aW5nLnVybFBhdGgsIHNlcnZlclN0YXRpYyhgJHtkaXJlY3RvcnlQYXRofWAsIHNldHRpbmcub3B0aW9ucykpXG4vLyB9XG5cbi8qKlxuICogc2VydmUgc3RhdGljIGZpbGUuXG4gKiBAZGVwZW5kZW5jeSB1c2VyYWdlbnREZXRlY3Rpb24gbWlkZGxld2FyZSwgdXNlckFnZW50IG1vZHVsZXNcbiAqIEBwYXJhbSBmaWxlcGF0aCBtYXliZSBhIHBhcnRpYWwgcGF0aCB3aGljaCB1c2VzIGJhc2VQYXRoIHRvIGNyZWF0ZSBhbiBhYnNvbHV0ZSBwYXRoLCBvciBpdCBtYXkgcHJvdmlkZSBhIGZ1bGwgcGF0aCB3aXRob3V0IGJhc2VQYXRoXG4gKiBAcGFyYW0gYmFzZVBhdGggcmVsYXRpdmUgdG8gdGhlIGNsaWVudHNpZGUgc291cmNlL2Rpc3RyaWJ1dGlvbiBwYXRoLlxuICogQHBhcmFtIGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddIGlzIGEgcHJvcGVydHkgY3JlYXRlZCBieSBhIHByZXZpb3VzIHVzZXJhZ2VudERldGVjdGlvbiBtaWRkbGV3YXJlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXJ2ZVN0YXRpY0ZpbGUgPSAoeyBmaWxlUGF0aCwgYmFzZVBhdGggfSA9IHt9KSA9PlxuICBhc3luYyBmdW5jdGlvbiBzZXJ2ZVN0YXRpY0ZpbGUoY29udGV4dCwgbmV4dCkge1xuICAgIGFzc2VydChjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXSwgYOKAoiBjbGllbnRTaWRlUHJvamVjdENvbmZpZyBtdXN0IGJlIHNldCBieSBhIHByZXZpb3VzIG1pZGRsZXdhcmUuYClcbiAgICBsZXQgYWJzb2x1dGVGaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLnBhdGgsXG4gICAgICBiYXNlUGF0aCB8fCAnJywgLy8gYWRkaXRpb25hbCBmb2xkZXIgcGF0aC5cbiAgICAgIGZpbGVQYXRoIHx8IGNvbnRleHQucGF0aCwgLy8gYSBwcmVkZWZpbmVkIHBhdGggb3IgYW4gZXh0cmFjdGVkIHVybCBwYXRoXG4gICAgKVxuICAgIGxldCBmaWxlU3RhdHMgPSBhd2FpdCBzZW5kKGNvbnRleHQsIGFic29sdXRlRmlsZVBhdGgpXG4gICAgLy8gaWYgZmlsZSBkb2Vzbid0IGV4aXN0IHRoZW4gcGFzcyB0byB0aGUgbmV4dCBtaWRkbGV3YXJlLlxuICAgIGlmICghZmlsZVN0YXRzIHx8ICFmaWxlU3RhdHMuaXNGaWxlKCkpIGF3YWl0IG5leHQoKVxuICB9XG5cbi8qKlxuICogc2VydmVycyBzZXJ2ZXJzaWRlIHJlbmRlcmVkIGphdmFzY3JpcHQgYmxvY2tzIG9yIG90aGVyIHJlbmRlcmluZy5cbiAqIEBkZXBlbmRlbmN5IHVzZXJhZ2VudERldGVjdGlvbiBtaWRkbGV3YXJlLCB1c2VyQWdlbnQgbW9kdWxlc1xuICogQGRlcGVuZGVuY3kgdGVtcGxhdGVSZW5kZXJpbmdNaWRkbGV3YXJlIG1pZGRsZXdhcmUsIGtvYS12aWV3cyAmIHVuZGVyc2NvcmUgbW9kdWxlc1xuICogQHBhcmFtIGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddIGlzIGEgcHJvcGVydHkgY3JlYXRlZCBieSBhIHByZXZpb3VzIHVzZXJhZ2VudERldGVjdGlvbiBtaWRkbGV3YXJlXG4gKiBSZXNvdXJjZXM6XG4gKiAtIHJlYWQgc3RyZWFtcyBhbmQgc2VuZCB0aGVtIHVzaW5nIGtvYSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9rb2Fqcy9rb2EvaXNzdWVzLzk0NCBodHRwOi8vYm9vay5taXh1Lm5ldC9ub2RlL2NoOS5odG1sXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXJTaGFyZWRTdHlsZSA9ICh7IGZpbGVQYXRoLCBiYXNlUGF0aCwgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcgfSkgPT5cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyU2hhcmVkU3R5bGUoY29udGV4dCwgbmV4dCkge1xuICAgIGFzc2VydChjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXSwgYOKAoiBjbGllbnRTaWRlUHJvamVjdENvbmZpZyBtdXN0IGJlIHNldCBieSBhIHByZXZpb3VzIG1pZGRsZXdhcmUuYClcbiAgICBsZXQgY2xpZW50U2lkZVBhdGggPSBjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXS5wYXRoXG4gICAgbGV0IGZpbGVQYXRoXyA9IGZpbGVQYXRoIHx8IGNvbnRleHQucGF0aCAvLyBhIHByZWRlZmluZWQgcGF0aCBvciBhbiBleHRyYWN0ZWQgdXJsIHBhdGhcbiAgICBsZXQgYWJzb2x1dGVGaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGNsaWVudFNpZGVQYXRoLFxuICAgICAgYmFzZVBhdGggfHwgJycsIC8vIGFkZGl0aW9uYWwgZm9sZGVyIHBhdGguXG4gICAgICBmaWxlUGF0aF8sXG4gICAgKVxuICAgIGNvbnRleHQuYm9keSA9IGF3YWl0IGNvbnZlcnRTaGFyZWRTdHlsZXNUb0pTKHsgZmlsZVBhdGg6IGFic29sdXRlRmlsZVBhdGggfSlcbiAgICBjb250ZXh0LnJlc3BvbnNlLnR5cGUgPSBtaW1lVHlwZVxuICAgIGF3YWl0IG5leHQoKVxuICB9XG5cbmV4cG9ydCBjb25zdCByZW5kZXJGaWxlQXNKU01vZHVsZSA9ICh7IGZpbGVQYXRoLCBiYXNlUGF0aCwgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcgfSkgPT5cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyRmlsZUFzSlNNb2R1bGUoY29udGV4dCwgbmV4dCkge1xuICAgIGFzc2VydChjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXSwgYOKAoiBjbGllbnRTaWRlUHJvamVjdENvbmZpZyBtdXN0IGJlIHNldCBieSBhIHByZXZpb3VzIG1pZGRsZXdhcmUuYClcbiAgICBsZXQgY2xpZW50U2lkZVBhdGggPSBjb250ZXh0W3N5bWJvbC5jb250ZXh0LmNsaWVudFNpZGVQcm9qZWN0Q29uZmlnXS5wYXRoXG4gICAgbGV0IGZpbGVQYXRoXyA9IGZpbGVQYXRoIHx8IGNvbnRleHQucGF0aCAvLyBhIHByZWRlZmluZWQgcGF0aCBvciBhbiBleHRyYWN0ZWQgdXJsIHBhdGhcbiAgICBsZXQgYWJzb2x1dGVGaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGNsaWVudFNpZGVQYXRoLFxuICAgICAgYmFzZVBhdGggfHwgJycsIC8vIGFkZGl0aW9uYWwgZm9sZGVyIHBhdGguXG4gICAgICBmaWxlUGF0aF8sXG4gICAgKVxuICAgIGNvbnRleHQuYm9keSA9IGF3YWl0IGNvdmVydFRleHRGaWxlVG9KU01vZHVsZSh7IGZpbGVQYXRoOiBhYnNvbHV0ZUZpbGVQYXRoIH0pXG4gICAgY29udGV4dC5yZXNwb25zZS50eXBlID0gbWltZVR5cGVcbiAgICBhd2FpdCBuZXh0KClcbiAgfVxuXG5leHBvcnQgY29uc3QgcmVuZGVySFRNTEltcG9ydFdlYmNvbXBvbmVudCA9ICh7IGZpbGVQYXRoLCBiYXNlUGF0aCB9KSA9PlxuICBhc3luYyBmdW5jdGlvbiByZW5kZXJIVE1MSW1wb3J0V2ViY29tcG9uZW50KGNvbnRleHQsIG5leHQpIHtcbiAgICBhc3NlcnQoY29udGV4dFtzeW1ib2wuY29udGV4dC5jbGllbnRTaWRlUHJvamVjdENvbmZpZ10sIGDigKIgY2xpZW50U2lkZVByb2plY3RDb25maWcgbXVzdCBiZSBzZXQgYnkgYSBwcmV2aW91cyBtaWRkbGV3YXJlLmApXG4gICAgbGV0IGNsaWVudFNpZGVQYXRoID0gY29udGV4dFtzeW1ib2wuY29udGV4dC5jbGllbnRTaWRlUHJvamVjdENvbmZpZ10ucGF0aFxuICAgIGxldCBmaWxlUGF0aF8gPSBmaWxlUGF0aCB8fCBjb250ZXh0LnBhdGggLy8gYSBwcmVkZWZpbmVkIHBhdGggb3IgYW4gZXh0cmFjdGVkIHVybCBwYXRoXG4gICAgbGV0IGFic29sdXRlRmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBjbGllbnRTaWRlUGF0aCxcbiAgICAgIGJhc2VQYXRoIHx8ICcnLCAvLyBhZGRpdGlvbmFsIGZvbGRlciBwYXRoLlxuICAgICAgZmlsZVBhdGhfLFxuICAgIClcbiAgICBjb250ZXh0LmJvZHkgPSBhd2FpdCBjb21iaW5lSFRNTEltcG9ydFdlYmNvbXBvbmVudCh7IGZpbGVQYXRoOiBhYnNvbHV0ZUZpbGVQYXRoIH0pXG4gICAgYXdhaXQgbmV4dCgpXG4gIH1cblxuZXhwb3J0IGNvbnN0IHJlbmRlckpTSW1wb3J0V2ViY29tcG9uZW50ID0gKHsgZmlsZVBhdGgsIGJhc2VQYXRoIH0pID0+XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlckpTSW1wb3J0V2ViY29tcG9uZW50KGNvbnRleHQsIG5leHQpIHtcbiAgICBhc3NlcnQoY29udGV4dFtzeW1ib2wuY29udGV4dC5jbGllbnRTaWRlUHJvamVjdENvbmZpZ10sIGDigKIgY2xpZW50U2lkZVByb2plY3RDb25maWcgbXVzdCBiZSBzZXQgYnkgYSBwcmV2aW91cyBtaWRkbGV3YXJlLmApXG4gICAgbGV0IGNsaWVudFNpZGVQYXRoID0gY29udGV4dFtzeW1ib2wuY29udGV4dC5jbGllbnRTaWRlUHJvamVjdENvbmZpZ10ucGF0aFxuICAgIGxldCBmaWxlUGF0aF8gPSBmaWxlUGF0aCB8fCBjb250ZXh0LnBhdGggLy8gYSBwcmVkZWZpbmVkIHBhdGggb3IgYW4gZXh0cmFjdGVkIHVybCBwYXRoXG4gICAgbGV0IGFic29sdXRlRmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBjbGllbnRTaWRlUGF0aCxcbiAgICAgIGJhc2VQYXRoIHx8ICcnLCAvLyBhZGRpdGlvbmFsIGZvbGRlciBwYXRoLlxuICAgICAgZmlsZVBhdGhfLFxuICAgIClcbiAgICBjb250ZXh0LmJvZHkgPSBhd2FpdCBjb21iaW5lSlNJbXBvcnRXZWJjb21wb25lbnQoeyBmaWxlUGF0aDogYWJzb2x1dGVGaWxlUGF0aCB9KVxuICAgIGF3YWl0IG5leHQoKVxuICB9XG5cbi8vIEltcGxlbWVudGF0aW9uIHVzaW5nIGZpbGVzeXN0ZW0gcmVhZCBhbmQgdW5kZXJzY29yZSB0ZW1wbGF0ZSwgd2l0aCBhIG1pbWUgdHlwZSBlLmcuIGBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0YFxuZXhwb3J0IGNvbnN0IHJlbmRlckpzVGVtcGxhdGVVc2luZ1VuZGVyc2NvcmUgPSAoeyBmaWxlUGF0aCwgYmFzZVBhdGggfSkgPT5cbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVySnNUZW1wbGF0ZVVzaW5nVW5kZXJzY29yZShjb250ZXh0LCBuZXh0KSB7XG4gICAgYXNzZXJ0KGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLCBg4oCiIGNsaWVudFNpZGVQcm9qZWN0Q29uZmlnIG11c3QgYmUgc2V0IGJ5IGEgcHJldmlvdXMgbWlkZGxld2FyZS5gKVxuICAgIGxldCBjbGllbnRTaWRlUGF0aCA9IGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLnBhdGhcbiAgICBsZXQgZmlsZVBhdGhfID0gZmlsZVBhdGggfHwgY29udGV4dC5wYXRoIC8vIGEgcHJlZGVmaW5lZCBwYXRoIG9yIGFuIGV4dHJhY3RlZCB1cmwgcGF0aFxuICAgIGxldCBhYnNvbHV0ZUZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgY2xpZW50U2lkZVBhdGgsXG4gICAgICBiYXNlUGF0aCB8fCAnJywgLy8gYWRkaXRpb25hbCBmb2xkZXIgcGF0aC5cbiAgICAgIGZpbGVQYXRoXyxcbiAgICApXG4gICAgdHJ5IHtcbiAgICAgIGNvbnRleHQuYm9keSA9IHJlbmRlclRlbXBsYXRlRXZhbHVhdGluZ0pzKHsgZmlsZVBhdGg6IGFic29sdXRlRmlsZVBhdGgsIGFyZ3VtZW50OiB7IGNvbnRleHQgfSB9KVxuICAgICAgY29udGV4dC5yZXNwb25zZS50eXBlID0gbWltZVR5cGUgLy8gVE9ETzogZGV0ZWN0IE1JTUUgdHlwZSBhdXRvbWF0aWNhbGx5IGFuZCBzdXBwb3J0IG90aGVyIG1pbWVzLlxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgIGF3YWl0IG5leHQoKVxuICAgIH1cbiAgfVxuXG4vLyBzZXJ2ZSBldmFsdWF0ZWQgZmlsZS4gSW1wbGVtZW50YXRpb24gdXNpbmcgcmVuZGVyIHVzaW5nIHVuZGVybHlpbmcgYHVuZGVyc2NvcmVgIHRocm91Z2ggYGNvbnNvbGlkYXRlYCBtb2R1bGUoZnJhbWV3b3JrIGxpa2UpLlxuLy8gVGFrZXMgaW50byBhY2NvdW50XG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVVc2luZ0tvYVZpZXdzID0gKHsgZmlsZVBhdGgsIGJhc2VQYXRoIH0pID0+XG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlclRlbXBsYXRlVXNpbmdLb2FWaWV3cyhjb250ZXh0LCBuZXh0KSB7XG4gICAgYXNzZXJ0KGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLCBg4oCiIGNsaWVudFNpZGVQcm9qZWN0Q29uZmlnIG11c3QgYmUgc2V0IGJ5IGEgcHJldmlvdXMgbWlkZGxld2FyZS5gKVxuICAgIGxldCBjbGllbnRTaWRlUGF0aCA9IGNvbnRleHRbc3ltYm9sLmNvbnRleHQuY2xpZW50U2lkZVByb2plY3RDb25maWddLnBhdGhcbiAgICBsZXQgZmlsZVBhdGhfID0gZmlsZVBhdGggfHwgY29udGV4dC5wYXRoIC8vIGEgcHJlZGVmaW5lZCBwYXRoIG9yIGFuIGV4dHJhY3RlZCB1cmwgcGF0aFxuICAgIGxldCBhYnNvbHV0ZUZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgY2xpZW50U2lkZVBhdGgsXG4gICAgICBiYXNlUGF0aCB8fCAnJywgLy8gYWRkaXRpb25hbCBmb2xkZXIgcGF0aC5cbiAgICAgIGZpbGVQYXRoXyxcbiAgICApXG5cbiAgICBpZiAoZmlsZXN5c3RlbS5leGlzdHNTeW5jKGFic29sdXRlRmlsZVBhdGgpICYmIGZpbGVzeXN0ZW0uc3RhdFN5bmMoYWJzb2x1dGVGaWxlUGF0aCkuaXNGaWxlKCkpIHtcbiAgICAgIGF3YWl0IGNvbnRleHQucmVuZGVyKGFic29sdXRlRmlsZVBhdGgsIHsgYXJndW1lbnQ6IHsgY29udGV4dCB9IH0pXG4gICAgICBjb250ZXh0LnJlc3BvbnNlLnR5cGUgPSBwYXRoLmV4dG5hbWUoYWJzb2x1dGVGaWxlUGF0aClcbiAgICAgIGF3YWl0IG5leHQoKVxuICAgIH0gZWxzZSBhd2FpdCBuZXh0KClcbiAgfVxuIl19