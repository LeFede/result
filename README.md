# @volpe/utils

A collection of type-safe TypeScript utilities for modern JavaScript/TypeScript projects.

## Installation

```bash
npm install @volpe/utils
# or
bun add @volpe/utils
```

## Features

### 🔍 Refiner - Powerful Array Filtering & Manipulation

Type-safe array filtering with a Prisma-like query syntax. Filter, sort, pick, and omit with full TypeScript support.

```typescript
import { Refiner } from '@volpe/utils'

const products = [
  { id: 1, name: 'Laptop', price: 1200, tags: [1, 2, 3], category: 'electronics' },
  { id: 2, name: 'Phone', price: 800, tags: [4, 5], category: 'electronics' },
  { id: 3, name: 'Shirt', price: 30, tags: [1, 5, 7], category: 'clothing' },
]

// Basic filtering
const affordable = Refiner.from(products, {
  where: { price: { lt: 1000 } }
})

// Array operators
const withTag1 = Refiner.from(products, {
  where: { tags: { some: 1 } } // At least one tag equals 1
})

// Logical operators (OR, AND, NOT)
const filtered = Refiner.from(products, {
  where: {
    OR: [
      { price: { gt: 500 } },
      { category: 'clothing' }
    ],
    NOT: { tags: { isEmpty: true } }
  }
})

// Pick specific fields and sort
const result = Refiner.from(products, {
  where: { category: 'electronics' },
  pick: { name: true, price: true },
  orderBy: { price: 'desc' }
})
```

**Supported Operators:**
- **Comparison:** `equals`, `not`, `in`, `notIn`, `lt`, `lte`, `gt`, `gte`
- **String:** `contains`, `startsWith`, `endsWith`
- **Array:** `some`, `every`, `none`, `isEmpty`, `isNotEmpty`
- **Logical:** `AND`, `OR`, `NOT`

### ⏱️ Wait - Promise-based Delays

Simple utility to pause execution for a specified number of seconds.

```typescript
import { wait } from '@volpe/utils'

await wait(1) // Wait 1 second
await wait(0.5) // Wait 500ms

console.log('After delay')
```

### 🎯 Result - Error Handling Made Easy

Go-style error handling that returns tuples instead of throwing exceptions.

```typescript
import { r, type Result } from '@volpe/utils'

// No more try/catch!
const [error, data] = await r(fetchUser())

if (error) {
  console.log('Error:', error.message)
} else {
  console.log('User:', data)
}

// Works with any promise
const [err, response] = await r(axios.get('/api/data'))
```

### ⚡ Debounce - Function Rate Limiting

Debounce functions with leading/trailing options, plus cancel, flush, and force methods.

```typescript
import { debounce } from '@volpe/utils'

// Basic debounce (trailing)
const search = debounce((query: string) => {
  console.log('Searching:', query)
}, 500)

search('hello') // Only executes after 500ms of no more calls

// Leading edge execution
const onClick = debounce(handleClick, 300, {
  leading: true,
  trailing: false
})

// Advanced control
const debounced = debounce(callback, 1000)
debounced.cancel() // Cancel pending execution
debounced.flush()  // Execute immediately
debounced.force(customArgs) // Force execution with custom args
```

## Project Structure

```
src/
├── refiner/
│   ├── index.ts        # Refiner implementation
│   ├── refiner.test.ts # Unit tests
│   └── example.ts      # Usage examples
├── wait/
│   ├── index.ts
│   ├── wait.test.ts
│   └── example.ts
├── result/
│   ├── index.ts
│   ├── result.test.ts
│   └── example.ts
└── debounce/
    ├── index.ts
    ├── debounce.test.ts
    └── example.ts
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build
bun run build

# Run examples
bun src/refiner/example.ts
bun src/wait/example.ts
bun src/result/example.ts
bun src/debounce/example.ts
```

## TypeScript Support

Full TypeScript support with strict type checking and comprehensive type inference.

```typescript
// Type-safe refiner queries
const result = Refiner.from(users, {
  where: { age: { gte: 18 } },
  pick: { name: true, email: true }
})
// result has type: Array<{ name: string, email: string }>

// Type-safe result handling
const [err, data] = await r(Promise.resolve({ id: 1 }))
// data has type: { id: number } | null
// err has type: Error | null
```

## License

MIT

## Author

volpe
