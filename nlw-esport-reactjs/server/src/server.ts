import express from 'express'

const app = express();

app.get('/games', (request, response)=>{
    return response.json([]);
})

app.post('/ads', (request, response)=>{
    return response.status(201).json([]);
})

app.get('/games/:id/ads', (request, response)=>{
    //const gameId = request.params.id;

    return response.json(
        [
            {id:1, nome:"teste 1"},
            {id:2, nome:"teste 2"},
            {id:3, nome:"teste 3"},
            {id:4, nome:"ablublu"},
        ]
    )
});

app.get('/ads/:id/discord', (request, response)=>{
    //const ad = request.params.id;

    return response.json(
        []
    )
});

app.listen(3333);