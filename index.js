import express from 'express';
import fs, { read } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => { //funcion leer
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error){
        console.error(error);
    }
};

const writeData = (data) => { //funcion escribir
    try{
       fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error){
        console.error(error);
    }
}
 

readData();


app.get("/", (req,res) => {
    res.send("probando 1 2 3 444444")
});

//endpoint obtener libros
app.get("/books",(req,res) =>{
    const data = readData();
    res.json(data.books);
} );


app.get("/books/:id",(req,res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
})

app.post("/books", (req,res) =>{
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    }
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});


app.put("/books/:id", (req,res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const body = req.body;
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    }
    writeData(data);
    res.json("Libro actualizado con exito");
})

app.delete("/books/:id", (req,res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json("Libro eliminado con exito");
})
app.listen(3000,()=> {
    console.log('Server running on port 3000');
});

