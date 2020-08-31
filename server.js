const express = require('express');

const server = express();

server.use(express.json());
server.use(cors())

let users = [
    {
        id: 0, // hint: use the shortid npm package to generate it
        name: "Fernando, enexes, Quizhpi", // String, required
        bio: "The realist motherfucka out there",  // String, required
    },
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]

server.post('/api/users', (req, res) =>{
    if(!users){
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }else if(req.body.bio && req.body.name){
        const user = req.body
        user.id = Date.now()
        users.push(user)
        res.status(201).json({data: user})
    }else{
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
})

server.get('/api/users', (req, res) =>{
    if(users){
        res.status(200).json({data: users})
    }else{
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
})

server.get('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    
    let found = users.find(u => u.id === id)
    
    if(!users){
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
    else if(found){
        res.status(200).json(found)
    }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.put('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    const changes = req.body
    let found = users.find(u => u.id === id)
    
    if(!users){
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }else if(!changes.bio || !changes.name){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else if(found){
        Object.assign(found, changes)
        res.status(200).json(found)
    }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})


server.delete('/api/users/:id', (req, res) =>{
    const id = Number(req.params.id);
    let found = users.find(u => u.id === id)
    const changes = req.body
    if(!users){
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }else if(found){
        users = users.filter(user => user.id !== id)
        res.status(200).end()
    }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }

})


const port = 8000
server.listen(port, () => console.log(`server up... Port:${port}`))