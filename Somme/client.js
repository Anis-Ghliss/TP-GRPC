const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("./todo.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo('localhost:9000',
    grpc.credentials.createInsecure()
)

// client.createTodo({
//     'id' : 1,
//     'text':'Hello'
// },(err, response) => {
//     console.log('Recieved from Server' + JSON.stringify(response))
// })

// client.readTodos({}, (err,response) => {
//     console.log('todos', JSON.stringify(response))
// })

client.add({
    'x' : 3,
    'y' : 3
}, (err, response) => {
    console.log('The somme is ' + JSON.stringify(response))
})

client.subs({
    'x' : 3,
    'y' : 3
}, (err, response) => {
    console.log('The subs is ' + JSON.stringify(response))
})
client.multi({
    'x' : 3,
    'y' : 3
}, (err, response) => {
    console.log('The multi is ' + JSON.stringify(response))
})
client.div({
    'x' : 3,
    'y' : 3
}, (err, response) => {
    console.log('The div is ' + JSON.stringify(response))
})