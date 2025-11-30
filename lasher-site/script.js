/* --- AYARLAR --- */
const DISCORD_ID = "828873496830279751";

/* --- ROZETLER --- */

const myBadges = [

    { name: "HypeSquad Balance", img: "img/hypesquad.png" },

    { name: "Aktif Geliştirici", img: "img/active_developer.png" },

    { name: "Görev Tamamlama",   img: "img/completed_quest.png" },

    { name: "Boost",             img: "img/boost.png" },

    { name: "Nitro Altın",       img: "img/early_supporter.png" },

    { name: "Nitro",             img: "img/orbs.png" }

];

/* --- 1. DİL DEĞİŞTİRME --- */
const greetings = [ "Merhaba Ben Arda,", "Hello I'm Arda,", "Salam Mən Arda,", "Bonjour Je suis Arda," ];
let greetIndex = 0;
function rotateGreeting() {
    const el = document.getElementById('language-text');
    if(!el) return;
    el.style.opacity = 0;
    setTimeout(() => {
        greetIndex = (greetIndex + 1) % greetings.length;
        el.innerText = greetings[greetIndex];
        el.style.opacity = 1;
    }, 800); 
}

/* --- 2. DAKTİLO EFEKTİ --- */
const TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate; this.el = el; this.loopNum = 0; this.period = parseInt(period, 10) || 2000; this.txt = ''; this.tick(); this.isDeleting = false;
};
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length; var fullTxt = this.toRotate[i];
    if (this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } else { this.txt = fullTxt.substring(0, this.txt.length + 1); }
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    var that = this; var delta = 200 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }
    if (!this.isDeleting && this.txt === fullTxt) { delta = this.period; this.isDeleting = true; } else if (this.isDeleting && this.txt === '') { this.isDeleting = false; this.loopNum++; delta = 500; }
    setTimeout(function() { that.tick(); }, delta);
};

/* --- ROZET OLUŞTURUCU (Tooltip Destekli) --- */
function createBadgeElement(badge) {
    const wrapper = document.createElement('div');
    wrapper.className = 'badge-wrapper';

    const img = document.createElement('img');
    img.src = badge.img;
    img.className = 'badge-icon';
    // Resim yüklenmezse gizle
    img.onerror = function() { wrapper.style.display = 'none'; };

    const tooltip = document.createElement('span');
    tooltip.className = 'badge-tooltip';
    tooltip.innerText = badge.name;

    wrapper.appendChild(img);
    wrapper.appendChild(tooltip);
    return wrapper;
}

/* --- DISCORD DURUMU --- */
async function fetchDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();
        const discordData = data.data || {};
        const user = discordData.discord_user || {};

        // Banner (Yerel dosya önceliği, API'den gelirse o)
        const bannerDiv = document.getElementById('discord-banner');
        if (user.banner) {
             const bannerExt = user.banner.startsWith("a_") ? "gif" : "png";
             bannerDiv.style.backgroundImage = `url(https://cdn.discordapp.com/banners/${DISCORD_ID}/${user.banner}.${bannerExt}?size=512)`;
        } else {
             // API Banner yoksa yerel dosyayı kullan
             bannerDiv.style.backgroundImage = "url('img/banner.gif.png')";
             bannerDiv.style.backgroundSize = "cover";
             bannerDiv.style.backgroundPosition = "center";
        }

        // Avatar
        if (user.avatar) {
            const ext = user.avatar.startsWith("a_") ? "gif" : "png";
            document.getElementById('discord-image').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${user.avatar}.${ext}?size=256`;
        } 

        document.getElementById('discord-displayname').innerText = user.global_name || "Arda";
        document.getElementById('discord-username').innerText = `@${user.username || "lasher"}`;

        // Durum Işığı
        const statusDiv = document.getElementById('discord-status-indicator');
        statusDiv.className = 'status-dot'; 
        switch(discordData.discord_status) {
            case 'online': statusDiv.classList.add('status-online'); break;
            case 'idle': statusDiv.classList.add('status-idle'); break;
            case 'dnd': statusDiv.classList.add('status-dnd'); break;
            default: statusDiv.classList.add('status-offline');
        }

        // Rozetler
        const badgesDiv = document.getElementById('discord-badges');
        // Sadece boşsa ekle (tekrar tekrar eklememek için)
        if (badgesDiv.innerHTML === "") {
            myBadges.forEach(badge => {
                const badgeEl = createBadgeElement(badge);
                badgesDiv.appendChild(badgeEl);
            });
        }

        // Aktivite & Çevrimdışı Modu
        const customStatusDiv = document.getElementById('discord-custom-status');
        const activityDiv = document.getElementById('discord-activity');
        const actHeader = document.querySelector('.act-header');

        if (discordData.discord_status === 'offline') {
            actHeader.innerText = "DURUM";
            customStatusDiv.style.display = "none";
            activityDiv.innerHTML = `<div style="display:flex; align-items:center; gap:12px; opacity: 0.7;"><i class="fas fa-moon" style="font-size: 2rem; color: #a1a1aa;"></i><div><p style="color:#a1a1aa; font-weight:600;">Şu an Çevrimdışı</p><div class="act-detail">Mesajlara daha sonra dönecektir.</div></div></div>`;
        } else {
            actHeader.innerText = "ŞU AN NE YAPIYOR?";
            const customStatus = discordData.activities ? discordData.activities.find(a => a.type === 4) : null;
            if (customStatus && customStatus.state) {
                customStatusDiv.style.display = "flex";
                let emojiHtml = customStatus.emoji ? (customStatus.emoji.id ? `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.png?v=1">` : customStatus.emoji.name + ' ') : '';
                customStatusDiv.innerHTML = `${emojiHtml} <span>${customStatus.state}</span>`;
            } else { customStatusDiv.style.display = "none"; }

            if (discordData.listening_to_spotify) {
                activityDiv.innerHTML = `<div style="display:flex; align-items:center; gap:12px;"><img src="${discordData.spotify.album_art_url}" style="width:60px; height:60px; border-radius:8px;"><div><p style="color:#1DB954; font-weight:700;">Spotify Dinliyor</p><div class="act-detail" style="color:white;">${discordData.spotify.song}</div><div class="act-detail">by ${discordData.spotify.artist}</div></div></div>`;
            } else if (discordData.activities && discordData.activities.length > 0) {
                let game = discordData.activities.find(a => a.type !== 4);
                if(game) {
                    let iconUrl = "https://i.imgur.com/5L7Q68E.png"; 
                    if (game.assets && game.assets.large_image) {
                        if (game.assets.large_image.startsWith("mp:")) { iconUrl = game.assets.large_image.replace("mp:", "https://media.discordapp.net/"); } else { iconUrl = `https://cdn.discordapp.com/app-assets/${game.application_id}/${game.assets.large_image}.png`; }
                    }
                    activityDiv.innerHTML = `<div style="display:flex; align-items:center; gap:12px;"><img src="${iconUrl}" style="width:60px; height:60px; border-radius:8px; object-fit:cover;" onerror="this.src='https://i.imgur.com/5L7Q68E.png'"><div><p>${game.name}</p><div class="act-detail">${game.details || game.state || 'Oynuyor'}</div><div class="act-detail">${game.state || ''}</div></div></div>`;
                } else { activityDiv.innerHTML = `<p style="color:#71717a">Şu an aktif bir oyun yok.</p>`; }
            } else { activityDiv.innerHTML = `<p style="color:#71717a">Şu an aktif bir oyun yok.</p>`; }
        }

    } catch (e) { 
        console.error("API Hatası:", e);
        // Hata olsa bile rozetleri manuel ekle
        const badgesDiv = document.getElementById('discord-badges');
        if (badgesDiv && badgesDiv.innerHTML === "") {
            myBadges.forEach(badge => { const badgeEl = createBadgeElement(badge); badgesDiv.appendChild(badgeEl); });
        }
        // Banner'ı yerel dosyadan yükle
        const bannerDiv = document.getElementById('discord-banner');
        if(bannerDiv) { 
            bannerDiv.style.backgroundImage = "url('img/banner.gif')"; 
            bannerDiv.style.backgroundSize = "cover"; 
        }
    }
}

/* --- MOUSE TAKİPÇİSİ --- */
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if(cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
});

/* --- INIT & TÜM EVENTLER --- */
document.addEventListener('DOMContentLoaded', () => {
    // Discord ve Animasyonları Başlat
    fetchDiscordStatus();
    setInterval(fetchDiscordStatus, 5000);
    setInterval(rotateGreeting, 6000);

    // Daktilo
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) { var toRotate = elements[i].getAttribute('data-type'); var period = elements[i].getAttribute('data-period'); if (toRotate) new TxtType(elements[i], JSON.parse(toRotate), period); }
    
    // İletişim Formu
    const form = document.getElementById('contact-form');
    const notification = document.getElementById('notification');
    if (form) {
        form.addEventListener('submit', async function(event) { event.preventDefault(); const formData = new FormData(form); try { const response = await fetch(form.action, { method: form.method, body: formData, headers: { 'Accept': 'application/json' } }); if (response.ok) { form.reset(); notification.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi!'; notification.classList.add('show'); setTimeout(() => { notification.classList.remove('show'); }, 4000); } else { alert("Hata oluştu."); } } catch (error) { alert("Mesaj gönderilemedi."); } });
    }

    /* --- LİNKLERİ YÖNETME (YÜKLEME & STEAM KOPYALAMA) --- */
    const socialLinks = document.querySelectorAll('.social-item');
    const loader = document.getElementById('link-loader');
    const loaderText = document.getElementById('loader-text');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 1. STEAM İSE: KOPYALA VE MENÜYÜ KAPAT
            if (link.classList.contains('copy-link')) {
                e.preventDefault(); // Gitme
                
                const textToCopy = link.getAttribute('data-copy');
                
                // Panoya kopyala
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Bildirim göster
                    notification.innerHTML = '<i class="fas fa-check-circle"></i> Steam ID kopyalandı!';
                    notification.classList.add('show');
                    setTimeout(() => { notification.classList.remove('show'); }, 3000);

                    // --- MENÜYÜ KAPATMA HİLESİ ---
                    const dropdownContent = link.closest('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none'; // Görünmez yap
                        // Mouse çekilince eski haline getir (tekrar açılabilsin diye)
                        setTimeout(() => { dropdownContent.style.display = ''; }, 500); 
                    }
                });
                return; // Loader'ı çalıştırma
            }

            // 2. DİĞER LİNKLER İSE: YÜKLEME EKRANI
            e.preventDefault(); 
            const targetUrl = link.href; 
            const platformName = link.innerText.trim(); 

            if(loaderText) loaderText.innerHTML = `<span style="color:#6366f1">${platformName}</span> Yükleniyor...`;
            if(loader) loader.classList.add('active');

            setTimeout(() => {
                window.open(targetUrl, '_blank'); 
                if(loader) loader.classList.remove('active'); 
            }, 1500);
        });
    });
});

// Scroll Animasyonu
const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* =========================================
   GITHUB PROJELERİNİ ÇEKME ENTEGRASYONU
   ========================================= */

// ⚠️ BURAYI KENDİ GITHUB KULLANICI ADINLA DEĞİŞTİR!
const GITHUB_USERNAME = "LasherrR"; 


const languageColors = {
    "JavaScript": "#f7df1e", "Python": "#3572A5", "HTML": "#e34c26", "CSS": "#563d7c",
    "Java": "#b07219", "C#": "#178600", "PHP": "#4F5D95", "TypeScript": "#2b7489",
    "Vue": "#41b883", "React": "#61dafb", "C++": "#f34b7d", "Shell": "#89e051"
};

async function fetchGithubRepos() {
    const container = document.getElementById('github-projects');
    const loader = document.getElementById('loading-spinner');
    const btnContainer = document.getElementById('github-btn-container');

    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        if (!response.ok) throw new Error('GitHub verisi alınamadı');
        const repos = await response.json();

        loader.style.display = 'none';

        // Fork olmayan ilk 6 proje
        const myRepos = repos.filter(repo => !repo.fork).slice(0, 6);

        if (myRepos.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%;">Henüz proje yok.</p>';
            return;
        }

        myRepos.forEach(repo => {
            const langColor = languageColors[repo.language] || "#858585"; // Sadece nokta rengi
            const langName = repo.language || "Kod";
            const description = repo.description || "Açıklama bulunmuyor.";

            // Topicleri al (Varsa ilk 3)
            let topicsHtml = '';
            if (repo.topics && repo.topics.length > 0) {
                topicsHtml = `<div class="repo-topics">
                    ${repo.topics.slice(0, 3).map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>`;
            }

            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = "_blank";
            card.className = "repo-card fade-in";

            card.innerHTML = `
                <div class="repo-top">
                    <div class="repo-header">
                        <i class="far fa-folder"></i>
                        <h3>${repo.name}</h3>
                    </div>
                    <i class="fas fa-external-link-alt external-icon"></i>
                </div>
                
                <p class="repo-description">${description}</p>
                
                ${topicsHtml}

                <div class="repo-footer">
                    <div class="repo-lang">
                        <span class="lang-dot" style="background-color: ${langColor};"></span>
                        <span>${langName}</span>
                    </div>
                    <div class="repo-stats">
                        <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        if(btnContainer) {
            btnContainer.style.display = 'block';
            btnContainer.querySelector('a').href = `https://github.com/${GITHUB_USERNAME}`;
        }

        const newCards = document.querySelectorAll('.repo-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        });
        newCards.forEach(el => observer.observe(el));

    } catch (error) {
        console.error(error);
        loader.style.display = 'none';
        container.innerHTML = '<p style="text-align:center;">Projeler yüklenemedi.</p>';
    }
}

// Sayfa Yüklendiğinde Çalıştır
document.addEventListener('DOMContentLoaded', () => {
    if(typeof fetchGithubRepos === "function") fetchGithubRepos();
});