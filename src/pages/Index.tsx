import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Screen = 'menu' | 'mode-select' | 'game';
type GameMode = 'single' | 'multiplayer' | null;

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentScreen !== 'game') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 2;
      setIsMoving(true);
      
      switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setPlayerPos(prev => ({ ...prev, y: Math.max(0, prev.y - speed) }));
          setRotation(0);
          break;
        case 's':
        case 'arrowdown':
          setPlayerPos(prev => ({ ...prev, y: Math.min(100, prev.y + speed) }));
          setRotation(180);
          break;
        case 'a':
        case 'arrowleft':
          setPlayerPos(prev => ({ ...prev, x: Math.max(0, prev.x - speed) }));
          setRotation(-90);
          break;
        case 'd':
        case 'arrowright':
          setPlayerPos(prev => ({ ...prev, x: Math.min(100, prev.x + speed) }));
          setRotation(90);
          break;
      }
    };

    const handleKeyUp = () => {
      setIsMoving(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentScreen]);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentScreen('game');
  };

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background via-background to-card p-6">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl">
          GTA V
        </h1>
        <p className="text-muted-foreground text-xl">Mobile Edition</p>
      </div>

      <Button
        size="lg"
        className="w-full max-w-xs text-2xl h-16 bg-primary hover:bg-primary/90 animate-scale-in shadow-lg shadow-primary/50"
        onClick={() => setCurrentScreen('mode-select')}
      >
        <Icon name="Play" className="mr-3" size={28} />
        Играть
      </Button>
    </div>
  );

  const renderModeSelect = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-card p-6">
      <Button
        variant="ghost"
        className="absolute top-6 left-6"
        onClick={() => setCurrentScreen('menu')}
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Назад
      </Button>

      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold mb-3">Выбери режим</h2>
        <p className="text-muted-foreground">Как ты хочешь играть?</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button
          size="lg"
          className="w-full text-xl h-20 bg-secondary hover:bg-secondary/90 animate-scale-in flex-col gap-1"
          onClick={() => startGame('multiplayer')}
        >
          <Icon name="Users" size={32} />
          <span>Мультиплеер</span>
          <span className="text-xs opacity-80">Играй с друзьями онлайн</span>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full text-xl h-20 animate-scale-in flex-col gap-1"
          style={{ animationDelay: '0.1s' }}
          onClick={() => startGame('single')}
        >
          <Icon name="User" size={32} />
          <span>Одиночная игра</span>
          <span className="text-xs opacity-80">Исследуй город самостоятельно</span>
        </Button>
      </div>
    </div>
  );

  const renderGame = () => (
    <div 
      ref={gameRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 overflow-hidden"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px)'
      }}
    >
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-sm z-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="Gamepad2" size={16} className="text-primary" />
          <span className="text-foreground font-medium">
            {gameMode === 'multiplayer' ? 'Мультиплеер' : 'Одиночная игра'}
          </span>
        </div>
        <div className="text-muted-foreground text-xs">
          WASD или стрелки для движения
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm z-10"
        onClick={() => {
          setCurrentScreen('menu');
          setPlayerPos({ x: 50, y: 50 });
        }}
      >
        <Icon name="X" size={20} />
      </Button>

      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-32 h-32 bg-primary/20 rounded-lg"
          style={{ left: '10%', top: '20%' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Building2" size={48} className="text-primary/60" />
          </div>
        </div>

        <div 
          className="absolute w-40 h-40 bg-secondary/20 rounded-lg"
          style={{ right: '15%', top: '30%' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Store" size={56} className="text-secondary/60" />
          </div>
        </div>

        <div 
          className="absolute w-36 h-36 bg-accent/20 rounded-lg"
          style={{ left: '30%', bottom: '20%' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Home" size={52} className="text-accent/60" />
          </div>
        </div>

        <div 
          className="absolute w-28 h-28 bg-green-500/20 rounded-full"
          style={{ right: '25%', bottom: '25%' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Trees" size={40} className="text-green-500/60" />
          </div>
        </div>
      </div>

      <div
        className="absolute w-8 h-8 transition-all duration-100 z-20"
        style={{
          left: `${playerPos.x}%`,
          top: `${playerPos.y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) ${isMoving ? 'scale(1.1)' : 'scale(1)'}`,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-60 animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary to-secondary rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            <Icon name="Car" size={20} className="text-background" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <Icon name="Map" size={16} className="mr-2" />
          Карта
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <Icon name="Radio" size={16} className="mr-2" />
          Радио
        </Button>
        {gameMode === 'multiplayer' && (
          <Button
            size="sm"
            variant="outline"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
          >
            <Icon name="Users" size={16} className="mr-2" />
            Игроки (5)
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      {currentScreen === 'menu' && renderMenu()}
      {currentScreen === 'mode-select' && renderModeSelect()}
      {currentScreen === 'game' && renderGame()}
    </div>
  );
};

export default Index;
