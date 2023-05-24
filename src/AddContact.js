import "./AddContact.css";

function addContact({ addContact }) {
  return (
    <div className="addContact">
      <label htmlFor="name">Введите имя:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="phone">Введите Номер телефона:</label>
      <input type="text" name="phone" id="phone" />
      <input type="button" value="Добавить пользователя" />
    </div>
  );
}

export default addContact;
