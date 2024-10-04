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

const greetProto=grpc.loadPackageDefinition(packageDefinition).GreetingService


function main(){
    const client=new greetProto('localhost:50051',grpc.credentials.createInsecure())

    client.Greet({name:'Siva'},(err,response)=>{
        if(err) console.log('errror in client',err);
        console.log('Greetings from ',response?.message);
        
        
    })

}   

main()