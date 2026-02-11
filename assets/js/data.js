// data.js - База знаний уроков

const lessonsData = {
    // Уникальный ID урока (придумываете сами, например "11-1a-software")
    "11-1a-software": {
        title: "11.1A Software Categories",
        los: ["11.3.1.1 Justify choice", "11.3.1.2 Classify software"],
        image: "assets/img/software-diagram.png", // Путь к картинке
        video: "kStBaNwhWOI", // ID видео с YouTube (если нет, оставьте пустые кавычки "")
        theoryPdf: "assets/docs/theory_software.pdf", // Ваш файл с теорией и таблицами
        presentationPdf: "assets/docs/slides_software.pdf",
        // Вопросы для самопроверки
        quiz: [
            { q: "Какой тип ПО самый дешевый?", a: "General Purpose (Off-the-shelf)" },
            { q: "Пример системного ПО?", a: "Operating System, Drivers" }
        ]
    },

    // Второй урок (просто копируете блок и меняете данные)
    "11-1a-os": {
        title: "11.1A Operating Systems",
        los: ["11.3.1.3 Functions of OS"],
        image: "assets/img/os-kernel.png",
        video: "", // Видео нет - блок скроется сам
        theoryPdf: "assets/docs/theory_os.pdf",
        presentationPdf: "assets/docs/slides_os.pdf",
        quiz: [
            { q: "Где хранится ядро ОС?", a: "В оперативной памяти (RAM) при загрузке" }
        ]
    }
};
