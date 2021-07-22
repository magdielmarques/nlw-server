import express from 'express';

const app = express();

app.get('/users', (request, response)=> {
    console.log('Listagem de usuários!');
    
    response.json([
        'Diego',
        'Magdiel',
        'Robson',
        'Rayssa',
        'Jorge',
        'Lucas'
    ]);
});

app.listen(3333);
