import joi from '@hapi/joi'

const authschema= joi.object({
    name: joi.string().max(20),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).max(8).required()

})

export default authschema