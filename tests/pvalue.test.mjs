import test from 'node:test';
import assert from 'node:assert/strict';
import { mulberry32 } from '../src/lib/random.ts';
import { twoSidedP, incompleteBeta, simulateStudies, reportedP, falsePositiveRate, theoreticalRate, histogram } from '../src/lib/pvalue.ts';

const close = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);

test('the seeded generator is reproducible', () => {
  const a = mulberry32(42), b = mulberry32(42);
  for (let i = 0; i < 10; i++) assert.equal(a(), b());
});

test('t distribution p-values match tabulated critical values', () => {
  close(twoSidedP(0, 10), 1);
  close(twoSidedP(2.228138852, 10), 0.05);
  close(twoSidedP(2.024394164, 38), 0.05);
  close(twoSidedP(-2.024394164, 38), 0.05);
  close(twoSidedP(1, 1), 0.5); // Cauchy: P(|T| > 1) = 1/2
  close(incompleteBeta(0.3, 1, 1), 0.3);
});

test('under H0 p-values are roughly uniform and about 5 % fall below 0.05', () => {
  const sim = simulateStudies(20261101, 4000, 20, 0, 1);
  const rate = falsePositiveRate(reportedP(sim, 1, false));
  assert.ok(Math.abs(rate - 0.05) < 0.012, `rate ${rate}`);
  const counts = histogram(reportedP(sim, 1, false), 10);
  for (const count of counts) assert.ok(Math.abs(count - 400) < 80, `count ${count}`);
});

test('keeping the best of m independent outcomes inflates the rate to about 1 − 0.95^m; Bonferroni restores it', () => {
  const sim = simulateStudies(7, 3000, 15, 0, 10);
  close(falsePositiveRate(reportedP(sim, 10, false)), theoreticalRate(10, false), 0.03);
  assert.ok(falsePositiveRate(reportedP(sim, 10, true)) <= 0.065);
  close(theoreticalRate(1, false), 0.05, 1e-12);
});

test('correlated outcomes inflate the rate less than independent ones', () => {
  const independent = falsePositiveRate(reportedP(simulateStudies(11, 3000, 15, 0, 10), 10, false));
  const correlated = falsePositiveRate(reportedP(simulateStudies(11, 3000, 15, 0.8, 10), 10, false));
  assert.ok(correlated < independent - 0.1, `${correlated} vs ${independent}`);
});
