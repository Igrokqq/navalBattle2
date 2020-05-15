/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Engine.js":
/*!****************************!*\
  !*** ./src/core/Engine.js ***!
  \****************************/
/*! exports provided: Engine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Engine\", function() { return Engine; });\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n\n\nclass Engine {\n    constructor() {\n        this._scenesMap = {};\n        this._currentScene = null;\n        this._entities = {};\n        this._depthCount = 0;\n    }\n\n    startScene(scene) {\n        if (!this._scenesMap[scene]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This scene not found', scene);\n            return;\n        }\n\n        let _scene = this._scenesMap[scene]();\n\n        _scene.setEngine(this);\n\n        this._currentScene = _scene;\n\n        _scene.clear();\n        _scene.prepare();\n        window.requestAnimationFrame(() => {\n            this.clearSceneLayers(_scene);\n\n            const entities = this.sortEntitiesByDepth();\n\n            entities.forEach((entity) => entity.draw());\n        });\n    }\n\n    getCurrentScene() {\n        return this._currentScene;\n    }\n\n    setScenes(scenes) {\n        this._scenesMap = scenes;\n    }\n\n    // // for test\n    // debug() {\n    //     debugger;\n    // }\n\n    getAllScenes() {\n        return this._scenesMap;\n    }\n\n    addEntity(entity, layer) {\n        if (this._entities[entity.getName()]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This entity exists', entity);\n            return;\n        }\n\n        entity.setLayer(layer);\n\n        this._depthCount += 1;\n\n        entity.zIndex = this._depthCount;\n\n        this._entities[entity.getName()] = entity;\n    }\n\n    destroyEntity(entity) {\n        entity.destroy();\n        delete this._entities[entity.getName()];\n    }\n\n    sortEntitiesByDepth() {\n        return Object.values(this._entities).sort((entity1, entity2) => {\n            if (entity1.zIndex < entity2.zIndex) {\n                return -1;\n            }\n            if (entity1.zIndex > entity2.zIndex) {\n                return 1;\n            }\n\n            return 0;\n        });\n    }\n\n    clearSceneLayers(scene) {\n        const layers = Object.values(scene.getLayers());\n\n        layers.forEach((layer) => {\n            layer.context.clearRect(0, 0, layer.element.width, layer.element.height);\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Engine.js?");

/***/ }),

/***/ "./src/core/Entity.js":
/*!****************************!*\
  !*** ./src/core/Entity.js ***!
  \****************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n\n\nclass Entity {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.w = 0;\n        this.h = 0;\n        this.name = null;\n        this.layer = null;\n        this.zIndex = 0;\n    }\n\n    draw() {\n        throw new Error('method is not implemented');\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    setLayer(layer) {\n        this.layer = layer;\n    }\n\n    destroy() {\n        throw new Error('method is not implemented');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Entity.js?");

/***/ }),

/***/ "./src/core/Logger.js":
/*!****************************!*\
  !*** ./src/core/Logger.js ***!
  \****************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Logger\", function() { return Logger; });\nclass Logger {\n    static info(message, context) {\n        window.console.log(`[info]: ${message}`, context);\n    }\n\n    static error(message, context) {\n        window.console.log(`[error]: ${message}`, context);\n    }\n\n    static debug(message, context) {\n        window.console.log(`[debug]: ${message}`, context);\n    }\n\n    static debugger() {\n        debugger;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Logger.js?");

/***/ }),

/***/ "./src/core/Scene.js":
/*!***************************!*\
  !*** ./src/core/Scene.js ***!
  \***************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n\n\n// мои слои, наша отрисовка слоев\nclass Scene {\n    constructor() {\n        this._layers = {};\n        this._engine = null;\n    }\n\n    clear() {\n        this._layers = {};\n        Scene.getContainer().innerHTML = '';\n    }\n\n    prepare() {\n        throw new Error('method is not implemented');\n    }\n\n    update() {\n        throw new Error('method is not implemented');\n    }\n\n    addLayer(name) {\n        if (this._layers[name]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer already exists', name);\n            return null;\n        }\n\n        const layer = document.createElement('canvas');\n        layer.id = `layer_${name}`;\n        layer.width = 1024;\n        layer.height = 768;\n\n        Scene.getContainer().append(layer);\n\n        this._layers[name] = {\n            element: layer,\n            context: layer.getContext('2d'),\n        };\n\n        return this._layers[name];\n    }\n\n    getLayer(name) {\n        if (!this._layers[name]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer not found', name);\n            return null;\n        }\n\n        return this._layers[name];\n    }\n\n    static getContainer() {\n        return document.querySelector('#container');\n    }\n\n    getLayers() {\n        return this._layers;\n    }\n\n    setEngine(engine) {\n        this._engine = engine;\n    }\n\n    addEntity(entity, layer) {\n        this._engine.addEntity(entity, layer);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Scene.js?");

/***/ }),

/***/ "./src/entities/Ship.js":
/*!******************************!*\
  !*** ./src/entities/Ship.js ***!
  \******************************/
/*! exports provided: Ship */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ship\", function() { return Ship; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass Ship extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, size, position) {\n        super();\n        this.name = name;\n        this.x = x;\n        this.y = y;\n        this.w = position === 'horizontal' ? size * 2 : size;\n        this.h = position === 'vertical' ? size * 2 : size;\n        this.position = position;\n    }\n\n    draw() {\n        const { context } = this.layer;\n\n        // context.rect(this.x, this.y, this.w, this.h);\n\n        context.fillStyle = this.color;\n        context.fillRect(this.x, this.y, this.w, this.h);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/Ship.js?");

/***/ }),

/***/ "./src/entities/Square.js":
/*!********************************!*\
  !*** ./src/entities/Square.js ***!
  \********************************/
/*! exports provided: Square */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Square\", function() { return Square; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass Square extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, size, color = '#000') {\n        super();\n        this.name = name;\n        this.x = x;\n        this.y = y;\n        this.w = size;\n        this.h = size;\n        this.color = color;\n    }\n\n    draw() {\n        const { context } = this.layer;\n\n        // context.rect(this.x, this.y, this.w, this.h);\n\n        context.fillStyle = this.color;\n        context.fillRect(this.x, this.y, this.w, this.h);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/Square.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Engine */ \"./src/core/Engine.js\");\n/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Game */ \"./src/scenes/Game.js\");\n/* harmony import */ var _scenes_Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Menu */ \"./src/scenes/Menu.js\");\n\n\n\n\nconst engine = new _core_Engine__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"]();\n\nengine.setScenes({\n    game: () => new _scenes_Game__WEBPACK_IMPORTED_MODULE_1__[\"Game\"](),\n    menu: () => new _scenes_Menu__WEBPACK_IMPORTED_MODULE_2__[\"Menu\"](),\n});\n\nengine.startScene('game');\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Scene */ \"./src/core/Scene.js\");\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _entities_Square__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/Square */ \"./src/entities/Square.js\");\n/* harmony import */ var _entities_Ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Ship */ \"./src/entities/Ship.js\");\n\n\n\n\n\nclass Game extends _core_Scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n    // here private methods\n\n    prepare() {\n        _core_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].debug('Our game');\n        const background = this.addLayer('background');\n        const userMap = this.addLayer('userMap');\n\n        const cube1 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('cube1', 10, 10, 40);\n        const cube2 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('cube2', 14, 14, 40, '#fcba03');\n        const cube3 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('cube3', 18, 18, 40, '#29f705');\n        const cube4 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('cube4', 22, 22, 40, '#be42eb');\n        const cube5 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('cube5', 26, 26, 40, '#1dd1ce');\n\n        const ship1 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship1', 100, 100, 40, 'vertical');\n        const ship2 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship2', 200, 100, 40, 'horizontal');\n\n        this.addEntity(cube1, background);\n        this.addEntity(cube2, background);\n        this.addEntity(cube3, background);\n        this.addEntity(cube4, background);\n        this.addEntity(cube5, background);\n\n        // our ship\n        this.addEntity(ship1, background);\n        this.addEntity(ship2, background);\n        // new Square('cube1', background, 10, 10);\n\n        // const cube1 = new Square('cube1');\n        //\n\n        // // what? what are your name? pixels? layer?\n        // this.addEntity(new Square('cube1'), 10, 10, 'background');\n        //\n        // // what? where? pixels?\n        //name layout, x|y\n        //\n        // new Square('cube1', 'background', 10, 10);\n        //\n        // new Square('cube1', this, 10, 10);\n    }\n\n    update() {\n    }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

/***/ }),

/***/ "./src/scenes/Menu.js":
/*!****************************!*\
  !*** ./src/scenes/Menu.js ***!
  \****************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Menu\", function() { return Menu; });\n/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Scene */ \"./src/core/Scene.js\");\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n\n\n\nclass Menu extends _core_Scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n    draw() {\n        _core_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].debug('Menu');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Menu.js?");

/***/ })

/******/ });