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
        default: console.error("DB not found");
    }

    if (currentDB && currentDB[lessonId]) {
        const data = currentDB[lessonId];
        
        // 1. ЗАГОЛОВОК И LO
        const titleEl = document.getElementById('lessonTitle');
        if (titleEl) titleEl.innerText = data.title;
        document.title = data.title;

        const loEl = document.getElementById('lessonLOs');
        if (loEl && data.los) {
            const losContent = Array.isArray(data.los) ? data.los.map(l=>`<span class="stage-badge">${l}</span>`).join(' ') : data.los;
            loEl.innerHTML = losContent;
        }

        // 2. КАРТИНКА (Безопасная проверка)
        const imgBlock = document.getElementById('imgBlock');
        const imgEl = document.getElementById('lessonImage');
        if (imgBlock && imgEl) {
            if (data.image && data.image.trim() !== "") {
                imgEl.src = data.image;
                imgBlock.classList.remove('hidden');
            } else {
                imgBlock.classList.add('hidden');
            }
        }

        // 3. ВИДЕО
        const videoBlock = document.getElementById('videoBlock');
        const videoFrame = document.getElementById('videoFrame');
        if (videoBlock && videoFrame) {
            if (data.video && data.video.trim() !== "") {
                videoFrame.src = `https://www.youtube.com/embed/${data.video}`;
                videoBlock.classList.remove('hidden');
            } else {
                videoBlock.classList.add('hidden');
            }
        }

        // 4. ТЕОРИЯ (HTML Файл)
        const theoryContainer = document.getElementById('theoryContainer');
        if (theoryContainer) {
            if (data.theoryUrl && data.theoryUrl.trim() !== "") {
                theoryContainer.classList.remove('hidden');
                theoryContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#777;"><i class="fas fa-spinner fa-spin"></i> Loading Theory...</div>';
                
                fetch(data.theoryUrl)
                    .then(r => {
                        if(!r.ok) throw new Error("File missing");
                        return r.text();
                    })
                    .then(html => theoryContainer.innerHTML = html)
                    .catch(e => theoryContainer.innerHTML = `<p style="color:red">Theory error: ${e.message}</p>`);
            } else {
                theoryContainer.classList.add('hidden');
            }
        }

        // 5. ПРЕЗЕНТАЦИЯ
        const slidesBlock = document.getElementById('slidesBlock');
        const slidesFrame = document.getElementById('slidesFrame');
        const slidesDown = document.getElementById('slidesDownload');
        if (slidesBlock && slidesFrame) {
            if (data.slides && data.slides.trim() !== "") {
                slidesFrame.src = data.slides;
                if(slidesDown) slidesDown.href = data.slides;
                slidesBlock.classList.remove('hidden');
            } else {
                slidesBlock.classList.add('hidden');
            }
        }

        // 6. ТЕСТ (QUIZ)
        const quizBlock = document.getElementById('quizBlock');
        const quizContainer = document.getElementById('quizContainer');
        if (quizBlock && quizContainer) {
            if (data.quiz && data.quiz.length > 0) {
                quizBlock.classList.remove('hidden');
                quizContainer.innerHTML = data.quiz.map((item, i) => `
                    <div class="faq-item" onclick="this.classList.toggle('open')">
                        <div class="faq-question">
                            <span>${i+1}. ${item.q}</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">${item.a}</div>
                    </div>
                `).join('');
            } else {
                quizBlock.classList.add('hidden');
            }
        }

    } else {
        document.body.innerHTML = "<div class='container'><h1>Lesson Not Found</h1><p>Check the ID in URL.</p></div>";
    }
});
