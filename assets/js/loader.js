// assets/js/loader.js - ФИНАЛЬНАЯ ВЕРСИЯ

document.addEventListener("DOMContentLoaded", function() {
    
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject'); 
    const lessonId = params.get('id');

    let currentDB = null;
    switch(subject) {
        case 'cs11':   currentDB = DB_CS11;   break;
        case 'prog11': currentDB = DB_PROG11; break;
        case 'cs12':   currentDB = DB_CS12;   break;
        case 'prog12': currentDB = DB_PROG12; break;
        default: console.error("Database not found");
    }

    if (currentDB && currentDB[lessonId]) {
        const data = currentDB[lessonId];
        
        // 1. ЗАГОЛОВОК (Всегда есть)
        document.title = data.title;
        document.getElementById('lessonTitle').innerText = data.title;
        if(data.los) {
             // Проверка на массив или строку
             const losContent = Array.isArray(data.los) ? data.los.map(l=>`<span class="stage-badge">${l}</span>`).join(' ') : data.los;
             document.getElementById('lessonLOs').innerHTML = losContent;
        }

        // 2. КАРТИНКА (Адаптивная)
        const imgBlock = document.getElementById('imgBlock');
        // Проверяем: существует ли поле И не пустое ли оно
        if (data.image && data.image.trim() !== "") {
            document.getElementById('lessonImage').src = data.image;
            imgBlock.classList.remove('hidden');
        } else {
            imgBlock.classList.add('hidden');
        }

        // 3. ВИДЕО (Адаптивное)
        const videoBlock = document.getElementById('videoBlock');
        if (data.video && data.video.trim() !== "") {
            document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${data.video}`;
            videoBlock.classList.remove('hidden');
        } else {
            videoBlock.classList.add('hidden');
        }

        // 4. ТЕОРИЯ (Загрузка из внешнего файла)
        const theoryContainer = document.getElementById('theoryContainer');
        if (data.theoryUrl && data.theoryUrl.trim() !== "") {
            theoryContainer.classList.remove('hidden');
            theoryContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#777;"><i class="fas fa-spinner fa-spin"></i> Loading Content...</div>';
            
            fetch(data.theoryUrl)
                .then(r => {
                    if(!r.ok) throw new Error("File missing");
                    return r.text();
                })
                .then(html => theoryContainer.innerHTML = html)
                .catch(e => theoryContainer.innerHTML = `<p style="color:red">Theory file not found: ${data.theoryUrl}</p>`);
        } else {
            theoryContainer.classList.add('hidden');
        }

        // 5. ПРЕЗЕНТАЦИЯ (Адаптивная)
        const slidesBlock = document.getElementById('slidesBlock');
        if (data.slides && data.slides.trim() !== "") {
            document.getElementById('slidesFrame').src = data.slides;
            document.getElementById('slidesDownload').href = data.slides;
            slidesBlock.classList.remove('hidden');
        } else {
            slidesBlock.classList.add('hidden');
        }

        // 6. ТЕСТ (Адаптивный)
        const quizBlock = document.getElementById('quizBlock');
        if (data.quiz && data.quiz.length > 0) {
            quizBlock.classList.remove('hidden');
            document.getElementById('quizContainer').innerHTML = data.quiz.map((item, i) => `
                <div class="faq-item" onclick="this.classList.toggle('open')">
                    <div class="faq-question">${i+1}. ${item.q} <i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer">${item.a}</div>
                </div>
            `).join('');
        } else {
            quizBlock.classList.add('hidden');
        }

    } else {
        document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px;'>Lesson Not Found</h1>";
    }
});
