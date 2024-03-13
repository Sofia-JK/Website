import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import multer from "multer";
import path from "path";
import { addrequest } from "./controllers/addrequest.js";
import { sendAdmin } from "./controllers/sendAdmin.js";
import { yesAdmin } from "./controllers/yesAdmin.js";
import { noAdmin } from "./controllers/noAdmin.js";
import { number } from "./controllers/number.js";

//порт на котором будет работать сервер
const PORT = 3000

//сама переменная сервера
const app = express()

//чтобы сервер понимал json
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})



app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

//ветка регистрации
app.post('/reg', register)
//ветка логина
app.post('/auth', auth)

app.post('/addrequest', addrequest)

app.post('/sendadmin', sendAdmin)

app.post('/yesadmin', yesAdmin)

app.post('/noadmin', noAdmin)

app.post('/number', number)

app.post('/add/', upload.single('mediaValue'), async(req, res) => {
    const mediaValue = req.file.filename
    const {id} = req.body
    console.log(mediaValue)
    const data = await sql`update Users set image = ${`http://localhost:3000/${mediaValue}`} where id = ${id}`
    res.sendStatus(200)
})

app.get('/getuser', async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

app.get('/getavailable', async (req, res) => {
    const data = await sql`select * from Users where exists(select Requests.receiver from Requests where Users.id = Requests.receiver)`
    res.send(data)
})

app.get('/getadmin', async (req, res) => {
    const data = await sql`select * from Requests`
    res.send(data)
})

//функция старта приложения
const start = async () => {

    //создаем таблицы
    /*await sql`create table if not exists Roles(
        role varchar(100) unique primary key
    )`
    await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        nickname varchar(100) NOT NULL,
        adress varchar(100) NOT NULL,
        fio varchar(100) NOT NULL,
        namber varchar(100) NOT NULL,
        role varchar(100),
        password varchar(100),
        FOREIGN KEY (role) REFERENCES Roles(role)
    )`

    await sql`create table if not exists Requests(
        id SERIAL PRIMARY KEY NOT NULL,
        sender integer NOT NULL,
        receiver integer NOT NULL,
        status varchar(100) NOT NULL,
        number varchar(100),
        FOREIGN KEY (sender) REFERENCES Users(id),
        FOREIGN KEY (receiver) REFERENCES Users(id)
    )`*/

    //запустить в первый раз и больше не запускать
    //чтобы добавить роли в таблицу ролей

    //await sql`insert into Roles(role) values('USER')`
    //await sql`insert into Roles(role) values('ADMIN')`

    //запустить сервак
    //(прослушивать порт на запросы)
    //вторым аргументом функция которая запустится при успешном запуске сервака
    app.listen(PORT, () => {
        console.log(`СЕРВАК ФУРЫЧИТ ТУТ http://localhost:${PORT}`);
    })
}

start()