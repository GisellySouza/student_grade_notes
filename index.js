import http from "http";
import {v4} from "uuid";

//usar porta de 3000 a 5000
const port =3000

//criando objetos
const grades =[
    {
        studentName:"Thiago",
        subject:"English",
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
        const id =url.split('/')[2];
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
        else if (url.startsWith ('/grades/') && method === "PUT") {
            const { studentName, subject, grade } = JSON.parse(body);
            const gradeToUpdate = grades.find((g) => g.id === id);
            if (gradeToUpdate) {
                gradeToUpdate.studentName = studentName;
                gradeToUpdate.subject = subject;
                gradeToUpdate.grade = grade;
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(gradeToUpdate));
            } else {
                response.writeHead(404, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Grade not found" }));
            }
        }


        else if (url.startsWith ('/grades/') && method === "DELETE") {
            const index = grades.findIndex((g) => g.id === id);
                                //quando é ===-1 o item não existe se é !==-1 (diferente de -1)
            if (index !== -1) {
                grades.splice(index, 1);//esse 1 é a posição do item atual, se for 2 apagaria 2 itens
                response.writeHead(204);
                response.end();
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Grade not found' }));
            }
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