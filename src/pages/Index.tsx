import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Screen = 'menu' | 'customize' | 'map' | 'gameplay' | 'players';

interface Player {
  id: number;
  name: string;
  level: number;
  online: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [character, setCharacter] = useState({
    skin: 0,
    hair: 0,
    clothes: 0,
  });
  const [players] = useState<Player[]>([
    { id: 1, name: 'Niko', level: 45, online: true },
    { id: 2, name: 'CJ', level: 38, online: true },
    { id: 3, name: 'Tommy', level: 52, online: false },
    { id: 4, name: 'Franklin', level: 41, online: true },
    { id: 5, name: 'Trevor', level: 49, online: true },
  ]);

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-card p-6">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          STREET LIFE
        </h1>
        <p className="text-muted-foreground text-lg">Mobile Edition</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          size="lg"
          className="w-full text-lg h-14 bg-primary hover:bg-primary/90 animate-scale-in"
          onClick={() => setCurrentScreen('customize')}
        >
          <Icon name="User" className="mr-2" size={24} />
          Персонаж
        </Button>

        <Button
          size="lg"
          variant="secondary"
          className="w-full text-lg h-14 animate-scale-in"
          style={{ animationDelay: '0.1s' }}
          onClick={() => setCurrentScreen('map')}
        >
          <Icon name="Map" className="mr-2" size={24} />
          Карта
        </Button>

        <Button
          size="lg"
          className="w-full text-lg h-14 bg-accent hover:bg-accent/90 animate-scale-in"
          style={{ animationDelay: '0.2s' }}
          onClick={() => setCurrentScreen('gameplay')}
        >
          <Icon name="Gamepad2" className="mr-2" size={24} />
          Играть
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full text-lg h-14 animate-scale-in"
          style={{ animationDelay: '0.3s' }}
          onClick={() => setCurrentScreen('players')}
        >
          <Icon name="Users" className="mr-2" size={24} />
          Игроки онлайн
        </Button>
      </div>
    </div>
  );

  const renderCustomize = () => (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => setCurrentScreen('menu')}
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Назад
      </Button>

      <h2 className="text-3xl font-bold mb-6 text-center">Кастомизация</h2>

      <div className="max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-scale-in">
            <Icon name="User" size={64} className="text-background" />
          </div>
        </div>

        <Card className="p-6 space-y-6 bg-card border-border">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Внешность: Вариант {character.skin + 1}
            </label>
            <Slider
              value={[character.skin]}
              onValueChange={([value]) => setCharacter({ ...character, skin: value })}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Прическа: Вариант {character.hair + 1}
            </label>
            <Slider
              value={[character.hair]}
              onValueChange={([value]) => setCharacter({ ...character, hair: value })}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Одежда: Стиль {character.clothes + 1}
            </label>
            <Slider
              value={[character.clothes]}
              onValueChange={([value]) => setCharacter({ ...character, clothes: value })}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
            Сохранить
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => setCurrentScreen('menu')}
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Назад
      </Button>

      <h2 className="text-3xl font-bold mb-6 text-center">Карта города</h2>

      <Tabs defaultValue="downtown" className="max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="downtown">Центр</TabsTrigger>
          <TabsTrigger value="suburbs">Пригород</TabsTrigger>
          <TabsTrigger value="docks">Порт</TabsTrigger>
        </TabsList>

        <TabsContent value="downtown" className="space-y-4 mt-6">
          <Card className="p-6 bg-card hover-scale cursor-pointer border-primary/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Небоскребы</h3>
                <p className="text-sm text-muted-foreground">Деловой квартал</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card hover-scale cursor-pointer border-accent/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Icon name="Store" size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Торговый центр</h3>
                <p className="text-sm text-muted-foreground">Магазины и развлечения</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suburbs" className="space-y-4 mt-6">
          <Card className="p-6 bg-card hover-scale cursor-pointer border-secondary/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Icon name="Home" size={24} className="text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Жилые районы</h3>
                <p className="text-sm text-muted-foreground">Спокойные улицы</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card hover-scale cursor-pointer border-primary/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Trees" size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Парк</h3>
                <p className="text-sm text-muted-foreground">Зеленая зона</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="docks" className="space-y-4 mt-6">
          <Card className="p-6 bg-card hover-scale cursor-pointer border-accent/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Icon name="Anchor" size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Порт</h3>
                <p className="text-sm text-muted-foreground">Грузовые склады</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card hover-scale cursor-pointer border-secondary/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Icon name="Warehouse" size={24} className="text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Склады</h3>
                <p className="text-sm text-muted-foreground">Промзона</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderGameplay = () => (
    <div className="min-h-screen bg-gradient-to-b from-background to-card p-6 flex flex-col">
      <Button
        variant="ghost"
        className="mb-6 self-start"
        onClick={() => setCurrentScreen('menu')}
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Назад
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="w-full bg-card border-2 border-primary/30 rounded-2xl p-8 mb-8 min-h-[400px] flex items-center justify-center animate-fade-in">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Car" size={48} className="text-background" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Игровая зона</h3>
              <p className="text-muted-foreground">
                Захватывающее открытое пространство для приключений
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <Button
            size="lg"
            variant="outline"
            className="h-16 flex flex-col gap-1"
          >
            <Icon name="Zap" size={24} />
            <span className="text-xs">Спринт</span>
          </Button>

          <Button
            size="lg"
            className="h-16 flex flex-col gap-1 bg-primary hover:bg-primary/90"
          >
            <Icon name="Target" size={24} />
            <span className="text-xs">Действие</span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-16 flex flex-col gap-1"
          >
            <Icon name="Crosshair" size={24} />
            <span className="text-xs">Прицел</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPlayers = () => (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => setCurrentScreen('menu')}
      >
        <Icon name="ArrowLeft" className="mr-2" size={20} />
        Назад
      </Button>

      <h2 className="text-3xl font-bold mb-6 text-center">Игроки онлайн</h2>

      <div className="max-w-md mx-auto space-y-3">
        {players.map((player, index) => (
          <Card
            key={player.id}
            className="p-4 bg-card hover-scale cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="User" size={24} className="text-background" />
                  </div>
                  {player.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Уровень {player.level}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant={player.online ? 'default' : 'outline'}
                disabled={!player.online}
                className={player.online ? 'bg-primary hover:bg-primary/90' : ''}
              >
                {player.online ? 'Играть' : 'Оффлайн'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      {currentScreen === 'menu' && renderMenu()}
      {currentScreen === 'customize' && renderCustomize()}
      {currentScreen === 'map' && renderMap()}
      {currentScreen === 'gameplay' && renderGameplay()}
      {currentScreen === 'players' && renderPlayers()}
    </div>
  );
};

export default Index;
