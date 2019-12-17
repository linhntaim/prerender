"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _dotenvPacked=require("dotenv-packed");var _illuminateSupport=require("illuminate-support");var _render_server=_interopRequireDefault(require("./render_server"));var _prerender_io_server=_interopRequireDefault(require("./prerender_io_server"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}var RenderServerManager=/*#__PURE__*/function(_Manager){_inherits(RenderServerManager,_Manager);function RenderServerManager(){_classCallCheck(this,RenderServerManager);return _possibleConstructorReturn(this,_getPrototypeOf(RenderServerManager).call(this,null))}_createClass(RenderServerManager,[{key:"server",value:function server(){var _server=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;return this.driver(_server)}},{key:"getDefaultDriver",value:function getDefaultDriver(){var defaultServer=(0,_dotenvPacked.getenv)("DEFAULT_SERVER");return defaultServer?defaultServer:"default"}},{key:"createDefaultDriver",value:function createDefaultDriver(){return new _render_server["default"]}},{key:"createPrerenderIoDriver",value:function createPrerenderIoDriver(){return new _prerender_io_server["default"]}},{key:"start",value:function start(){var server=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var s=this.driver(server);return!s||s.start()}}]);return RenderServerManager}(_illuminateSupport.Manager);exports["default"]=RenderServerManager;
//# sourceMappingURL=render_server_manager.js.map