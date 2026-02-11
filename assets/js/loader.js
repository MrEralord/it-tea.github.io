// loader.js - Основной движок сайта

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Считываем параметры из адресной строки
    // Пример: lesson.html?subject=cs12&id=u3b-1
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject'); 
    const lessonId = params.get('id');

    let currentDB = null;
    let subjectFolder = ""; // Папка, где лежат PDF (11cs, 12prog и т.д.)

    // 2. Определяем, какую базу данных открыть
    switch(subject) {
        case 'cs11':   currentDB = DB_CS11;   subjectFolder = "11cs";   break;
        case 'prog11': currentDB = DB_PROG11; subjectFolder = "11prog"; break;
        case 'cs12':   currentDB = DB_CS12;   subjectFolder = "12cs";   break;
        case 'prog12': currentDB = DB_PROG12; subjectFolder = "12prog"; break;
        default: console.error("Subject not found");
    }

    // 3. Загружаем контент
    if (currentDB && currentDB[lessonId]) {
        const data = currentDB[lessonId];
        
        // --- Заголовки ---
        document.title = data.title + " | IT-Tea";
        document.getElementById('lessonTitle').innerText = data.title;
        
        // --- Цели обучения (LOs) ---
        // Если это массив - превращаем в бейджи, если строка - оставляем текстом
        if (Array.isArray(data.los)) {
            document.getElementById('lessonLOs').innerHTML = data.los.map(lo => 
                `<span class="stage-badge">${lo}</span>`
            ).join(' ');
        } else {
            document.getElementById('lessonLOs').innerHTML = data.los;
        }

        // --- Картинка (Image) ---
        const imgBlock = document.getElementById('imgBlock');
        if (data.image) {
            document.getElementById('lessonImage').src = data.image;
            imgBlock.classList.remove('hidden');
        } else {
            imgBlock.classList.add('hidden');
        }

        // --- Видео (Video) ---
        const videoBlock = document.getElementById('videoBlock');
        if (data.video) {
            document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${data.video}`;
            videoBlock.classList.remove('hidden');
        } else {
            videoBlock.classList.add('hidden');
        }

        // --- PDF Файлы (Theory & Slides) ---
        // Пути формируются автоматически или берутся из базы
        const theoryPath = data.theory;
        const slidesPath = data.slides;

        // Theory Tab
        if (theoryPath) {
            document.getElementById('theoryFrame').src = theoryPath;
            document.getElementById('theoryDownload').href = theoryPath;
        } else {
            document.getElementById('theory').innerHTML = "<p class='center-text'>No theory material available.</p>";
        }

        // Slides Tab
        if (slidesPath) {
            document.getElementById('slidesFrame').src = slidesPath;
            document.getElementById('slidesDownload').href = slidesPath;
        } else {
            document.getElementById('slides').innerHTML = "<p class='center-text'>No presentation available.</p>";
        }

        // --- Тест (Quiz) ---
        const quizBlock = document.getElementById('quizBlock');
        const quizContainer = document.getElementById('quizContainer');
        
        if (data.quiz && data.quiz.length > 0) {
            quizBlock.classList.remove('hidden');
            quizContainer.innerHTML = data.quiz.map((item, index) => `
                <div class="faq-item" onclick="this.classList.toggle('open')">
                    <div class="faq-question">
                        <span>${index + 1}. ${item.q}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">${item.a}</div>
                </div>
            `).join('');
        } else {
            quizBlock.classList.add('hidden');
        }

    } else {
        // Если урок не найден
        document.querySelector('.container').innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <h1>404 <i class="fas fa-robot"></i></h1>
                <p>Lesson not found or database missing.</p>
                <a href="index.html" class="btn">Go Home</a>
            </div>
        `;
    }
});