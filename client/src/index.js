import { Game } from './core/Game';
import { Game as GameScene } from './scenes/Game';
import { Menu } from './scenes/Menu';

const game = new Game().getInstance();

game.setScenes({
    game: () => new GameScene(),
    menu: () => new Menu(),
});

game.startScene('game');
