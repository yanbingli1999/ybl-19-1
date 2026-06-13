import { FloatingIsland } from '@/components/FloatingIsland';
import { Toolbar } from '@/components/Toolbar';
import { StatusBar } from '@/components/StatusBar';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useGameStore } from '@/store/useGameStore';

export default function Home() {
  useGameLoop();
  const dayTime = useGameStore((state) => state.dayTime);
  const isNight = dayTime >= 50;

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden transition-colors duration-1000"
      style={{
        background: isNight
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 100%)'
          : 'linear-gradient(180deg, #87CEEB 0%, #B3E5FC 40%, #E0F7FA 100%)',
      }}
    >
      <Clouds isNight={isNight} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        <header className="text-center">
          <h1
            className={`text-4xl font-extrabold mb-2 tracking-tight ${
              isNight ? 'text-white' : 'text-gray-800'
            }`}
            style={{
              textShadow: isNight
                ? '0 2px 20px rgba(99, 102, 241, 0.5)'
                : '0 2px 10px rgba(255,255,255,0.8)',
            }}
          >
            🏝️ 浮岛电网建造
          </h1>
          <p className={`text-sm ${isNight ? 'text-slate-300' : 'text-gray-600'}`}>
            放置风车和建筑，铺设电线，为你的浮岛带来光明！
          </p>
        </header>

        <StatusBar />

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <div className="order-2 lg:order-1 lg:w-56">
            <Toolbar />
          </div>

          <div className="order-1 lg:order-2 flex justify-center items-center py-8">
            <FloatingIsland />
          </div>

          <div className="order-3 lg:w-56 hidden lg:block">
            <GameGuide isNight={isNight} />
          </div>
        </div>

        <footer className="text-center pb-4">
          <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>
            用你的智慧构建一个完美的电力网络 ⚡
          </p>
        </footer>
      </div>
    </div>
  );
}

function Clouds({ isNight }: { isNight: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            width: `${100 + i * 40}px`,
            height: `${40 + i * 15}px`,
            top: `${5 + i * 18}%`,
            left: `${-10 + i * 22}%`,
            background: isNight
              ? 'radial-gradient(ellipse, rgba(148,163,184,0.3) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, white 0%, rgba(255,255,255,0) 70%)',
            animation: `drift ${25 + i * 8}s linear infinite`,
            animationDelay: `${-i * 5}s`,
          }}
        />
      ))}
      {isNight && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </>
      )}
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function GameGuide({ isNight }: { isNight: boolean }) {
  return (
    <div
      className={`rounded-2xl p-4 shadow-xl border backdrop-blur-md ${
        isNight
          ? 'bg-slate-800/80 border-slate-700 text-slate-200'
          : 'bg-white/90 border-white/50 text-gray-700'
      }`}
    >
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">📖 游戏玩法</h3>
      <ul className="text-xs space-y-2">
        <li>
          <span className="inline-block w-4 mr-1">🌀</span>
          <b>风车</b>白天发5电，夜晚发1电
        </li>
        <li>
          <span className="inline-block w-4 mr-1">🏠</span>
          <b>住房</b>消耗2电，提升满意度
        </li>
        <li>
          <span className="inline-block w-4 mr-1">🏭</span>
          <b>工坊</b>消耗4电，生产物资
        </li>
        <li>
          <span className="inline-block w-4 mr-1">🔋</span>
          <b>蓄电池</b>存20电，夜间放电
        </li>
        <li>
          <span className="inline-block w-4 mr-1">⚡</span>
          <b>电线</b>连接建筑，可旋转
        </li>
      </ul>
      <div className="mt-4 pt-3 border-t border-gray-300/30">
        <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-gray-500'}`}>
          💡 保持80%以上建筑供电可获得最高满意度！
        </p>
      </div>
    </div>
  );
}
