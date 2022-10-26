import express from 'express'

const app = express();

app.get('/ads', (request, response)=>{
    return response.json(
        [
            {id:1, nome:"teste 1"},
            {id:2, nome:"teste 2"},
            {id:3, nome:"teste 3"},
        ]
    )
});

app.listen(3333);