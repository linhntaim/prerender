"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _dotenvPacked=require("dotenv-packed");var _prerender=_interopRequireDefault(require("prerender"));var _render_server=_interopRequireDefault(require("./render_server"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}var PrerenderIoServer=/*#__PURE__*/function(_RenderServer){_inherits(PrerenderIoServer,_RenderServer);function PrerenderIoServer(){_classCallCheck(this,PrerenderIoServer);return _possibleConstructorReturn(this,_getPrototypeOf(PrerenderIoServer).call(this))}_createClass(PrerenderIoServer,[{key:"start",value:function start(){var _this=this;this.server=(0,_prerender["default"])(this.loadConfigurations());this.loadPlugins().forEach(function(plugin){_this.server.use(_prerender["default"][plugin]())});this.server.start();return true}},{key:"loadConfigurations",value:function loadConfigurations(){var env=(0,_dotenvPacked.getenv)();var config={port:"PORT",chromeLocation:"CHROME_LOCATION",chromeFlags:"CHROME_FLAGS",logRequests:"LOG_REQUESTS",pageDoneCheckInterval:"PAGE_DONE_CHECK_INTERVAL",pageLoadTimeout:"PAGE_LOAD_TIMEOUT",waitAfterLastRequest:"WAIT_AFTER_LAST_REQUEST",followRedirects:"FOLLOW_REDIRECTS"};for(var key in config){if(env.hasOwnProperty(config[key])){config[key]=env[config[key]]}else delete config[key]}return config}},{key:"loadPlugins",value:function loadPlugins(){var env=(0,_dotenvPacked.getenv)();return env.hasOwnProperty("USE_PLUGINS")?env["USE_PLUGINS"]:[]}}]);return PrerenderIoServer}(_render_server["default"]);exports["default"]=PrerenderIoServer;
//# sourceMappingURL=prerender_io_server.js.map