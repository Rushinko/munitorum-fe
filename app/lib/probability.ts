export type Probabilities = { exact: number[]; orHigher: number[] };
export type DiceProbability = { exact: number; orHigher: number };

/**
 * Calculates the factorial of a non-negative integer.
 * @param n - The number to calculate the factorial of.
 * @returns The factorial of n.
 */
function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers.");
  }
  if (n === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}


/**
 * Calculates the binomial coefficient C(n, k), or "n choose k".
 * This is the number of ways to choose k items from a set of n items.
 * @param n - The total number of items.
 * @param k - The number of items to choose.
 * @returns The binomial coefficient C(n, k), also known as the number of combinations.
 */
function binomialCoefficient(n: number, k: number): number {
  if (k < 0 || k > n) {
    return 0;
  }
  // C(n, k) = n! / (k! * (n-k)!)
  return factorial(n) / (factorial(k) * factorial(n - k));
}

const calculateEffectiveProbability = (initialProbability: number, sides: number, rerollType: 'none' | 'ones' | 'all' = 'none'): number => {
  switch (rerollType) {
    case 'ones':
      // Added probability = P(rolling a 1) * P(success on reroll)
      const probOfOne = 1 / sides;
      return initialProbability + (probOfOne * initialProbability);
    case 'all':
      // Added probability = P(initial fail) * P(success on reroll)
      const probOfFailure = 1 - initialProbability;
      return initialProbability + (probOfFailure * initialProbability);
    case 'none':
    default:
      return initialProbability;
  }
}

/**
 * Calculates the probabilities of achieving a certain number of successful dice rolls.
 *
 * @param numDice - The total number of dice to roll.
 * @param sides - The number of sides on each die (e.g., 6 for a d6).
 * @param target - The value a single die must roll *higher than* to be a success.
 * @returns An object containing two arrays:
 * - `exact`: The probability of getting *exactly* k successes.
 * - `orHigher`: The probability of getting *k or more* successes.
 * The index of each array corresponds to the number of successes (k).
 */
export function getDiceProbabilities(numDice: number, sides: number, target: number, rerollType: 'none' | 'ones' | 'all' = 'none'): DiceProbability[] {
  if (numDice <= 0 || sides <= 0) {
    return [{ exact: 1.0, orHigher: 1.0 }];
  }

  // Calculate the probability of a single success (p) and failure (q)
  const successfulOutcomes = sides - target > 0 ? sides - target : 0;
  const initialP = successfulOutcomes / sides;
  const p = calculateEffectiveProbability(initialP, sides, rerollType);
  const q = 1 - p;

  const exactProbs: number[] = [];

  // Calculate the probability for exactly k successes, from k=0 to k=numDice
  for (let k = 0; k <= numDice; k++) {
    const probability = binomialCoefficient(numDice, k) * Math.pow(p, k) * Math.pow(q, numDice - k);
    exactProbs.push(probability);
  }

  // Calculate the cumulative probability for k or more successes
  const results: DiceProbability[] = new Array(numDice + 1);
  let cumulativeProbability = 0;
  for (let k = numDice; k >= 0; k--) {
    cumulativeProbability += exactProbs[k];
    // Prepending to the array, or you can push and reverse later
    results[k] = { exact: exactProbs[k], orHigher: cumulativeProbability };
  }


  // Correct for potential floating-point inaccuracies
  if (results.length > 0) {
    results[0].orHigher = 1.0;
  }

  return results;
}

export function getCumulativeProbabilities(probabilities: DiceProbability[], target: number, trials: number, sides: number, reroll?: 'none' | 'ones' | 'all'): DiceProbability[] {
  // 1. This part remains the same: calculate the final 'exact' probabilities.
  const successProbabilityExact = new Array(trials + 1).fill(0);

  for (let h = 0; h <= trials; h++) {
    // *** IMPORTANT CHANGE HERE ***
    // Access the 'exact' property from the object at index 'h'.
    const probsOfPreviousSuccess = probabilities[h].exact;
    if (probsOfPreviousSuccess === 0) continue;

    const successProbsForHAttempts = getDiceProbabilities(h, sides, target - 1, reroll);

    for (let w = 0; w <= h; w++) {
      const probsOfSuccessForHSuccess = successProbsForHAttempts[w].exact;
      successProbabilityExact[w] += probsOfPreviousSuccess * probsOfSuccessForHSuccess;
    }
  }

  // This final part remains the same as the last version
  const results: DiceProbability[] = new Array(trials + 1);
  let cumulative = 0;

  for (let k = trials; k >= 0; k--) {
    cumulative += successProbabilityExact[k];
    results[k] = {
      exact: successProbabilityExact[k],
      orHigher: cumulative,
    };
  }

  if (results.length > 0) {
    results[0].orHigher = 1.0;
  }

  return results;
}

/**
 * Converts a target value (e.g., 4+ on a d6) to the 'target' parameter.
 * @param value The number to beat (e.g., 4 for a 4+).
 * @param sides The number of sides on the die.
 * @returns The target value for the probability functions.
 */
export function valueToTarget(value: number, sides: number): number {
  const successfulOutcomes = sides + 1 - (value - 1);
  return successfulOutcomes;
}

export function randomNumberWraper(max: number, min: number = 0) {
  
}

/**
 * Calculates the probability distribution for the sum of multiple dice.
 * @param numDice The number of dice to roll.
 * @param sides The number of sides on each die.
 * @returns A DiceProbability[] array where the index represents the sum.
 */
export function getDiceSumDistribution(numDice: number, sides: number): DiceProbability[] {
  const maxSum = numDice * sides;
  // Start with an array representing a sum of 0 with 100% probability.
  let exactProbs: number[] = [1.0];

  for (let i = 0; i < numDice; i++) {
    const newProbs = new Array(exactProbs.length + sides).fill(0);
    for (let sum = 0; sum < exactProbs.length; sum++) {
      const prob = exactProbs[sum];
      if (prob > 0) {
        for (let roll = 1; roll <= sides; roll++) {
          newProbs[sum + roll] += prob * (1 / sides);
        }
      }
    }
    exactProbs = newProbs;
  }

  // Ensure the array has the correct length up to maxSum + 1
  if (exactProbs.length < maxSum + 1) {
    exactProbs.length = maxSum + 1;
  }
  exactProbs = exactProbs.map(p => p || 0);


  // Now, convert the exactProbs array into the DiceProbability[] format
  const results: DiceProbability[] = new Array(maxSum + 1);
  let cumulativeProbability = 0;
  for (let k = maxSum; k >= 0; k--) {
    const exact = exactProbs[k];
    cumulativeProbability += exact;
    results[k] = { exact, orHigher: cumulativeProbability };
  }

  return results;
}