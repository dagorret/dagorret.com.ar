import test from 'node:test';
import assert from 'node:assert/strict';
import { BOX, createGas, step, occupancy, lnW, maxLnW, oneSideProbability, leftCount } from '../src/lib/entropy.ts';

const close = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);

test('ln W counts arrangements exactly', () => {
  close(lnW([4, 0, 0, 0, 0, 0, 0, 0]), 0);
  close(lnW([1, 1, 1, 1, 0, 0, 0, 0]), Math.log(24));
  close(lnW([2, 2, 0, 0, 0, 0, 0, 0]), Math.log(6));
  close(maxLnW(4), Math.log(24));
  close(maxLnW(10), lnW([2, 2, 1, 1, 1, 1, 1, 1]));
});

test('the same seed reproduces the same trajectory', () => {
  const a = createGas(99, 50), b = createGas(99, 50);
  a.partition = b.partition = false;
  for (let i = 0; i < 200; i++) { step(a, 1 / 60); step(b, 1 / 60); }
  assert.deepEqual([...a.x], [...b.x]);
});

test('the partition keeps every particle on the left; walls keep them in the box', () => {
  const gas = createGas(1, 300);
  for (let i = 0; i < 600; i++) step(gas, 1 / 60);
  assert.equal(leftCount(gas), 300);
  gas.partition = false;
  for (let i = 0; i < 600; i++) step(gas, 1 / 60);
  for (let i = 0; i < 300; i++) {
    assert.ok(gas.x[i] >= 0 && gas.x[i] <= BOX.width && gas.y[i] >= 0 && gas.y[i] <= BOX.height);
  }
  assert.equal(occupancy(gas).reduce((a, b) => a + b, 0), 300);
});

test('with many particles entropy rises toward its maximum and stays there', () => {
  const gas = createGas(7, 500);
  const initial = lnW(occupancy(gas)) / maxLnW(500);
  assert.ok(initial < 0.7, `initial ${initial}`);
  gas.partition = false;
  let minimum = 1;
  for (let i = 0; i < 3600; i++) {
    step(gas, 1 / 60);
    if (i > 1200) minimum = Math.min(minimum, lnW(occupancy(gas)) / maxLnW(500));
  }
  assert.ok(minimum > 0.95, `minimum ${minimum}`);
});

test('with four particles, all-on-one-side moments happen about one eighth of the time', () => {
  let hits = 0, samples = 0;
  for (let seed = 1; seed <= 40; seed++) {
    const gas = createGas(seed, 4);
    gas.partition = false;
    for (let i = 0; i < 3000; i++) {
      step(gas, 1 / 60);
      if (i % 10 === 0) { samples++; const left = leftCount(gas); if (left === 0 || left === 4) hits++; }
    }
  }
  close(hits / samples, oneSideProbability(4), 0.03);
});
