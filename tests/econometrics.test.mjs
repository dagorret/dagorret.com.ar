import test from 'node:test';
import assert from 'node:assert/strict';
import { ols, olsExample, olsWitness, lineSsr, omittedSample, ar1, arVariance, innovations } from '../src/lib/econometrics.ts';

const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);

test('OLS recovers an exact line and handles a perfect fit without inventing DW', () => {
  const fit = ols([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }]);
  close(fit.intercept, 1); close(fit.slope, 2); close(fit.r2, 1); close(fit.se, 0);
  assert.equal(fit.dw, null);
});

test('residual standard error uses n−2 and DW preserves temporal ordering', () => {
  const fit = ols([{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]);
  close(fit.intercept, 7 / 6); close(fit.slope, .5);
  close(fit.ssr, 1 / 6); close(fit.r2, .75); close(fit.se, Math.sqrt(1 / 6)); close(fit.dw, 3);
  close(fit.residuals.reduce((a, b) => a + b, 0), 0);
});

test('unidentified and undefined quantities remain explicit', () => {
  assert.equal(ols([]), null);
  assert.equal(ols([{ x: 1, y: 2 }]), null);
  assert.equal(ols([{ x: 1, y: 2 }, { x: 1, y: 3 }]), null);
  assert.equal(ols([{ x: 1, y: 2 }, { x: 2, y: 3 }]).se, null);
  assert.equal(ols([{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }]).r2, null);
});

test('manual SSR is globally minimized by OLS for the same sample', () => {
  const points = olsExample(), fit = ols(points);
  for (const b0 of [-100, 0, 20, fit.intercept, 100]) {
    for (const b1 of [-10, 0, 1, fit.slope, 10]) {
      const actual = lineSsr(points, b0, b1);
      const expected = fit.ssr + fit.n * (b0 + b1 * fit.meanX - fit.meanY) ** 2 + fit.sxx * (b1 - fit.slope) ** 2;
      close(actual, expected, 1e-8);
      assert.ok(actual >= fit.ssr - 1e-10);
    }
  }
  close(lineSsr(points, fit.intercept, fit.slope), fit.ssr);
  assert.ok(lineSsr(points, 20, 1) > fit.ssr);
});

test('a vertical outlier at mean x leaves the slope unchanged despite a large residual', () => {
  const effect = olsWitness(olsExample(), 'vertical');
  close(effect.point.x, effect.before.meanX);
  close(effect.slopeChange, 0);
  close(effect.leverage, 1 / effect.after.n);
  assert.ok(Math.abs(effect.residualBefore) >= 50);
  assert.ok(effect.after.ssr > effect.before.ssr);
});

test('a high-leverage witness shifts the slope and has a small residual after refitting', () => {
  const points = olsExample(), effect = olsWitness(points, 'leverage');
  assert.equal(points.length, 12, 'witness generation does not mutate the original sample');
  assert.ok(effect.point.x === 0 || effect.point.x === 20);
  close(Math.abs(effect.residualBefore), 15);
  assert.ok(effect.leverage > .8 && effect.leverage < 1);
  assert.ok(Math.abs(effect.slopeChange) > 1);
  assert.ok(Math.abs(effect.residualAfter) < 3);
  close(effect.residualAfter, effect.residualBefore * (1 - effect.leverage));
});

test('an extreme x exactly on the previous line has leverage without changing the slope', () => {
  const points = olsExample(), before = ols(points);
  const after = ols([...points, { x: 20, y: before.intercept + 20 * before.slope }]);
  close(after.slope, before.slope);
  close(after.intercept, before.intercept);
  close(after.ssr, before.ssr);
});

test('witness presets reject unidentified samples and respect plot bounds', () => {
  assert.equal(olsWitness([], 'vertical'), null);
  assert.equal(olsWitness([{ x: 2, y: 1 }, { x: 2, y: 9 }], 'leverage'), null);
  assert.equal(olsWitness(Array.from({ length: 250 }, (_, i) => ({ x: i % 20, y: i % 100 })), 'leverage'), null);
  for (const kind of ['vertical', 'leverage']) {
    const effect = olsWitness([{ x: 9, y: 0 }, { x: 10, y: 100 }], kind);
    assert.ok(effect.point.x >= 0 && effect.point.x <= 20);
    assert.ok(effect.point.y >= 0 && effect.point.y <= 100);
  }
});

test('multiple regression and omission decomposition hold for negative, zero and positive correlation', () => {
  for (const rho of [-.9, -.6, 0, .6, .9]) {
    const sample = omittedSample(rho);
    close(sample.correlation, rho); close(sample.varX, 9); close(sample.covXZ, 3 * rho);
    close(sample.beta0, 10); close(sample.beta1, 2); close(sample.beta2, 8);
    close(sample.bias, 8 * rho / 3);
    close(sample.simple.slope - sample.beta1, sample.bias);
    assert.equal(sample.points.length, 90);
  }
});

test('AR(1) recurrence includes the fixed initial value and negative persistence', () => {
  assert.deepEqual(ar1(0, [1, 2, -1]), [1, 2, -1]);
  assert.deepEqual(ar1(.5, [1, 2, -1]), [1, 2.5, .25]);
  assert.deepEqual(ar1(-.5, [1, 0, 0]), [1, -.5, .25]);
  assert.deepEqual(ar1(1, [1, 2, -1]), [1, 3, 2]);
  assert.deepEqual(ar1(.5, [0, 0], 1), [1, 1.5]);
});

test('finite-horizon variance approaches the stationary limit and grows linearly at the unit root', () => {
  close(arVariance(.5, 2), 1.25);
  close(arVariance(-.5, 2), 1.25);
  close(arVariance(.5, 250), 4 / 3);
  close(arVariance(1, 250), 250);
  close(arVariance(1, 125), 125);
});

test('innovation seeds reproduce trajectories while separate streams produce different walks', () => {
  const first = innovations(314159), repeat = innovations(314159), other = innovations(314159 ^ 0xA5A5A5A5);
  assert.deepEqual(first, repeat);
  assert.notDeepEqual(first, other);
  assert.equal(first.length, 250);
  assert.ok(first.every(Number.isFinite));
});
