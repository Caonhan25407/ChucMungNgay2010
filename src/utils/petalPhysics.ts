export interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  phase: number;
  colorType: 'rose-soft' | 'rose-medium' | 'rose-light' | 'peach' | 'sakura';
}

export const PETAL_COLORS: Record<Petal['colorType'], { primary: string; shadow: string; highlight: string }> = {
  'rose-soft': { primary: '#fbcfe8', shadow: '#f472b6', highlight: '#fdf2f8' },
  'rose-medium': { primary: '#f9a8d4', shadow: '#ec4899', highlight: '#fce7f3' },
  'rose-light': { primary: '#ffe4e6', shadow: '#fb7185', highlight: '#fff1f2' },
  'peach': { primary: '#fed7aa', shadow: '#fb923c', highlight: '#fff7ed' },
  'sakura': { primary: '#fce7f3', shadow: '#f43f5e', highlight: '#ffffff' }
};

export function createRandomPetal(id: number, width: number, height: number, startAtTop = true): Petal {
  const colorTypes: Petal['colorType'][] = ['rose-soft', 'rose-medium', 'rose-light', 'peach', 'sakura'];
  const colorType = colorTypes[Math.floor(Math.random() * colorTypes.length)];

  return {
    id,
    x: Math.random() * width,
    y: startAtTop ? -20 - Math.random() * 50 : Math.random() * height,
    size: 14 + Math.random() * 16,
    speedY: 1.2 + Math.random() * 1.8,
    speedX: (Math.random() - 0.5) * 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.5,
    flip: Math.random() * 360,
    flipSpeed: 1 + Math.random() * 2.5,
    opacity: 0.65 + Math.random() * 0.35,
    swayAmplitude: 1.5 + Math.random() * 2.5,
    swayFrequency: 0.02 + Math.random() * 0.03,
    phase: Math.random() * Math.PI * 2,
    colorType,
  };
}

export function updatePetalPosition(
  petal: Petal,
  width: number,
  height: number,
  windSpeed: number = 0,
  timeStep: number = 1
): Petal {
  const newPhase = petal.phase + petal.swayFrequency * timeStep;
  const swayX = Math.sin(newPhase) * petal.swayAmplitude;

  let newX = petal.x + (petal.speedX + swayX + windSpeed) * timeStep;
  let newY = petal.y + petal.speedY * timeStep;
  let newRotation = (petal.rotation + petal.rotationSpeed * timeStep) % 360;
  let newFlip = (petal.flip + petal.flipSpeed * timeStep) % 360;

  // Boundary checks with wrapping
  if (newY > height + 30) {
    newY = -25;
    newX = Math.random() * width;
  }
  if (newX > width + 30) {
    newX = -25;
  } else if (newX < -30) {
    newX = width + 25;
  }

  return {
    ...petal,
    x: newX,
    y: newY,
    rotation: newRotation,
    flip: newFlip,
    phase: newPhase,
  };
}

export function calculateWindFromPointer(
  pointerX: number,
  pointerY: number,
  prevPointerX: number,
  canvasWidth: number
): number {
  if (canvasWidth <= 0) return 0;
  const deltaX = pointerX - prevPointerX;
  const normalizedDelta = Math.max(-10, Math.min(10, deltaX * 0.15));
  return normalizedDelta;
}
