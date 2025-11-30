# 🚀 Lasher | Premium Minimalist Developer Portföyü

[![GitHub Dil Dağılımı](https://img.shields.io/github/languages/top/LasherrR/Lasher-Portfolio-Site?color=6366F1&logo=javascript)](https://github.com/LasherrR)
[![Lisans](https://img.shields.io/github/license/LasherrR/Lasher-Portfolio-Site?color=EC4899)](https://github.com/LasherrR)

Bu proje, **Lasher** kullanıcı adıyla bilinen Arda'nın en güncel yeteneklerini ve online kimliğini sergilemek üzere tasarlanmış, tamamen statik (HTML/CSS/Vanilla JS) bir portföy sitesidir. Tasarım, **Dark Mode, Buzlu Cam (Glassmorphism) ve Neon Vurgular** üzerine kuruludur.

<b>NOT(ÖNEMLİ): Discord durumu yerinde verilerinizin anlık olarak çekilmesi için ve çalışması için bu discord sunucusuna katılın</b> <u>https://discord.gg/dwY8aSbGrx</u>

<u><b> BU PROJE YANLIZCA HTML İLE OLUŞTURULMUŞ BİR KAYNAK KODUDUR EKLEME YAPILABİLİR AMA PROJE DİREKT İZİNSİZ PAYLAŞILAMAZ REACT EKLEMELERİ YAPABİLİRSİNİZ! </b></u>

## ✨ Öne Çıkan Özellikler ve Modüller

Bu yapıyı standart bir portföyden ayıran temel dinamikler:

* **Çift Fazlı Dinamik Başlık:**
    * **Dil Döngüsü:** Ana sayfadaki selamlama ("Merhaba Ben Arda,") 6 saniyede bir Türkçe, İngilizce, Azerbaycanca ve Fransızca dilleri arasında yumuşak geçişle döner.
    * **Daktilo Efekti:** Alt satırdaki unvanlar ("Developer", "Full-Stack") sabit bir şekilde yazılıp silinme efektiyle (Typewriter) belirir.
* **Discord Entegrasyonu (Lanyard):** Discord kartı üzerinde anlık durumu (Online, DND) ve aktiviteyi (Spotify/Oyun) gösterir. Rozetler, kırılma riski olmadan manuel olarak entegre edilmiştir.
* **Özelleştirilebilir Ayarlar Paneli:** Navbar'daki dişli ikonuna tıklayınca açılan menüden; **Arka Plan Müziği**, **Mouse Işığı** ve **Animasyonlar** tek tuşla açılıp kapatılabilir.
* **İletişim & UX:** Formspree ile AJAX (Sayfa yenilenmeden) mesaj gönderme. Gönderim sonrası şık bir bildirim kutucuğu ile kullanıcıya bilgi verilir.
* **Kompakt Yetenek Listesi:** Bilinen diller (HTML, Python, C# vb.) için özelleştirilmiş, yatay **"Tech Chips"** sistemi. Üzerine gelince dile özel neon parlama verir.
* **Mouse Işığı (Cursor Glow):** Fareyi takip eden, amorf ve şeffaf bir ışık hüzmesi, siteye interaktif bir derinlik katar.

## 🛠️ Kurulum ve Konfigürasyon

Bu site statiktir ve bir sunucuya ihtiyaç duymaz. Tüm dosyaları GitHub'a yükleyip [Vercel](https://vercel.com/) veya [Netlify](https://www.netlify.com/) gibi bir hizmette anında yayınlayabilirsiniz.

### 1. Yerel Kurulum Adımları

1.  Proje dosyalarını indirin.
2.  **`img/`** klasörünün içinde; `banner.gif` (Discord kartı için), `lasher.png` (favicon) gibi görsellerin olduğundan emin olun.
3.  `index.html` dosyasını tarayıcınızda açın.

### 2. Kritik Ayarlar (script.js ve HTML)

Kodun düzgün çalışması için bu değişkenleri kendi bilgilerinizle değiştirin:

| Değişken Adı | Dosya | Varsayılan Değer | Açıklama |
| :--- | :--- | :--- | :--- |
| `DISCORD_ID` | `script.js` | `828873496830279751` | Durum ve avatar çekimi için. |
| `data-copy` | `index.html` | `"123456789"` | Steam butonuna tıklanınca kopyalanacak arkadaşlık kodunuz. |
| `action` | `contact.html` | `https://formspree.io/` | Formspree'den aldığınız kişisel adresiniz. |

---

## 🖼️ Proje Görselleri (Screnshots)

Aşağıdaki alana, sitenizin farklı özelliklerini gösteren 3 görseli ekleyebilirsiniz. Görseller, **`img/`** klasörüne yüklenmelidir.

| Ana Sayfa (Hero & Animasyon) | Hakkımda & Yetenekler | Discord Kartı & Tooltip |
| :--------------------------: | :-------------------: | :---------------------: |
| <a href="https://resimlink.com/9J7VSXWsG8w" title="ResimLink - Resim Yükle"><img src="https://r.resimlink.com/9J7VSXWsG8w.png" title="ResimLink - Resim Yükle" alt="ResimLink - Resim Yükle"></a> | <a href="https://resimlink.com/CK08DfMvZLr" title="ResimLink - Resim Yükle"><img src="https://r.resimlink.com/CK08DfMvZLr.png" title="ResimLink - Resim Yükle" alt="ResimLink - Resim Yükle"></a> | <a href="https://resimlink.com/FG9Po8T" title="ResimLink - Resim Yükle"><img src="https://r.resimlink.com/FG9Po8T.png" title="ResimLink - Resim Yükle" alt="ResimLink - Resim Yükle"></a> |

***
*Design by Lasher.*
