import http from "http";
import {v4} from "uuid";

//usar porta de 3000 a 5000
const port =3000

//criando objetos
const grades =[
    {
        studantName:"Thiago",
        Subject:"English",
        grade: "8",

    },
];


const server = http.createServer((request, response)=>{
    //funções do backend
    const {method, url}= request             //const valor que não muda
    let body="";                            //let valor que quero alterar. let começando vazio.



    //+= agrega echunk.toString tranforma em string o dado
    request.on("data", chunk => {
        body +=chunk.toString()
    })

    request.on("end", () => {
        if (url==="/grades" && method ==="GET") {
            response.writeHead(200,{"Content-Type": "application/json"})
            response.end(JSON.stringify(grades));
        } 
        
        else if (url==="/grades" && method ==="POST") {
            const { studentName, subject, grade } = JSON.parse(body);     //desestrutura o objeto (grades) nas partes componentes dele
            const newGrade = {id: v4(), studentName, subject, grade};
            grades.push(newGrade);
            response.writeHead(201,{"Content-Type": "application/json"})
            response.end(JSON.stringify(newGrade))
        }
        else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Rota não encontrada" }));
            }



    })

    
});

//escute meu servidor na porta "port"
server.listen(port, () => {
    console.log(`Server rumming on port ${port}`);


})