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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Engine\", function() { return Engine; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventManager */ \"./src/core/EventManager.js\");\n\n\n\nclass Engine {\n    constructor() {\n        this._scenesMap = {};\n        this._currentScene = null;\n\n        new _EventManager__WEBPACK_IMPORTED_MODULE_1__[\"EventManager\"](this);\n    }\n\n    startScene(scene) {\n        if (!this._scenesMap[scene]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This scene not found', scene);\n            return;\n        }\n\n        let _scene = this._scenesMap[scene]();\n\n        // _scene.setEngine(this);\n\n        this._currentScene = _scene;\n\n        _scene.clear();\n        _scene.prepare();\n\n        this.gameLoop();\n        // setInterval(() => {\n        //     this.gameLoop();\n        // }, 1000 / 30);\n    }\n\n    gameLoop() {\n        this.clearSceneLayers(this._currentScene);\n\n        const entities = this.sortEntitiesByDepth(this._currentScene.getEntities());\n\n        entities.forEach((entity) => entity.draw());\n\n        this._currentScene.update();\n\n        window.requestAnimationFrame(() => { this.gameLoop() });\n    }\n\n    getCurrentScene() {\n        return this._currentScene;\n    }\n\n    setScenes(scenes) {\n        this._scenesMap = scenes;\n    }\n\n    // // for test\n    // debug() {\n    //     debugger;\n    // }\n\n    getAllScenes() {\n        return this._scenesMap;\n    }\n\n    sortEntitiesByDepth(entities) {\n        return Object.values(entities).sort((entity1, entity2) => {\n            if (entity1.depth < entity2.depth) {\n                return -1;\n            }\n            if (entity1.depth > entity2.depth) {\n                return 1;\n            }\n\n            return 0;\n        });\n    }\n\n    clearSceneLayers(scene) {\n        const layers = Object.values(scene.getLayers());\n\n        layers.forEach((layer) => {\n            layer.context.clearRect(0, 0, layer.element.width, layer.element.height);\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Engine.js?");

/***/ }),

/***/ "./src/core/Entity.js":
/*!****************************!*\
  !*** ./src/core/Entity.js ***!
  \****************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n\n\nclass Entity {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.w = 0;\n        this.h = 0;\n        this.name = null;\n        this.layer = null;\n        this.depth = 0;\n    }\n\n    draw() {\n        throw new Error('method is not implemented');\n    }\n\n    getName() {\n        return this.name;\n    }\n\n    setLayer(layer) {\n        this.layer = layer;\n    }\n\n    destroy() {\n        throw new Error('method is not implemented');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Entity.js?");

/***/ }),

/***/ "./src/core/EventManager.js":
/*!**********************************!*\
  !*** ./src/core/EventManager.js ***!
  \**********************************/
/*! exports provided: EventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventManager\", function() { return EventManager; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n\n\nclass EventManager {\n    constructor(engine) {\n        this._engine = engine;\n\n        let container = document.querySelector('#container');\n\n        container.addEventListener('click', this.onClick.bind(this), false);\n    }\n\n    onClick(event) {\n        let x = event.offsetX;\n        let y = event.offsetY;\n\n        this._engine.getCurrentScene().onClick(x, y);\n\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/EventManager.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n\n\n// мои слои, наша отрисовка слоев\nclass Scene {\n    constructor() {\n        this._layers = {};\n        this._engine = null;\n        this._entities = {};\n        this._entityDepthCount = 0;\n        this._layerDepthCount = 0;\n    }\n\n    clear() {\n        this._layers = {};\n        Scene.getContainer().innerHTML = '';\n    }\n\n    prepare() {\n        throw new Error('method is not implemented');\n    }\n\n    update() {\n        throw new Error('method is not implemented');\n    }\n\n    addLayer(name) {\n        if (this._layers[name]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer already exists', name);\n            return null;\n        }\n\n        const layer = document.createElement('canvas');\n        layer.id = `layer_${name}`;\n        layer.width = 1024;\n        layer.height = 768;\n\n        Scene.getContainer().append(layer);\n\n        this._layerDepthCount += 1;\n\n        this._layers[name] = {\n            element: layer,\n            context: layer.getContext('2d'),\n            depth: this._layerDepthCount\n        };\n\n        return this._layers[name];\n    }\n\n    getLayer(name) {\n        if (!this._layers[name]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer not found', name);\n            return null;\n        }\n\n        return this._layers[name];\n    }\n\n    static getContainer() {\n        return document.querySelector('#container');\n    }\n\n    getLayers() {\n        return this._layers;\n    }\n\n    setEngine(engine) {\n        this._engine = engine;\n    }\n\n    getEntities() {\n        return this._entities;\n    }\n\n    getEntity(name) {\n        if (!this._entities[name]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('Entity not found', name);\n            return null;\n        }\n\n        return this._entities[name];\n    }\n\n    addEntity(entity, layer) {\n        if (this._entities[entity.getName()]) {\n            _core_Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This entity exists', entity);\n            return;\n        }\n\n        entity.setLayer(layer);\n\n        this._entityDepthCount += 1;\n\n        entity.depth = this._entityDepthCount;\n\n        this._entities[entity.getName()] = entity;\n    }\n\n    destroyEntity(entity) {\n        entity.destroy();\n        delete this._entities[entity.getName()];\n    }\n\n    onClick(x, y) {\n        let handleEntity = null;\n\n        let entities = this.getEntities();\n        Object.values(entities).forEach((entity) => {\n            if (this.checkCollision(x, y, entity)) {\n                if (handleEntity === null || this.checkDepth(handleEntity, entity)) {\n                    handleEntity = entity;\n                }\n            }\n        });\n\n        this.handleClick(x, y, handleEntity);\n    }\n\n    checkCollision(x, y, entity) {\n        return x >= entity.x && x <= entity.x + entity.w\n            && y >= entity.y && y <= entity.y + entity.h;\n    }\n\n    checkDepth(handleEntity, entity) {\n        return handleEntity.depth < entity.depth && handleEntity.layer.depth <= entity.layer.depth;\n    }\n\n    handleClick(x, y, entity) {\n        throw new Error(\"Method is not implemented\");\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Scene.js?");

/***/ }),

/***/ "./src/entities/FpsText.js":
/*!*********************************!*\
  !*** ./src/entities/FpsText.js ***!
  \*********************************/
/*! exports provided: FpsText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FpsText\", function() { return FpsText; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass FpsText extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, text) {\n        super();\n\n        this.name = name;\n        this.x = x;\n        this.y = y;\n        this.text = text;\n    }\n\n    draw() {\n        const { context } = this.layer;\n\n        context.fillStyle = '#000';\n        context.fillText(this.text, this.x, this.y);\n    }\n\n    setText(text) {\n        this.text = text;\n    }\n}\n\n//# sourceURL=webpack:///./src/entities/FpsText.js?");

/***/ }),

/***/ "./src/entities/Ship.js":
/*!******************************!*\
  !*** ./src/entities/Ship.js ***!
  \******************************/
/*! exports provided: Ship */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ship\", function() { return Ship; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass Ship extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, size, position) {\n        super();\n        this.name = name;\n        this.x = x;\n        this.y = y;\n        this.w = this.position === 'horizontal' ? this.size * 2 : this.size;\n        this.h = this.position === 'vertical' ? this.size * 2 : this.size;\n        this.position = position;\n        this.size = size;\n        this.color = '#ff2631';\n    }\n\n    draw() {\n        const { context } = this.layer;\n\n        this.w = this.position === 'horizontal' ? this.size * 2 : this.size;\n        this.h = this.position === 'vertical' ? this.size * 2 : this.size;\n\n        context.fillStyle = this.color;\n        context.fillRect(this.x, this.y, this.w, this.h);\n    }\n\n    togglePosition() {\n        if (this.position === 'horizontal') {\n            this.position = 'vertical';\n        } else {\n            this.position = 'horizontal';\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/Ship.js?");

/***/ }),

/***/ "./src/entities/Square.js":
/*!********************************!*\
  !*** ./src/entities/Square.js ***!
  \********************************/
/*! exports provided: Square */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Square\", function() { return Square; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass Square extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, size, color = '#000') {\n        super();\n        this.name = name;\n        this.x = x;\n        this.y = y;\n        this.w = size;\n        this.h = size;\n        this.color = color;\n    }\n\n    draw() {\n        const { context } = this.layer;\n\n        context.fillStyle = this.color;\n        context.fillRect(this.x, this.y, this.w, this.h);\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/entities/Square.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Scene */ \"./src/core/Scene.js\");\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _entities_Square__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/Square */ \"./src/entities/Square.js\");\n/* harmony import */ var _entities_Ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Ship */ \"./src/entities/Ship.js\");\n/* harmony import */ var _entities_FpsText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entities/FpsText */ \"./src/entities/FpsText.js\");\n\n\n\n\n\n\nclass Game extends _core_Scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n    // here private methods\n\n    prepare() {\n        _core_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].debug('Our game');\n        this.layers = {\n            background: this.addLayer('background'),\n            userMap: this.addLayer('userMap')\n        };\n        this.cubeIndex = 0;\n\n        const cube1 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('black_cube', 10, 10, 40);\n        const cube2 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('yellow_cube', 14, 14, 40, '#fcba03');\n        const cube4 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('purple_cube', 22, 22, 40, '#be42eb');\n        const cube5 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('aqua_cube', 26, 26, 40, '#1dd1ce');\n        const cube3 = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"]('green_cube', 18, 18, 40, '#29f705');\n\n        const ship1 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('vertical_ship', 100, 100, 40, 'vertical');\n        const ship2 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('horizontal_ship', 200, 100, 40, 'horizontal');\n\n        this.addEntity(cube1, this.layers.userMap);\n        this.addEntity(cube2, this.layers.userMap);\n\n        this.addEntity(cube4, this.layers.userMap);\n        this.addEntity(cube3, this.layers.userMap);\n\n        this.addEntity(cube5, this.layers.background);\n\n        // our ship\n        this.addEntity(ship1, this.layers.userMap);\n        this.addEntity(ship2, this.layers.userMap);\n\n        this.times = [];\n        this.fps = 0;\n        let fpsText = new _entities_FpsText__WEBPACK_IMPORTED_MODULE_4__[\"FpsText\"]('fps_text', 100, 20, 'FPS: ' + this.fps);\n        this.addEntity(fpsText, this.layers.userMap);\n    }\n\n    update() {\n        this.drawFps();\n    }\n\n    handleClick(x, y, entity) {\n        if (entity) {\n            entity.color = this.getRandomColor();\n\n            if (entity instanceof _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]) {\n                entity.togglePosition();\n            }\n        } else {\n            let cube = new _entities_Square__WEBPACK_IMPORTED_MODULE_2__[\"Square\"](`number${this.cubeIndex}_cube`, x, y, 20, this.getRandomColor());\n            this.addEntity(cube, this.layers.userMap);\n\n            this.cubeIndex++;\n        }\n    }\n\n    drawFps() {\n        const now = performance.now();\n        while (this.times.length > 0 && this.times[0] <= now - 1000) {\n            this.times.shift();\n        }\n        this.times.push(now);\n        this.fps = this.times.length;\n\n        this.getEntity('fps_text').setText('FPS: ' + this.fps);\n    }\n\n    getRandomColor() {\n        let letters = '0123456789ABCDEF';\n        let color = '#';\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

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