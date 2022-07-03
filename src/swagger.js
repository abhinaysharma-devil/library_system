const options = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "dooms library",
            Description : "not available",
            version : "1.0.0"
        },
        server :[
            {
                url: "http://localhost:9000"
            },
        ],
    },
    apis: ["routes/*.js"]
}


export default options