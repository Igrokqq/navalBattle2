import { Engine } from './core/Engine';
import { Game as GameScene } from './scenes/Game';
import { Menu } from './scenes/Menu';

const engine = new Engine();

engine.setScenes({
    game: () => new GameScene(),
    menu: () => new Menu(),
});

engine.startScene('game');
