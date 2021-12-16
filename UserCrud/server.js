const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("./user.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const userPackage = grpcObject.userPackage;

const server = new grpc.Server()

server.bind('localhost:9000', grpc.ServerCredentials.createInsecure());
server.addService(userPackage.UserCrud.service, {
    'list':list,
    'get':get,
    'createUser':createUser,
    'deleteUser':deleteUser
})

server.start()

const users = [{'id':1, 'name':"an"}];

function createUser(call, callback){
    const userRecord = {
        'id' : Math.floor(Math.random() * 101),
        'name': call.request.text
    }
    users.push(userRecord);
    callback(null, userRecord)
}

function list(call,callback) {
    callback(null, {'users' : users})
}

function get(call, callback){
    const UserID = call.request.id;
    const userRecord = users.find(element => 
        element.id == UserID
    ) 
    callback(null, userRecord)
}

function deleteUser(call, callback){
    const UserID = call.request.id;
    users.splice(users.findIndex(item => item.id === UserID), 1)
    const response = {
        message : 'User deleted'
    }
    callback(null, response)
}

