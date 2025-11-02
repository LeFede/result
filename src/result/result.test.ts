import { r } from './index'
import { describe, test, expect } from 'bun:test'

describe('result', () => {
  test('should return [null, data] on success', async () => {
    const promise = Promise.resolve(42)
    const [error, data] = await r(promise)

    expect(error).toBeNull()
    expect(data).toBe(42)
  })

  test('should return [error, null] on failure', async () => {
    const expectedError = new Error('Test error')
    const promise = Promise.reject(expectedError)
    const [error, data] = await r(promise)

    expect(error).toBe(expectedError)
    expect(data).toBeNull()
  })

  test('should handle non-Error rejections', async () => {
    const promise = Promise.reject('string error')
    const [error, data] = await r(promise)

    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('string error')
    expect(data).toBeNull()
  })

  test('should preserve data types', async () => {
    const objectData = { foo: 'bar', num: 123 }
    const promise = Promise.resolve(objectData)
    const [error, data] = await r(promise)

    expect(error).toBeNull()
    expect(data).toEqual(objectData)
  })

  test('should work with async functions', async () => {
    const asyncFn = async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
      return 'success'
    }

    const [error, data] = await r(asyncFn())

    expect(error).toBeNull()
    expect(data).toBe('success')
  })

  test('should handle immediate rejections', async () => {
    const promise = Promise.reject(new Error('Immediate fail'))
    const [error, data] = await r(promise)

    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('Immediate fail')
    expect(data).toBeNull()
  })
})
