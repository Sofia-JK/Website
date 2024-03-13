import { sql } from "../db.js";

//контроллер добавления заявки
export const addrequest = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {id} = req.body;
    
    //кандидат это переменная в которую попытаемся найти и записать заявку
    const candidate = await sql`select * from Requests where receiver = ${id} limit 1`[0]
    //если мы нашли заявку, то отправляем пользователю обратно ошибку что заявка уже существует
    if (candidate) {
        res.status(400).send("Заявка уже существует")
    }
    //хешируем пароль
    console.log(req.body);

    //создаем нового пользователя
    await sql`insert into Requests (receiver) values (${id})`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Заявка успешно добавлена"})
}