// === 1. ГЕНЕРАТОР ФОНОВЫХ ЗВЕЗДОЧЕК ===
function createStars() {
    const body = document.body;
    // Увеличили количество звезд до 80 для большей магии
    for(let i=0; i<1000; i++){
        let star = document.createElement('div');
        star.className = 'star';
        // Разбрасываем случайно по ширине (vw) и ВЫСОТЕ (vh)
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh'; 
        
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        body.appendChild(star);
    }
}
createStars();

// === 2. НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ ===
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if(screenId === 'screen-dialog') {
        startTypewriter();
    }
}

// === 3. ЛОГИКА ЭКРАНА ПАРОЛЯ ===
const PASSWORD = "1510"; 
let currentInput = "";
let wrongAttempts = 0; 
const pwdDisplay = document.getElementById('pwd-display');
const hintText = document.getElementById('hint-text'); 
const lockAvatar = document.getElementById('lock-avatar'); 

// Флаг, чтобы анимация ошибки/успеха не перебивалась мышкой
let isAnimating = false; 

// Реакция на наведение (ты жмуришься)
lockAvatar.addEventListener('mouseenter', () => {
    if (!isAnimating) lockAvatar.src = 'assets/avatar-hover.png';
});
lockAvatar.addEventListener('mouseleave', () => {
    if (!isAnimating) lockAvatar.src = 'assets/avatar-idle.png';
});
// Для телефонов (нажатие пальцем)
lockAvatar.addEventListener('touchstart', (e) => {
    if (!isAnimating) lockAvatar.src = 'assets/avatar-hover.png';
});
lockAvatar.addEventListener('touchend', () => {
    if (!isAnimating) lockAvatar.src = 'assets/avatar-idle.png';
});

function pressKey(key) {
    if(currentInput.length < 4) {
        currentInput += key;
        updateDisplay();
    }
    
    if(currentInput.length === 4) {
        setTimeout(checkPassword, 200);
    }
}

function updateDisplay() {
    let displayed = currentInput.padEnd(4, '_').split('').join(' ');
    pwdDisplay.innerText = displayed;
}

function checkPassword() {
    isAnimating = true; // Блокируем наведение, пока идет анимация пароля
    
    if(currentInput === PASSWORD) {
        // УГАДАЛ!
        const successSound = document.getElementById('sfx-success');
        successSound.volume = 0.5; // Громкость победного звука (50%)
        successSound.play().catch(e => {}); // Запускаем звук!

        pwdDisplay.innerText = "У М Н И Ч К А";
        pwdDisplay.classList.add('success-glow');
        hintText.innerText = "Взлом успешен! 💖"; 
        lockAvatar.src = 'assets/avatar-happy.png'; // ТЫ РАДУЕШЬСЯ
        
        setTimeout(() => {
            switchScreen('screen-dialog');
        }, 1500);
    } else {
        // ОШИБСЯ!
        pwdDisplay.classList.add('error-shake');
        pwdDisplay.style.color = "red";
        lockAvatar.src = 'assets/avatar-error.png'; // ТВОЯ РЕАКЦИЯ НА ОШИБКУ
        
        // Подсказки
        if (currentInput === "1111") {
            hintText.innerText = "ты думал все так легко?";
        } else {
            wrongAttempts++; 
            if (wrongAttempts === 1) {
                hintText.innerText = "с этого все началось...";
            } else if (wrongAttempts === 2) {
                hintText.innerText = "тогда ты сделал первый шаг";
            } else {
                hintText.innerText = "узнаешь местечко?";
            }
        }

        // Сброс через секунду
        setTimeout(() => {
            currentInput = "";
            updateDisplay();
            pwdDisplay.classList.remove('error-shake');
            pwdDisplay.style.color = "";
            lockAvatar.src = 'assets/avatar-idle.png'; // ВОЗВРАЩАЕМ ОБЫЧНУЮ ТЕБЯ
            isAnimating = false; // Снова разрешаем наведение
        }, 1000); 
    }
}

// === 4. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (ЭКРАН 2) ===
const textToType = "Привет, любимый! Я так долго ждала этот день... Я приготовила для тебя особенный цифровой подарок. Готов?";
let charIndex = 0;
let isTyping = false;

function startTypewriter() {
    if(isTyping) return;
    isTyping = true;
    document.getElementById('typewriter-text').innerHTML = "";
    charIndex = 0;
    typeNextChar();
}

function typeNextChar() {
    if (charIndex < textToType.length) {
        document.getElementById('typewriter-text').innerHTML += textToType.charAt(charIndex);
        charIndex++;
        
        // АНИМАЦИЯ РАЗГОВОРА: меняем аватарку каждые 3 символа
        const dialogAvatar = document.getElementById('dialog-avatar');
        if (dialogAvatar) {
            if (charIndex % 4 === 0) dialogAvatar.src = 'assets/avatar-happy.png';
            else if (charIndex % 4 === 2) dialogAvatar.src = 'assets/avatar-idle.png';
        }

        setTimeout(typeNextChar, 50);
    } else {
        document.getElementById('next-dialog').style.display = 'block';
        // Возвращаем спокойное лицо, когда текст дописан
        const dialogAvatar = document.getElementById('dialog-avatar');
        if (dialogAvatar) dialogAvatar.src = 'assets/avatar-idle.png';
    }
}



// === 6. ЛОГИКА ПОДАРКОВ И МОДАЛЬНЫХ ОКОН ===
const overlay = document.getElementById('modal-overlay');
const modals = {
    1: document.getElementById('modal-letter'),
    2: document.getElementById('modal-photos'),
    3: document.getElementById('modal-music')
};

function openGift(giftId, element) {
    const img = element.querySelector('img');
    img.src = 'assets/box-open.png';

    setTimeout(() => {
        Object.values(modals).forEach(m => m.style.display = 'none');
        modals[giftId].style.display = 'block';
        overlay.classList.add('active');
    }, 300);
}

function closeModal() {
    overlay.classList.remove('active');
}


// === 8. ИНТЕРАКТИВНЫЙ ФОТОАЛЬБОМ ===
const albumImg = document.getElementById('album-img');
const albumCaption = document.getElementById('album-caption');

let currentPage = 1;
const totalPages = 14; 

const pageCaptions = [
    "Знакомство и много-много чата",
    "Признание",
    "Зима холодная, а нам тепло",
    "Первые новогодние каникулы",
    "Первый счастливый февраль",
    "Переезд",
    "Весна и мы милые",
    "Тепло совсем",
    "Ураа лето",
    "Тест на расстояние",
    "Каникулыы",
    "Уютимся дома",
    "Наш второй октябрь и год знакомства!",
    "Наша годовщина! Люблю тебя!"
];

function updateAlbum() {
    // 1. Запускаем 3D-анимацию перелистывания страницы
    albumImg.parentElement.classList.add('turning');
    
    // 2. Ждем 300 миллисекунд (пока страница повернута ребром)
    setTimeout(() => {
        // Подставляем новую картинку и текст
        albumImg.src = `assets/page-${currentPage}.png`;
        albumCaption.innerText = pageCaptions[currentPage - 1]; 
        
        // Убираем зум на всякий случай
        albumImg.classList.remove('zoomed-album');
        
        // 3. Убираем класс поворота — страница "открывается" с новой картинкой
        albumImg.parentElement.classList.remove('turning');
    }, 300); // 300мс идеально совпадают с transition в CSS
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateAlbum();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateAlbum();
    }
}

// НОВАЯ ФУНКЦИЯ ЗУМА ПРИ КЛИКЕ (ПОВЕРХ ВСЕХ ОКОН)
function toggleAlbumZoom(element) {
    // 1. Создаем темный фон на весь экран
    const zoomOverlay = document.createElement('div');
    zoomOverlay.id = 'fullscreen-zoom';
    
    // Задаем стили прямо тут, чтобы не зависеть от CSS окон
    Object.assign(zoomOverlay.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: '999999', // Поверх вообще всего
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'url(assets/cursor-hover.png), zoom-out' // Возвращаем твой кастомный курсор
    });

    // 2. Клонируем картинку, на которую кликнули
    const imgClone = document.createElement('img');
    imgClone.src = element.src;
    
    // Настраиваем размер увеличенной картинки
    Object.assign(imgClone.style, {
        maxWidth: '90%',
        maxHeight: '90%',
        objectFit: 'contain',
        border: '4px solid #c0c0c0', // Ретро-рамочка
        boxShadow: '10px 10px 0px rgba(0,0,0,0.7)'
    });

    // 3. Закрываем зум при клике куда угодно
    zoomOverlay.onclick = function() {
        zoomOverlay.remove();
    };

    // 4. Добавляем всё это на страницу
    zoomOverlay.appendChild(imgClone);
    document.body.appendChild(zoomOverlay);
}
// === 9. ЗВУКИ ИНТЕРФЕЙСА И ФОНОВАЯ МУЗЫКА ===
const sfxClick = document.getElementById('sfx-click');
const bgMusic = document.getElementById('bg-music');

// Настраиваем громкость (фон делаем тихим, чтобы не перебивал клики)
sfxClick.volume = 0.4;
bgMusic.volume = 0.15; // 15% громкости

// МАГИЯ ЗАПУСКА: Включаем музыку при первом клике в любом месте экрана
let musicStarted = false;
document.body.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log("Ждем клика..."));
        musicStarted = true;
    }
});

// Собираем кнопки и вешаем на них ТОЛЬКО звук клика (без ховера)
const interactives = document.querySelectorAll('.key, .start-btn, .album-btn, .gift, .close-btn, #lock-avatar, .next-arrow');
interactives.forEach(el => {
    el.addEventListener('click', () => {
        sfxClick.currentTime = 0;
        sfxClick.play().catch(e => {});
    });
});
// === 10. МАГИЧЕСКИЙ СЛЕД ОТ КУРСОР ===
document.addEventListener('mousemove', function(e) {
    // Чтобы не перегружать ПК, создаем частицу не на каждый миллиметр движения, а с шансом 50%
    if (Math.random() > 0.5) return; 

    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    
    // Что именно будет сыпаться из-под курсора
    const symbols = ['✦', '❤', '★', '✨']; 
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    // Красим в разные цвета (белый, нежно-розовый, яркий розовый)
    const colors = ['#ffffff', '#ff9a9e', '#ff7eb3'];
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];

    // Ставим частицу ровно под курсор
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';

    document.body.appendChild(particle);

    // Убираем за собой мусор: удаляем частицу через 800 миллисекунд (когда кончится анимация)
    setTimeout(() => {
        particle.remove();
    }, 800);
});
// === 12. УМНЫЙ МУЗЫКАЛЬНЫЙ ПЛЕЕР (ПОДАРОК 3) ===
const giftSong = document.getElementById('gift-song');
const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const vinyl = document.getElementById('vinyl');
const progressFill = document.getElementById('progress-fill');
const backgroundMusic = document.getElementById('bg-music'); 

if (giftSong) {
    giftSong.volume = 0.5; // Громкость трека
}

if (btnPlay && btnPause) {
    btnPlay.addEventListener('click', () => {
        if (backgroundMusic) backgroundMusic.pause(); 
        vinyl.classList.add('spinning'); 
        giftSong.play().catch(e => alert("Браузер не может включить песню! Проверь assets.")); 
    });

    btnPause.addEventListener('click', () => {
        giftSong.pause(); 
        if (backgroundMusic) backgroundMusic.play().catch(e => {}); 
        vinyl.classList.remove('spinning'); 
    });

    // Движение ползунка
    giftSong.addEventListener('timeupdate', () => {
        if (giftSong.duration) {
            const progress = (giftSong.currentTime / giftSong.duration) * 100;
            if (progressFill) progressFill.style.width = progress + '%';
        }
    });

    // Когда трек заканчивается, пластинка останавливается
    giftSong.addEventListener('ended', () => {
        vinyl.classList.remove('spinning');
        if (backgroundMusic) backgroundMusic.play().catch(e => {});
    });
}