// Получаем элементы
const button = document.getElementById("create-ctg");
const ctgNameInput = document.getElementById("ctg-name");
const ctgColorInput = document.getElementById("ctg-color");
const categoriesContainer = document.getElementById("ctgs-container");
const timer = document.getElementById("timer");
let startBtn = document.getElementById('start-timer');
let pauseBtn = document.getElementById('stop-timer');

const InsertData = (newData) => {
    fetch("http://127.0.0.1:2320/create_ctg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
        loadCategories();
    })
    .catch(error => console.log(error))

}

const UpdateData = (newData, ctg_id) => {
    fetch(`http://127.0.0.1:2320/update_ctg/${ctg_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data);
        loadCategories();  // Обновляем список категорий после изменения данных
    })
    .catch(error => console.log(error));
};

function parseTimeString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return { hours, minutes, seconds };
}

const loadCategories = () => {
    fetch("http://127.0.0.1:2320/ctgs")
    .then(resp => resp.json())
    .then(data => {
        const categories = data.ctgs;
        categoriesContainer.innerHTML = ''; // Очистка текущего списка
        categories.forEach(ctg => {
            const button = document.createElement("button");
            button.textContent = ctg.name;
            button.style.backgroundColor = ctg.colour;  // Устанавливаем цвет кнопки
            button.style.border = "none";
            button.style.padding = "10px 20px";
            button.style.margin = "5px";
            button.style.cursor = "pointer";
            button.style.color = "#fff";  // Цвет текста на кнопке

            // Обробник натискання на кнопку категорії
            button.addEventListener("click", () => {
                activeCategory = ctg; // Задаємо активну категорію

                // Відображаємо час цієї категорії в графі Time
                if (activeCategory.time) {
                    timer.textContent = activeCategory.time; // Форматуємо час категорії
                } else {
                    timer.textContent = "00:00:00"; // Якщо часу ще немає, відображаємо "00:00"
                }

                // Підсвічуємо активну категорію
                document.querySelectorAll("button").forEach(btn => btn.style.border = "none");
                button.style.border = "2px solid #000000";

                // Устанавливаем начальное время
                let { hours, minutes, seconds } = ctg.time
                    ? parseTimeString(ctg.time)
                    : { hours: 0, minutes: 0, seconds: 0 };

                function updateTime() {
                  seconds++;
                  if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                  }
                  if (minutes === 60) {
                    hours++;
                    minutes = 0;
                  }

                timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
                startBtn.addEventListener('click', () => {
                  interval = setInterval(updateTime, 1000);
                  startBtn.disabled = true;
                  pauseBtn.disabled = false;

                });

                pauseBtn.addEventListener('click', () => {
                  clearInterval(interval);
                  startBtn.disabled = false;
                  pauseBtn.disabled = true;


                  const newTime = {
                    time: timer.textContent
                  }

                  UpdateData(newTime, ctg.id)
                  console.log(newTime)
                });
            });


            categoriesContainer.appendChild(button);
        });
    })
    .catch(error => console.log(error));
};


// Добавляем обработчик события "click"
button.addEventListener("click", (e) => {
    e.preventDefault();
    const newData = {
        name:ctgNameInput.value,
        colour:ctgColorInput.value
    }

    InsertData(newData)

    // Выводим данные в консоль
    console.log(`Имя категории: ${ctgNameInput.value}`);
    console.log(`Выбранный цвет: ${ctgColorInput.value}`);


});

loadCategories();