import { sql } from "../db.js";

//контроллер добавления заявки
export const number = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {number, id} = req.body;

    await sql`update Requests set number = ${number} where sender = ${id}`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Заявка успешно обновлена"})
}