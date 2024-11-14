// Функция для переключения состояния меню (открыть/закрыть)
function toggleMenu() {
    // Получаем элементы: меню и затемняющий фон (overlay)
    var menu = document.getElementById('popup-menu');
    var overlay = document.getElementById('overlay');

    menu.style.right = '0px'; // Меню появляется с правой стороны экрана (right: 0px)
    overlay.classList.add('active'); // Добавляем класс 'active' на overlay, чтобы затемнить фон
}

// Функция для закрытия меню (когда кликаем на затемняющий фон)
function closeMenu() {
    // Получаем элементы: меню и затемняющий фон
    var menu = document.getElementById('popup-menu');
    var overlay = document.getElementById('overlay');

    // Закрываем меню, сдвигаем его вправо (off-screen)
    menu.style.right = '-300px'; // Меню скрывается за пределами экрана
    overlay.classList.remove('active'); // Убираем затемняющий фон
}
