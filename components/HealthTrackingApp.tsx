import React, { useState, useEffect } from 'react';
import { Calendar, Target, Zap, Award, TrendingUp, Bell, User, Settings, Heart, Activity } from 'lucide-react';

const HealthTrackingApp = () => {
  const [currentUser, setCurrentUser] = useState('BOB');
  const [todayData, setTodayData] = useState({
    date: new Date().toISOString().split('T')[0],
    noSugar: false,
    noAlcohol: false,
    noFoodAfter19: false,
    lastMealTime: '',
    trainingDone: false,
    trainingType: '',
    steps: 0,
    morningRoutine: false,
    caloriesLogged: false,
    sauna: false,
    supplementsTaken: false,
    weight: null,
    bodyFat: null,
    subjectiveRating: 5,
    energyLevel: 5,
    sleepQuality: 5,
    notes: ''
  });

  const [weeklyStats, setWeeklyStats] = useState({
    BOB: { points: 45, totalPossible: 63, perfectDays: 2, weight: 82.5, bodyFat: 19.2 },
    PAULA: { points: 52, totalPossible: 63, perfectDays: 3, weight: 71.2, bodyFat: 22.1 }
  });

  const [supplements] = useState([
    { name: 'Omega-3', timing: 'Rano', taken: false, person: 'BOTH' },
    { name: 'Witamina D3', timing: 'Rano', taken: false, person: 'BOTH' },
    { name: 'Magnez', timing: 'Wieczór', taken: false, person: 'BOTH' },
    { name: 'Kreatyna', timing: 'Rano', taken: false, person: 'BOTH' },
    { name: 'L-karnityna', timing: 'Przed treningiem', taken: false, person: 'BOB' },
    { name: 'Białko serwatkowe', timing: 'Po treningu', taken: false, person: 'PAULA' }
  ]);

  // Simulate Withings data sync
  useEffect(() => {
    const syncWithingsData = () => {
      // Simulate API call
      setTimeout(() => {
        setTodayData(prev => ({
          ...prev,
          weight: currentUser === 'BOB' ? 82.3 : 71.0,
          bodyFat: currentUser === 'BOB' ? 19.1 : 22.3,
          steps: Math.floor(Math.random() * 15000) + 5000
        }));
      }, 1000);
    };
    
    syncWithingsData();
  }, [currentUser]);

  const calculateDietScore = () => {
    return (todayData.noSugar ? 1 : 0) + 
           (todayData.noAlcohol ? 1 : 0) + 
           (todayData.noFoodAfter19 ? 1 : 0);
  };

  const calculateTrainingScore = () => {
    return (todayData.trainingDone ? 1 : 0) + 
           (todayData.steps >= 10000 ? 1 : 0) + 
           (todayData.morningRoutine ? 1 : 0);
  };

  const calculateOtherScore = () => {
    return (todayData.caloriesLogged ? 1 : 0) + 
           (todayData.sauna ? 1 : 0) + 
           (todayData.supplementsTaken ? 1 : 0);
  };

  const totalScore = calculateDietScore() + calculateTrainingScore() + calculateOtherScore();
  const isPerfectDay = totalScore === 9;

  const getProgressColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const userStats = weeklyStats[currentUser];
  const competitorStats = weeklyStats[currentUser === 'BOB' ? 'PAULA' : 'BOB'];
  const competitorName = currentUser === 'BOB' ? 'PAULA' : 'BOB';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg">{currentUser}</h1>
              <p className="text-sm text-gray-300">Week 3 • Day 18</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentUser(currentUser === 'BOB' ? 'PAULA' : 'BOB')}
            className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Switch to {currentUser === 'BOB' ? 'PAULA' : 'BOB'}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Today's Score */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Progress</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${isPerfectDay ? 'bg-green-500' : 'bg-gray-600'}`}>
              {totalScore}/9 pts
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(totalScore, 9)}`}
              style={{ width: `${(totalScore / 9) * 100}%` }}
            ></div>
          </div>

          {isPerfectDay && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <Award className="text-green-400" size={20} />
                <span className="text-green-400 font-semibold">Perfect Day! 🔥</span>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{calculateDietScore()}/3</div>
              <div className="text-xs text-gray-400">Diet</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{calculateTrainingScore()}/3</div>
              <div className="text-xs text-gray-400">Training</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{calculateOtherScore()}/3</div>
              <div className="text-xs text-gray-400">Other</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="font-bold mb-4">Quick Check-in</h3>
          
          {/* Diet Section */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-blue-400">DIET</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.noSugar}
                  onChange={(e) => setTodayData(prev => ({...prev, noSugar: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>❌🍭 No sugar today</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.noAlcohol}
                  onChange={(e) => setTodayData(prev => ({...prev, noAlcohol: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>❌🍺 No alcohol today</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.noFoodAfter19}
                  onChange={(e) => setTodayData(prev => ({...prev, noFoodAfter19: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>❌🌙 No food after 19:00</span>
              </label>
            </div>
          </div>

          {/* Training Section */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-green-400">TRAINING</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.trainingDone}
                  onChange={(e) => setTodayData(prev => ({...prev, trainingDone: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>💪 Training completed</span>
              </label>
              <div className="flex items-center space-x-3">
                <Activity size={20} className="text-green-400" />
                <span>🚶 Steps: {todayData.steps?.toLocaleString() || 0}/10,000</span>
                {todayData.steps >= 10000 && <span className="text-green-400">✅</span>}
              </div>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.morningRoutine}
                  onChange={(e) => setTodayData(prev => ({...prev, morningRoutine: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>🌅 Morning routine</span>
              </label>
            </div>
          </div>

          {/* Other Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-purple-400">OTHER</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.caloriesLogged}
                  onChange={(e) => setTodayData(prev => ({...prev, caloriesLogged: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>📊 Calories logged</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.sauna}
                  onChange={(e) => setTodayData(prev => ({...prev, sauna: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>🔥 Sauna session</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={todayData.supplementsTaken}
                  onChange={(e) => setTodayData(prev => ({...prev, supplementsTaken: e.target.checked}))}
                  className="w-5 h-5 rounded"
                />
                <span>💊 Supplements taken</span>
              </label>
            </div>
          </div>
        </div>

        {/* Withings Data */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Today's Metrics</h3>
            <div className="flex items-center space-x-2 text-sm text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live sync</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {todayData.weight ? `${todayData.weight}kg` : '--'}
              </div>
              <div className="text-xs text-gray-400">Weight</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {todayData.bodyFat ? `${todayData.bodyFat}%` : '--'}
              </div>
              <div className="text-xs text-gray-400">Body Fat</div>
            </div>
          </div>

          {/* Goal Progress */}
          <div className="mt-4 p-3 bg-black/20 rounded-lg">
            <div className="text-sm font-semibold mb-2">
              Goal Progress: {currentUser === 'BOB' ? '21% → 15%' : '→ 69kg'}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ 
                  width: currentUser === 'BOB' 
                    ? `${((21 - (todayData.bodyFat || 19.1)) / 6) * 100}%` 
                    : `${(((todayData.weight || 71.0) - 65) / 4) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Competition */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <h3 className="font-bold mb-4 flex items-center space-x-2">
            <Award className="text-yellow-400" size={20} />
            <span>BOB vs PAULA</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Weekly Score</span>
                <span className="text-sm text-gray-400">This Week</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm">BOB</div>
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 bg-blue-500 rounded-full"
                      style={{ width: `${(userStats.points / userStats.totalPossible) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-bold">{Math.round((userStats.points / userStats.totalPossible) * 100)}%</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm">PAULA</div>
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 bg-pink-500 rounded-full"
                      style={{ width: `${(competitorStats.points / competitorStats.totalPossible) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-bold">{Math.round((competitorStats.points / competitorStats.totalPossible) * 100)}%</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-center">
              <div>
                <div className="text-xl font-bold text-blue-400">{userStats.perfectDays}</div>
                <div className="text-xs text-gray-400">BOB Perfect Days</div>
              </div>
              <div>
                <div className="text-xl font-bold text-pink-400">{competitorStats.perfectDays}</div>
                <div className="text-xs text-gray-400">PAULA Perfect Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-green-400" size={20} />
            <h3 className="font-bold">AI Insights</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-black/20 rounded-lg">
              <p className="text-green-400 font-semibold">Great progress! 📈</p>
              <p className="text-gray-300">Your body fat is dropping 0.3% per week. At this rate, you'll hit 15% in 8 weeks.</p>
            </div>
            
            <div className="p-3 bg-black/20 rounded-lg">
              <p className="text-blue-400 font-semibold">Pattern detected 🔍</p>
              <p className="text-gray-300">Your best training days follow 7+ hours of sleep. Consider earlier bedtime.</p>
            </div>
            
            <div className="p-3 bg-black/20 rounded-lg">
              <p className="text-purple-400 font-semibold">Supplement optimization 💊</p>
              <p className="text-gray-300">L-carnityna shows best results when taken 30min before cardio. Adjust timing?</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex justify-around">
              <button className="flex flex-col items-center space-y-1 text-white">
                <Calendar size={20} />
                <span className="text-xs">Today</span>
              </button>
              <button className="flex flex-col items-center space-y-1 text-gray-400">
                <TrendingUp size={20} />
                <span className="text-xs">Analytics</span>
              </button>
              <button className="flex flex-col items-center space-y-1 text-gray-400">
                <Heart size={20} />
                <span className="text-xs">Supplements</span>
              </button>
              <button className="flex flex-col items-center space-y-1 text-gray-400">
                <Settings size={20} />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrackingApp;
