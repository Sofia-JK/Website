import { sql } from "../db.js";

//контроллер добавления заявки
export const yesAdmin = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {id} = req.body;

    await sql`update Requests set status = 'Одобрено' where id = ${id}`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Заявка успешно обновлена"})
}