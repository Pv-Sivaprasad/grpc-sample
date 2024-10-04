const path=require('path')
const grpc=require('@grpc/grpc-js')
const portoLoader=require('@grpc/proto-loader')

const packageDefinition=portoLoader.loadSync(path.join(__dirname,'proto','greet.proto'),{
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true, 
})


const greetProto=grpc.loadPackageDefinition(packageDefinition).GreetingService;


function greet(call,callback){
    const name=call.request.name
    callback(null,{message:`hello ${name}`})
}

function main(){
    const server=new grpc.Server()
    server.addService(greetProto.service,{Greet:greet})
    server.bindAsync('0.0.0.0:50051',grpc.ServerCredentials.createInsecure (),()=>{
        console.log('server is running at http://0.0.0.0:50051');
        server.start()
    })
}
main()