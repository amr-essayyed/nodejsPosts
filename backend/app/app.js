// const projDir = "C:/dev/nodejs_labs/5_postAndChat/"
import express from 'express';                  // get express framework server constructing function
import connectToDB from '../../DB/DB.js'                         // connect to the database
import bodyParser from 'body-parser';           // get library of http-request-body parsing functions 
import cookieParser from "cookie-parser";
import userRoutes from './users/routes.js';     // get the router (sub program) associated with /users endpoint requests 
import postRoutes from './posts/routes.js';     
import profileRoutes from './profile/routes.js';     
import chatRoutes from './chat/routes.js';     
import authRoutes from './auth/routes.js';     
import mainRutes from './main/routes.js';
import {Server} from 'socket.io';

const app = express();                          // instantiate an http server program
app.set('view engine', 'ejs');
app.set('views', './backend/app/views')

// attach parsing functions for different requestBody formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// attach all the subprograms to each associated endpoints
app.use(express.static('C:/dev/nodejs_labs/5_postAndChat/backend/public'));
app.get('/', mainRutes)
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Mount the router on the root path
app.use('/posts', postRoutes);
app.use('/profile', profileRoutes);
app.use('/chats', chatRoutes);

let httpServer;
export let io;
//todo: listen to event 'DBConnected'
export default async function startServer() {
    await connectToDB();
    httpServer = app.listen( 8080, ()=>console.log("listening on port 8080") );
    io = new Server(httpServer);

    io.on('connection', socket=>console.log("socket: ", socket.id));
}

