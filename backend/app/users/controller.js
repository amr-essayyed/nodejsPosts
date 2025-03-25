import {add, getByName} from './model.js'

export async function addUser (req, res) {
    console.log("adding a user")
    const added = await add(req.body.email, req.body.name, req.body.password);
    if(added){
        res.send({msg: "user Added Successfully"})
    }else{
        res.status(400).send({msg: "error adding user"})
    }
}
export async function getUsers (req, res) {

}
export async function deleteUser (req, res) {

}
export async function updateUsers (req, res) {

}