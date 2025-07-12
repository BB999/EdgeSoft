# Mathematical Utility Functions - Test Suite

This directory contains comprehensive test suites for mathematical utility functions implemented using Test-Driven Development (TDD).

## TDD Phase: RED (Tests Only)

This is the **RED PHASE** of TDD where only test files exist. The implementation files referenced in these tests (`../src/mathUtils.js`) do not exist yet and will be created in the GREEN PHASE.

## Test Files

### 1. factorial.test.js
Tests for `factorial(n)` function - 階乗計算
- **正常ケース**: Basic factorial calculations (0!, 1!, 5!, 10!, etc.)
- **エッジケース**: Large numbers, type validation
- **エラーハンドリング**: Negative numbers, non-integers, non-numeric inputs, overflow protection

### 2. isPrime.test.js  
Tests for `isPrime(n)` function - 素数判定
- **正常ケース**: Prime and composite number detection
- **大きな数**: Large prime and composite numbers
- **エッジケース**: Perfect squares, boolean return type
- **エラーハンドリング**: Negative numbers, non-integers, non-numeric inputs, large number limits

### 3. gcd.test.js
Tests for `gcd(a, b)` function - 最大公約数
- **基本ケース**: Standard GCD calculations
- **特殊ケース**: GCD with 0, GCD with 1, coprime numbers
- **大きな数**: Large number GCD calculations  
- **順序の独立性**: Commutative property testing
- **エラーハンドリング**: Non-integers, non-numeric inputs, missing arguments

### 4. fibonacci.test.js
Tests for `fibonacci(n)` function - フィボナッチ数列
- **基本ケース**: Standard Fibonacci sequence values
- **大きなインデックス**: Large index calculations
- **パフォーマンス**: Efficiency and memoization tests
- **数学的性質**: Fibonacci recurrence relation and coprime properties
- **エラーハンドリング**: Negative indices, non-integers, large index limits

## Test Coverage

Each test suite covers:
- ✅ **正常系 (Normal cases)**: Expected behavior with valid inputs
- ✅ **異常系 (Error cases)**: Error handling and validation
- ✅ **境界値 (Edge cases)**: Boundary conditions and special values
- ✅ **パフォーマンス (Performance)**: Efficiency requirements where applicable
- ✅ **数学的性質 (Mathematical properties)**: Verification of mathematical correctness

## Running Tests

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

## Expected Test Results

**Current Status**: 🔴 **ALL TESTS WILL FAIL** 

This is expected and correct for the RED PHASE of TDD. The referenced functions in `../src/mathUtils.js` do not exist yet.

## Next Steps (GREEN PHASE)

The next phase will involve creating the minimal implementation in `src/mathUtils.js` to make all these tests pass.