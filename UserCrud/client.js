const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("user.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const userPackage = grpcObject.userPackage;

const client = new userPackage.UserCrud('localhost:9000',
    grpc.credentials.createInsecure()
)

client.list({},(err, response) => {
    console.log("user are : ",JSON.stringify(response))
})