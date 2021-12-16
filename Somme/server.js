const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("./todo.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server()

server.bind('localhost:9000', grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
    'createTodo' : createTodo,
    'readTodos':readTodos,
    'add':add,
    'subs':subs,
    'multi':multi,
    'div':div
})

server.start()

const todos = [];

function createTodo(call, callback){
    const todoItem = {
        'id':todos.length + 1,
        'text':call.request.text
    }
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodos(call, callback){
    callback(null, {
        'items' : todos
     })
}

function add(call, callback){
   
    const {x, y} = call.request
    const result = {
        z : x + y
    }
    callback(null, result)
}

function subs(call, callback){
   
    const {x, y} = call.request
    const result = {
        z : x - y
    }
    callback(null, result)
}

function multi(call, callback){
   
    const {x, y} = call.request
    const result = {
        z : x * y
    }
    callback(null, result)
}

function div(call, callback){
   
    const {x, y} = call.request
    const result = {
        z : x / y
    }
    callback(null, result)
}