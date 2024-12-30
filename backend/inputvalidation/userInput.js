const zod = require('zod');

const userInput = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().unique(),
    email: zod.string().email().unique(),
    password: zod.string().min(6).max(25),
})
const updateUserInput = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().unique(),
    password: zod.string().min(6).max(20)
})

module.exports = {userInput, updateUserInput};