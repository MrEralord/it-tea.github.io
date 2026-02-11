document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Получаем параметры URL
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject'); 
    const lessonId = params.get('id');

    let currentDB = null;

    // 2. Выбираем базу данных
    switch(subject) {
        case 'cs11':   currentDB = DB_CS11;   break;
        case 'prog11': currentDB = DB_PROG11; break;
        case 'cs12':   currentDB = DB_CS12;   break;
        case 'prog12': currentDB = DB_PROG12; break;
        default: console.error("Subject database not found");
    }

    // 3. Загружаем данные урока
    if (currentDB && currentDB[lessonId]) {
        const data = currentDB[lessonId];
        
        // --- Заголовки и Цели ---
        document.title = data.title;
        document.getElementById('lessonTitle').innerText = data.title;
        
        if (Array.isArray(data.los)) {
            document.getElementById('lessonLOs').innerHTML = data.los.map(lo => 
                `<span class="stage-badge">${lo}</span>`
            ).join(' ');
        } else {
            document.getElementById('lessonLOs').innerHTML = data.los;
        }

        // --- Картинка ---
        const imgBlock = document.getElementById('imgBlock');
        if (data.image) {
            document.getElementById('lessonImage').src = data.image;
            imgBlock.classList.remove('hidden');
        } else {
            imgBlock.classList.add('hidden');
        }

        // --- Видео (YouTube) ---
        const videoBlock = document.getElementById('videoBlock');
        if (data.video) {
            document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${data.video}`;
            videoBlock.classList.remove('hidden');
        } else {
            videoBlock.classList.add('hidden');
        }

        // --- ТЕОРИЯ (Загрузка внешнего HTML файла) ---
        const theoryContainer = document.getElementById('theoryContainer');
        
        if (data.theoryUrl) {
            theoryContainer.classList.remove('hidden');
            // Индикатор загрузки
            theoryContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#777;"><i class="fas fa-spinner fa-spin"></i> Loading Theory...</div>';

            fetch(data.theoryUrl)
                .then(response => {
                    if (!response.ok) throw new Error("File not found");
                    return response.text();
                })
                .then(html => {
                    // Вставляем полученный HTML внутрь контейнера
                    theoryContainer.innerHTML = html;
                })
                .catch(err => {
                    theoryContainer.innerHTML = `<p style="color:red; text-align:center;">Error loading theory: ${err.message}</p>`;
                });
        } else {
            // Если файла нет в базе - скрываем блок
            theoryContainer.classList.add('hidden');
        }

        // --- Презентация (PDF) ---
        const slidesBlock = document.getElementById('slidesBlock');
        if (data.slides) {
            document.getElementById('slidesFrame').src = data.slides;
            document.getElementById('slidesDownload').href = data.slides;
            slidesBlock.classList.remove('hidden');
        } else {
            slidesBlock.classList.add('hidden');
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
        // Ошибка 404
        document.querySelector('.container').innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <h1>Lesson Not Found</h1>
                <p>Please check the URL or the database file.</p>
                <a href="index.html" class="btn">Back to Dashboard</a>
            </div>
        `;
    }
});
