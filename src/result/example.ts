import { r, type Result } from './index'
import { RandomUserGeneratorResponse } from '../env'
import axios from 'axios'

// Example 1: Simple promise that resolves
const [err1, data1] = await r(Promise.resolve({ res: 1 })) as Result<{ res: number }>

if (err1) {
  console.log("Error:", err1.message)
} else {
  console.log("Success! Result:", data1)
}

// Example 2: Promise that rejects
const [err2, data2] = await r(Promise.reject(new Error("Something went wrong")))

if (err2) {
  console.log("Expected error:", err2.message)
} else {
  console.log("Data:", data2)
}

// Example 3: Real API call
const randomUserApi = axios.create({ baseURL: "https://randomuser.me/api" })
const getRandomUser = randomUserApi.get<RandomUserGeneratorResponse>("")

const [err3, data3] = await r(getRandomUser)

if (err3) {
  console.log("API Error:", err3.message)
} else {
  console.log("Random user:", data3?.data.results.at(0))
}

// Example 4: Using with async functions
const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return { id: 123, name: "Test" }
}

const [err4, data4] = await r(fetchData())

if (err4) {
  console.log("Error fetching data:", err4.message)
} else {
  console.log("Fetched data:", data4)
}
