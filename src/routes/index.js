const {Router}=require('express');
const router=Router();
const fs= require('fs');

const json_books = fs.readFileSync('src/books.json', 'utf-8');
const books= JSON.parse(json_books);

router.get('/',(req,res)=>{
    res.render('index.ejs',{
        books

    })
});

router.get('/new-entry', (req,res)=> {
    res.render('new-entry');
})

router.post('/new-entry',(req,res)=>{
    const {title, author, image, description}=req.body;
    if(!title || !author|| !image || !description){
        res.status(400).send('Entries must have a title and description');
        return;
    }
    let newBook={
        title,
        author,
        image,
        description
    }
    books.push(newBook);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/');
});


 
module.exports = router;