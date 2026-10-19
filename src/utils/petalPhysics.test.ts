import test from 'node:test';
import assert from 'node:assert/strict';
import { createRandomPetal, updatePetalPosition, calculateWindFromPointer } from './petalPhysics.ts';

test('createRandomPetal creates valid petal inside bounds', () => {
  const petal = createRandomPetal(1, 800, 600, false);
  assert.equal(petal.id, 1);
  assert.ok(petal.x >= 0 && petal.x <= 800);
  assert.ok(petal.y >= 0 && petal.y <= 600);
  assert.ok(petal.size > 0);
  assert.ok(petal.speedY > 0);
  assert.ok(petal.opacity > 0 && petal.opacity <= 1);
});

test('updatePetalPosition moves petal downward and advances phase', () => {
  const initial = createRandomPetal(1, 800, 600, true);
  initial.x = 100;
  initial.y = 50;
  initial.speedY = 2;
  initial.speedX = 0;
  initial.swayAmplitude = 0;

  const next = updatePetalPosition(initial, 800, 600, 0, 1);
  assert.ok(next.y > initial.y, 'Petal y should increase (fall down)');
  assert.ok(next.phase > initial.phase, 'Petal phase should increment');
});

test('updatePetalPosition wraps petal when exceeding bottom height', () => {
  const initial = createRandomPetal(1, 800, 600, false);
  initial.y = 650; // past height + 30
  const next = updatePetalPosition(initial, 800, 600, 0, 1);
  assert.equal(next.y, -25, 'Petal should wrap to the top');
});

test('calculateWindFromPointer clamps velocity gracefully', () => {
  const windGentle = calculateWindFromPointer(120, 200, 100, 800);
  assert.ok(windGentle > 0);
  assert.ok(windGentle <= 10);

  const windHuge = calculateWindFromPointer(1000, 200, 0, 800);
  assert.equal(windHuge, 10, 'Should be clamped to max 10');

  const windZero = calculateWindFromPointer(100, 100, 100, 800);
  assert.equal(windZero, 0);
});
