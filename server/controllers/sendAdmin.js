import { sql } from "../db.js";

//контроллер добавления заявки
export const sendAdmin = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {id, receiver} = req.body;

    await sql`update Requests set sender = ${id},status = 'Ожидает' where receiver = ${receiver}`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Заявка успешно обновлена"})
}