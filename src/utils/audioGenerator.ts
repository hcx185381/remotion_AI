/**
 * Remotion 音频生成工具
 * 使用 Web Audio API 生成简单音效
 */

export const generateBeep = (frequency: number, duration: number) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

/**
 * 生成产品展示音效序列
 */
export const playProductRevealSound = () => {
  // 低频开始
  generateBeep(200, 0.3);

  // 逐渐升高
  setTimeout(() => generateBeep(400, 0.2), 150);
  setTimeout(() => generateBeep(600, 0.2), 300);

  // 高频结束
  setTimeout(() => generateBeep(800, 0.4), 450);
};

/**
 * 生成转场音效
 */
export const playTransitionSound = () => {
  generateBeep(440, 0.1);
  setTimeout(() => generateBeep(880, 0.15), 50);
};
