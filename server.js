const express = require('express');
const path = require('path');
const app = express();

// Устанавливаем порт
const PORT = process.env.PORT || 3000;

// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обслуживаем главный HTML-файл
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});