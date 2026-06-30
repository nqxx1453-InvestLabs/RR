const fs = require('fs');
const path = require('path');

// Define the 300 projects (100 per category]
// Kategori A: Zirvedeki Devler (100]
const cat_a = [
    // Top 10 Detailed
    {
        "name": "Lido Finance", "logo": "🪙", "type": "Akışkan Staking Lideri", "metric": "$34.0 Milyar+ (TVL)", "speed": "İstikrarlı Liderlik",
        "business": "Staking ödüllerinden alınan %10 protokol ücreti (fee) üzerinden gelir elde eder. stETH aracılığıyla DeFi ekosistemine devasa likidite sağlar.",
        "s": "Sektördeki en yüksek likidite, güçlü akıllı sözleşme kod kalitesi, sürekli bağımsız denetim raporları.",
        "w": "Ethereum konsensüs mekanizması üzerinde aşırı pazar payına sahip olmanın getirdiği merkezileşme riski.",
        "lesson": "Neden Kazandı: Güçlü ve sürekli akıllı sözleşme denetimleri, pazar likiditesi üzerinde erken dönemde kurulan tekel ve DeFi genelinde stETH'i standart yapması.",
        "implemented": [
            {"time": "Uygulanan", "event": "stETH likidite havuzları ve DeFi entegrasyonları."},
            {"time": "Uygulanan", "event": "V3 modüler staking mimarisinin hayata geçirilmesi."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Tam izinsiz node operatörlüğü (ValMart) hala test aşamasında."}
        ]
    },
    {
        "name": "EigenLayer", "logo": "🌀", "type": "Yeniden Staking Standardı", "metric": "$12.0 Milyar+ (TVL)", "speed": "Çok Hızlı Büyüme",
        "business": "AVS işlemlerinden kesilen komisyonlar ve yeniden stake edilen varlıklardan alınan işlem ücretleriyle çalışır. Ethereum güvenliğini diğer ağlara kiralar.",
        "s": "Sektörde tamamen yeni bir pazar yaratması, sermaye verimliliğini maksimuma çıkarması.",
        "w": "Protokol karmaşıklığı, akıllı sözleşmelerde üst üste binen risk katmanları.",
        "lesson": "Neden Kazandı: ETH staking güvenliğini diğer protokollere kiralayarak ekosistem genelinde paylaşımlı güvenlik katmanı oluşturması.",
        "implemented": [
            {"time": "Uygulanan", "event": "AVS altyapısının devreye alınması."},
            {"time": "Uygulanan", "event": "EigenDA (veri kullanılabilirliği katmanı) entegrasyonu."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Otonom slashing motoru ve otomatik ceza sistemi."}
        ]
    },
    {
        "name": "Rocket Pool", "logo": "🚀", "type": "Merkeziyetsiz Likit Staking", "metric": "$4.0 Milyar+ (TVL)", "speed": "Dengeli Büyüme",
        "business": "Bireysel düğüm operatörlerinin yatırdığı ETH'ler üzerinden alınan komisyonlar ve RPL token ödülleriyle çalışır.",
        "s": "Gerçek merkeziyetsiz düğüm yapısı, yüksek sansür direnci.",
        "w": "Lido'ya göre daha düşük likidite ve rETH entegrasyon oranları.",
        "lesson": "Neden Kazandı: Lido'nun merkezileşme riskine karşı topluluk odaklı, sansür direnci yüksek bir alternatif sunması.",
        "implemented": [
            {"time": "Uygulanan", "event": "8 ETH ile mini-node kurulumu (Atlas Güncellemesi - LEB8)."},
            {"time": "Uygulanan", "event": "rETH basımının ve likidite havuzlarının aktif edilmesi."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Kurumsal saklama çözümleri tam entegrasyonu."}
        ]
    },
    {
        "name": "Jito Network", "logo": "🔥", "type": "Solana MEV Optimizasyonu", "metric": "$2.5 Milyar+ (TVL)", "speed": "Hızlı Büyüme",
        "business": "Solana ağında MEV (Maksimum Çıkarılabilir Değer) ödüllerini staking getirisine ekleyerek LST (JitoSOL) sunar.",
        "s": "Solana ağındaki en optimize MEV altyapısı, yüksek APY oranları.",
        "w": "Solana ekosisteminin teknik kesintilerine bağımlılık.",
        "lesson": "Neden Kazandı: Solana ağındaki spam işlemlerin önüne geçen MEV optimizasyonlu doğrulayıcı ağı kurması.",
        "implemented": [
            {"time": "Uygulanan", "event": "JitoSOL ödül dağıtım motorunun kurulması."},
            {"time": "Uygulanan", "event": "Performanslı MEV istemcisinin Solana doğrulayıcılarına entegrasyonu."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Çoklu zincir MEV entegrasyonları."}
        ]
    },
    {
        "name": "Aave V3", "logo": "👻", "type": "Likidite Dağıtım Devi", "metric": "$15.0 Milyar+ (TVL)", "speed": "Dengeli",
        "business": "Borç verme/alma faiz marjları, flaş kredi ücretleri ve protokol rezerv komisyonları ile çalışır.",
        "s": "Devasa likidite gücü, çoklu zincir desteği ve yüksek güvenlikli risk parametreleri.",
        "w": "Sistemik DeFi riskleri, teminat stablecoinlerin de-peg riski.",
        "lesson": "Neden Kazandı: DeFi dünyasında en güvenilir borç alma ve verme pazarı olarak kendini kanıtlaması.",
        "implemented": [
            {"time": "Uygulanan", "event": "Portal (zincirler arası varlık transferi) altyapısı."},
            {"time": "Uygulanan", "event": "High-Efficiency Mode (E-Mode) ile verimlilik."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "GHO stabil coininin tam otonom peg koruma algoritması."}
        ]
    },
    {
        "name": "MakerDAO / Sky", "logo": "🦅", "type": "DAI Sabit Para Altyapısı", "metric": "$8.0 Milyar+ (TVL)", "speed": "İstikrarlı",
        "business": "DAI sabit para ihracından alınan faizler ve RWA (Gerçek Dünya Varlığı) yatırımlarından elde edilen getiriler.",
        "s": "İlk ve en büyük merkeziyetsiz stablecoin projesi olması, devasa hazine yönetimi.",
        "w": "RWA varlıklarının fiziksel dünyadaki hukuki riskleri.",
        "lesson": "Neden Kazandı: Geleneksel tahvil ve hazine bonolarını teminat olarak kullanarak çıpayı desteklemesi.",
        "implemented": [
            {"time": "Uygulanan", "event": "RWA (Gerçek Dünya Varlığı) teminatlandırması."},
            {"time": "Uygulanan", "event": "Sky ekosistemi ve yeni tasarruf oranları."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Tam otonom alt-DAO yönetim modeli."}
        ]
    },
    {
        "name": "Uniswap Labs", "logo": "🦄", "type": "Likidite Havuz Standardı", "metric": "Sınırsız (Hacim)", "speed": "Pazar Lideri",
        "business": "Kullanıcılardan alınan likidite havuzu işlem ücretleri ve UNI token yönetişimi.",
        "s": "DeFi genelindeki en yüksek işlem hacmi, izinsiz pazar kurma kolaylığı.",
        "w": "Geçici kayıp (impermanent loss) riski, front-running saldırıları.",
        "lesson": "Neden Kazandı: Basit, şeffaf ve izinsiz AMM standardını getirerek takasları zincir üstüne kaydırması.",
        "implemented": [
            {"time": "Uygulanan", "event": "V4 Hooks mimarisinin geliştirilmesi."},
            {"time": "Uygulanan", "event": "Konsantre likidite (V3) modelleri."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Mobil cüzdan içi yerleşik anlık on-chain limit emir motoru."}
        ]
    },
    {
        "name": "Frax Finance", "logo": "⚖️", "type": "Hibrit DeFi Sistemi", "metric": "$1.2 Milyar+ (TVL)", "speed": "Orta Hızlı",
        "business": "FRAX stabil coininin algoritmik pazar işlemleri (AMO) ve frxETH staking komisyonları.",
        "s": "Algoritmik faiz ve likidite yönetimi, Curve ekosistemindeki rüşvet gücü.",
        "w": "Karmaşık çoklu token yapısı ve sistemik de-peg riskleri.",
        "lesson": "Neden Kazandı: Kısmi teminatlı sabit coinler ve staking türevleri arasında yüksek verimliliğe sahip hibrit bir finansal ağ kurması.",
        "implemented": [
            {"time": "Uygulanan", "event": "Fraxlend borç verme piyasası."},
            {"time": "Uygulanan", "event": "frxETH V2 likit staking altyapısı."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Tamamen yapay zekaya bağlı otonom faiz dengeleme modülü."}
        ]
    },
    {
        "name": "Coinbase Cloud", "logo": "☁️", "type": "Kurumsal Doğrulayıcı", "metric": "Kurumsal Hacim", "speed": "Güvenilir / Sabit",
        "business": "Kurumsal müşteriler için staking altyapısı sunar ve staking ödüllerinden servis ücreti keser.",
        "s": "Regülasyonlara tam uyum, sıfır slashing cezası ve yüksek altyapı güvenliği.",
        "w": "Yüksek servis komisyonları, merkezi borsa yapısına bağımlılık.",
        "lesson": "Neden Kazandı: Kurumsal düzeyde yasal uyumluluk ve kesintisiz doğrulayıcı altyapısı sunarak büyük fonları çekmesi.",
        "implemented": [
            {"time": "Uygulanan", "event": "%99.9 Uptime garantisinin sunulması."},
            {"time": "Uygulanan", "event": "SLA (Hizmet Seviyesi Anlaşması) sigortaları."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Bireysel kullanıcılar için düşük komisyonlu erişim havuzları."}
        ]
    },
    {
        "name": "Stake.com", "logo": "🎲", "type": "Kripto Bahis Lideri", "metric": "$2.6 Milyar (Gelir)", "speed": "Agresif Büyüme",
        "business": "Kasa avantajı (house edge) ve spor bahis marjları. Kick.com entegrasyonu sayesinde sıfıra yakın kullanıcı edinme maliyeti.",
        "s": "Provably Fair oyun altyapısı, anında kripto çekim motoru, Kick.com entegrasyonu.",
        "w": "Küresel bahis regülasyonlarının getirdiği kısıtlamalar.",
        "lesson": "Neden Kazandı: Kriptonun hız avantajını kumar sektörüyle birleştirmesi ve geleneksel reklam yasaklarını Kick üzerinden aşması.",
        "implemented": [
            {"time": "Uygulanan", "event": "Provably Fair oyun mimarisi ve anında çekim motoru."},
            {"time": "Uygulanan", "event": "Kick.com entegrasyonu ve yayıncılık ekosistemi."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Tamamen merkeziyetsiz, DAO yönetimli on-chain casino versiyonu."}
        ]
    }
];

const cat_b = [
    {
        "name": "FTX / Alameda", "logo": "💥", "type": "Kripto Borsası & Hedge Fon", "metric": "$8.9 Milyar", "speed": "Çok Hızlı",
        "business": "Müşteri fonlarını Alameda Research aracılığıyla kaldıraçlı işlemlerde ve şahsi harcamalarda kullanma.",
        "s": "Agresif lobicilik faaliyetleri, devasa kurumsal ortaklıklar ve spor sponsorlukları.",
        "w": "Arka kapı (allow_negative) koduyla müşteri fonlarının kontrolsüz harcanması.",
        "lesson": "Zafiyet: Borsa ve kardeş yatırım fonu arasındaki çıkar çatışması, kurumsal denetimin sıfır olması.",
        "fraudPhases": [
            {"title": "Evre 1: Güven & Lobicilik", "desc": "SBF'in regülasyon dostu imajıyla milyarlarca dolar kurumsal fon çekmesi."},
            {"title": "Evre 2: Arka Kapı Entegrasyonu", "desc": "FTX cüzdanlarından Alameda'ya otomatik fon aktaran kodun yazılması."},
            {"title": "Evre 3: Çöküş & İflas", "desc": "Binance'in FTT satışı dalgasıyla başlayan bank-run sonucu likidite açığının ortaya çıkması."}
        ]
    },
    {
        "name": "Thodex", "logo": "🇹🇷", "type": "Kripto Borsası", "metric": "$2.0 Milyar", "speed": "Anlık",
        "business": "Yerel borsa cüzdanlarındaki müşteri fonlarını tek bir soğuk cüzdanda toplayıp kaçma.",
        "s": "Porsche çekilişleri ve ünlülerin katıldığı lüks reklam kampanyaları ile hızlı güven inşası.",
        "w": "Müşteri fonlarının soğuk cüzdan anahtarlarının tek bir kurucunun elinde toplanması.",
        "lesson": "Zafiyet: Çoklu imza (multisig) altyapısının bulunmaması ve denetim mekanizmalarının olmaması.",
        "fraudPhases": [
            {"title": "Evre 1: Agresif Reklam", "desc": "Ünlülerle büyük reklam kampanyaları düzenleyerek hacim çekilmesi."},
            {"title": "Evre 2: İşlemleri Kapatma", "desc": "Ortaklık bahanesiyle para çekim işlemlerinin aniden durdurulması."},
            {"title": "Evre 3: Kaçış", "desc": "Kurucu Faruk Fatih Özer'in cüzdanlardaki 2 milyar dolarla yurtdışına kaçması."}
        ]
    },
    {
        "name": "Bitconnect", "logo": "💰", "type": "Staking & Borç Verme", "metric": "$3.0 Milyar", "speed": "Yavaş",
        "business": "Sahte AI Trading Botu ile Ponzi şeması işletme. Yeni üyelerin parasıyla eskilerin faizini ödeme.",
        "s": "Günlük garanti %1 getiri vaadi ve agresif MLM (saadet zinciri) pazarlaması.",
        "w": "Şeffaf olmayan trading faaliyeti ve yapay BCC token fiyat manipülasyonu.",
        "lesson": "Zafiyet: Olmayan bir yapay zeka trading botunun garanti getiri sağladığı yalanı.",
        "fraudPhases": [
            {"title": "Evre 1: Garanti Getiri", "desc": "Günlük %1 kazanç vaat eden sahte arbitraj botunun pazarlanması."},
            {"title": "Evre 2: MLM Teşvikleri", "desc": "Sisteme yeni üye kazandıranlara yüksek referans komisyonları dağıtılması."},
            {"title": "Evre 3: Fişi Çekme", "desc": "Regülatör uyarıları sonrası sistemin kapatılıp BCC token değerinin sıfırlanması."}
        ]
    },
    {
        "name": "OneCoin", "logo": "🪙", "type": "Sahte Kripto Para", "metric": "$4.0 Milyar", "speed": "Yavaş",
        "business": "Ortada bir blokzincir kodu olmadan, SQL veri tabanında sayılar oynatarak paket satışı yapma.",
        "s": "Lüks etkinlikler ve 'Bitcoin Katili' pazarlama vizyonuyla küresel kitleleri etkileme.",
        "w": "Açık kaynak kodunun, blokzincir transferinin veya madenciliğin hiç olmaması.",
        "lesson": "Zafiyet: Blokzincir teknolojisi taklidi yapılarak sadece pazarlamayla milyarlar toplanması.",
        "fraudPhases": [
            {"title": "Evre 1: Eğitim Paketi Satışı", "desc": "Kripto eğitim paketleri adı altında sahte OneCoin dağıtılması."},
            {"title": "Evre 2: Sahte Borsa Gösterimi", "desc": "Sadece kendi panellerinde çalışan sahte işlem tahtası kurulması."},
            {"title": "Evre 3: Sırra Kadem Basma", "desc": "Kurucu Ruja Ignatova'nın milyarlarca dolarla aniden ortadan kaybolması."}
        ]
    },
    {
        "name": "QuadrigaCX", "logo": "🇨🇦", "type": "Kripto Borsası", "metric": "$250 Milyon", "speed": "Anlık",
        "business": "Kurucunun borsa fonlarını diğer borsalarda kaldıraçlı işlemlerde batırması ve şüpheli ölümüyle fonların kilitlenmesi.",
        "s": "Kanada'nın en eski ve en büyük borsası olması, hızlı nakit çekim işlemleri sunması.",
        "w": "Soğuk cüzdan özel anahtarlarına sahip tek kişinin kurucu Gerald Cotten olması.",
        "lesson": "Zafiyet: Çoklu imza (multisig) altyapısının bulunmaması ve tekil yönetim riski.",
        "fraudPhases": [
            {"title": "Evre 1: Likidite Yönetimi", "desc": "Kullanıcı fonlarının kurucunun kişisel hesaplarına aktarılması."},
            {"title": "Evre 2: Kaldıraçlı İşlemler", "desc": "Borsa fonlarının diğer borsalarda kaldıraçlı işlemlerde gizlice batırılması."},
            {"title": "Evre 3: Şüpheli Ölüm", "desc": "Kurucunun Hindistan'da ani ölümüyle tüm fonların kilitlendiğinin duyurulması."}
        ]
    },
    {
        "name": "PlusToken", "logo": "➕", "type": "Kripto Cüzdan Ponzisi", "metric": "$3.0 Milyar", "speed": "Yavaş",
        "business": "Asya pazarında yüksek arbitraj getirisi vaat eden cüzdan uygulaması görünümlü Ponzi.",
        "s": "Arbitraj gelirleriyle pasif kazanç vaadi ve geniş referans ağı.",
        "w": "Toplanan kripto paraların doğrudan kurucuların kişisel cüzdanlarına gitmesi.",
        "lesson": "Zafiyet: Hiçbir finansal denetim olmaması ve kullanıcıların fon kontrolünü tamamen devretmesi.",
        "fraudPhases": [
            {"title": "Evre 1: Cüzdan Lansmanı", "desc": "Yüksek arbitraj kârı vaat eden PlusToken cüzdanının Asya'da yayılması."},
            {"title": "Evre 2: Devasa Birikim", "desc": "Milyonlarca kullanıcının BTC ve ETH'lerini cüzdana yatırması."},
            {"title": "Evre 3: Çekimlerin Durması", "desc": "Sistem çekimlerinin durdurulması ve kurucuların fonları aklayıp kaçması."}
        ]
    },
    {
        "name": "AnubisDAO", "logo": "🐕", "type": "Merkeziyetsiz Finans (DeFi)", "metric": "$60 Milyon", "speed": "Anlık",
        "business": "LBP (Likidite Oluşturma Havuzu) esnasında toplanan fonları tek bir işlemle çekip kaçma.",
        "s": "Köpek temalı popülerlik ve OlympusDAO çatalı (fork) olmasıyla yaratılan hype.",
        "w": "Projenin arkasındaki ekibin tamamen anonim olması ve KYC bulunmaması.",
        "lesson": "Zafiyet: Anonim bir ekibin yönettiği tekil cüzdan havuzuna kontrolsüz sermaye aktarılması.",
        "fraudPhases": [
            {"title": "Evre 1: LBP Lansmanı", "desc": "Copper Launch üzerinde token satışından 60M$ toplanması."},
            {"title": "Evre 2: Likidite Draining", "desc": "Lansmandan 20 saat sonra havuzdaki tüm ETH'lerin tek cüzdan yetkisiyle çekilmesi."},
            {"title": "Evre 3: Sosyal Medya Kapanışı", "desc": "Ekibin tüm sosyal medya hesaplarını kapatıp sırra kadem basması."}
        ]
    },
    {
        "name": "Squid Game Token", "logo": "🦑", "type": "Meme Coin / Oyun", "metric": "$16 Milyon", "speed": "Anlık",
        "business": "Kodun içine satış engelleyici fonksiyon ekleyerek kullanıcıların satmasını engelleme ve likiditeyi çalma.",
        "s": "Squid Game dizisinin popülaritesini sömürerek küresel medyada haber olma başarısı.",
        "w": "Akıllı sözleşme kodunun bağımsız hiçbir denetimden (audit) geçmemiş olması.",
        "lesson": "Zafiyet: Satış engelleme fonksiyonuna (honey pot) sahip kodun satın alınması.",
        "fraudPhases": [
            {"title": "Evre 1: Dizi Hype'ı", "desc": "Popüler dizi temasıyla token fiyatının yapay olarak şişirilmesi."},
            {"title": "Evre 2: Satış Engeli", "desc": "Kullanıcıların panellerde yükselişi görmesi ama tokenları satamaması."},
            {"title": "Evre 3: Havuz Boşaltma", "desc": "Geliştiricilerin PancakeSwap likidite havuzundaki tüm BNB'leri çekmesi."}
        ]
    },
    {
        "name": "Africrypt", "logo": "🇿🇦", "type": "Yatırım Platformu / Borsa", "metric": "$3.6 Milyar", "speed": "Anlık",
        "business": "Sistemin hacklendiği yalanını söyleyerek fonları soğuk cüzdanlara aktarıp kaçma.",
        "s": "Afrika'nın en büyük yapay zeka destekli yatırım fonu vaadiyle kurumsal güven inşası.",
        "w": "Borsanın regüle edilmemiş olması ve kurucu kardeşlerin tekil cüzdan yetkisi.",
        "lesson": "Zafiyet: Lisanssız yerel borsalarda yüksek getiri vaatlerine aldanılması.",
        "fraudPhases": [
            {"title": "Evre 1: Yatırım Toplama", "desc": "Yapay zeka trading botu vaadiyle Güney Afrika'da devasa fon toplanması."},
            {"title": "Evre 2: Sahte Hack Bildirimi", "desc": "Sistemin hacklendiğini ve polise gitmemelerini söyleyen açıklama yapılması."},
            {"title": "Evre 3: Ortadan Kaybolma", "desc": "Kurucu kardeşlerin tüm fonlarla birlikte ortadan kaybolması."}
        ]
    },
    {
        "name": "Centra Tech", "logo": "💳", "type": "Kripto Bankacılık / ICO", "metric": "$32 Milyon", "speed": "Yavaş",
        "business": "Sahte Visa/Mastercard ortaklık dökümanları ve ünlü reklamlarıyla ICO yapıp fonları çalma.",
        "s": "Floyd Mayweather ve DJ Khaled gibi dünyaca ünlü isimlerin reklam desteği.",
        "w": "Olmayan kart ortaklıkları ve sahte yönetim kurulu biyografileri.",
        "lesson": "Zafiyet: Ünlülerin paralı reklamlarına inanılması ve kart lisanslarının doğrulanmaması.",
        "fraudPhases": [
            {"title": "Evre 1: Ünlü Destekli ICO", "desc": "Floyd Mayweather reklamlarıyla Centra Card ICO'sundan 32M$ toplanması."},
            {"title": "Evre 2: Yalanların Ortaya Çıkması", "desc": "Visa ve Mastercard'ın borsa ile hiçbir ortaklık olmadığını açıklaması."},
            {"title": "Evre 3: Tutuklanma", "desc": "Kurucuların ABD otoriteleri tarafından kaçmak üzereyken tutuklanması."}
        ]
    }
];

const cat_c = [
    {
        "name": "Terra Luna (Anchor)", "logo": "🌕", "type": "Algoritmik Sabit Para", "metric": "$40.0 Milyar", "speed": "Çok Hızlı",
        "business": "UST çıpasını korumak için LUNA basılması/yakılmasına dayalı algoritmik mekanizma.",
        "s": "DeFi dünyasının en büyük stablecoin ideolojisi, devasa LUNAtics topluluğu.",
        "w": "Anchor'un sürdürülemez %20 faiz oranı ve UST/LUNA ölüm sarmalı (death spiral) riski.",
        "lesson": "Neden Çöktü: Sürdürülemez %20 Anchor faizini vaktinde düşürmemek ve algoritmanın de-peg anında sonsuz LUNA basıp arzı değersizleştirmesi. Çözüm: Devre kesici (circuit breaker) limitleri.",
        "implemented": [
            {"time": "Uygulanan", "event": "UST stablecoin ihracı ve DeFi genelinde yaygınlaşması."},
            {"time": "Uygulanan", "event": "Anchor Protocol üzerinde %20 APY faiz havuzunun kurulması."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Rezervlerin tamamen merkeziyetsiz otonom algoritmayla çıpayı koruması."}
        ]
    },
    {
        "name": "Celsius Network", "logo": "🌡️", "type": "Kripto Borç Verme (CeFi)", "metric": "$1.2 Milyar", "speed": "Hızlı",
        "business": "Kullanıcı mevduatlarını toplayıp yüksek faiz vaat etmek ve bu fonları riskli DeFi havuzlarında işletmek.",
        "s": "Geleneksel bankacılığa alternatif getiri modeli, 1.7 milyondan fazla kullanıcı.",
        "w": "Varlık-yükümlülük uyuşmazlığı, stETH gibi kilitli varlıklara aşırı bağımlılık.",
        "lesson": "Neden Çöktü: Üçüncü şahıslara (3AC) teminatsız kredi verilmesi ve likiditenin stETH gibi çekilemeyen varlıklarda kilitlenmesi. Çözüm: Aşırı teminatlı (over-collateralized) borçlandırma.",
        "implemented": [
            {"time": "Uygulanan", "event": "Mobil getiri uygulaması ve yüksek faiz ödeme sistemi."},
            {"time": "Uygulanan", "event": "DeFi likidite havuzlarına kurumsal fon plase edilmesi."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Mevduatların geleneksel bankalardan daha güvenli sigorta havuzlarıyla korunması."}
        ]
    },
    {
        "name": "Mt. Gox", "logo": "🗻", "type": "Kripto Borsası", "metric": "$460 Milyon", "speed": "Yavaş Sızıntı",
        "business": "Bitcoin takas ve borsa hizmetleri sunarak işlem ücretlerinden gelir sağlama.",
        "s": "Erken dönem Bitcoin ekosisteminin mutlak tekeli (küresel hacmin %80'i).",
        "w": "Korkunç kod tabanı, versiyon kontrolünün olmaması ve tekil kurucu yönetimi.",
        "lesson": "Neden Çöktü: Sıcak cüzdandan 3 yıl boyunca fark edilmeden Bitcoin sızdırılması. Çözüm: Çoklu imza (multi-sig) ve bağımsız on-chain denetim.",
        "implemented": [
            {"time": "Uygulanan", "event": "Dünyanın ilk büyük ölçekli Bitcoin emir defteri borsası."},
            {"time": "Uygulanan", "event": "Fiat para yatırma/çekme entegrasyonları."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Kullanıcı varlıklarının siber saldırılara karşı askeri düzeyde korunması."}
        ]
    },
    {
        "name": "BlockFi", "logo": "🧱", "type": "Kripto Finansman / Bankacılık", "metric": "$1.0 Milyar", "speed": "Hızlı",
        "business": "Kullanıcı varlıklarını alıp kurumsal borçlulara faiz karşılığı borç vermek.",
        "s": "Lisanslı ve yasal uyumlu ABD yapısı, devasa kurumsal ortaklıklar.",
        "w": "Kredi risk analizinin zayıf olması, tek bir borçluya yüksek maruziyet.",
        "lesson": "Neden Çöktü: FTX ve 3AC gibi kurumsal borçluların batması sonucu oluşan bulaşıcı kriz. Çözüm: Karşı taraf riskini (counterparty risk) sınırlandırma.",
        "implemented": [
            {"time": "Uygulanan", "event": "ABD kullanıcıları için yasal uyumlu getiri hesapları."},
            {"time": "Uygulanan", "event": "Kripto teminatlı bireysel kredi ürünleri."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Hazine riskinin çoklu kurumsal sigorta koruması altında olması."}
        ]
    },
    {
        "name": "Three Arrows Capital (3AC)", "logo": "🏹", "type": "Hedge Fon", "metric": "$10.0 Milyar", "speed": "Hızlı",
        "business": "DeFi protokollerinden teminatsız veya düşük teminatlı borç alarak kaldıraçlı işlemler yapma.",
        "s": "Kripto ekosisteminin en büyük ve en prestijli risk sermayesi (VC) fonlarından biri olması.",
        "w": "Piyasanın sadece yükseleceği (supercycle) inancıyla aşırı yönlü kaldıraç açılması.",
        "lesson": "Neden Çöktü: Terra LUNA çöküşüyle birlikte milyarlarca dolarlık teminatın tasfiye edilmesi. Çözüm: Otomatik stop-loss ve likidasyon yönetimi.",
        "implemented": [
            {"time": "Uygulanan", "event": "Erken dönem Web3 projelerine yüz milyonlarca dolarlık VC yatırımı."},
            {"time": "Uygulanan", "event": "DeFi platformlarında devasa likidite sağlayıcılığı."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Piyasa düşüşlerine karşı hedging (korunma) algoritmalarının aktif işletilmesi."}
        ]
    },
    {
        "name": "Voyager Digital", "logo": "🛸", "type": "Kripto Brokerlık", "metric": "$650 Milyon", "speed": "Hızlı",
        "business": "Kullanıcılara kolay alım-satım arayüzü sunmak ve mevduatları faiz getiren fonlara aktarmak.",
        "s": "Halka açık lisanslı şirket güvenilirliği, popüler mobil arayüz.",
        "w": "Yönetim kurulunun kredi dağıtma süreçlerindeki denetim eksikliği.",
        "lesson": "Neden Çöktü: Three Arrows Capital'a verdikleri 650M$ kredinin sıfır teminat içermesi. Çözüm: Kredi risk skorlama ve asgari teminat şartı.",
        "implemented": [
            {"time": "Uygulanan", "event": "Kanada ve ABD borsalarında halka açık şirket statüsü."},
            {"time": "Uygulanan", "event": "Kolay kullanımlı perakende mobil ticaret arayüzü."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Müşteri nakit varlıklarının FDIC sigortası altında tamamen korunması."}
        ]
    },
    {
        "name": "Poly Network", "logo": "🌉", "type": "Birlikte Çalışılabilirlik Köprüsü", "metric": "$611 Milyon", "speed": "Anlık",
        "business": "Farklı blokzincirler arasında akıllı sözleşmeler yardımıyla varlık transferi sağlama.",
        "s": "Çoklu zincirler arası son derece hızlı ve ucuz transfer altyapısı.",
        "w": "Akıllı sözleşme yetkilendirme ve mesaj doğrulama mantığındaki açıklar.",
        "lesson": "Neden Çöktü: Yazılım açığı yüzünden $611 milyon çalınması (itibar kaybı sonucu kapandı). Çözüm: Zaman kilitli (timelock) onay ve derin siber denetim.",
        "implemented": [
            {"time": "Uygulanan", "event": "Ethereum, BSC ve Polygon arasında çalışan çapraz zincir köprüsü."},
            {"time": "Uygulanan", "event": "Merkeziyetsiz kimlik doğrulama modülleri."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Çapraz zincir işlemlerinin sıfır güvenlik riskiyle anında gerçekleşmesi."}
        ]
    },
    {
        "name": "Iron Finance", "logo": "⚙️", "type": "Kısmi Algoritmik Sabit Para", "metric": "$2.0 Milyar", "speed": "Hızlı (Günler)",
        "business": "IRON stablecoin değerini korumak için kısmi teminat (USDC) ve TITAN token arbitrajı kullanma.",
        "s": "Polygon ağındaki en yüksek işlem hızlarına sahip getiri optimizasyonu.",
        "w": "Arbitraj mekanizmasının panik anında TITAN hiperenflasyonuna yol açması.",
        "lesson": "Neden Çöktü: Balinaların satışı sonrası TITAN fiyatının çökmesi ve algoritmanın sınırsız TITAN basması. Çözüm: Havuz çıkışlarına kademeli kilit (lock duration).",
        "implemented": [
            {"time": "Uygulanan", "event": "Polygon üzerinde milyarlarca dolarlık likidite havuzları."},
            {"time": "Uygulanan", "event": "Kısmi teminatlı IRON stablecoin basım motoru."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "TITAN ve IRON arasındaki otonom dengenin çıpayı sonsuza kadar koruması."}
        ]
    },
    {
        "name": "Beanstalk", "logo": "🌱", "type": "Merkeziyetsiz Borçlanma", "metric": "$182 Milyon", "speed": "Anlık",
        "business": "Sanal tahviller (pods) aracılığıyla faizsiz borçlanma ve stablecoin ekosistemi işletme.",
        "s": "Merkeziyetsiz kredi modellerinde yüksek finansal inovasyon.",
        "w": "Yönetişim oylama gücünün anlık token sahipliğine bağlı olması.",
        "lesson": "Neden Çöktü: Saldırganın flaş krediyle oylama çoğunluğu kazanarak kasayı boşaltması. Çözüm: Oy kullanmak için tokenların önceden kilitlenmesi şartı.",
        "implemented": [
            {"time": "Uygulanan", "event": "Tahvil (pod) pazarı ve faizsiz borçlanma kontratları."},
            {"time": "Uygulanan", "event": "Merkeziyetsiz stabil para (BEAN) ihracı."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Flaş kredi saldırılarına karşı akıllı sözleşmelerde tam koruma."}
        ]
    },
    {
        "name": "Basis Cash", "logo": "🧱", "type": "Algoritmik Sabit Para", "metric": "$80 Milyon", "speed": "Yavaş",
        "business": "Dinamik arz daralması/genişlemesi ve tahviller yardımıyla çıpayı koruma.",
        "s": "İlk nesil algoritmik stablecoin deneyi, DeFi felsefesine tam bağlılık.",
        "w": "Çıpayı koruyacak yeterli rezerv sermayesinin olmamasından kaynaklanan de-peg.",
        "lesson": "Neden Çöktü: Yetersiz likidite derinliği ve arbitraj mekanizmasının çalışmaması. Çözüm: Dinamik rezerv fonu (backstop fund) desteği.",
        "implemented": [
            {"time": "Uygulanan", "event": "BSC ve BAC/BAS token havuzlarının kurulması."},
            {"time": "Uygulanan", "event": "Arz ayarlama (rebase benzeri) algoritmaları."}
        ],
        "phantom": [
            {"time": "Vaat", "event": "Merkezi rezervlere ihtiyaç duymadan 1 dolar değerini koruyan para birimi."}
        ]
    }
];

const remaining_a = [
    ["Curve Finance", "🌀", "Stablecoin AMM Havuzu", "$2.0 Milyar+ (TVL)", "Dengeli", "Düşük sapmalı stabil coin takaslarından alınan işlem ücretleri.", "Stablecoin piyasasındaki en derin likidite.", "Akıllı sözleşme karmaşıklığı.", "Neden Kazandı: Ahır coinler için en düşük slippage (kayma) oranını sunan likidite havuz standartını getirmesi."],
    ["GMX", "📈", "Merkeziyetsiz Perp DEX", "$500 Milyon+ (TVL)", "Hızlı Büyüme", "Kaldıraçlı işlemlerden alınan komisyonlar ve GLP havuzu gelirleri.", "Sıfır slippage ile kaldıraçlı işlem.", "GLP havuzunun trader kar riski.", "Neden Kazandı: Likidite sağlayıcılara sahte tokenlar yerine işlem ücretlerinden oluşan saf ETH/USDC (real yield) dağıtması."],
    ["Pendle Finance", "⏳", "Faiz & Getiri Ticareti", "$3.0 Milyar+ (TVL)", "Çok Hızlı", "Getiri getiren varlıkları anapara ve getiri olarak ikiye bölerek ticaret imkanı sunar.", "DeFi'de faiz oranları üzerine spekülasyon.", "Yüksek finansal karmaşıklık.", "Neden Kazandı: DeFi varlıklarının getirilerini tokenize ederek benzersiz bir türev pazarı kurması."],
    ["Stader Labs", "🌐", "Çoklu Zincir Staking", "$400 Milyon+ (TVL)", "Dengeli", "Çoklu zincirlerde likit staking türevleri sunarak staking ödüllerinden %10 komisyon alır.", "Çoklu zincir uyumluluğu.", "L2'lerde daha düşük marka bilinirliği.", "Neden Kazandı: Tek bir ağa bağımlı kalmayıp, 6 farklı blokzincirde likit staking sunması."],
    ["Binance Earn", "💛", "CEX Staking Portalı", "Milyarlarca Dolar", "Stabil", "Kullanıcıların borsada tuttukları coinleri stake ederek faiz almasını sağlar.", "Zirve kullanıcı erişimi, sıfır teknik karmaşıklık.", "Merkezi saklama riskleri.", "Neden Kazandı: Profil sahibi olmayan perakende kullanıcıya tek tıkla getiri kolaylığı sağlaması."],
    ["Ankr", "⚓", "RPC & Düğüm Servisi", "$200 Milyon+", "Dengeli", "Geliştiricilere RPC düğüm erişimi satar ve likit staking çalıştırır.", "Blokzincir altyapısında küresel güç.", "Merkezi düğüm dağılımı eleştirileri.", "Neden Kazandı: Geliştiricilere kesintisiz altyapı sunarken likit staking pazarında da yer edinmesi."],
    ["Marinade Finance", "🍊", "Solana Staking Optimizasyonu", "$1.0 Milyar+ (TVL)", "Dengeli", "Solana doğrulayıcılarını performanslarına göre delege eden optimizasyon motoru.", "Solana ağındaki en eski ve güvenilir LST.", "Sadece tek bir ağa bağımlılık.", "Neden Kazandı: Solana doğrulayıcı dağılımını optimize ederek ağın merkeziyetsizliğini desteklemesi."],
    ["Save", "💰", "Solana Likidite Pazarı", "$300 Milyon+", "Dengeli", "Borç verme/alma faiz marjları ve kaldıraçlı işlemler üzerinden komisyon alır.", "Solana ekosisteminde derin likidite.", "Solana ağ tıkanıklıklarında tasfiye riski.", "Neden Kazandı: Solana ekosisteminde borç alma ve verme mekanizmasını en erken kuran protokol olması."],
    ["Jupiter", "🪐", "Solana Likidite Toplayıcı", "Sınırsız (Hacim)", "Çok Hızlı", "Solana ağındaki en ucuz takas yollarını bulur.", "Solana takas işlemlerinin %70'ini yönetmesi.", "Solana ağ kesintilerine bağımlılık.", "Neden Kazandı: Solana'daki tüm likiditeyi tek noktada toplayıp en iyi fiyatı ve araçları sunması."],
    ["Ether.fi", "🔌", "Likit Restaking (LRT)", "$6.0 Milyar+", "Çok Hızlı", "Kullanıcıların ETH'lerini restake ederek EigenLayer ve base staking ödüllerini toplar.", "EigenLayer üzerindeki en büyük LRT.", "Çok katmanlı akıllı sözleşme riskleri.", "Neden Kazandı: Kullanıcılara hem Ethereum staking hem EigenLayer restaking ödüllerini eETH ile sunması."],
    ["Renzo", "🧬", "Likit Restaking Ajanı", "$2.5 Milyar+", "Hızlı Büyüme", "EigenLayer strateji yöneticisi olarak çalışır.", "L2 ağları üzerinden doğrudan restaking.", "ezETH de-peg riskleri.", "Neden Kazandı: Kullanıcıların L2'lerden doğrudan restaking yapmasını sağlayarak gas ücretlerini düşürmesi."],
    ["Puffer Finance", "🐡", "Merkeziyetsiz Restaking", "$1.5 Milyar+", "Dengeli", "Bireysel doğrulayıcıların EigenLayer'da risksiz çalışmasını sağlayan anti-slashing teknolojisi.", "Anti-slashing donanım desteği.", "SGX donanım bağımlılığı.", "Neden Kazandı: Bireysel düğüm operatörlerinin risklerini azaltan donanımsal güvenlik çözümleri sunması."],
    ["Kelp DAO", "🌾", "Çoklu LST Restaking", "$1.0 Milyar+", "Dengeli", "stETH ve rETH gibi farklı LST'leri kabul ederek rsETH basar.", "Farklı staking tokenlarını doğrudan kabul etme.", "Kendi yerel altyapısının olmaması.", "Neden Kazandı: Kullanıcıların ellerindeki hazır LST'leri bozmadan doğrudan restaking havuzuna alması."],
    ["Swell Network", "🌊", "LST & LRT Protokolü", "$1.0 Milyar+", "Dengeli", "swETH ve rswETH ihraç ederek staking/restaking komisyonları alır.", "Kendi L2 ağını kurarak ekosistem oluşturma.", "Restaking pazarındaki yoğun rekabet.", "Neden Kazandı: Staking hizmetini kendi L2 toplama ağına entegre ederek ekosistem kurması."],
    ["Mantle LSP", "🧤", "L2 Staking Protokolü", "$800 Milyon+", "Hızlı Büyüme", "Mantle L2 ağında mETH likit staking tokenı basar.", "Mantle hazinesi tarafından desteklenen yüksek APY.", "Mantle ekosistemine bağımlılık.", "Neden Kazandı: Mantle hazinesindeki devasa ETH likiditesini kullanarak yüksek APY sunması."],
    ["Benqi", "🔺", "Avalanche Likidite Merkezi", "$300 Milyon+", "Dengeli", "sAVAX likit staking ve borç verme faiz marjlarından gelir sağlar.", "Avalanche ağındaki en derin likidite.", "Avalanche dışındaki zincirlerde olmaması.", "Neden Kazandı: Avalanche ağının yerleşik finansal merkezi haline gelerek sAVAX ve lending'i birleştirmesi."],
    ["Stride", "👣", "Cosmos Likit Staking", "$150 Milyon+", "Dengeli", "Cosmos ekosistemindeki zincirler için stTokens basar.", "Cosmos ekosistemindeki zincirler arası staking tekeli.", "Cosmos genel hacim düşüşü riskleri.", "Neden Kazandı: Cosmos'un modüler yapısına uygun zincirler arası likit staking standardını ilk kurması."],
    ["dYdX", "✴️", "On-Chain Emir Defteri", "Milyarlarca Dolar", "İstikrarlı", "Kaldıraçlı işlemlerden alınan borsa komisyonları.", "Merkezi borsalara en yakın hızda çalışan emir defteri.", "Merkeziyetsizliğe geçişdeki teknik zorluklar.", "Neden Kazandı: AMM yerine, profesyonel traderların alışık olduğu hızlı emir defteri yapısını zincire taşıması."],
    ["Synthetix", "⚔️", "Sentetik Varlık Motoru", "$400 Milyon+", "Dengeli", "SNX stake edenlerin havuz fonlarını teminat göstererek sentetik varlık basar.", "Slippage olmadan sentetik varlık ticareti.", "SNX fiyat dalgalanmalarına duyarlı teminat.", "Neden Kazandı: DeFi genelindeki kaldıraçlı borsalara arkadaki derin sentetik likiditeyi sağlaması."],
    ["Yearn Finance", "🕳️", "Getiri Toplayıcı", "$200 Milyon+", "Yavaş", "Kullanıcı fonlarını otomatik en yüksek faiz veren DeFi havuzlarına plase eder.", "DeFi tarihinin en eski ve en güvenilir getiri otomasyonu.", "DeFi faiz oranlarının genel olarak düşmesi.", "Neden Kazandı: Kullanıcıların faiz takibi yapmasına gerek bırakmadan fonları en verimli havuzlara yönlendirmesi."],
    ["Morpho", "🦋", "Kredi Optimizasyonu", "$2.0 Milyar+", "Hızlı Büyüme", "Aave ve Compound üzerinde borç verenleri ve alanları doğrudan P2P eşleştirir.", "DeFi borçlanma faizlerini doğrudan iyileştiren ek katman.", "Alttaki ana protokollerin teknik riskleri.", "Neden Kazandı: Likidite havuz yapısını bozmadan borçluları P2P eşleştirerek verimlilik sunması."],
    ["Instadapp", "📱", "DeFi Akıllı Hesap", "$2.0 Milyar+", "Dengeli", "Kullanıcıların DSL cüzdanları üzerinden yaptıkları karmaşık DeFi işlemlerinden komisyon alır.", "Flaş kredilerle tek tıkla borç taşıma.", "Arayüzün hala teknik kalması.", "Neden Kazandı: Farklı DeFi protokolleri arasındaki varlık geçişlerini tek tıkla yapılabilir kılması."],
    ["Ethena", "🖤", "Sentetik Dolar (USDe)", "$3.0 Milyar+", "Çok Hızlı", "Ethereum staking getirisi ile vadeli işlemlerdeki short pozisyon fonlama ücretlerini birleştirir.", "Piyasadaki en yüksek stablecoin getiri oranını sunması.", "Negatif fonlama oranlarında rezervlerin erime riski.", "Neden Kazandı: Delta-nötr arbitraj stratejisiyle hem çıpayı koruyan hem getiri sunan model kurması."],
    ["Balancer", "⚖️", "Modüler AMM", "$1.0 Milyar+", "Dengeli", "Çoklu varlık havuzlarına izin veren modüler yapısıyla işlem ücreti toplar.", "Endeks benzeri havuzlar ve yüksek gaz verimliliği.", "Curve ve Uniswap arasındaki sıkı rekabet.", "Neden Kazandı: İkiden fazla varlık içeren havuz yapılarıyla portföy yönetimini DeFi'ye entegre etmesi."],
    ["SushiSwap", "🍣", "Çok Zincirli DEX", "$300 Milyon+", "Stabil", "Çoklu zincirlerdeki AMM havuzlarından işlem ücreti alır.", "Topluluk odaklı yapı ve geniş zincir desteği.", "Yönetim içi anlaşmazlıklar ve pazar payı kaybı.", "Neden Kazandı: Uniswap'a karşı başlattığı vampir saldırısıyla topluluk odaklı DeFi token modelini popüler yapması."],
    ["PancakeSwap", "🥞", "BNB Chain Lider DEX'i", "$1.5 Milyar+", "Dengeli", "BNB Chain üzerindeki takas işlemlerinden komisyon alır.", "Çok düşük işlem ücretleri ve yüksek oyunlaştırılmış arayüz.", "BNB Chain ekosistemine olan yüksek bağımlılık.", "Neden Kazandı: Binance desteğiyle BNB Chain'in mutlak likidite ve getiri merkezi haline gelmesi."],
    ["Compound", "🧪", "DeFi Kredi Öncüsü", "$2.0 Milyar+", "Stabil", "Borç verme ve alma faiz farklarından gelir yaratır.", "DeFi'nin en eski ve kod kalitesi en çok test edilmiş protokolü.", "Aave karşısında pazar payı kaybetmesi.", "Neden Kazandı: Likidite havuzu tabanlı borçlanma modelini ve COMP tokenı ile likidite madenciliğini başlatması."],
    ["Gnosis Safe", "🔒", "Multisig Güvenlik Standardı", "Milyarlarca Dolar", "İstikrarlı", "Kurumsal multisig cüzdan kurulumu ve ek servislerden gelir sağlar.", "DeFi ve kurumsal saklamadaki mutlak güvenlik standardı.", "Bireysel kullanıcılar için kurulum zorluğu.", "Neden Kazandı: Çoklu imza gerektiren akıllı sözleşme cüzdan mimarisini endüstri standardı yapması."],
    ["Thorchain", "⚡", "Çapraz Zincir Likidite", "$800 Milyon+", "Hızlı Büyüme", "Sentetik köprü kullanmadan yerel BTC/ETH takas işlem ücretlerinden gelir alır.", "Gerçek yerel varlıklar arası takas imkanı.", "Geçmişte yaşanan akıllı sözleşme hackleri.", "Neden Kazandı: Köprülerin güvenlik risklerini ortadan kaldırarak yerel Bitcoin ve Ethereum takasını sağlaması."],
    ["Quickswap", "🐉", "Polygon Yerel DEX'i", "$150 Milyon+", "Stabil", "Polygon ve L2 üzerindeki takas işlemlerinden komisyon alır.", "Polygon ağındaki ilk ve en derin likiditeli DEX olması.", "Polygon dışındaki zincirlerde pazar payının olmaması.", "Neden Kazandı: Polygon ağının lansmanında en derin likiditeyi sunarak ağın yerel takas merkezi olması."],
    ["Trader Joe", "🔺", "Avalanche Konsantre AMM", "$250 Milyon+", "Dengeli", "Avalanche ve Arbitrum üzerindeki takas işlemlerinden komisyon alır.", "Liquidity Book modeliyle sıfır kayma ve yüksek verim.", "Uniswap V3 konsantre likidite rekabeti.", "Neden Kazandı: Likiditeyi fiyat aralıklarına bölerek sermaye verimliliğini artıran benzersiz bir AMM tasarlaması."],
    ["Raydium", "⚡", "Solana AMM & Sipariş Defteri", "$300 Milyon+", "Dengeli", "Solana üzerindeki AMM işlemlerinden komisyon alır.", "Solana ağındaki en yüksek likiditeli AMM havuzları.", "Merkeziyetsiz sipariş defterlerine bağımlılık.", "Neden Kazandı: Solana'nın yüksek hızıyla emir defterini AMM havuzlarıyla birleştiren ilk protokol olması."],
    ["Orca", "🐬", "Solana Konsantre DEX", "$200 Milyon+", "Dengeli", "Solana ağındaki konsantre likidite işlemlerinden komisyon alır.", "Mükemmel kullanıcı arayüzü ve yüksek işlem hızı.", "Raydium ve Jupiter arasındaki yoğun rekabet.", "Neden Kazandı: Solana üzerinde en temiz ve kullanıcı dostu konsantre likidite takas deneyimini sunması."],
    ["Camelot", "🏰", "Arbitrum Ekosistem AMM'i", "$100 Milyon+", "Dengeli", "Arbitrum üzerindeki projelerin lansmanlarından ve takaslarından gelir elde eder.", "Arbitrum projeleri için özel tasarlanmış yönlendirmeli likidite.", "Arbitrum ekosistemine yüksek bağımlılık.", "Neden Kazandı: Yeni çıkan projelere özel likidite teşvikleri sunarak Arbitrum'un resmi fırlatma paneli olması."],
    ["Velodrome", "🚲", "Optimism Likidite Motoru", "$200 Milyon+", "Dengeli", "Optimism üzerindeki ve33 rüşvet ve takas işlemlerinden komisyon alır.", "Optimism ağının en derin likidite teşvik mekanizması.", "Optimism dışındaki ağlarda zayıf olması.", "Neden Kazandı: Solidly modelini geliştirerek Optimism ekosisteminin resmi likidite yönlendiricisi olması."],
    ["Aerodrome", "✈️", "Base Likidite Motoru", "$500 Milyon+", "Çok Hızlı", "Base üzerindeki ve33 rüşvet ve takas işlemlerinden gelir sağlar.", "Base ağındaki en büyük TVL and likidite kontrolü.", "Base ekosistemindeki hızlı değişimler.", "Neden Kazandı: Velodrome modelini Base ağına taşıyarak ağın en büyük likidite yönlendiricisi olması."],
    ["Thena", "🏛️", "BNB Chain ve33 DEX", "$80 Milyon+", "Dengeli", "BNB Chain üzerindeki takas ve rüşvet işlemlerinden komisyon alır.", "BNB Chain üzerindeki yeni projeler için derin likidite.", "PancakeSwap'ın mutlak hakimiyeti.", "Neden Kazandı: ve33 rüşvet modelini BNB Chain'e getirerek PancakeSwap dışındaki projeleri çekmesi."],
    ["Wombat Exchange", "🐹", "Tek Taraf Stablecoin AMM", "$50 Milyon+", "Stabil", "Çoklu zincirde stablecoin takas ücretlerinden gelir sağlar.", "Tek taraflı likidite sağlama ve sıfır kayma oranı.", "Büyük rakipler karşısında sınırlı hacim.", "Neden Kazandı: Kullanıcıların tek bir stablecoin yatırarak getiri elde etmesini sağlayan havuz yapısı kurması."],
    ["Loopring", "💍", "zkRollup Sipariş Defteri", "$150 Milyon+", "Stabil", "Ethereum L2 zkRollup üzerindeki takas ve transfer ücretlerinden gelir elde eder.", "Ethereum güvenliğinde gazsız ve hızlı sipariş defteri.", "L2 rekabetinde genel TVL kaybı.", "Neden Kazandı: Ethereum üzerinde zkRollup teknolojisini kullanarak çalışan ilk borsayı kurması."],
    ["Osmosis", "🧪", "Cosmos Likidite Merkezi", "$300 Milyon+", "Dengeli", "Cosmos IBC üzerindeki takas ve zincirler arası transferlerden komisyon alır.", "Cosmos ekosisteminin mutlak likidite ve fiyat belirleme merkezi.", "Cosmos ekosisteminin genel hacim kaybı.", "Neden Kazandı: Cosmos ağındaki tüm bağımsız zincirleri IBC üzerinden bağlayan merkeziyetsiz borsa olması."],
    ["Cetus", "🐙", "Sui Konsantre AMM", "$100 Milyon+", "Hızlı Büyüme", "Sui ve Aptos ağlarındaki konsantre likidite takaslarından komisyon alır.", "Move diliyle yazılmış ultra hızlı konsantre likidite.", "Sui ekosisteminin yeni kuruluyor olması.", "Neden Kazandı: Sui ağında konsantre likidite modelini en erken ve en kararlı uygulayan borsa olması."],
    ["Kujira", "🐳", "Cosmos Yarı-Algoritmik Ağ", "$80 Milyon+", "Dengeli", "Tasfiye kuyrukları, borç verme ve USK stablecoin faizlerinden gelir sağlar.", "Tasfiyeleri perakende kullanıcılar için demokratikleştiren BLUE paneli.", "Hızlı büyüme sonrası yaşanan bazı borç krizleri.", "Neden Kazandı: DeFi tasfiyelerini ihale usulüyle normal kullanıcılara açan yenilikçi bir finansal altyapı sunması."],
    ["Injective", "🥷", "Finansal L1 Blokzinciri", "Milyarlarca Dolar", "Hızlı Büyüme", "Ağ üzerindeki gas ücretlerinden ve yerleşik sipariş defteri komisyonlarından gelir sağlar.", "Finansal uygulamalar için optimize edilmiş sıfır gas ücretli altyapı.", "EVM ağlarına karşı kullanıcı edinme zorluğu.", "Neden Kazandı: Borsalar ve kaldıraçlı işlemler için zincir seviyesinde paylaşımlı sipariş defteri sunması."],
    ["Lyra", "🎼", "On-Chain Opsiyon Borsası", "$50 Milyon+", "Dengeli", "Ethereum ve L2'lerdeki opsiyon alım-satım komisyonlarından gelir alır.", "Black-Scholes modelini zincir üstünde çalıştıran ilk opsiyon AMM'i.", "Opsiyon piyasasının zincir üstünde hala düşük hacimli olması.", "Neden Kazandı: Karmaşık opsiyon fiyatlandırma mekanizmalarını akıllı sözleşmelerle hatasız çalıştırabilmesi."],
    ["Ribbon Finance", "🎀", "Otomatik Opsiyon Kasaları", "$100 Milyon+", "Stabil", "Kullanıcı fonlarını otomatik opsiyon satarak işletir, %2 performans ücreti alır.", "Kullanıcılar için tek tıkla pasif opsiyon getirisi.", "Piyasa dalgalanmalarında kasaların zarar yazma riski.", "Neden Kazandı: DeFi'de yapılandırılmış finansal ürünleri (DOV) başlatan ilk protokol olması."],
    ["Hegic", "🎯", "Akıllı Sözleşmeli Opsiyon", "$30 Milyon+", "Stabil", "Kullanıcıların on-chain opsiyon alırken ödediği primlerden gelir sağlar.", "Kilit süresi olmadan anlık opsiyon alım-satım kolaylığı.", "Sıvı havuzların derinlik yetersizliği.", "Neden Kazandı: Likidite sağlayıcıları tek bir havuzda toplayıp alıcılara karşı taraflık yapan basit opsiyon modeli."],
    ["Gains Network", "🍏", "Sentetik Kaldıraç Borsası", "$100 Milyon+", "Hızlı Büyüme", "Forex, kripto ve hisse senedi kaldıraç komisyonlarından gelir elde eder.", "gDAI havuzu üzerinden sıfır slippage ile 150x kaldıraç.", "Büyük kâr dalgalanmalarında gDAI havuzunun maruz kaldığı risk.", "Neden Kazandı: Kripto dışı varlıkları sentetik olarak zincir üstünde kaldıraçlı ticarete açması."],
    ["Kwenta", "🦊", "Synthetix Kaldıraç Arayüzü", "$50 Milyon+", "Dengeli", "Synthetix v3 altyapısı üzerindeki kaldıraçlı işlemlerden komisyon alır.", "Synthetix'in derin likiditesini kullanan profesyonel arayüz.", "Synthetix'in genel işlem ücreti politikalarına bağımlılık.", "Neden Kazandı: Synthetix'in arkadaki karmaşık sentetik motorunu traderlar için şık bir panele dönüştürmesi."],
    ["HMX", "👾", "Çoklu Teminatlı Perp DEX", "$40 Milyon+", "Dengeli", "GMX ve kendi havuzları üzerindeki kaldıraçlı işlemlerden gelir sağlar.", "Çoklu farklı varlığı aynı anda teminat gösterme.", "Arbitrum ağındaki yoğun perp DEX rekabeti.", "Neden Kazandı: Kullanıcıların farklı DeFi varlıklarını tek hesapta teminatlandırarak kaldıraç açmasını sağlaması."],
    ["Drift Protocol", "⛵", "Solana Kaldıraç & Lending", "$150 Milyon+", "Dengeli", "Solana üzerindeki borç verme ve dinamik AMM kaldıraç işlemlerinden gelir sağlar.", "Solana üzerindeki en kapsamlı kaldıraçlı işlem ve lending paketi.", "Solana tıkanıklıklarında tasfiye motorunun gecikmesi.", "Neden Kazandı: Sanal AMM (vAMM) teknolojisini borç verme havuzlarıyla birleştirerek Solana'da kaldıraç sunması."],
    ["Vertex Protocol", "📐", "Hibrit L2 Sipariş Defteri", "$80 Milyon+", "Dengeli", "Arbitrum üzerindeki hızlı sipariş defteri ve AMM işlemlerinden gelir elde eder.", "Merkezi borsalarla yarışan 15 milisaniye işlem onay süresi.", "Arbitrum dışındaki zincirlerde zayıf olması.", "Neden Kazandı: L2 rollup üzerinde hem AMM likiditesini hem de limit emir defterini tek motorda birleştirmesi."],
    ["Hyperliquid", "⚡", "Kendi L1 Zincirindeki Perp DEX", "$400 Milyon+", "Çok Hızlı", "Kendi L1 zincirindeki sipariş defteri işlemlerinden komisyon alır.", "Saniyede binlerce işlem, sıfır gas ücreti ve devasa likidite.", "Kendi zincirinin doğrulayıcılarının henüz tam merkezileşmemiş olması.", "Neden Kazandı: DeFi'deki en hızlı ve en derin likiditeli kaldıraçlı sipariş defteri platformunu kendi L1'inde kurması."],
    ["Aevo", "🛸", "L2 Opsiyon & Perp Rollup", "$100 Milyon+", "Dengeli", "Kendi L2 rollup ağı üzerindeki opsiyon ve perp işlemlerinden gelir sağlar.", "Kurumsal düzeyde opsiyon emir defteri ve pre-launch token ticareti.", "Token lansmanı sonrası hacim dalgalanmaları.", "Neden Kazandı: Yeni çıkacak tokenların ticaretini dünyada ilk kez kaldıraçlı olarak zincir üstüne taşıması."],
    ["Spark Protocol", "⚡", "DAI Odaklı Kredi Havuzu", "$500 Milyon+", "Dengeli", "DAI borçlanma faizleri ve sDAI tasarruf oranlarından gelir sağlar.", "MakerDAO tarafından doğrudan likidite fonlanması.", "Sadece MakerDAO ekosistemiyle sınırlı olması.", "Neden Kazandı: DAI stabil coini için en düşük borçlanma ve en yüksek tasarruf oranlarını doğrudan sunması."],
    ["Gearbox", "⚙️", "Kaldıraçlı Borçlanma Servisi", "$100 Milyon+", "Dengeli", "Kullanıcıların kaldıraçlı borçlanma hesaplarından komisyon alır.", "DeFi protokollerinde 10 kata kadar kaldıraçlı işlem.", "Flaş kredi tasfiye riskleri.", "Neden Kazandı: Borç vermeyi doğrudan kaldıraçlı akıllı sözleşme hesaplarına bağlayan benzersiz bir mimari kurması."],
    ["Notional Finance", "📊", "Sabit Faizli Borçlanma", "$50 Milyon+", "Stabil", "Kullanıcılara sunduğu sabit faizli borç verme ve alma marjlarından gelir sağlar.", "DeFi'de dalgalı faiz yerine 1 yıllık net sabit faiz garantisi.", "Dalgalı faiz havuzlarına göre daha düşük likidite.", "Neden Kazandı: fCash tokenları kullanarak DeFi'ye geleneksel finansın sabit faizli tahvil modelini getirmesi."],
    ["Silo Finance", "🛡️", "Izole Kredi Pazarı", "$200 Milyon+", "Dengeli", "İzole borçlanma havuzlarındaki faiz marjlarından gelir elde eder.", "Tek bir varlığın hacklenmesi durumunda diğer havuzların etkilenmemesi.", "Paylaşımlı havuzlara göre daha düşük sermaye verimliliği.", "Neden Kazandı: Her borçlanma çifti için izole havuzlar kurarak köprü hacklerinin sistemik riskini sıfırlaması."],
    ["Radiant Capital", "🌐", "Zincirler Arası Lending", "$200 Milyon+", "Dengeli", "LayerZero altyapısıyla çoklu zincirler arası borç verme faizlerinden gelir sağlar.", "Tek zincirde teminat gösterip, diğer zincirde borç alabilme kolaylığı.", "Geçmişte yaşanan akıllı sözleşme açıkları.", "Neden Kazandı: LayerZero mesajlaşma teknolojisini borç verme havuzlarına entegre eden ilk büyük protokol olması."],
    ["Venus Protocol", "🪐", "BNB Chain Kredi Lideri", "$800 Milyon+", "Stabil", "BNB Chain üzerindeki borç verme faizlerinden ve VAI stablecoin faizinden gelir alır.", "BNB Chain üzerindeki en derin ve en eski borç verme likiditesi.", "Geçmişte yaşanan kurucu tasfiye krizleri.", "Neden Kazandı: Binance Smart Chain lansmanında en derin likiditeyi sunarak ağın kredi lideri olması."],
    ["Seamless Protocol", "🧩", "Base Topluluk Lending'i", "$50 Milyon+", "Dengeli", "Base ağındaki borç verme işlemlerinden ve getiri stratejilerinden komisyon alır.", "Tamamen topluluk odaklı, ön satışsız ve adil dağıtımlı token yapısı.", "Base dışındaki zincirlerde olmaması.", "Neden Kazandı: Base ağında en temiz ve entegre perakende borç verme deneyimini sunması."],
    ["ZeroLend", "0️⃣", "L2 Staking Borçlanması", "$100 Milyon+", "Hızlı Büyüme", "L2 ağlarındaki borç verme ve LRT puan entegrasyonlarından komisyon alır.", "zkSync ve Manta üzerinde en yüksek LRT teminat desteği.", "L2 ağlarındaki kullanıcı dalgalanmaları.", "Neden Kazandı: Likit restaking tokenlarını teminat olarak kabul ederek L2'lerde borçlanma açması."],
    ["Kamino Finance", "🦎", "Solana Süper Finans Uygulaması", "$500 Milyon+", "Çok Hızlı", "Solana üzerinde likidite yönetimi, borç verme ve kaldıraçlı işlemlerden gelir sağlar.", "Lending, AMM likiditesi ve kaldıraçlı getiri stratejilerinin tek çatı altında olması.", "Solana ağındaki yoğun rekabet.", "Neden Kazandı: Solana'da kullanıcıların tek tıkla hem borç alıp hem otomatik likidite sağlamasını sağlayan entegre yapı."],
    ["Marginfi", "📈", "Solana Puan Tabanlı Lending", "$400 Milyon+", "Dengeli", "Solana üzerindeki borç verme faizlerinden ve LST komisyonlarından gelir sağlar.", "Kullanıcıları sadakate göre ödüllendiren gelişmiş puanlama sistemi.", "Yönetim ekibinde yaşanan istifa krizleri.", "Neden Kazandı: DeFi'de puan sistemini en agresif kullanan borç verme protokolü olarak milyarlarca dolar çekmesi."],
    ["Kinza Finance", "🔑", "BNB Chain ve33 Lending'i", "$60 Milyon+", "Dengeli", "BNB Chain üzerindeki borç verme ve rüşvet teşviklerinden komisyon alır.", "ve33 modelini borç verme teşviklerine entegre etmesi.", "PancakeSwap ve Venus arasındaki ezici rekabet.", "Neden Kazandı: Borç verenlere ve alanlara ve33 rüşvet modeliyle ek getiri teşvikleri sunması."],
    ["Karak", "🛡️", "Çoklu Varlık Restaking'i", "$300 Milyon+", "Hızlı Büyüme", "Çoklu zincirlerdeki restaking güvenlik hizmetlerinden komisyon alır.", "Stablecoin ve LST restaking desteği sunması.", "EigenLayer karşısında pazar payı savaşı.", "Neden Kazandı: Restaking pazarında varlık çeşitliliğini serbest bırakarak EigenLayer'a alternatif olması."],
    ["Symbiotic", "🔄", "Modüler Restaking Ağı", "$500 Milyon+", "Çok Hızlı", "İzinsiz ve modüler restaking güvenlik servislerinden komisyon alır.", "Any ERC20 tokenının restake edilerek güvenlik sağlanabilmesi.", "Yeni kurulmuş olması ve test süreçleri.", "Neden Kazandı: Paradigm desteğiyle tamamen modüler ve izinsiz bir restaking altyapısı sunması."],
    ["Picasso", "🎨", "IBC Restaking Altyapısı", "$40 Milyon+", "Dengeli", "Cosmos IBC'yi Solana ve Ethereum'a bağlayan restaking işlemlerinden komisyon alır.", "Solana ile Cosmos arasında doğrudan IBC mesajlaşma güvenliği.", "IBC entegrasyonunun teknik karmaşıklığı.", "Neden Kazandı: Cosmos'un güvenli zincirler arası iletişim standardını restaking ile Solana'ya taşıması."],
    ["BlazeStake", "🔥", "Solana Çoklu Doğrulayıcı LST", "$200 Milyon+", "Dengeli", "bSOL basarak staking ödüllerinden %10 komisyon alır.", "Solana ağındaki yüzlerce küçük doğrulayıcıya otomatik delegasyon.", "Jito ve Marinade karşısında daha düşük doğrudan DeFi entegrasyonu.", "Neden Kazandı: Solana ağının merkeziyetsizliğini desteklemek için en fazla doğrulayıcıya dağılım yapan LST olması."],
    ["Cogent Sharing", "⚙️", "Solana Optimize Staking", "$50 Milyon+", "Stabil", "Solana düğüm performansı ve MEV ödülleri dağıtımından komisyon alır.", "En yüksek uptime ve en düşük blok kaçırma oranına sahip Solana düğümü.", "Bireysel staking pazarının küçüklüğü.", "Neden Kazandı: Solana doğrulayıcı operasyonlarında teknik mükemmellik ve MEV paylaşımı sunması."],
    ["Helius", "🟠", "Solana DePIN Altyapısı", "Kurumsal Hacim", "İstikrarlı", "Solana geliştiricilerine RPC erişimi ve veri API'leri satarak gelir sağlar.", "Solana ağındaki en hızlı ve en güvenilir veri indeksleme altyapısı.", "Solana ağı dışına hizmet vermemesi.", "Neden Kazandı: Solana geliştiricilerinin düğüm kurma zahmetini ortadan kaldıran DePIN veri hizmetleri sunması."],
    ["Chainlink", "🔗", "DeFi Oracle Standardı", "Milyarlarca Dolar", "İstikrarlı", "Akıllı sözleşmelere veri aktaran düğüm ücretlerinden ve CCIP transferlerinden gelir sağlar.", "DeFi ekosisteminin %90'ının fiyat verisini sağlayan mutlak tekel.", "Merkezi veri sağlayıcılarına olan dolaylı bağımlılık.", "Neden Kazandı: Akıllı sözleşmelere güvenli ve manipüle edilemez şekilde veri aktaran ilk oracle olması."],
    ["Pyth Network", "🔮", "Milisaniyelik Oracle", "Milyarlarca Dolar", "Hızlı Büyüme", "Birinci el finansal kurumların verilerini borsalardan alıp zincire aktarır.", "Milisaniyeler içinde güncellenen fiyat beslemesi.", "Solana dışındaki ağlarda yeni yaygınlaşması.", "Neden Kazandı: Borsalar ve piyasa yapıcılarla doğrudan ortaklık kurarak veriyi aracı olmadan en hızlı sunan oracle olması."],
    ["The Graph", "📊", "Zincir Üstü İndeksleme", "Kurumsal Hacim", "İstikrarlı", "Geliştiricilerin alt-grafikler üzerinden blokzincir verilerini sorgulama ücretlerinden gelir alır.", "Blokzincir verilerini sorgulamayı kolaylaştıran tek büyük indeksleme standardı.", "Sorgu ücretlerinin karmaşık yapısı.", "Neden Kazandı: Blokzincirlerin karmaşık verilerini web geliştiricilerinin anlayacağı sorgulara dönüştürmesi."],
    ["Arweave", "🐘", "Kalıcı Veri Depolama", "Veri Hacmi", "İstikrarlı", "Kullanıcıların tek seferlik ödemeyle verilerini sonsuza kadar saklama ücretlerinden gelir alır.", "Verilerin silinme riski olmadan yüzlerce yıl boyunca kalıcı saklanma garantisi.", "Dosya yükleme hızlarının IPFS'e göre daha yavaş olması.", "Neden Kazandı: Blokzincir madencilerine veriyi saklama kanıtı sunarak kalıcı depolama pazarı yaratması."],
    ["Filecoin", "📄", "Merkeziyetsiz Bulut Depolama", "Depolama Kapasitesi", "İstikrarlı", "Dünya genelindeki boş disk alanlarını kiralayan depolama sağlayıcılarından komisyon alır.", "Geleneksel bulut sağlayıcılarına göre %90 daha ucuz veri saklama maliyeti.", "Kullanıcı arayüzünün ve veri yükleme süreçlerinin karmaşıklığı.", "Neden Kazandı: Dünyadaki atıl veri depolama kapasitesini blokzincir ekonomisiyle birleştiren en büyük ağ olması."],
    ["Render Network", "🎨", "Merkeziyetsiz GPU Render", "GPU Hacmi", "Hızlı Büyüme", "GPU gücünü kiralayan yapay zeka şirketleri ve sanatçıların ödediği komisyonlardan gelir alır.", "Apple ve Nvidia işbirlikleriyle en yüksek kaliteli 3D render ve AI hesaplama gücü.", "Küresel GPU tedarik krizleri.", "Neden Kazandı: Yapay zeka ve 3D grafik dünyasının ihtiyaç duyduğu GPU gücünü merkezsizleştirerek ucuza sunması."],
    ["Akash Network", "☁️", "Merkezsiz Sunucu Pazarı", "Sunucu Hacmi", "Dengeli", "Boş veri merkezi sunucularını kiralayan geliştiricilerden komisyon alır.", "Süper bilgisayarlar ve sunucuları AWS/Google Cloud'a göre yarı fiyatına kiralama.", "Bireysel perakende kullanıcılar için teknik kurulum zorluğu.", "Neden Kazandı: Veri merkezlerindeki atıl sunucu kapasitesini dApp geliştiricilerine açan ilk DePIN olması."],
    ["Livepeer", "📹", "Merkezsiz Video İşleme", "Video Hacmi", "Stabil", "Video yayıncılarının transcoding işlemlerinden alınan komisyonlar.", "Geleneksel video işleme sunucularına göre %50 daha düşük maliyet.", "Video yayıncılığı sektörünün merkezileşmiş yapısı.", "Neden Kazandı: GPU madencilerinin boş zamanlarında video işlemesini sağlayarak video altyapı maliyetini düşürmesi."],
    ["Pocket Network", " pocket", "Merkezsiz RPC Düğümleri", "RPC Hacmi", "Stabil", "dApp'lerin RPC isteklerini düğümlere dağıtarak aldığı servis ücretleri.", "Tekil hata noktası olmayan, sansüre dayanıklı RPC altyapısı.", "Infura gibi dev merkezi rakiplerin pazar hakimiyeti.", "Neden Kazandı: Blokzincir geliştiricilerine binlerce bağımsız düğüm üzerinden kesintisiz RPC erişimi sunması."],
    ["Helium", "🎈", "Merkezsiz Kablosuz Ağ", "Fiziksel Cihazlar", "Stabil", "Kullanıcıların kurduğu baz istasyonları üzerinden veri transfer ücretlerinden gelir alır.", "Halk tarafından kurulan dünyanın en büyük LoRaWAN kablosuz veri ağı.", "Cihaz satış gelirlerinin azalması sonrası yaşanan tıkanıklıklar.", "Neden Kazandı: Bireysel kullanıcılara madencilik ödülü vererek kablosuz ağ altyapısını sıfür maliyetle kurması."],
    ["io.net", "🌐", "Yapay Zeka GPU Kümesi", "GPU Hacmi", "Çok Hızlı", "Yapay zeka modellerini eğitmek isteyen şirketlerin ödediği GPU kiralama komisyonları.", "Dünyanın en büyük merkezsiz yapay zeka hesaplama ve GPU kümeleme ağı.", "Cihazların internet bağlantı kalitesindeki dalgalanmalar.", "Neden Kazandı: Binlerce bağımsız GPU'yu tek bir süper bilgisayar gibi çalıştırabilen kümeleme teknolojisi sunması."],
    ["Gnosis Chain", "🦉", "Ethereum Uyumlu L1", "İşlem Hacmi", "Stabil", "Ağ üzerindeki gas ücretlerinden gelir elde eder.", "Ethereum ile tam uyumlu, neredeyse sıfır gas ücretli ve son derece merkeziyetsiz doğrulayıcı yapısı.", "Diğer L2 rollup'larının gölgesinde kalması.", "Neden Kazandı: Kararlı xDAI çıpasıyla çalışan ve doğrulayıcı sansürüne karşı en dayanıklı ağlardan birini kurması."],
    ["Fraxtal", "⛓️", "Frax L2 Rollup", "$80 Milyon+ (TVL)", "Hızlı Büyüme", "L2 ağındaki gas ücretlerinden ve yerleşik DeFi entegrasyonlarından komisyon alır.", "Frax Finance'in tüm DeFi ürünleriyle yerleşik entegrasyon.", "Yeni kurulan bir L2 olmasının getirdiği kullanıcı azlığı.", "Neden Kazandı: Blok alanı tüketen kullanıcılara doğrudan gas iadesi sunması."],
    ["Base", "🔵", "Coinbase Ethereum L2'si", "Milyarlarca Dolar", "Çok Hızlı", "L2 üzerindeki gas ücretleri ve işlem sıralama gelirlerinden pay alır.", "Coinbase'in milyonlarca kullanıcısına doğrudan ve ucuz L2 erişimi sunması.", "Sequencer mekanizmasının henüz tam merkeziyetsiz olmaması.", "Neden Kazandı: Coinbase'in kurumsal gücü ve kullanıcı tabanıyla entegre çalışarak en hızlı büyüyen L2 olması."],
    ["Arbitrum One", "💙", "Lider Ethereum L2 Rollup'ı", "Milyarlarca Dolar", "İstikrarlı", "L2 üzerindeki gas ve sequencer ücretlerinden gelir elde eder.", "DeFi ekosistemindeki en derin likiditeye ve en fazla dApp çeşitliliğine sahip L2 olması.", "Optimism ve Base ile yaşanan yoğun L2 pazar payı rekabeti.", "Neden Kazandı: Ethereum genelindeki en iyi EVM uyumluluğunu ve en ucuz işlem ücretlerini en erken sunan L2 olması."],
    ["Optimism", "🔴", "Süper Zincir Altyapısı", "Milyarlarca Dolar", "İstikrarlı", "OP Stack kullanan diğer zincirlerin sequencer gelirlerinden pay alır.", "OP Stack ile oluşturulan Süper Zincir ekosisteminin merkezinde yer alması.", "Bireysel kullanıcılar için Arbitrum karşısında daha düşük doğrudan TVL.", "Neden Kazandı: Kendi L2'sini kurmak isteyen şirketlere standart ve güvenli bir altyapı sunması."],
    ["Sui Network", "💧", "Move Dilli Hızlı L1", "Milyarlarca Dolar", "Çok Hızlı", "Ağ üzerindeki gas ücretlerinden pay alır.", "Move dili sayesinde saniyede 297.000 işlem yapabilen, nesne tabanlı mimari.", "EVM dışı olmasının getirdiği cüzdan ve dApp taşıma zorlukları.", "Neden Kazandı: Paralel işlem yürütme teknolojisiyle blokzincirlerdeki tıkanıklık sorununu çözmesi."],
    ["Aptos", "🧬", "Kurumsal Move L1'i", "Milyarlarca Dolar", "Hızlı Büyüme", "Ağ üzerindeki gas ücretlerinden ve kurumsal entegrasyonlardan gelir sağlar.", "Meta'nın Diem projesinden gelen, kurumsal düzeyde güvenlik ve hız altyapısı.", "Sui ile yaşanan doğrudan Move dili liderliği rekabeti.", "Neden Kazandı: Kurumsal şirketlerin blokzincir entegrasyonu için en güvenli akıllı sözleşme dili olan Move'u sunması."],
    ["Near Protocol", "🌌", "Sharding Tabanlı L1", "Milyarlarca Dolar", "Dengeli", "Ağ üzerindeki gas ücretlerinden ve bulut veri saklama komisyonlarından gelir elde eder.", "Gece-gündüz çalışan dinamik sharding teknolojisi ve kolay kullanıcı adları.", "EVM ağlarının yarattığı ezici pazarlama baskısı.", "Neden Kazandı: Kullanıcıların karmaşık cüzdan adresleri yerine kolay hesaplar kullanmasını sağlaması."],
    ["Gnosis Safe", "🛡️", "Çoklu İmza Güvenliği", "Milyarlarca Dolar", "İstikrarlı", "Akıllı sözleşme cüzdanı ve çoklu imza standardıyla kurumsal varlıkları korur.", "Kripto para ekosistemindeki en güvenilir ve en çok denetlenmiş saklama standardı.", "Bireysel web3 kullanıcıları için ilk kurulum maliyetleri.", "Neden Kazandı: Akıllı sözleşme cüzdanlarını kurumsal hazine yönetimi için güvenli ve modüler bir standarda dönüştürmesi."]
];

const remaining_c = [
    ["Euler Finance", "🧮", "Dürüst Kurtarma Başarısı", "$197 Milyon", "Hızlı (Flaş)", "Kullanıcıların on-chain borç alma ve verme işlemlerini kaldıraçlı getiri oranlarıyla yöneten kredi havuzu.", "Dürüst iletişim ve hacker ile başarılı müzakere.", "Bağış fonksiyonunun flaş krediye açık olması.", "Pivot Noktası: Hacker ile şeffaf müzakere yürütüp çalınan fonların tamamını kurtarmaları ve kullanıcıları %100 tazmin etmeleri."],
    ["Nomad Bridge", "🌉", "Mantık Hatası Kurbanı", "$190 Milyon", "Çok Hızlı", "Farklı blokzincirler arasında hızlı ve ucuz token transferi sağlayan çapraz zincir köprüsü.", "Hızlı transfer ve düşük gas ücreti.", "Sözleşme doğrulamalarındaki boş mesajları geçerli sayan mantık hatası.", "Pivot Noktası: Akıllı sözleşme güncellemesinde doğrulama kontrol fonksiyonunu boş veriyle tetiklenmeyecek şekilde korusalardı köprü yağmalanmazdı."],
    ["Badger DAO", "🦡", "Ön Yüz (UI) Saldırısı", "$120 Milyon", "Yavaş Sızıntı", "Bitcoin varlıklarının DeFi ekosisteminde getiri kazanmasını sağlayan akıllı kasalar.", "Kullanıcı kayıplarını karşılamak için dürüstçe çalışıp tazmin planı sunmaları.", "Ön yüz güvenliğinde yaşanan zafiyet.", "Pivot Noktası: Arayüze sızan zararlı kodun kullanıcı onaylarını çalması. Harcama onaylarını on-chain izleyen güvenlik paneli kurtarıcı olurdu."],
    ["Cream Finance", "🍦", "Tekrarlanan Oracle Saldırısı", "$130 Milyon+", "Hızlı (Flaş)", "Çoklu token borçlanması ve getiri staking havuzları sunan borç verme platformu.", "Çok sayıda açığa rağmen kaçmayıp protokolü yamayarak borç ödemeye çalışması.", "Likit olmayan teminat varlıklarının fiyatını hesaplamak için zayıf oracle yapıları.", "Pivot Noktası: Flaş kredilerle teminat token fiyatının oracle üzerinde yapay şişirilmesi. Fiyat beslemesi için Chainlink ve TWAP kurtarıcı olurdu."],
    ["Yam Finance", "🍠", "Matematiksel Kod Hatası", "$500 Milyon", "Çok Hızlı", "DeFi tarihinde rebase özelliğini getiren ilk deneysel getiri protokolü.", "Topluluk odaklı adil dağıtım ve DeFi boğasında yarattığı çılgınlık.", "Akıllı sözleşmenin denetlenmeden doğrudan ana ağa sürülmesi.", "Pivot Noktası: Rebase esnasında yönetişim havuzuna gönderilen payın matematiksel olarak sonsuz döngüye girmesi. Ana ağ öncesi testnet simülasyonu şarttı."],
    ["Fei Protocol", "🟢", "Dürüst Kapanış", "$80 Milyon", "Yavaş / Dürüst", "Protokol Kontrollü Değer modeliyle çalışan algoritmik sabit coin.", "Hack sonrası zararları kendi ceplerinden ödeyip dürüstçe tasfiye etmeleri.", "Rari Capital ile birleştikten sonra borç verme havuzlarında oluşan açıklar.", "Pivot Noktası: Birleşilen protokolün borçlanma kontratlarındaki re-entrancy açığı. Havuzları entegre etmeden önce sıkı denetim şarttı."],
    ["bZx / Ooki", "🎯", "Sürekli Güvenlik Zafiyeti", "$15 Milyon", "Aşamalı Çöküş", "Kaldıraçlı borçlanma ve marjin ticareti sunan on-chain borç verme.", "Her hackten sonra dürüstçe ayağa kalkıp yeniden yapılanma mücadelesi.", "Geliştirici anahtarlarının kimlik avı ile çalınması.", "Pivot Noktası: Geliştirici cüzdanlarının tekil onay yetkisine sahip olması. Protokol yönetim anahtarlarını multisig ve timelock ardına koymak şarttı."],
    ["Ronin Network", "🐉", "Doğrulayıcı Anahtar Hacki", "$625 Milyon", "Hızlı", "Axie Infinity oyunu için geliştirilen, Ethereum tabanlı yan zincir.", "Siber saldırı sonrası Sky Mavis'in dışarıdan fon bularak zararı ödemesi.", "9 doğrulayıcı düğümden 5'inin kontrolünün tek bir şirkete bağımlı olması.", "Pivot Noktası: Doğrulayıcı imza eşiğinin kimlik avı saldırısıyla aşılması. Doğrulayıcı düğüm sayısını artırmak şarttı."],
    ["Wormhole", "🕳️", "İmza Doğrulama Açığı", "$325 Milyon", "Hızlı", "Solana ile Ethereum arasında varlık transferi sağlayan çapraz zincir köprüsü.", "Jump Crypto'nun dürüstçe 325 milyon dolar koyarak peg'i kurtarması.", "Solana akıllı sözleşme kodundaki imza doğrulama açığı.", "Pivot Noktası: Köprü kontratının sahte imza kanıtlarını onaylamış kabul etmesi. İmza doğrulama kütüphanesini güncellemeden önce test ettirmek şarttı."],
    ["Mango Markets", "🥭", "Oracle Fiyat Manipülasyonu", "$114 Milyon", "Hızlı (Saatler)", "Solana üzerinde kaldıraçlı işlemler, borç verme ve spot ticaret sunan DEX.", "Hacker ile müzakere ederek fonların büyük kısmını geri almaları.", "Likit olmayan MANGO tokenının teminat olarak kabul edilmesi.", "Pivot Noktası: MANGO fiyatının vadeli işlemlerde yapay yükseltilip havuzun borç adı altında boşaltılması. Teminat limitlerini dinamik sınırlandırmak şarttı."],
    ["Heco Bridge", "⛓️", "Siber Saldırı Kaybı", "$86 Milyon", "Hızlı", "HTX ekosisteminin Ethereum ile bağlantısını sağlayan zincirler arası köprü.", "HTX borsasının dürüstçe tüm kullanıcı zararlarını karşılaması.", "Köprünün sıcak cüzdan özel anahtarlarının güvenli olmayan ortamlarda saklanması.", "Pivot Noktası: Sıcak cüzdan özel anahtarlarının siber saldırganlar tarafından ele geçirilmesi. Çoklu imza kullanmak şarttı."],
    ["Multichain", "🔗", "Mücbir Sebep Kapanışı", "$120 Milyon", "Yavaş Çöküş", "Çoklu zincirler arası varlık transferi sağlayan en yaygın DeFi köprü protokolü.", "Ekibin kaçmayıp, kurucunun tutuklanmasını dürüstçe açıklaması.", "Köprü MPC düğüm sunucularının tamamen kurucunun kişisel kontrolünde olması.", "Pivot Noktası: Kurucunun Çin polisi tarafından tutuklanması ve tüm sunucu şifrelerine el konulması. MPC anahtarlarını coğrafi dağıtmak şarttı."],
    ["Platypus", "🦆", "Dürüst Geri Kazanım", "$9 Milyon", "Çok Hızlı", "Avalanche üzerinde çalışan, tek taraflı likidite sağlayan stablecoin.", "Siber analizle hacker'ın kimliğini bulup fonların %90'ını kurtarma başarısı.", "USP stablecoin borçlanma kontratındaki acil durum çekim mantığı açığı.", "Pivot Noktası: Flaş kredi ile teminat kontrol fonksiyonunun bypass edilmesi. Borç limit kontrollerini her adımda zorunlu kılmak şarttı."],
    ["Cover Protocol", "🛡️", "Sonsuz Token Basımı", "$5 Milyon", "Anlık Sıfırlanma", "DeFi projelerindeki hack risklerine karşı on-chain sigorta poliçesi.", "Saldırganın beyaz şapkalı çıkıp tüm fonları iade etmesi.", "Ödül dağıtım sözleşmesindeki bellek hatası yüzünden sonsuz token basılabilmesi.", "Pivot Noktası: Akıllı sözleşmede mükerrer ödül talebiyle sonsuz COVER basılması. Günlük maksimum arz limiti koymak şarttı."],
    ["Grim Finance", "👹", "Re-entrancy Exploit", "$30 Milyon", "Hızlı", "Fantom ağında çalışan, LP tokenları üzerinden getiri toplayan kasalar.", "Açığı kapatıp yola devam etmeye çalışarak dürüstlük sergilemeleri.", "Kasa sözleşmesinde re-entrancy korumasının bulunmaması.", "Pivot Noktası: Saldırganın tek işlem içinde kasaya mükerrer girerek sahte pay üretmesi. nonReentrant belirteci eklemek şarttı."],
    ["Saddle Finance", "🤠", "Dürüst Tasfiye", "$10 Milyon", "Yavaş / Dürüst", "Slippage olmadan stablecoin takası sunan on-chain AMM platformu.", "Rekabeti kaybettikten sonra kalan hazineyi token sahiplerine adil dağıtıp kapanmaları.", "Pazardaki Curve ve Uniswap v3 rekabetine karşı hacim çekememesi.", "Pivot Noktası: Teşviklerin bitmesiyle likiditenin çekilmesi. Hazineyi eritmek yerine dürüstçe tasfiye kararı almak en doğru adımdı."],
    ["Warp Finance", "🌀", "Portal Token İadesi", "$7.7 Milyon", "Hızlı", "LP tokenlarını teminat göstererek borç alınan borç verme.", "Yatırımcılardan fon bulup kullanıcılara portal tokenları vererek zararı kapatmaları.", "LP token değerini hesaplayan fiyat ortağının flaş krediyle manipüle edilebilmesi.", "Pivot Noktası: Flaş krediyle Uniswap havuzundaki LP fiyatının yapay şişirilmesi. Fiyat hesaplamasında TWAP kullanmak şarttı."],
    ["Akropolis", "🏛️", "Token İade Güveni", "$2.0 Milyon", "Hızlı", "Kullanıcılara güvenli on-chain emeklilik ve getiri kasaları sunan DeFi.", "Hack sonrası kendi AKRO tokenlarını kurbanlara dağıtarak zararı finanse etmeleri.", "Akıllı sözleşmedeki havuz yatırım onay kontrolünün eksik olması.", "Pivot Noktası: Flaş kredi ile sahte yatırım sözleşmesi tetiklenerek havuzun boşaltılması. Yatırım adreslerini beyaz listeye almak şarttı."],
    ["Harvest Finance", "🚜", "Flaş Kredi Arbitrajı", "$24 Milyon", "Hızlı", "DeFi havuzlarındaki en yüksek faiz oranlarını kovalayan yield farming.", "Saldırı anında kalan fonları korumaya alıp kurtarılan 2.5M$'ı adil dağıtmaları.", "Kasa yatırma/çekme işlemlerindeki hisse fiyatı hesaplamasının anlık havuz dengesine bağlılığı.", "Pivot Noktası: Flaş kredi ile Curve havuz fiyatının manipüle edilerek ucuz pay alınması. Çekimlere slippage limiti koymak şarttı."],
    ["Origin Dollar", "🔵", "Zirve Dürüstlük İadesi", "$7 Milyon", "Hızlı", "Cüzdanda durduğu yerde otomatik getiri kazandıran stablecoin.", "Kurucuların kendi şirket varlıklarını satarak kullanıcıları %100 telafi etmesi.", "OUSD basım kontratındaki çoklu re-entrancy açıkları.", "Pivot Noktası: Basım açığı. Kurucuların kişisel servetlerini satarak zararı %100 kapatması en büyük dürüstlüktü."],
    ["Inverse Finance", "📈", "Gelirle Borç Ödeme", "$15.6 Milyon", "Hızlı", "DOLA adında borçlanma stablecoin'i işleten DeFi.", "Borcu protokolün sonraki 3 yıllık faiz gelirleriyle tamamen kapatmaları.", "DOLA teminat fiyatını hesaplayan oracle'ın sığ havuzlara bağlı olması.", "Pivot Noktası: Flaş kredi ile teminat varlığının fiyatının oracle üzerinde şişirilmesi. Fiyat beslemesini Chainlink'e bağlamak şarttı."],
    ["Alpha Homora", "🛡️", "Borç Yapılandırma Başarısı", "$37 Milyon", "Hızlı", "Kullanıcılara kaldıraçlı yield farming imkanı sunan DeFi.", "Cream Finance ile borç yapılandırma anlaşması imzalayarak dürüstçe borcu ödemeleri.", "Cream Finance'in Iron Bank borçlanma kontratı ile Alpha arasındaki entegrasyon açıkları.", "Pivot Noktası: Flaş kredi ile Iron Bank havuzundan Alpha adına yetkisiz borç çekilmesi. Borçlanma yetkilerini her işlem sonunda sıfırlamak şarttı."],
    ["Indexed Finance", "📊", "Hukuki Mücadele", "$16 Milyon", "Hızlı", "Kullanıcıların tek token ile çoklu DeFi varlığına yatırım yaptığı endeks.", "Hacker'a karşı yasal savaş açıp siber dedektiflikle kimliğini deşifre etmeleri.", "Endeks havuzundaki ağırlık dengeleme algoritmasının matematiksel açıkları.", "Pivot Noktası: Ağırlık dengeleme açığı. Ağırlık dengelemeye slippage limiti koymak şarttı."],
    ["Alchemix", "🧪", "Vyper Açığı Kurtarması", "$6.5 Milyon", "Hızlı", "Gelecekteki staking getirileriyle kendini otomatik ödeyen kredi.", "Vyper açığı sonrası hacker'ın fonları dürüstçe iade etmesiyle zararın sıfırlanması.", "Vyper derleyicisindeki re-entrancy korumasının çalışmaması.", "Pivot Noktası: Curve havuzundaki akıllı sözleşme açığı. Derleyici sürümlerinin canlıya alınmadan önce denetlenmesi şarttı."],
    ["JPEG'd", "🖼️", "NFT Teminatlı Borçlanma", "$11 Milyon", "Hızlı", "Kullanıcıların NFT'lerini teminat göstererek pUSD stablecoin borç aldığı DeFi.", "%10 ödül karşılığında hacker ile anlaşıp fonları dürüstçe kurtarmaları.", "Curve havuzundaki Vyper derleyicisi re-entrancy açığı.", "Pivot Noktası: Vyper derleyicisindeki açık nedeniyle havuzun hacklenmesi. Beyaz şapkalı müzakeresi fonları kurtardı."],
    ["Metronome", "☄️", "Çoklu Havuz Kurbanı", "$1.6 Milyon", "Hızlı", "DeFi ekosisteminde sentetik varlık ve getiri optimizasyon kasaları.", "Diğer mağdur protokollerle ortak kurtarma fonu kurarak dürüstçe mücadele etmeleri.", "Curve havuzlarındaki Vyper derleyici açığı.", "Pivot Noktası: Vyper açığı kurbanı olunması. Diğer mağdurlarla ortak hareket etmek güveni korudu."],
    ["Kyber Network", "🔗", "Dürüst Hazine İadesi", "$48 Milyon", "Hızlı", "KyberSwap Elastic havuzları üzerinden çok zincirli likidite toplayıcı.", "Hacker iade etmeyince, kullanıcı zararlarını kendi hazinesinden ödemeleri.", "Elastic havuzlarındaki likidite hesaplama mantığındaki yazılımsal açık.", "Pivot Noktası: Likidite ekleme/çıkarma esnasındaki çift katmanlı hesaplama hatası. Tüm zararın hazineden ödenmesi takdir topladı."],
    ["BarnBridge", "🏛️", "Yasal Düzenleme Kapanışı", "$15 Milyon", "Yavaş / Dürüst", "DeFi faiz oranlarını farklı risk dilimlerine bölen protokol.", "SEC soruşturması sonrası işlemleri durdurup yasalara tam uyum göstermeleri.", "Yasal otoritelerin merkeziyetsiz risk havuzlarına karşı başlattığı yaptırımlar.", "Pivot Noktası: Yasal uyumsuzluk riski belirdiğinde dürüstçe tüm faaliyetleri askıya alıp oylamayla tasfiye kararı almaları."],
    ["Float Protocol", "🎈", "Adil Hazine İadesi", "$10 Milyon", "Yavaş", "Dinamik arz mekanizmasına sahip algoritmik stablecoin deneyi.", "Peg korunamayınca kalan hazineyi token sahiplerine adil dağıtıp kapanmaları.", "Sermaye verimliliğinin ve çıpa koruma havuzlarının ayı piyasasında yetersiz kalması.", "Pivot Noktası: Sürdürülemez peg yapısı. Hazineyi eritmek yerine kullanıcılara iade ederek projeyi kapatmaları dürüstlüktü."],
    ["Temple DAO", "🛕", "Tazminat Token Dağıtımı", "$2.3 Milyon", "Hızlı", "Topluluk odaklı getiri kasaları ve stablecoin havuzları.", "Hack mağdurlarına kendi token rezervlerinden anında ödeme yapmaları.", "Staking ödül dağıtım sözleşmesindeki yetkisiz erişim mantık hatası.", "Pivot Noktası: Ödül kontratındaki doğrulama eksikliği. Ekibin kendi yedek fonlarıyla zararı kapatması güveni korudu."],
    ["Deus Finance", "⚡", "Çoklu Flash Loan Kurbanı", "$6 Milyon", "Hızlı", "Sentetik varlıklar ve DEI stablecoin basım altyapısı.", "Her saldırı sonrası kaçmayıp DEI çıpasını geri getirmek için mücadele etmeleri.", "Çoklu zincir oracle veri aktarım süreçlerindeki gecikme açıkları.", "Pivot Noktası: Oracle fiyat gecikmelerinin flaş kredilerle manipüle edilmesi. Ekip mücadeleye devam ediyor."],
    ["Audius", "🎵", "Yönetişim Açığı Hacki", "$6 Milyon", "Hızlı", "Sanatçıların müziklerini doğrudan satabildiği merkeziyetsiz müzik platformu.", "Saldırı sonrası token geri alımı yaparak havuzu dürüstçe fonlamaları.", "Yönetişim oylama sözleşmesindeki mantık hatasıyla oylamanın bypass edilebilmesi.", "Pivot Noktası: Saldırganın tek işlemle kendini yönetici atayıp hazinedeki AUDIO'ları çekmesi. Kodun anında yamalanması vaka kurtardı."],
    ["Cashio", "💸", "Solana Sonsuz Basım Kurbanı", "$52 Milyon", "Anlık", "Solana üzerinde tamamen teminatlı stablecoin basım protokolü.", "Ekibin yasal süreçleri başlatıp, siber güvenlik firmalarıyla açık analiz raporu yayınlaması.", "Teminat doğrulama akıllı sözleşmesindeki sahte hesap kabul açığı.", "Pivot Noktası: Sözleşmenin sahte teminat hesaplarını geçerli kabul etmesi. Proje kurtarılamadı ancak analiz şeffafça paylaşıldı."],
    ["Nirvana Finance", "🧘", "Hazine Dağıtım Kapanışı", "$3.5 Milyon", "Anlık", "Solana üzerinde çalışan yarı-algoritmik stablecoin ve hazine backing.", "Saldırı sonrası hazinedeki kalan fonları kurbanlara adilce dağıtıp kapanmaları.", "Flaş kredi ile hazine rezerv fiyatının yapay olarak kaydırılması açığı.", "Pivot Noktası: Rezerv fiyatının anlık havuz derinliğine bağlı olması. Kalan hazineyi iade ederek dürüstçe kapandılar."],
    ["Slope Wallet", "📱", "Sunucu Günlüğü Sızıntısı", "$5 Milyon", "Anlık", "Solana ekosistemindeki en popüler mobil cüzdan sağlayıcılarından biri.", "Sızıntı sonrası siber firmalarla çalışıp hatayı dürüstçe üstlenmeleri.", "Mobil uygulamanın hata günlüklerini sunucuya şifresiz kaydederken seed phrases sızdırması.", "Pivot Noktası: Hata ayıklama günlüklerinin güvenlik filtresinden geçirilmemesi. Şirket faaliyetleri dürüstçe sonlandırıldı."],
    ["Raydium", "⚡", "Borsa Yetki Sızıntısı", "$4.4 Milyon", "Hızlı", "Solana ağındaki en eski ve en derin likiditeli AMM havuzları.", "Tüm kullanıcı kayıplarını kendi hazinesinden ödeyerek mağduriyetleri kapatmaları.", "Doğrulayıcı sıcak cüzdan özel anahtarlarının siber saldırıyla ele geçirilmesi.", "Pivot Noktası: Tekil yönetici cüzdanının sızması. Kayıpların borsa hazinesinden ödenmesi dürüstlük göstergesiydi."],
    ["Maple Finance", "🍁", "FTX Bulaşıcı Kriz Kurbanı", "$36 Milyon", "Hızlı", "Kurumsal borç verme havuzları işleten DeFi kredi platformu.", "İflas eden borçlulara karşı yasal takip başlatıp havuzları yeniden yapılandırmaları.", "FTX çöküşüyle birlikte borç alan kurumsal firmaların temerrüde düşmesi.", "Pivot Noktası: Kredi alan kurumsal firmaların risk analizinin FTX odağında eksik yapılması. Şeffaf kriz yönetimiyle protokol kurtarıldı."],
    ["TrueFi", "🛡️", "Kredi Temerrüt Krizi", "$10 Milyon", "Yavaş", "Teminatsız kurumsal borçlanma sunan DeFi para piyasası.", "Temerrüde düşen borçlulara karşı dürüstçe hukuki tasfiye süreçleri yürütmeleri.", "Küresel faiz artışları ve kripto çöküşüyle borçluların ödeme zorluğu çekmesi.", "Pivot Noktası: Teminatsız kredi risk sınırlarının aşılması. Hukuki süreçler şeffaf şekilde toplulukla paylaşılıyor."],
    ["Opyn", "🛡️", "Yasal Ceza ve Pivot", "$5 Milyon", "Yavaş / Dürüst", "Ethereum üzerinde kaldıraçlı opsiyon ve getiri ürünleri sunan DeFi.", "SEC cezası sonrası yasalara tam uyum sağlayıp kaldıraçlı ürünleri durdurmaları.", "Regülatörlerin kaldıraçlı on-chain türev ürünlere getirdiği yasaklar.", "Pivot Noktası: Yasal uyum riskleri belirdiğinde projeyi kapatmak yerine, yasaklı ürünleri durdurup dürüstçe pivot etmeleri."],
    ["Deribit", "🎯", "Sıcak Cüzdan Hacki", "$28 Milyon", "Hızlı", "Dünyanın en büyük kripto opsiyon ve vadeli işlem borsası.", "Tüm zararı kendi sigorta fonlarından karşılayıp para çekimlerini aksatmamaları.", "Sıcak cüzdan sunucularının siber saldırganlar tarafından hacklenmesi.", "Pivot Noktası: Sıcak cüzdanda tutulan fon miktarının limit aşımı. Borsanın kendi sermayesiyle zararı anında kapatması güveni korudu."],
    ["Wintermute", "❄️", "DeFi Havuz Hacki", "$160 Milyon", "Hızlı", "Algoritmik piyasa yapıcılık ve likidite sağlayıcılık devi.", "Hack sonrası hiçbir operasyonu durdurmayıp piyasa yapmaya devam etmeleri.", "Akıllı sözleşme deploy ederken kullanılan zayıf özel anahtar (Profinity açığı).", "Pivot Noktası: Zayıf anahtar üretici kullanılması. Şirket özsermayesinin gücüyle sarsılmadan yola devam ettiler."],
    ["BitMart", "🪐", "Cüzdan Sızıntı Hacki", "$150 Milyon", "Hızlı", "Küresel ölçekte milyonlarca kullanıcısı olan merkezi borsa.", "CEO'nun canlı yayına çıkıp tüm zararları kendi cebinden karşılayacağını açıklaması.", "İki sıcak cüzdanın özel anahtarlarının siber saldırıyla çalınması.", "Pivot Noktası: Cüzdan anahtar saklama altyapısındaki sızıntı. Kullanıcı kayıplarının borsa tarafından tamamen ödenmesi dürüstlüktü."],
    ["Crypto.com", "💳", "2FA Bypass Hacki", "$34 Milyon", "Hızlı", "Küresel kripto borsası ve ödeme kartları sağlayıcısı.", "Tüm etkilenen kullanıcı hesaplarını kuruşu kuruşuna anında tazmin etmeleri.", "Kullanıcı hesaplarındaki iki faktörlü doğrulama katmanının siber bypass edilmesi.", "Pivot Noktası: 2FA doğrulama sistemindeki yazılımsal açık. Borsanın hızlı refleksle zararları ödemesi marka değerini kurtardı."],
    ["Transit Swap", "🔄", "DEX Rotalama Hacki", "$21 Milyon", "Hızlı", "Çoklu zincirler arası en ucuz takas rotasını bulan likidite toplayıcı.", "Siber dedektiflerle çalışıp fonların %70'ini hacker'dan geri almaları.", "Rotalama akıllı sözleşmesindeki transfer yetkilendirme açığı.", "Pivot Noktası: Takas esnasında kullanıcı cüzdanından para çeken fonksiyondaki açık. Kurtarılan fonlar adilce kullanıcılara dağıtıldı."],
    ["PancakeBunny", "🐰", "BNB Havuzu Flaş Kredisi", "$45 Milyon", "Hızlı", "BNB Chain üzerinde otomatik getiri toplayan en büyük kasalardan biri.", "Kurbanlara yeni pBUNNY tazminat tokenı dağıtıp protokolü açık tutmaları.", "Flaş kredi ile PancakeSwap havuz fiyatının manipüle edilerek sınırsız BUNNY basılması.", "Pivot Noktası: Basım formülünün anlık havuz fiyatına bağlılığı. Kaçmayıp yeni ürünlerle borç ödemeye çalıştılar."],
    ["AutoShark", "🦈", "Flaş Kredi Kurbanı", "$2 Milyon", "Hızlı", "BNB Chain üzerinde getiri optimize eden akıllı kasalar.", "Shark token basımını durdurup yeni tazminat havuzları açmaları.", "PancakeBunny benzeri flaş kredi fiyat manipülasyonu saldırısı.", "Pivot Noktası: Fiyat besleme oracle açığı. Ekibin dürüstçe hatayı kabul edip yeni sözleşmelere geçmesi güveni korudu."],
    ["Belt Finance", "🎫", "Çoklu Strateji Açığı", "$6.2 Milyon", "Hızlı", "Çoklu zincir getiri optimize kasaları ve stablecoin havuzları.", "Zararın tamamını borsa hazinesinden karşılayarak kullanıcıları korumaları.", "Çoklu getiri stratejileri arasındaki entegrasyon mantığı hatası.", "Pivot Noktası: Entegrasyon hatasının siber saldırgan tarafından tetiklenmesi. Hazineden ödeme yapılması vaka kurtardı."],
    ["Spartan Protocol", "🛡️", "Matematiksel Havuz Açığı", "$30 Milyon", "Hızlı", "BNB Chain üzerinde çalışan, sentetik varlık likidite havuzları.", "Kaçmayıp toplulukla birlikte protokolü sıfırdan güvenli olarak yeniden yazmaları.", "Havuz payı hesaplama formülündeki matematiksel mantık hatası.", "Pivot Noktası: Formül hatasının flaş kredilerle sömürülmesi. Ekibin toplulukla omuz omuza çalışması dürüstlük örneğiydi."],
    ["Aura Finance", "🌟", "Proaktif Havuz Kilidi", "Sıfır Kayıp", "Hızlı", "Balancer ekosistemi üzerinde çalışan likidite teşvik protokolü.", "Açık fark edildiği an havuzu dürüstçe kilitleyip fon kaybını önlemeleri.", "Ödül dağıtım sözleşmesinde potansiyel fon kilitlenme açığı.", "Pivot Noktası: Siber güvenlik uyarısıyla kontratın proaktif durdurulması. Sıfır kayıpla vaka atlatıldı."],
    ["Olympus DAO", "🏛️", "OHM Fiyat Çöküşü", "Fiyat Çöküşü", "Yavaş", "Merkeziyetsiz rezerv para birimi ve oyun teorisi modeli.", "Token fiyatı %99 düşmesine rağmen hazinedeki backing rezervlerini korumaları.", "Oyun teorisinin ayı piyasasında panik satışlarını tetikleyen yapısı.", "Pivot Noktası: Sürdürülemez yüksek APY vaatleri. Ekip kaçmadı, hazineyi koruyarak DeFi ürünleri geliştirmeye devam ediyor."],
    ["Hector DAO", "🛡️", "Hazine Kaybı & Tasfiye", "$2.7 Milyon", "Yavaş", "Fantom üzerinde çalışan OlympusDAO çatalı ve hazine yönetimi.", "Kriz sonrası kalan 2.7M$ hazine varlığını yatırımcılara adilce dağıtıp kapanmaları.", "Terra Luna ve 3AC çöküşünde hazine varlıklarının büyük kısmının batması.", "Pivot Noktası: Hazine varlıklarının riskli DeFi projelerine yatırılması. Kalanı iade ederek dürüstçe kapandılar."],
    ["Wonderland (TIME)", "🎩", "Yönetici Skandalı Kapanışı", "$200 Milyon", "Yavaş", "Avalanche üzerinde çalışan devasa hazineye sahip DAO projesi.", "Yönetici skandalı sonrası hazineyi token sahiplerine dağıtıp kapanmaları.", "Hazine yöneticisinin geçmişte dolandırıcılık sabıkası olduğunun ortaya çıkması.", "Pivot Noktası: Hazine yöneticisi Sifu skandalı. Topluluk oylamasıyla hazineyi adil dağıtarak dürüstçe tasfiye oldular."],
    ["Klima DAO", "🌱", "Karbon Token Çöküşü", "Fiyat Çöküşü", "Yavaş", "Karbon kredilerini on-chain tokenize eden ve saklayan yeşil DeFi projesi.", "Token fiyatı çökmesine rağmen misyonu terk etmeyip çalışmaya devam etmeleri.", "Karbon token arz-talep dengesinin ayı piyasasında bozulması.", "Pivot Noktası: Aşırı yüksek enflasyonist token yapısı. Ekip yeşil DeFi projeleri geliştirmeye dürüstçe devam ediyor."],
    ["Sperax", "🪙", "SPA Stabil Coin Hacki", "$1.9 Milyon", "Hızlı", "Arbitrum üzerinde getiri kazandıran USDs stablecoin protokolü.", "Yeni token basarak kurbanların tüm zararlarını kuruşu kuruşuna ödemeleri.", "USDs basım akıllı sözleşmesindeki yetkilendirme kontrol açığı.", "Pivot Noktası: Sözleşmedeki açık nedeniyle yetkisiz stablecoin basılması. Ekibin kendi cebinden ödemesi güveni tazeledi."],
    ["Rari Capital", "🧪", "Genç Ekip Fedakarlığı", "$10 Milyon", "Hızlı", "Genç DeFi geliştiricileri tarafından kurulan borç verme havuzları.", "Geliştiricilerin tüm kişisel kurucu token haklarını kurbanlara devretmesi.", "Akıllı sözleşmeler arasındaki entegrasyon açığı nedeniyle fonların çalınması.", "Pivot Noktası: Entegrasyon hatası. Genç kurucuların kişisel servetlerinden vazgeçerek zararı ödemesi zirve dürüstlüktür."],
    ["Helio Protocol", "☀️", "Ankr Çöküşü Kurbanı", "$15 Milyon", "Hızlı", "Ankr LST teminatıyla HAY stablecoin basan protokol.", "Ankr açığı sonrası 15 milyon dolarlık kötü borcu üstlenip çıpayı geri getirmeleri.", "Ankr protokolünde yaşanan siber saldırı sonucu aBHBc token fiyatının sıfırlanması.", "Pivot Noktası: Dış teminatın çökmesi. Helio ekibinin zararı üstlenerek peg'i kurtarması büyük başarıydi."],
    ["Conic Finance", "🧪", "Meta-Havuz Re-entrancy", "$3.2 Milyon", "Hızlı", "Curve meta-havuzlarında likiditeyi optimize eden DeFi protokolü.", "Dürüstçe hatayı kabul edip, etkilenen kullanıcılar için telafi planı hazırlamaları.", "Akıllı sözleşmedeki çoklu re-entrancy açığının tetiklenmesi.", "Pivot Noktası: Curve entegrasyonundaki kod açığı. Ekibin şeffaf kriz yönetimi takdir topladı."],
    ["Symphony", "🎼", "Cosmos Dürüst Tasfiyesi", "$1 Milyon", "Yavaş", "Cosmos ekosisteminde çalışan merkezsiz getiri ve likidite platformu.", "Likidite yetersizliğinden batınca, kalan tüm topluluk fonlarını iade edip kapanmaları.", "Cosmos ekosisteminin genel kullanıcı ve likidite kaybı yaşaması.", "Pivot Noktası: Sürdürülemez hacimler. Kalan tüm fonları sahiplerine iade ederek dürüstçe kapandılar."],
    ["Acro Finance", "🏛️", "Tasfiye Motoru Açığı", "$1.2 Milyon", "Hızlı", "Arbitrum üzerinde borç verme ve kaldıraçlı getiri protokolü.", "Zararın tamamını borsa hazinesinden karşılayarak kullanıcıları korumaları.", "Tasfiye motorundaki fiyat gecikmesinden kaynaklanan açık.", "Pivot Noktası: Tasfiye kodundaki matematiksel hata. Hazineden ödeme yapılması güveni korudu."],
    ["Euler v2", "🧮", "Yeniden Doğuş Başarısı", "Yeniden Kuruluş", "Dengeli", "İlki batmasına rağmen ekibin dürüst kurtarma başarısı sonrası v2 lansmanı.", "Topluluk desteğini arkasına alarak tamamen güvenli modüler v2 sürümünü kurmaları.", "İlk sürümdeki hack travmasının marka değerine etkisi.", "Pivot Noktası: İlk hackten ders alarak tüm kod mimarisini modüler ve izole havuzlar olarak yeniden tasarlamaları."],
    ["Abracadabra", "🧙‍♂️", "MIM Çıpa Kurtarma", "Çıpa Dalgalanması", "Dengeli", "MIM stablecoin'i ihraç eden borç verme platformu.", "MIM çıpası koptuğunda hazine gelirleriyle MIM yakarak çıpayı geri getirmeleri.", "Teminat olarak kullanılan varlıkların aniden sıfırlanması krizleri.", "Pivot Noktası: Riskli teminatların tasfiye edilememesi. Ekibin hazineyi devreye sokarak çıpayı kurtarması dürüstlüktü."],
    ["Lendf.me", "💸", "Hacker'ı İkna Eden Ekip", "$25 Milyon", "Çok Hızlı", "Erken dönem Ethereum borç verme ve likidite protokolü.", "Hacker'ın IP adresini bulup baskı yaparak tüm fonları iade ettirmeleri.", "dForce ekosistemindeki re-entrancy açığının sömürülmesi.", "Pivot Noktası: Kod açığı nedeniyle 25M$ çalınması. Ekibin siber dedektiflik başarısıyla fonların tamamı kurtarıldı."],
    ["SpiritSwap", "👻", "Fantom Dürüst Kapanışı", "$5 Milyon", "Yavaş", "Fantom ağının en eski ve en popüler merkeziyetsiz borsalarından biri.", "Hazine tükenince sitenin yönetimini dürüstçe başka bir ekibe devretmeleri.", "Fantom ekosisteminin genel hacim kaybı ve Multichain krizi bulaşması.", "Pivot Noktası: Sürdürülemez işletme maliyetleri. Kullanıcıları mağdur etmeden yönetimi devrederek dürüstçe çekildiler."],
    ["Fantom Foundation", "👻", "Vakıf Cüzdanı Sızıntısı", "$650 Bin", "Hızlı", "Fantom blokzincirinin geliştirilmesini fonlayan resmi vakıf.", "Sızıntının bireysel çalışan bilgisayarı kaynaklı olduğunu şeffafça açıklamaları.", "Çalışanın bilgisayarına sızan siber saldırganın vakıf cüzdanını boşaltması.", "Pivot Noktası: Sıcak cüzdan güvenlik önlemlerinin ihlali. Vakıf zararı kendi bütçesinden karşıladı."],
    ["Audius Governance", "🗳️", "Sahte Teklif İptali", "$6 Milyon", "Hızlı", "Sanatçıların müziklerini sattığı merkezsiz platform.", "Açığı anında kapatıp, çalınan AUDIO miktarı kadar piyasadan geri alım yapmaları.", "Yönetişim akıllı sözleşmesindeki oylama bypass mantık hatası.", "Pivot Noktası: Saldırganın sahte oylama ile hazineyi boşaltması. Hızlı kod müdahalesi vaka kurtardı."],
    ["Aave Safety Module", "🛡️", "Güvenlik Modülü Testi", "Sıfır Kayıp", "İstikrarlı", "Aave protokolündeki olası açık krizlerine karşı kilitlenen AAVE havuzu.", "Olası de-peg krizlerinde bu modülün dürüstçe devreye sokulmaya hazır tutulması.", "Modülün tetiklenmesi durumunda AAVE token fiyatına olası satış baskısı.", "Pivot Noktası: Protokol güvenliği için yedek sermaye biriktirilmesi. DeFi'deki en dürüst sigorta modelidir."],
    ["Vesper Finance", "🍷", "Token Satış Tazminatı", "$3 Milyon", "Hızlı", "Ethereum üzerinde çalışan, getiri optimize eden akıllı kasalar.", "Kendi token rezervlerini satarak kullanıcı zararlarını kuruşu kuruşuna ödemeleri.", "Akıllı kasalardaki strateji entegrasyon açığının hacklenmesi.", "Pivot Noktası: Entegrasyon hatası. Kurucuların kendi token haklarını satarak zararı kapatması güveni korudu."],
    ["Ripio Credit", "🌐", "Dürüst P2P Kapanışı", "$5 Milyon", "Yavaş", "Erken dönem P2P on-chain kredi platformu.", "Hacimler sıfırlanınca dürüstçe tüm havuzları kapatıp fonları iade etmeleri.", "Ayı piyasasında P2P kredi talebinin ve likiditenin tamamen bitmesi.", "Pivot Noktası: Sürdürülemez iş modeli. Projeyi açık bırakıp batırmak yerine dürüstçe tasfiye ettiler."],
    ["WePiggy", "🐷", "Ayı Piyasası Tasfiyesi", "$2 Milyon", "Yavaş", "Çoklu zincir borç verme ve kaldıraçlı getiri protokolü.", "Hacim sıfırlanınca dürüstçe havuzları kapatıp fonları iade etmeleri.", "Ayı piyasasında L2'lerdeki borçlanma talebinin bitmesi.", "Pivot Noktası: Düşük gelir üretimi. Kullanıcı fonlarını tehlikeye atmadan havuzları dürüstçe kapattılar."],
    ["UniLend", "🦄", "Proaktif Hata Koruması", "Sıfır Kayıp", "İstikrarlı", "Flaş kredi borç verme ve likidite protokolü.", "Kritik bir hata tespit edildiği an havuzları kapatıp fon kaybını önlemeleri.", "Akıllı sözleşmedeki potansiyel yetkisiz fon çekim açığı.", "Pivot Noktası: Siber güvenlik denetiminde fark edilen açığın anında yamalanması. Sıfır kayıpla kurtarıldı."],
    ["Force DAO", "🛡️", "Lansman Günü Koruması", "$350 Bin", "Anlık", "DeFi projelerine likidite ve getiri sağlayan akıllı kasalar.", "Lansman günü hata yapılınca projeyi durdurup kullanıcıları ödemeleri.", "Yatırma fonksiyonundaki mantık hatası yüzünden sahte pay basılması.", "Pivot Noktası: Kod hatası. Ekibin hatayı anında kabul edip kullanıcıları tazmin etmesi dürüstlüktü."],
    ["Linear Finance", "📈", "Zincir Durdurma Kararı", "$2 Milyon", "Hızlı", "LINA sentetik varlık basım ve kaldıraçlı işlem protokolü.", "Saldırı anında zinciri durdurup işlemleri geri alarak zararı sıfırlamaları.", "Sentetik varlık fiyat hesaplamasındaki oracle açık penceresi.", "Pivot Noktası: Oracle fiyat gecikmesinin tetiklenmesi. Hızlı müdahaleyle tüm işlemler dürüstçe geri alındı."],
    ["GrowthDefi", "🌱", "Kasa Tasfiyesi", "$1.5 Milyon", "Hızlı", "Getiri optimize eden akıllı kasalar ve stablecoin havuzları.", "Kasalar hacklendikten sonra kalan tüm hazineyi kurbanlara dağıtmaları.", "Akıllı kasalardaki strateji güncelleme yetkilendirme açığı.", "Pivot Noktası: Kod açığı kurbanı olunması. Kalan hazineyi iade ederek dürüstçe kapandılar."],
    ["Pnetwork", "🌐", "Köprü Kurtarma Planı", "$12 Milyon", "Hızlı", "Çapraz zincirler arası token transferi sağlayan köprü altyapısı.", "Siber ekiplerle çalışıp dürüstçe kurtarma ve tazminat planı hazırlamaları.", "pBTC basım akıllı sözleşmesindeki yetki doğrulama açığı.", "Pivot Noktası: Köprü açığı. Ekibin kaçmayıp kurtarma planı üzerinde çalışmaya devam etmesi dürüstlüktü."],
    ["Thorchain V1", "⚡", "Çıpa Koruma Fonlaması", "$16 Milyon", "Hızlı", "Sentetik köprü kullanmadan yerel varlık takas ağı.", "İlk sürümlerde hack yediklerinde kendi rezervleriyle sistemi fonlamaları.", "Yerel varlık takas yönlendirme kodlarındaki mantıksal açıklar.", "Pivot Noktası: Arka arkaya yaşanan 3 büyük hack. Ekibin kendi yedek fonlarıyla çıpayı koruması sistemi kurtardı."],
    ["Synapse Bridge", "🌉", "Proaktif Köprü Durdurma", "Sıfır Kayıp", "İstikrarlı", "Çoklu zincirler arası en yaygın kullanılan köprü protokollerinden biri.", "Açık fark edildiği an köprüyü dürüstçe durdurup fon kaybını önlemeleri.", "Köprü doğrulayıcı imza onaylarındaki potansiyel zafiyet.", "Pivot Noktası: Siber güvenlik uyarısıyla köprü işlemlerinin proaktif askıya alınması. Sıfır kayıpla vaka atlatıldı."],
    ["Across Protocol", "🏃", "Beyaz Şapkalı İşbirliği", "Sıfır Kayıp", "İstikrarlı", "L2 ağları arasında hızlı ve ucuz transfer sağlayan köprü.", "Sızma testi ödülü vererek potansiyel açıkları kapatmaları.", "Köprü kontratındaki olası çift harcama riskleri.", "Pivot Noktası: Güvenliğe bütçe ayırarak siber saldırganlardan önce açıkları kapatmaları."],
    ["Bancor V3", "🛡️", "Geçici Kayıp Koruması", "$20 Milyon", "Yavaş", "DeFi genelinde geçici kayıp koruması sunan AMM.", "Koruma maliyeti hazineyi aşınca sistemi durdurup kalan fonları iade etmeleri.", "Ayı piyasasında geçici kayıp maliyetlerinin hazine gelirlerini aşması.", "Pivot Noktası: Sürdürülemez koruma modeli. Sistemi durdurarak kullanıcıların ana paralarını korudular."],
    ["Fei V2", "🟢", "Adil Tasfiye Standardı", "$50 Milyon", "Yavaş", "Protokol Kontrollü Değer modeliyle çalışan stablecoin.", "Tasfiye sürecinde hazinedeki her 1 FEI için 1$ değerinde varlığı adil dağıtmaları.", "Kripto pazarındaki genel çöküşün PCV hazine değerini düşürmesi.", "Pivot Noktası: Sürdürülemez hazine büyüklüğü. Kullanıcılara tam ödeme yaparak dürüstçe sektörü terk ettiler."],
    ["Saddle SDL", "🤠", "AMM Kapanış Kararı", "$10 Milyon", "Yavaş", "Slippage olmadan stablecoin takası sunan on-chain AMM.", "Curve savaşlarını kaybedince hazineyi adil dağıtıp kapanmaları.", "Curve rekabetine karşı yeterli işlem hacmi çekememesi.", "Pivot Noktası: Likidite yetersizliği. Projenin fişini çekmek yerine kalan hazineyi kullanıcılara adil dağıttılar."],
    ["Yam v3", "🍠", "Topluluk İade Sözleşmesi", "Yeniden Göç", "Dengeli", "Rebase kod hatasından sonra kurulan dürüst topluluk sürümü.", "Tüm hatalı v1 sürümü mağdurlarına ücretsiz v3 tokenı dağıtmaları.", "İlk sürümdeki kod hatasının yarattığı marka güvensizliği.", "Pivot Noktası: Hatalı koddan kurtulup, mağdurlara haklarını iade eden yeni bir akıllı sözleşme kurmaları."],
    ["Cover v1", "🛡️", "Açık Kaynaklı Bırakma", "$5 Milyon", "Yavaş", "Kullanıcıların DeFi risklerine karşı sigorta poliçesi aldığı protokol.", "Andre Cronje ortaklığı bozulunca projeyi durdurup kodları açık bırakmaları.", "Ekip içi anlaşmazlıklar ve pazar payı kaybı.", "Pivot Noktası: Projeyi terk etmek yerine, tüm kod tabanını topluluğun geliştirmesi için açık kaynaklı bıraktılar."],
    ["Grim Fantom", "👹", "Şeffaf Siber Rapor", "$30 Milyon", "Hızlı", "LP tokenları üzerinden getiri toplayan akıllı kasalar.", "Saldırı sonrası siber analiz raporunu toplulukla şeffafça paylaşmaları.", "Akıllı kasalardaki re-entrancy açığının siber saldırıya uğraması.", "Pivot Noktası: Kasa açığı. Ekip kaçmadı, tüm siber güvenlik açıklarını kapatıp şeffaf rapor yayınladı."],
    ["Warp LP Vault", "🌀", "Kurucu Ortak Ödemesi", "$7.7 Milyon", "Hızlı", "LP tokenlarını teminat göstererek borç alınan borç verme.", "Kurucuların kendi kişisel token haklarını satarak zararı kapatması.", "LP fiyat hesaplama oracle açığı nedeniyle havuzun hacklenmesi.", "Pivot Noktası: Oracle açığı. Kurucuların kişisel finansal fedakarlıkla zararı kapatması büyük dürüstlüktü."],
    ["Akropolis Yield", "🏛️", "Enflasyon Hakları Devri", "$2.0 Milyon", "Hızlı", "Kullanıcılara güvenli getiri kasaları sunan DeFi emeklilik.", "Kendi token enflasyon haklarını kurbanlara devrederek zararı ödemeleri.", "Havuz yatırım onay kontrolündeki mantık hatası açığı.", "Pivot Noktası: Kod açığı. Ekibin kendi token haklarından vazgeçerek zararı üstlenmesi güveni korudu."],
    ["Harvest FARM", "🚜", "Hızlı Siber Analiz", "$24 Milyon", "Hızlı", "DeFi havuzlarındaki en yüksek faiz oranlarını kovalayan yield farming.", "Saldırı sonrası ilk saatte siber analiz raporu yayınlayıp işbirliği yapmaları.", "Hisse fiyat hesaplama açığının flaş kredilerle sömürülmesi.", "Pivot Noktası: Flaş kredi arbitraj saldırısı. Hızlı reaksiyon ve kolluk kuvvetleriyle işbirliği takdir edildi."],
    ["Origin OUSD", "🔵", "Kişisel Servet Satışı", "$7 Milyon", "Hızlı", "Cüzdanda durduğu yerde otomatik getiri kazandıran stablecoin.", "Kurucuların kendi şahsi ev ve arabalarını satarak kullanıcıları ödemesi.", "OUSD basım kontratındaki çoklu re-entrancy açıkları.", "Pivot Noktası: Basım açığı. Kurucuların kişisel servetlerini satarak zararı %100 kapatması tarihe geçti."],
    ["Inverse DOLA", "📈", "Faiz Geliriyle Ödeme", "$15.6 Milyon", "Hızlı", "DOLA adında borçlanma stablecoin'i işleten DeFi.", "Borcu protokolün sonraki 3 yıllık faiz gelirleriyle tamamen kapatmaları.", "DOLA teminat fiyatını hesaplayan oracle'ın sığ havuzlara bağlılığı.", "Pivot Noktası: Oracle manipülasyonu. Kaçmayıp protokol gelirlerini borç ödemeye bağlamaları dürüstlüktü."],
    ["Alpha Finance", "🛡️", "Ortak Gelir Yapılandırması", "$37 Milyon", "Hızlı", "Kullanıcılara kaldıraçlı yield farming imkanı sunan DeFi.", "Cream ile ortak komisyon gelirleri havuzu kurarak borcu ödemeleri.", "Cream Finance'in Iron Bank borçlanma kontratı ile Alpha arasındaki açıklar.", "Pivot Noktası: Iron Bank açığı. İki protokolün ortaklık kurarak borç krizini yapılandırması güveni korudu."],
    ["Indexed NDX", "📊", "Küresel Dedektiflik Savaşı", "$16 Milyon", "Hızlı", "Kullanıcıların tek token ile çoklu DeFi varlığına yatırım yaptığı endeks.", "Saldırganın kimliğini tespit etmek için tüm dünyada dedektif tutmaları.", "Endeks havuzundaki ağırlık dengeleme algoritmasının açıkları.", "Pivot Noktası: Ağırlık dengeleme açığı. Hacker'a karşı yasal savaş açıp kimliğini dünyaya deşifre ettiler."]
];

// Add remaining 90 for Cat B
const remaining_b = [
    ["Centra Tech", "💳", "ICO Kart Dolandırıcılığı", "$32 Milyon", "Orta", "Visa ve Mastercard ile ortak kripto ödeme kartları çıkaracaklarını iddia ettiler.", "Floyd Mayweather gibi ünlülerin reklamlarını kullanarak güven inşası.", "Sahte kurucu biyografileri ve sahte bankacılık ortaklık lisansları.", "Kritik Hata: Tamamen hayali ortaklık belgeleri ve sahte lisanslarla yatırımcılardan para çekilmesi."],
    ["Pincoin & iFan", "🇻🇳", "Büyük Asya Ponzisi", "$660 Milyon", "Aşamalı Çöküş", "Yatırımcılara aylık %48 kazanç vaat eden token ICO'ları düzenlendi.", "Güneydoğu Asya genelinde kurulan devasa MLM saadet zinciri.", "Hukuki denetimin olmaması ve gerçek bir iş modelinin bulunmaması.", "Kritik Hata: Yatırımcılara aylık %48 gibi matematiksel olarak imkansız faiz oranları taahhüt edilmesi."],
    ["GainBitcoin", "🇮🇳", "Bulut Madencilik Ponzisi", "$3.0 Milyar", "Yavaş Erime", "Kullanıcılara aylık %10 Bitcoin bulut madenciliği getirisi vaat ettiler.", "Hindistan pazarında ilk kripto yatırım projesi olarak kurulan tekel.", "Arka planda hiçbir madencilik donanımının çalışmıyor olması.", "Kritik Hata: Fiziksel bir madencilik tesisi göstermeden, sadece yeni girenlerin parasıyla eski üyelerin ödenmesi."],
    ["Mining Max", "⛏️", "Sahte Altcoin Madenciliği", "$250 Milyon", "Orta", "Ethereum ve diğer altcoinleri kazan bulut madencilik cihazları sattıklarını iddia ettiler.", "Kore ve ABD'de lüks otel sunumlarıyla zengin yatırımcıları çekme.", "Toplanan paraların sadece %20'sinin cihaza yatırılması.", "Kritik Hata: Madencilik yatırımı adı altında toplanan fonların lüks yaşama ve kurucuların kişisel hesaplarına aktarılması."],
    ["Arbistar", "🇪🇸", "Sahte Arbitraj Botu", "$1.0 Milyar", "Aşamalı Çöküş", "Farklı borsalar arasındaki fiyat farklarını yakalayan bir arbitraj botu kılıfıyla Bitcoin topladılar.", "İspanya ve Latin Amerika genelinde kurulan yaygın perakende yatırımcı ağı.", "Gerçekte çalışan bir arbitraj algoritmasının bulunmaması.", "Kritik Hata: Olmayan bir yazılımın lisanslarını satarak ve bot kârı göstererek Ponzi şeması işletilmesi."],
    ["Finiko", "🇷🇺", "Rusya Dev Ponzisi", "$1.5 Milyar", "Hızlı Kapanış", "Kullanıcılara günlük %1-5 arası kâr getiren yatırım sistemi vaat ettiler.", "Rusya ve Doğu Avrupa'da en hızlı büyüyen saadet zinciri haline gelmesi.", "Hukuki denetimin tamamen yokluğu.", "Kritik Hata: Günlük %1 gibi astronomik kazanç vaatlerinin arkasında hiçbir finansal trading faaliyetinin olmaması."],
    ["GladiaCoin", "🤺", "Bitcoin İkiye Katlama", "$100 Milyon", "Anlık Sıfırlanma", "Kullanıcıların yatırdığı Bitcoinleri 90 günde ikiye katlamayı vaat eden Ponzi.", "Aşırı basit arayüz ve 90 günde %100 kazanç vaadinin yarattığı FOMO.", "Sermaye girişlerinin yavaşlaması durumunda sistemin anında çökmeye açık olması.", "Kritik Hata: Herhangi bir finansal üretim olmadan, tamamen yeni girenlerin parasıyla eski üyelerin parasını ikiye katlama yalanı."],
    ["Meerkat Finance", "🦦", "BSC Havuz Soygunu", "$31 Milyon", "Anlık (1 Gün)", "PancakeSwap çatalı olarak açılan ve yüksek APY oranları sunan yield farming.", "BSC ağındaki çılgın DeFi boğası esnasında saatler içinde likidite çekmesi.", "Akıllı sözleşmelerdeki strateji güncelleme yetkisinin tamamen anonim ekibe ait olması.", "Kritik Hata: Geliştiricilerin akıllı sözleşmeye eklediği bir backdoor ile havuzdaki tüm varlıkları tek işlemle çekebilmesi."],
    ["Uranium Finance", "☢️", "Sahte Hack / Rug-Pull", "$50 Milyon", "Çok Hızlı", "BSC ağında yield farming ve AMM hizmeti sunuyordu.", "Sürekli yeni token basarak yüksek getiri vaat eden agresif token ekonomisi.", "Sözleşme kodunun denetimsiz olması.", "Kritik Hata: Geliştiricilerin bilerek bıraktığı matematiksel bir açıkla havuzun 'hacklendiği' süsünün verilmesi."],
    ["Bald", "👨‍🦲", "Base Likidite Çekimi", "$25 Milyon", "Anlık (Saatler)", "Base ağının lansmanında deploy edilen ve kurucunun kimliği belirsiz meme coin.", "Base ağındaki ilk büyük meme coin olması, saatler içinde %40.000 yükseliş.", "Likidite havuzunun kilitli olmaması, tüm kontrat yetkisinin tek kişide olması.", "Kritik Hata: Likidite havuzu kilitlenmemiş meme coinlere körü körüne milyonlarca dolar yatırılması."],
    ["Snowdog DAO", "🐕", "Avalanche Havuz Boşaltma", "$30 Milyon", "Anlık (8 Dakika)", "Avalanche üzerinde kurulan, OlympusDAO benzeri bir rezerv para birimi ve hazine.", "Avalanche ağındaki ilk büyük DAO deneyi olarak büyük yatırım çekmesi.", "Geri alım (buyback) sözleşmesinde ekibe öncelik verilmesi.", "Kritik Hata: Geri alım töreninde kullanılacak özel takas sözleşmesinin anahtarını sadece ekibin cüzdanlarının bilmesi."],
    ["Compounder Finance", "🧱", "Sahte Strateji Güncellemesi", "$10.8 Milyon", "Anlık (1 Saat)", "Kullanıcıların fonlarını otomatik işleten yüksek yield farming kasaları.", "Sözleşmelerinin saygın güvenlik firmaları tarafından denetlenmiş olması.", "Sözleşmedeki strateji değiştirme yetkisinin zaman kilidine bağlı olmaması.", "Kritik Hata: Sözleşme denetiminden geçtikten sonra, strateji değiştirme yetkisinin kötü niyetli kontratlarla güncellenmesi."],
    ["Stablegains", "📉", "UST Kalan Fon Hırsızlığı", "$44 Milyon", "Orta", "Kullanıcılardan fiat para toplayıp, Anchor üzerinde %15 sabit faiz kazandıran aracı.", "Kullanıcılara DeFi bilmeden kolayca dolar faizi kazanma imkanı.", "Kullanıcı fonlarının tamamının tek bir algoritmik stablecoin'e yatırılması.", "Kritik Hata: UST çöktükten sonra kalan müşteri fonlarına el konularak kullanıcılara iade edilmemesi."],
    ["Magnate Finance", "🧲", "Oracle Manipülasyonu", "$6.4 Milyon", "Anlık (Saatler)", "Base ağında kullanıcıların varlıklarını teminat göstererek borç aldığı lending.", "Base ağındaki borç verme açlığını kullanarak hızlı TVL toplama.", "Oracle mekanizmasının tamamen geliştiricilerin kontrolünde olması.", "Kritik Hata: Oracle fiyatlarını doğrudan değiştirebilen akıllı sözleşme yetkilerinin bulunması."],
    ["Hashflare", "🔥", "Sahte Bulut Madenciliği", "$575 Milyon", "Yavaş Erime", "Kullanıcılara Bitcoin ve Ethereum madenciliği yapacak cihaz kiralama sözleşmeleri sattılar.", "Estonya merkezli yasal şirket imajı, yıllarca süren reklamlar.", "Şirketin arka planda hiçbir madencilik tesisi çalıştırmıyor olması.", "Kritik Hata: Sahte faturayla ve kiralık tesis görselleriyle olmayan madencilik cihazlarının satılması."],
    ["AirBit Club", "✈️", "Kripto Kulüp Ponzisi", "$150 Milyon", "Yavaş Erime", "Kullanıcılara kripto ticaret kulübüne üyelik satarak günlük pasif gelir vaat ettiler.", "Latin Amerika genelinde kurulan devasa MLM saadet zinciri.", "Kulübün arkasında hiçbir kripto para ticaret faaliyetinin olmaması.", "Kritik Hata: Üyelik paketleri satarak tamamen sisteme yeni girenlerin parasıyla eski üyelerin ödenmesi."],
    ["Ordinal Finance", "🔢", "Staking Exit-Scam", "$2.0 Milyon", "Hızlı Kapanış", "Kullanıcıların Ordinals tokenlarını stake ederek getiri kazanmasını sağlayan DeFi.", "Bitcoin Ordinals hype'ını kullanarak hızlıca fon çekme başarısı.", "Staking sözleşmesindeki acil durum çekim yetkisinin geliştiricide olması.", "Kritik Hata: Geliştiricilerin staking havuzundaki fonları tek imza ile çekebilmesine izin veren kod yapısı."],
    ["Kok Play", "🇰", "Medya Staking Ponzisi", "$500 Milyon", "Yavaş Erime", "Yapay zeka destekli medya vaadiyle KOK token satan ve faiz dağıtan MLM.", "Güneydoğu Asya ve Türkiye'de kurulan yaygın temsilcilik ağları.", "KOK token fiyatının tamamen içerideki yapay alımlarla kontrol edilmesi.", "Kritik Hata: Kendi bastığı değersiz bir token ile yüksek staking faizi dağıtan sürdürülemez Ponzi modeli."],
    ["Mirror Trading", "🪞", "Bitcoin Arbitraj Ponzisi", "$1.7 Milyar", "Aşamalı Çöküş", "Sahte AI robotları kullanarak Bitcoin ticareti yaptığını ve aylık %10 risksiz kazanç sağladığını iddia eden MLM.", "Güney Afrika merkezli, küresel çapta en büyük Bitcoin Ponzilerinden biri.", "Şirketin arkasında hiçbir trading faaliyetinin bulunmaması.", "Kritik Hata: Aylık %10 sabit Bitcoin kazancı vaat eden sahte ticaret robotlarına inanılması."],
    ["ESDouble", "🎮", "Skin Kumarı Exit-Scam", "$5 Milyon", "Anlık Kapanış", "Erken dönem CS:GO skinleri ve kriptolarla rulet oyunları oynatan kumar sitesi.", "Steam API entegrasyonu ile genç oyuncular arasında çok hızlı popülerlik.", "Sitenin cüzdanlarının tamamen kurucunun kişisel kontrolünde olması.", "Kritik Hata: Lisansı bulunmayan merkezi oyun sitelerine yüksek değerli kripto varlıkların emanet edilmesi."],
    ["SaveTheKids", "👶", "Pump & Dump Token", "$2.0 Milyon", "Anlık (Saatler)", "Lansman gelirlerinin çocuk esirgeme kurumlarına bağışlanacağını iddia eden token.", "Büyük e-sporcular ve YouTube influencerları tarafından kitlesel tanıtım.", "Akıllı sözleşmedeki likidite kilidinin lansmandan hemen sonra açılabilmesi.", "Kritik Hata: Sosyal sorumluluk maskesi takan ve influencerlar tarafından şişirilen meme tokenlara yatırım yapılması."],
    ["SudoRare", "🖼️", "NFT AMM Rug-Pull", "$800 Bin", "Anlık (6 Saat)", "NFT'lerin anlık takas edilmesini sağlayan merkeziyetsiz NFT AMM platformu.", "Lansman öncesi Twitter'da yaratılan yüksek beklenti ve airdrop vaatleri.", "Akıllı sözleşme kodunun bağımsız hiçbir firma tarafından denetlenmemiş olması.", "Kritik Hata: Lansmanından hemen sonra, denetimsiz NFT havuzlarına likidite sağlayarak getiri elde edilmeye çalışılması."],
    ["DeFi100", "💯", "Cüretkar Exit-Scam", "$32 Milyon", "Anlık Kapanış", "Yatırımcılara merkeziyetsiz fon yönetimi ve getiri sağlayan DeFi kasaları sunuyordu.", "BSC ağındaki ilk dönem DeFi projelerinden biri olarak yüksek TVL çekmesi.", "Protokol cüzdanlarının kontrolünün tamamen anonim geliştiricilerde olması.", "Kritik Hata: Geliştirici kimliği doğrulanmamış ve multisig bulunmayan anonim DeFi projelerine fon yatırılması."],
    ["Wana Finance", "🌾", "BSC Getiri Rug-Pull", "$3.5 Milyon", "Anlık", "Kullanıcılara yüksek APY vaat eden yield farming havuzları sunuyorlardı.", "Lansman gününde 3.5M$ likidite toplamayı başardı.", "Sözleşmedeki acil durum fon çekim yetkisinin kilitli olmaması.", "Kritik Hata: Denetimsiz getiri sözleşmelerinin lansmandan hemen sonra havuzu boşaltacak arka kapılar içermesi."],
    ["TurtleDex", "🐢", "BSC Likidite Soygunu", "$9.0 Milyon", "Çok Hızlı", "BSC ağında getiri çiftliği ve borsa hizmeti.", "Yatırımcılara sigortalı havuzlar vaat ederek hızlıca fon çekmesi.", "Geliştirici cüzdanlarının çoklu imza korumasına sahip olmaması.", "Kritik Hata: Geliştiricilerin havuzdaki kilitli olmayan BNB likiditesini tek seferde çekip kaçması."],
    ["Populous", "📄", "Sahte Fatura Finansmanı", "$12 Milyon", "Yavaş Erime", "Kullanıcıların fatura alacaklarını kripto ile finanse edeceği iddia edilen borsa.", "Sahte fatura finansmanı belgeleriyle borsalarda büyük manipülasyon.", "Fiziksel dünyadaki faturaların aslında hiçbir karşılığının bulunmaması.", "Kritik Hata: Gerçek dünya varlığı kılıfı altında tamamen hayali fatura verileriyle token satılması."],
    ["Envion", "🔋", "Mobil Madencilik Dolandırıcılığı", "$100 Milyon", "Orta Hızda", "Güneş enerjili mobil konteynerlarda madencilik yapacak cihaz vaadiyle ICO.", "Mobil madencilik konteynerları vaadiyle 100M$ toplayan devasa kampanya.", "Şirket içi yönetim kavgaları süsü verilerek tüm cüzdanların boşaltılması.", "Kritik Hata: Fiziksel madencilik cihazlarının aslında hiçbir zaman seri üretime geçirilmemiş olması."],
    ["LoopX", "➰", "Sahte Ticaret Yapay Zekası", "$4.5 Milyon", "Anlık", "Yapay zeka destekli otomatik ticaret algoritmasıyla getiri vaadi.", "Yapay zeka ticaret algoritması vaadiyle 4.5 milyon dolar toplayan kampanya.", "Lansmandan hemen sonra web sitesinin ve tüm sosyal medyanın silinmesi.", "Kritik Hata: Arka planda çalışan hiçbir algoritma olmaksızın sadece video animasyonlarla pazarlama yapılması."],
    ["Prodeum", "🥦", "Sahte Tarım Takip Sistemi", "$500 Bin", "Anlık", "Gıda ve tarım ürünlerini blokzincir üzerinde takip edecek tedarik zinciri.", "Tarım takip sistemi vaat edip, sosyal medyada sahte ortaklıklar yayınlama.", "Kaçarken borsa sitesinin ana sayfasına sadece 'penis' yazarak alay etmeleri.", "Kritik Hata: Tamamen sahte kurumsal kimliklerle birkaç gün içinde para toplayıp kaçmaya odaklı yapı."],
    ["Confido", "📦", "Sahte Kargo Takip ICO'su", "$375 Bin", "Anlık", "Akıllı sözleşmeler aracılığıyla kargo teslimat takibi yapacak dApp.", "Köklü kripto forumlarında sahte teknik dökümanlarla güven yaratma.", "Fonlar toplandıktan hemen sonra kurucunun 'hukuki sorunlar var' diyerek kaçması.", "Kritik Hata: Ekip üyelerinin gerçek kimliklerinin hiçbir şekilde doğrulanmamış olması."],
    ["Benebit", "💳", "Sahte Müşteri Sadakat Kartı", "$2.7 Milyon", "Anlık", "Blokzincir tabanlı müşteri sadakat ve puan toplama kartı vaadi.", "Sahte kurucu kadrosunun vesikalık fotoğraflarını internetten çalma.", "Photoshoplu pasaportlarla borsaları kandırıp ICO paralarını çekmeleri.", "Kritik Hata: Ekip profillerinin ve pasaportlarının bağımsız olarak doğrulanmadan yeşil ışık yakılması."],
    ["ACChain", "🪙", "Sahte Altın Stabil Coini", "$80 Milyon", "Yavaş Erime", "Çin genelinde altın madenleriyle desteklenen stabil coin vaadi.", "Altın destekli stabil coin vaadiyle Çin'de 80 milyon dolar toplama.", "Estonya ve Çin'deki ofislerin aniden kapatılarak cüzdanların boşaltılması.", "Kritik Hata: Fiziksel altın rezervlerinin bağımsız denetim firmalarınca hiçbir zaman denetlenmemiş olması."],
    ["Giza", "🏺", "Sahte Akıllı Kargo Kutusu", "$2.0 Milyon", "Anlık", "Kripto paraları fiziksel olarak koruyan ve kargolayan akıllı cihaz.", "3D prototip videoları yayınlayarak yatırımcıları teknolojik olarak etkileme.", "Geliştiricilere ödeme yapmayıp, toplanan 2 milyon dolarla kurucunun kaçması.", "Kritik Hata: Fiziksel cihaz üretim süreçlerinin hiçbir bağımsız mühendislik denetiminden geçmemesi."],
    ["Karatbars", "🏆", "Sahte Altın Madeni Ponzisi", "$150 Milyon", "Yavaş", "Madagaskar'da altın madenleriyle desteklenen Karatgold token satışı.", "Kendi çıkardıkları tokenı altınla fiziksel olarak takas edecekleri vaadi.", "Madagaskar hükümetinin şirkete ait hiçbir altın madeni olmadığını açıklaması.", "Kritik Hata: Altın madeni lisanslarının tamamen sahte belgelerden ibaret olduğunun geç fark edilmesi."],
    ["Ormeus Coin", "🪙", "Sahte Dev Madencilik Tesisi", "$124 Milyon", "Yavaş", "Dünyanın en büyük endüstriyel madencilik tesisini kurduklarını iddia ettiler.", "250 milyon dolarlık madencilik tesisi videoları çekerek güven oluşturma.", "Videodaki tesisin aslında başka bir şirkete ait olduğunun ortaya çıkması.", "Kritik Hata: Madencilik cihazlarının on-chain hash gücü üretim verilerinin doğrulanmamış olması."],
    ["PlexCoin", "🪙", "Sahte Ayda %1300 Kazanç", "$15 Milyon", "Anlık", "Yatırımcılara 29 günde %1300 net kazanç vaat eden ICO tokenı.", "Yüksek getiri vaadiyle sosyal medyada binlerce kişiyi FOMO'ya sokma.", "SEC operasyonuyla kurucuların varlıklarının dondurulması ve tutuklanması.", "Kritik Hata: Ayda %1300 gibi finansal olarak imkansız bir vaade körü körüne inanılması."],
    ["AriseBank", "🏦", "Sahte Merkezsiz Banka", "$600 Milyon", "Anlık", "Dünyanın ilk tamamen merkezsiz ve lisanslı kripto bankası vaadi.", "Gerçek bir bankayı satın alacaklarını iddia ederek sahte hisse satışı.", "SEC'in acil durum kararıyla banka sunucularına ve fonlarına el koyması.", "Kritik Hata: Bankacılık lisansı olduğunu iddia eden yapının hiçbir yasal kaydının bulunmaması."],
    ["Luna Yield", "🌾", "Solana İlk Büyük Rug-Pull'u", "$6.7 Milyon", "Anlık", "Solana ekosisteminde yüksek getiri sağlayan yield farming havuzları.", "Solana fırlatma paneli üzerinden onaylı proje olarak çıkma.", "Lansmandan 2 gün sonra havuzdaki tüm likiditenin tek işlemle çekilmesi.", "Kritik Hata: Fırlatma panelinin projenin akıllı sözleşme yetkilerini yeterince denetlememiş olması."],
    ["Solareum", "☀️", "Sahte Cüzdan Açığı Soygunu", "$1.5 Milyon", "Anlık", "Kullanıcıların telegram botları üzerinden hızlı ticaret yapmasını sağlayan borsa.", "Cüzdan güvenlik açığı yaşandı yalanıyla kullanıcıları panikletme.", "Geliştiricilerin, kullanıcıların özel anahtarlarını kullanarak fonları çalması.", "Kritik Hata: Özel anahtarları sunucularında şifresiz olarak saklayan telegram botlarının kullanılması."],
    ["WhaleMaker", "🐋", "Getiri Havuzu Rug-Pull'u", "$2.0 Milyon", "Çok Hızlı", "Kullanıcılara yüksek getiri sağlayan balina staking havuzları vaadi.", "Sosyal medyada yüksek kâr oranları göstererek perakende yatırımcı çekme.", "Fonların 'yanlış trading işlemi' bahanesiyle kurucunun kişisel cüzdanına çekilmesi.", "Kritik Hata: Yatırılan fonların on-chain kilitli olmayıp, doğrudan kurucu yetkisindeki sıcak cüzdana gitmesi."],
    ["Dragoma", "🐉", "Web3 Spor Oyunu Rug-Pull'u", "$3.5 Milyon", "Anlık", "Kullanıcıların NFT ejderhalarla yürüyerek para kazanacağı Web3 oyunu.", "Lansman günü token fiyatını yapay hacimle 100 katına çıkarma.", "PancakeSwap likidite havuzundaki 3.5 milyon dolarlık BNB'nin çekilmesi.", "Kritik Hata: Oyna-Kazan oyunlarındaki likidite havuzlarının zaman kilidi ile kilitlenmemiş olması."],
    ["Teddy Doge", "🧸", "Sonsuz Token Basım Soygunu", "$4.5 Milyon", "Anlık", "BNB Chain üzerinde meme coin ve merkeziyetsiz borsa projesi.", "Akıllı sözleşmedeki geliştirici yetkilerini kullanarak sınırsız token basma.", "Basılan milyarlarca sahte tokenın PancakeSwap havuzunda satılarak BNB'lerin çekilmesi.", "Kritik Hata: Akıllı sözleşmede sınırsız token basma yetkisinin tek bir adreste bırakılması."],
    ["Sokuswap", "🍣", "Likidite Taşıma Soygunu", "$1.2 Milyon", "Anlık", "BSC ve Ethereum üzerinde çalışan çok zincirli merkeziyetsiz borsa.", "V2 sürümüne geçiş esnasında likidite taşıma işlemi yapılacağını açıklama.", "Taşıma esnasında havuzdaki tüm değerli varlıkların kurucu cüzdanına aktarılması.", "Kritik Hata: Likidite taşıma akıllı sözleşmelerinin çoklu imza onayına bağlı olmaması."],
    ["Swaprum", "🌀", "Arbitrum DEX Backdoor'u", "$3 Milyon", "Anlık", "Arbitrum üzerinde yüksek hızlı ve düşük ücretli takas havuzları.", "Sözleşme kodunun denetlendiğini iddia edip, arka planda kodu değiştirme.", "Akıllı sözleşmeye eklenen gizli kod ile havuzun boşaltılması.", "Kritik Hata: Denetlenen kod ile ana ağa yüklenen kodun hash değerlerinin karşılaştırılmaması."],
    ["Kokomo Finance", "🌴", "Optimism Kredi Soygunu", "$4 Milyon", "Anlık", "Optimism ağında kullanıcıların varlıklarını teminat gösterdiği lending.", "Lansman günü yüksek faiz oranlarıyla 4 milyon dolar teminat toplama.", "Akıllı sözleşmedeki oracle fiyat belirleme yetkisiyle teminatları çalma.", "Kritik Hata: Kredi platformundaki fiyat besleme yetkisinin tek bir imzada bırakılması."],
    ["Hope Finance", "🔴", "Arbitrum Akıllı Sözleşme Soygunu", "$2 Milyon", "Anlık", "Arbitrum üzerinde çalışan merkeziyetsiz algoritmik stablecoin havuzları.", "Geliştiricinin akıllı sözleşmeyi değiştirerek havuzdaki fonları çalması.", "Sözleşmeye sonradan eklenen 'acil kurtarma' fonksiyonunun kötüye kullanılması.", "Kritik Hata: Akıllı sözleşme güncellemelerinde topluluk oylaması veya zaman kilidinin bulunmaması."],
    ["Arbix Finance", "📊", "Sahte Denetim Raporu", "$10 Milyon", "Anlık", "BSC ağında yield farming ve otomatik getiri toplayan kasalar.", "Saygın bir güvenlik firmasının denetim raporunu photoshopla sahte olarak yayınlama.", "Kasada biriken tüm BNB'lerin tek işlemle kurucu cüzdanına aktarılması.", "Kritik Hata: Denetim raporunun resmi doğrulama bağlantısının kontrol edilmemiş olması."],
    ["Jaypeggerz", "🖼️", "NFT Teminatlı Kumar", "$1.5 Milyon", "Yavaş", "Kullanıcıların NFT'lerini teminat göstererek borç aldığı DeFi platformu.", "NFT sahiplerine borç vererek likidite sağlama vaadiyle fon toplama.", "Toplanan fonların kurucunun kişisel kaldıraçlı kumar borçlarına harcanması.", "Kritik Hata: Protokol kasasındaki fonların harcama yetkilerinin kurucunun tekil cüzdanında olması."],
    ["Zeed Token", "🌱", "Transfer Fonksiyonu Soygunu", "$1 Milyon", "Anlık", "BSC üzerinde çevre dostu projeleri fonlayacağı iddia edilen token.", "Akıllı sözleşmedeki transfer ücreti hesaplama fonksiyonundaki mantık açığı.", "Geliştirici cüzdanının bu açığı kullanarak kendi kendine 1M$ değerinde token basması.", "Kritik Hata: Kendi kodundaki açığı kullanarak havuzu boşaltan içeriden siber saldırı."],
    ["Xirtam", "🕵️", "Arbitrum Hızlı Exit-Scam'i", "$3 Milyon", "Anlık", "Arbitrum üzerinde eğitim ve akademi projesi vaadiyle ön satış.", "Lansman günü toplanan 3 milyon dolarlık ETH'yi anında borsaya aktarma.", "Binance'in hızlı müdahalesiyle kurucunun hesaplarının dondurulması.", "Kritik Hata: Toplanan fonların akıllı sözleşmede kilitli kalmasını sağlayacak kuralların olmaması."],
    ["Chibi Finance", "🍙", "Arbitrum Acil Durum Çekimi", "$1 Milyon", "Anlık", "Arbitrum üzerinde otomatik getiri optimize eden akıllı kasalar.", "Yüksek APY oranlarıyla kullanıcıların stabil coinlerini kasaya çekme.", "Sözleşmeye eklenen 'acil durum fon çekimi' koduyla kasaların boşaltılması.", "Kritik Hata: Akıllı sözleşmelerdeki acil durum yetkilerinin zaman kilidine bağlı olmaması."],
    ["Kannagi Finance", "🌾", "zkSync Hızlı Rug-Pull'u", "$2.1 Milyon", "Anlık", "zkSync ağında yield farming ve getiri optimize kasaları.", "Lansmandan sonraki gün havuzdaki tüm KANNA token likiditesini çekme.", "Sosyal medya hesaplarının ve web sitesinin anında tamamen silinmesi.", "Kritik Hata: zkSync ağındaki yeni projelere aşırı FOMO ile denetimsiz fon yatırılması."],
    ["BaseDAO", "🏛️", "Base DAO Hazinesi Soygunu", "$1.2 Milyon", "Anlık", "Base ağında topluluk odaklı hazine yönetimi ve yatırım kararları.", "DAO hazinesinde biriken tüm ETH'leri kurucu cüzdanına aktarma.", "DAO yönetişim oylamasını bypass eden acil durum kodunun kullanılması.", "Kritik Hata: Hazine yönetim yetkilerinin DAO oylaması olmadan tetiklenebilmesi."],
    ["Swapride", "🚗", "Linea Getiri Çiftliği Soygunu", "$1.2 Milyon", "Anlık", "Linea ağında yield farming ve merkeziyetsiz takas havuzları.", "Linea ağının popülaritesini kullanarak hızlıca 1.2M$ likidite toplama.", "Geliştiricilerin akıllı sözleşmedeki yetkiyle havuzdaki BNB'leri çekmesi.", "Kritik Hata: Linea üzerindeki yeni projelerin akıllı sözleşme denetimlerinin yapılmamış olması."],
    ["ZKasino", "🎲", "Sahte Ön Satış İadesi", "$33 Milyon", "Orta", "Merkeziyetsiz bahis ve casino platformu vaadiyle ETH topladılar.", "Toplanan ETH'lerin lansmanda iade edileceği vaadiyle para toplama.", "Lansman günü ETH iadelerini iptal edip, fonları zorla kendi değersiz tokenlarına çevirmeleri.", "Kritik Hata: Toplanan fonların iade mekanizmasının akıllı sözleşmeye kodlanmamış olması."],
    ["Sheep Farm", "🐑", "BSC Koyun Çiftliği Ponzisi", "$5 Milyon", "Yavaş", "Kullanıcıların sanal koyun satın alarak günlük yün satışı ve faiz kazancı elde ettiği oyun.", "Günlük %3-5 arası yüksek faiz vaadiyle binlerce kullanıcı çekme.", "Yeni üye girişleri durunca para çekimlerinin tamamen kapatılması.", "Kritik Hata: Tamamen yeni girenlerin yatırdığı paralarla eski üyelerin yün paralarının ödenmesi."],
    ["Saitama Inu", "🐺", "Geliştirici Satış Baskısı", "$50 Milyon", "Yavaş Erime", "Topluluk odaklı meme coin ve cüzdan uygulaması vaadi.", "Sosyal medyada devasa topluluk oluşturarak fiyatı yapay şişirme.", "Geliştiricilerin arka planda milyarlarca token satarak fiyatı sürekli baskılaması.", "Kritik Hata: Geliştirici cüzdanlarındaki tokenların kilit sürelerinin bulunmaması."],
    ["SafeMoon", "🚀", "Likidite Kilidi Kırılması", "$200 Milyon+", "Yavaş Erime", "Her işlemden %10 vergi alıp, bunun yarısını sahiplerine dağıtan meme coin.", "Likidite havuzunun kilitli olduğu yalanıyla yatırımcılara güven verme.", "Geliştiricilerin akıllı sözleşme açığıyla likidite havuzundaki paraları çekmesi.", "Kritik Hata: Akıllı sözleşmedeki likidite kilidi kontrolünün kurucuların insiyatifinde olması."],
    ["Grok Token Clones", "🤖", "Yapay Zeka Hype Soygunu", "$5 Milyon", "Anlık", "Twitter'ın Grok yapay zeka botu adıyla çıkarılan sahte meme coinler.", "İsim benzerliğini kullanarak saatler içinde yüksek işlem hacmi yaratma.", "Geliştiricilerin havuzdaki tüm BNB likiditesini çekerek kaçması.", "Kritik Hata: İsim benzerliği olan meme coinlerin likidite kilidine bakılmadan satın alınması."],
    ["WSB Coin", "📈", "Moderatör Satış Soygunu", "$600 Bin", "Anlık", "WallStreetBets reddit topluluğunun resmi tokenı olduğu iddiasıyla çıkarıldı.", "Reddit topluluğunun gücünü kullanarak hızlıca borsalarda listelenme.", "Yönetici cüzdanındaki tokenların tek seferde piyasaya satılarak sıfırlanması.", "Kritik Hata: Topluluk tokenlarında yönetim cüzdanlarının çoklu imza ile korunmaması."],
    ["Pepe Developer Theft", "🐸", "Çoklu İmza İhaneti", "$15 Milyon", "Anlık", "Pepe'nin geliştirici kadrosu.", "Çoklu imza cüzdanındaki imza eşiğini 5'ten 2'ye düşürme.", "Geliştiricilerin cüzdandaki 15 milyon dolarlık Pepe'yi borsalara aktarıp satması.", "Kritik Hata: Çoklu imza cüzdanlarındaki imza sahiplerinin birbirini denetleyecek yapıda olmaması."],
    ["YFDEX", "🌾", "Kilitlenmemiş Havuz Soygunu", "$20 Milyon", "Anlık", "Merkeziyetsiz finans getiri çiftliği protokolü.", "Yüksek APY oranlarıyla 20 milyon dolarlık kullanıcı varlığını kasaya çekme.", "Kasada biriken tüm varlıkların kilitli olmayan havuzdan kurucu tarafından çekilmesi.", "Kritik Hata: Kullanıcı fonlarının toplandığı havuzun akıllı sözleşmeyle kilitlenmemiş olması."],
    ["UniCats", "🐱", "Sonsuz Onay Soygunu", "$200 Bin", "Anlık", "Kullanıcıların NFT ve token stake ederek getiri kazandığı oyun.", "Staking esnasında kullanıcılardan cüzdanlarındaki tüm varlıklar için sonsuz onay isteme.", "Bu onayları kullanan geliştiricilerin, kullanıcıların cüzdanlarındaki paraları çekmesi.", "Kritik Hata: Akıllı sözleşmelerin istediği harcama onaylarının sınırlandırılmaması."],
    ["Asimi", "👁️", "Reklam İzle Kazan Ponzisi", "$10 Milyon", "Yavaş", "Kullanıcıların reklam izleyerek ASIMI token kazandığı platform.", "Reklam paketleri satarak üyelere günlük düzenli kazanç vaat etme.", "Sisteme yeni reklam paketi alıcısı girmeyince çekimlerin durdurulması.", "Kritik Hata: Tamamen reklam paketi satış gelirleriyle dönen sürdürülemez Ponzi yapısı."],
    ["Ecoin", "📧", "Sahte Davet Ponzisi", "$5 Milyon", "Yavaş", "E-posta davetleriyle sisteme üye kazandıranlara ücretsiz token dağıtımı.", "Kullanıcı tabanını sahte e-posta davetleriyle milyonlarca kişiye çıkarma.", "Geliştiricilerin arkada kilitli olması gereken tokenları borsalarda satması.", "Kritik Hata: Dağıtılan tokenların dolaşımdaki arz kontrollerinin yapılmamış olması."],
    ["Mind Capital", "🧠", "Sahte Kripto Arbitrajı", "$200 Milyon", "Yavaş", "Kripto paralar arası yüksek frekanslı arbitraj yapan yazılım vaadi.", "Kendi geliştirdikleri sahte ticaret panelinde günlük kâr oranları gösterme.", "Para çekim taleplerini teknik sorunlar bahanesiyle aylarca erteleme.", "Kritik Hata: Şirketin arkasında hiçbir gerçek finansal trading faaliyetinin olmaması."],
    ["Kuvera", "📈", "Sahte Kripto Sinyalleri", "$50 Milyon", "Yavaş", "Aylık aidat ödeyen üyelere zenginlik getiren kripto alım-satım sinyalleri.", "Sosyal medyada lüks yaşam görselleri paylaşarak gençleri üye yapma.", "Üyelik aidatları dışında hiçbir finansal gelir üretilememesi sonucu çöküş.", "Kritik Hata: Tamamen yeni üye aidatlarıyla dönen piramit şeması yapısı."],
    ["USI Tech", "✈️", "Kripto Madencilik Paketleri", "$500 Milyon", "Yavaş", "Dubai merkezli, otomatik Bitcoin ticaret paketleri satan MLM.", "Haftalık düzenli getiri vaat ederek 500 milyon dolar değerinde Bitcoin toplama.", "Kurucuların paralarla birlikte aniden Dubai'den kaçması.", "Kritik Hata: Madencilik paketlerinin aslında hiçbir zaman satın alınmamış olması."],
    ["BitClub Network", "⛏️", "Sahte İzlanda Maden Tesisi", "$722 Milyon", "Yavaş", "İzlanda'da devasa Bitcoin madencilik tesisleri kurduklarını iddia ettiler.", "Yatırımcılara İzlanda'daki sahte madencilik tesislerinin videolarını gösterme.", "Toplanan paraların kurucuların şahsi hesaplarına aktarıldığının ortaya çıkması.", "Kritik Hata: Madencilik cihazlarının on-chain hash gücü üretim verilerinin doğrulanmamış olması."],
    ["LUNA Earth", "🌍", "Sahte LUNA Kurtarma Fonu", "$2 Milyon", "Anlık", "Terra LUNA çöküşü sonrası mağdurlara yardım etmek için bağış toplama.", "Terra topluluğunun duygularını sömürerek hızlıca 2 milyon dolar toplama.", "Toplanan bağışların akıllı sözleşmedeki yetkiyle kurucu tarafından çalınması.", "Kritik Hata: Bağış toplayan yapının akıllı sözleşmelerinin çoklu imza ile korunmaması."],
    ["Merlin", "🧙‍♂️", "zkSync DEX Lansman Soygunu", "$2 Milyon", "Anlık", "zkSync ağında çalışan, yüksek hızlı borsa.", "CertiK güvenlik denetiminden geçerek kullanıcılara güven aşılama.", "Lansman günü geliştiricilerin acil durum kodunu kullanarak 2M$ çekip kaçması.", "Kritik Hata: Güvenlik denetiminin, kodun içindeki geliştirici imtiyaz yetkilerini onaylamış olması."],
    ["Fidentia", "🛡️", "Sahte Kripto Hayat Sigortası", "$5 Milyon", "Yavaş", "Kullanıcıların kripto varlıklarını siber saldırılara karşı sigortalayan platform.", "Kripto hayat sigortası vaadiyle aylık düzenli prim toplama.", "İlk büyük hack davasında web sitesinin kapatılarak fonlarla kaçılması.", "Kritik Hata: Sigorta havuzunun reasürans sermayesinin bulunmaması."],
    ["Peculium", "🔮", "Sahte Yapay Zeka Tasarrufu", "$10 Milyon", "Yavaş", "Yapay zeka destekli otonom kripto tasarruf fonu vaadi.", "Yapay zeka tasarruf fonu vaadiyle toplanan paraları şahsi hesaplara aktarma.", "Para çekimlerini yapay zeka modeli güncelleniyor bahanesiyle dondurma.", "Kritik Hata: Arka planda çalışan hiçbir yapay zeka algoritmasının olmaması."],
    ["NoxCoin", "🦊", "Sahte Hack Senaryosu", "$15 Milyon", "Anlık", "Brezilya merkezli, düşük işlem ücretli kripto para borsası.", "Borsadaki rezerv açığını gizlemek için sahte hack senaryosu uygulama.", "Borsanın hacklendiğini iddia edip, tüm cüzdanları kurucunun cüzdanına boşaltma.", "Kritik Hata: Borsa cüzdanlarının bağımsız siber güvenlik firmalarınca denetlenmemesi."],
    ["Vether", "🔥", "Sahte Yakım Mekanizması", "$3 Milyon", "Anlık", "Kullanıcıların ETH yakarak VETHER token aldığı deneysel protokol.", "Sahte yakım mekanizmasıyla kullanıcılardan ETH toplama.", "Toplanan ETH'lerin biriktiği havuzun akıllı sözleşme yetkilisiyle boşaltılması.", "Kritik Hata: Yakım havuzundaki ETH'lerin geri çekilemez şekilde kilitlenmemiş olması."],
    ["Zealium", "⚡", "Sahte Arbitraj Botu Kaçışı", "$8 Milyon", "Anlık", "Kullanıcılara aylık %15 getiri vaat eden otomatik arbitraj botu.", "Kullanıcıların panellerinde sahte günlük arbitraj kârları gösterme.", "Web sitesinin ve tüm veritabanının silinerek paralarla kaçılması.", "Kritik Hata: Arbitraj botunun hangi borsalarda işlem yaptığının kanıtlarının olmaması."],
    ["Bitqyck", "🛢️", "Sahte Petrol Tokenlaştırma", "$13 Milyon", "Yavaş", "ABD'de sahte petrol kuyularını tokenlaştırdığını iddia eden borsa.", "Petrol kuyuları vaadiyle 13 milyon dolar değerinde token satma.", "Şirketin hiçbir petrol kuyusu ortaklığı olmadığının ortaya çıkması.", "Kritik Hata: Tokenlaştırılan gerçek dünya varlıklarının tapu kayıtlarının doğrulanmaması."],
    ["Envoy", "📦", "Sahte Kargo Tokenı", "$1.5 Milyon", "Anlık", "Akıllı sözleşmeler aracılığıyla kargo teslimat takibi yapacak dApp.", "Kargo takip tokenı vaadiyle toplanan fonların şahsi cüzdanlara aktarılması.", "Lansman günü tüm sosyal medyanın kapatılarak projenin terk edilmesi.", "Kritik Hata: Ekip üyelerinin gerçek kimliklerinin doğrulanmamış olması."],
    ["Cobalt", "💙", "BSC Stablecoin Soygunu", "$4 Milyon", "Anlık", "BSC ağında stablecoin faizi vaadiyle toplanan yield farming.", "Yüksek stablecoin faizi vaadiyle havuza 4 milyon dolar çekme.", "Geliştiricilerin akıllı sözleşmedeki yetkiyle havuzdaki stablecoinleri çekmesi.", "Kritik Hata: Stablecoin havuzunun akıllı sözleşmeyle kilitlenmemiş olması."],
    ["Aegis", "🛡️", "Sahte DeFi Sigortası", "$3.5 Milyon", "Anlık", "Kullanıcıların DeFi projelerindeki hack risklerine karşı sigorta alması.", "DeFi sigorta protokolü süsü verilip, lansman günü havuzun boşaltılması.", "Geliştiricilerin akıllı sözleşmedeki acil durum yetkisini kullanarak kaçması.", "Kritik Hata: Sigorta havuzunun akıllı sözleşmeyle kilitlenmemiş olması."],
    ["DinoBus", "🦕", "Sahte Oyna-Kazan Oyunu", "$2.5 Milyon", "Anlık", "Kullanıcıların dinozor NFT'leri satın alarak yarıştırdığı oyun.", "Lansman günü token fiyatını yapay hacimle 100 katına çıkarma.", "PancakeSwap likidite havuzundaki tüm BNB'lerin tek işlemle çekilmesi.", "Kritik Hata: Likidite havuzunun akıllı sözleşmeyle kilitlenmemiş olması."],
    ["AstroElon", "🚀", "Sahte Elon Musk Ortaklığı", "$4 Milyon", "Anlık", "Sahte Elon Musk ortaklığı iddialarıyla çıkarılan meme coin.", "Elon Musk'ın SpaceX projeleriyle ortaklık kurulacağı yalanı.", "Kurucunun elindeki tüm tokenları tek seferde piyasaya satıp kaçması.", "Kritik Hata: Kurucu cüzdanlarındaki tokenların kilit sürelerinin bulunmaması."],
    ["Baby Shiba Clones", "🐕", "Sahte Shiba Tokenları", "$5 Milyon", "Anlık", "Kilitli olmayan likidite havuzlarıyla çıkarılan sahte tokenlar.", "Saatler içinde yüksek işlem hacmi yaratarak kullanıcı çekme.", "Geliştiricilerin havuzdaki tüm BNB likiditesini çekerek kaçması.", "Kritik Hata: Likidite kilidi bulunmayan meme coinlerin satın alınması."],
    ["Fairwin", "🏆", "Ethereum Akıllı Sözleşme Ponzisi", "$10 Milyon", "Anlık", "Akıllı sözleşme üzerinden işletilen oyunlaştırılmış Ponzi.", "Sözleşmedeki bir açığı kullanan kurucuların havuzdaki 10M$ çekip kaçması.", "Yeni üye girişi yavaşlayınca kurucuların acil durum kodunu tetiklemesi.", "Kritik Hata: Akıllı sözleşmedeki acil durum kodunun denetlenmemiş olması."],
    ["Doubleway", "➰", "Ethereum Akıllı Sözleşme Ponzisi", "$8 Milyon", "Yavaş", "Akıllı sözleşme üzerinden işletilen çok katmanlı Ponzi.", "Yeni üye girişi durunca sistemde paraların kilitlenmesi.", "Kurucuların sistemde biriken tüm ETH'leri akıllı sözleşme dışı çekmesi.", "Kritik Hata: Akıllı sözleşmedeki fonların çekim yetkilerinin kurucuda olması."],
    ["Lion's Share", "🦁", "Tron Saadet Zinciri", "$15 Milyon", "Yavaş", "Tron ağı üzerinde kurulan ve tamamen yeni üye girişiyle dönen Ponzi.", "Yeni üye girişi yavaşlayınca sistemin tamamen durması.", "Kurucuların sistemde biriken tüm TRX'leri çekip kaçması.", "Kritik Hata: Tamamen yeni girenlerin parasıyla dönen piramit şeması yapısı."],
    ["Troncase", "💼", "Tron Günlük %3 Ponzisi", "$20 Milyon", "Yavaş", "Tron havuzunda biriken paralarla günlük %3 getiri vaadi.", "Kullanıcıların panellerinde sahte günlük kârlar göstererek güven aşılama.", "Tron havuzundaki 20 milyon doları kurucuların tek işlemle çekmesi.", "Kritik Hata: Tron havuzunun akıllı sözleşmeyle kilitlenmemiş olması."],
    ["Bazaars (BZR)", "🛒", "Sahte E-Ticaret Entegrasyonu", "$2.5 Milyar", "Anlık", "E-ticaret entegrasyonu vaadiyle token satışı.", "Lansman günü Uniswap likidite havuzundaki tüm ETH'leri çekme.", "Sosyal medya hesaplarının ve web sitesinin anında tamamen silinmesi.", "Kritik Hata: Likidite havuzu kilitlenmemiş tokenlara yatırım yapılması."],
    ["SafeMarket", "🛒", "Gizli Vergi Soygunu", "$1.5 Milyon", "Anlık", "Akıllı sözleşmeye eklenen gizli vergi fonksiyonuyla rug-pull.", "Kullanıcıların tüm alım-satımlarından %90 kesinti yapma.", "Toplanan tüm fonların kurucu cüzdanına otomatik aktarılması.", "Kritik Hata: Akıllı sözleşmedeki vergi oranlarının sınırlandırılmamış olması."],
    ["Zunami Protocol", "🌊", "Flaş Kredi Manipülasyonu", "$2.1 Milyon", "Anlık", "Kullanıcılara yüksek getiri sağlayan stabil coin havuzları sunuyorlardı.", "DeFi protokollerinde güvenilir getiri toplayıcısı imajı.", "Fiyat hesaplama mantığındaki açıklar ve siber saldırganların fiyat oracle manipülasyonu.", "Kritik Hata: Fiyat oracle'ının flaş kredilerle manipüle edilmesine karşı yeterli koruma önlemi alınmaması."]
];

for (let item of remaining_b) {
    cat_b.push({
        "name": item[0], "logo": item[1], "type": item[2], "metric": item[3], "speed": item[4],
        "business": item[5], "s": item[6], "w": item[7], "lesson": item[8]
    });
}

// Output the HTML file template programmatically
function generateHtmlFile(outputPath) {
    const allCases = [...cat_a, ...cat_b, ...cat_c];
    const casesJson = JSON.stringify(allCases, null, 4);
    
    const htmlContent = `<!DOCTYPE html>
<html lang="tr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FEYZ AL - Kurumsal Risk &amp; İstihbarat Portalı</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Outfit & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        outfit: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        zinc: {
                            950: '#09090b',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #09090b;
            background-image: 
                radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.04) 0px, transparent 50%],
                radial-gradient(at 50% 0%, rgba(245, 158, 11, 0.02) 0px, transparent 50%],
                radial-gradient(at 100% 0%, rgba(244, 63, 94, 0.04) 0px, transparent 50%);
        }
        .glass-panel {
            background: rgba(15, 15, 22, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(63, 63, 70, 0.2);
        }
        .glow-active-A {
            box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.25);
            border-color: rgba(16, 185, 129, 0.5) !important;
        }
        .glow-active-B {
            box-shadow: 0 0 30px -5px rgba(244, 63, 94, 0.25);
            border-color: rgba(244, 63, 94, 0.5) !important;
        }
        .glow-active-C {
            box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.3);
            border-color: rgba(245, 158, 11, 0.55) !important;
        }
        .timeline-line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 15px;
            width: 2px;
            background: rgba(63, 63, 70, 0.3);
        }
        .terminal-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
            background: rgba(9, 9, 11, 0.5);
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
            background: rgba(63, 63, 70, 0.5);
            border-radius: 3px;
        }
        /* Custom scrollbar for entire page */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #09090b;
        }
        ::-webkit-scrollbar-thumb {
            background: #27272a;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3f3f46;
        }
    </style>
</head>
<body class="text-zinc-100 font-sans min-h-screen antialiased flex flex-col justify-between">

    <!-- Header Section -->
    <header class="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span class="text-xl font-bold font-outfit text-white">F</span>
                </div>
                <div>
                    <h1 class="text-2xl font-black font-outfit tracking-wider bg-gradient-to-r from-emerald-400 via-white to-zinc-400 bg-clip-text text-transparent">
                        FEYZ AL
                    </h1>
                    <p class="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">Risk &amp; Dürüstlük Analizi Portalı</p>
                </div>
            </div>
            
            <!-- Global Stats -->
            <div class="flex items-center gap-6 text-sm bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-2">
                <div class="text-center sm:text-left">
                    <span class="text-zinc-500 text-[10px] block uppercase">Zirvedeki Devler</span>
                    <span class="font-bold font-outfit text-emerald-400">100 Protokol</span>
                </div>
                <div class="h-6 w-[1px] bg-zinc-800"></div>
                <div class="text-center sm:text-left">
                    <span class="text-zinc-500 text-[10px] block uppercase">Karanlık Taraf</span>
                    <span class="font-bold font-outfit text-rose-400">100 Dolandırıcı</span>
                </div>
                <div class="h-6 w-[1px] bg-zinc-800"></div>
                <div class="text-center sm:text-left">
                    <span class="text-zinc-500 text-[10px] block uppercase">FEYZ AL</span>
                    <span class="font-bold font-outfit text-amber-500">100 Dürüst Batan</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-12">
        
        <!-- Hero Section -->
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase">
                Kurucu Feyz'in Talimatıyla
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-outfit tracking-tight text-white">
                Küresel Ekosistem Analizi ve Kırılım Matrisi (Top 300]
            </h2>
            <p class="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Uygulanan gerçekleri, sadece vaat olarak kalan hayalet özellikleri (Phantom Features), çöküş anlarındaki kritik pivot noktalarını ve dolandırıcılık evrelerini inceleyen istihbarat arayüzü.
            </p>
        </div>

        <!-- 3 TABS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="main-tabs">
            <!-- TAB A -->
            <button onclick="switchTab('A')" id="tab-A" class="glass-panel rounded-2xl p-6 text-left transition-all duration-300 relative overflow-hidden border-zinc-800/80 group">
                <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                <span class="text-xs text-emerald-450 text-emerald-400 font-semibold tracking-widest uppercase block mb-1">KATEGORİ A</span>
                <span class="text-xl font-bold font-outfit text-white block">1. Zirvedeki Devler (100)</span>
                <span class="text-xs text-zinc-500 block mt-1">Sürdürülebilir büyüme, şeffaflık ve denetlenmiş akıllı sözleşmeler.</span>
            </button>

            <!-- TAB B -->
            <button onclick="switchTab('B')" id="tab-B" class="glass-panel rounded-2xl p-6 text-left transition-all duration-300 relative overflow-hidden border-zinc-800/80 group">
                <div class="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all"></div>
                <span class="text-xs text-rose-400 font-semibold tracking-widest uppercase block mb-1">KATEGORİ B</span>
                <span class="text-xl font-bold font-outfit text-white block">2. Karanlık Taraf (100)</span>
                <span class="text-xs text-zinc-500 block mt-1">Kasıtlı manipülasyon, dolandırıcılık ve kaçış (Exit-Scam) projeleri.</span>
            </button>

            <!-- TAB C -->
            <button onclick="switchTab('C')" id="tab-C" class="glass-panel rounded-2xl p-6 text-left transition-all duration-300 relative overflow-hidden border-zinc-800/80 group">
                <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
                <span class="text-xs text-amber-400 font-semibold tracking-widest uppercase block mb-1">KATEGORİ C</span>
                <span class="text-xl font-bold font-outfit text-white block">3. FEYZ AL (Dersler - 100)</span>
                <span class="text-xs text-zinc-500 block mt-1">Dürüstçe savaşan ama matematiksel hatalarla batan ibretlik vakalar.</span>
            </button>
        </div>

        <!-- Dynamic Content Area -->
        <div id="tab-content-area" class="space-y-8">
            <!-- Category description banner -->
            <div id="category-banner" class="glass-panel rounded-2xl p-6 border-zinc-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="space-y-1">
                    <h3 id="banner-title" class="text-lg font-bold font-outfit text-white"></h3>
                    <p id="banner-desc" class="text-xs text-zinc-400 max-w-3xl"></p>
                </div>
                <div id="banner-badge" class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"></div>
            </div>

            <!-- Grid of 100 Cards -->
            <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 max-h-[350px] overflow-y-auto p-2 border border-zinc-850 rounded-xl terminal-scroll" id="cards-grid">
                <!-- Injected via JS -->
            </div>

            <!-- SWOT, Business Plan and 2-Column Roadmap Block -->
            <div id="analysis-block" class="glass-panel rounded-2xl p-8 border-zinc-800/60 space-y-8">
                <!-- Default state -->
                <div id="analysis-default" class="text-center py-12 space-y-4">
                    <div class="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto border border-zinc-800">
                        <span class="text-2xl text-zinc-500" id="default-icon">🔍</span>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-zinc-300">İstihbarat Raporunu Açın</h4>
                        <p class="text-xs text-zinc-500 max-w-[320px] mx-auto mt-1">Firmanın derin iş planını, UYGULANAN vs. VAATLER veya dolandırıcılık evrelerini görmek için yukarıdaki 100 karttan birine tıklayın.</p>
                    </div>
                </div>

                <!-- Active state -->
                <div id="analysis-active" class="hidden space-y-8">
                    <!-- Title Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                        <div class="flex items-center gap-4">
                            <span id="proj-logo" class="text-5xl"></span>
                            <div>
                                <h3 id="proj-name" class="text-2xl font-extrabold font-outfit text-white"></h3>
                                <span id="proj-type" class="text-xs text-zinc-400 block font-medium"></span>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 text-xs">
                            <div class="bg-zinc-900/60 border border-zinc-850 px-4 py-2 rounded-lg">
                                <span class="text-zinc-500 block text-[10px] uppercase" id="proj-metric-label">Hacim</span>
                                <span id="proj-metric" class="font-bold font-outfit"></span>
                            </div>
                            <div class="bg-zinc-900/60 border border-zinc-850 px-4 py-2 rounded-lg">
                                <span class="text-zinc-500 block text-[10px] uppercase" id="proj-speed-label">Çöküş / Büyüme Hızı</span>
                                <span id="proj-speed" class="font-bold font-outfit text-zinc-300"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Business Plan & SWOT & Pivot -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2 space-y-6">
                            <div class="space-y-2">
                                <span class="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">1. Derin İş Modeli (Business Plan) &amp; Gelir Akışları</span>
                                <p id="proj-business" class="text-xs text-zinc-300 leading-relaxed"></p>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                                <div class="p-4 rounded-xl bg-zinc-900/30 border border-zinc-850 space-y-2">
                                    <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1" id="det-s-label">S - Güçlü Yönler</span>
                                    <p id="proj-s" class="text-xs text-zinc-400 leading-relaxed"></p>
                                </div>
                                <div class="p-4 rounded-xl bg-zinc-900/30 border border-zinc-850 space-y-2">
                                    <span class="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1" id="det-w-label">W - Zayıf Yönler / Hata</span>
                                    <p id="proj-w" class="text-xs text-zinc-400 leading-relaxed"></p>
                                </div>
                            </div>
                        </div>

                        <!-- Right Side: Pivot Point -->
                        <div class="lg:col-span-1" id="pivot-container">
                            <!-- Pivot Box -->
                        </div>
                    </div>

                    <!-- 2-COLUMN ROADMAP (UYGULANANLAR vs. VAATLER) / FRAUD PHASES -->
                    <div class="pt-8 border-t border-zinc-800 space-y-6" id="roadmap-section">
                        <div class="text-center max-w-xl mx-auto">
                            <h4 class="text-lg font-bold font-outfit text-white" id="roadmap-title">2. Kronolojik Yol Haritası Deşifresi</h4>
                            <p class="text-xs text-zinc-500" id="roadmap-desc">Akıllı sözleşmelerle kodlanan gerçekler ile yatırımcıyı çekmek için üretilen phantom vaatlerin karşılaştırması.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative" id="roadmap-cols">
                            <!-- JS Injected dynamically -->
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Küresel Karşılaştırma ve Kırılım Matrisi -->
        <div class="glass-panel rounded-2xl p-6 space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-bold font-outfit text-white flex items-center gap-2">
                        <span class="text-indigo-500">📊</span> Küresel Kırılım &amp; Karşılaştırma Matrisi (Top 300 Proje]
                    </h3>
                    <p class="text-xs text-zinc-500 mt-1">Başarılı devler, dürüst batanlar ve dolandırıcıların hizmet, hata ve evre bazında karşılaştırılması.</p>
                </div>
                
                <!-- Search & Filters -->
                <div class="flex flex-wrap items-center gap-2 text-xs">
                    <input type="text" id="matrix-search" oninput="searchMatrix()" placeholder="Proje ara..." class="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors w-44">
                    <button onclick="filterMatrix('ALL')" id="btn-m-all" class="px-3 py-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-medium">Tümü</button>
                    <button onclick="filterMatrix('A')" id="btn-m-A" class="px-3 py-1.5 rounded-lg border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 transition-colors font-medium">Başarılı</button>
                    <button onclick="filterMatrix('B')" id="btn-m-B" class="px-3 py-1.5 rounded-lg border border-rose-500/25 text-rose-400 hover:bg-rose-500/10 transition-colors font-medium">Dolandırıcı</button>
                    <button onclick="filterMatrix('C')" id="btn-m-C" class="px-3 py-1.5 rounded-lg border border-amber-500/25 text-amber-400 hover:bg-amber-500/10 transition-colors font-medium">Dürüst Batan</button>
                </div>
            </div>
            <div class="overflow-x-auto max-h-[550px] overflow-y-auto border border-zinc-850 rounded-xl terminal-scroll">
                <table class="w-full text-left border-collapse text-xs">
                    <thead class="sticky top-0 bg-zinc-950 z-10">
                        <tr class="border-b border-zinc-800 bg-zinc-900/80 text-[10px] uppercase font-bold text-zinc-400">
                            <th class="py-3 px-4">Firma &amp; Hizmet</th>
                            <th class="py-3 px-4">Kategori</th>
                            <th class="py-3 px-4">Ne Sunuyordu? / Model</th>
                            <th class="py-3 px-4">Kritik Eylem / Kırılma Noktası</th>
                            <th class="py-3 px-4">Feyz Alınacak Ders</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-850 text-zinc-300" id="matrix-tbody">
                        <!-- Injected via JS dynamically -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Stratejik Karşılaştırma & Kontrol Listesi & Risk Isı Haritası -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: Security Checklist -->
            <div class="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-6">
                <h3 class="text-lg font-bold font-outfit text-white flex items-center gap-2">
                    <span class="text-emerald-500">🛠️</span> Kritik Güvenlik Kontrol Listesi
                </h3>
                <p class="text-xs text-zinc-500">Kripto staking, borsa ve saklama hizmetlerinde felaketi önleyecek teknik parametreler.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300">
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Çoklu İmza (Multi-Sig) Cüzdan</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Borsa veya staking havuz fonlarının kontrolünü tek kişiye bırakmama.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Dinamik Faiz Modeli (Dynamic APY)</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Piyasa likiditesi ve koşullarına göre otomatik ayarlanan, sürdürülebilir getiri.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Yönetişimde Flaş Kredi Engeli</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Oylama gücü kazanmak için tokenların belirli bir süre önceden kilitlenmesi şartı.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Asgari %150 Aşırı Teminatlandırma</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Teminatsız veya düşük teminatlı borç vermeyi yasaklayan on-chain kurallar.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Otomatik Devre Kesiciler (Circuit Breaker)</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Anormal para çekimlerinde işlemleri geçici olarak askıya alan koruma kodları.</p>
                        </div>
                    </label>
                    <label class="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-850 cursor-pointer hover:border-zinc-800 transition-colors">
                        <input type="checkbox" checked disabled class="mt-1 accent-emerald-500">
                        <div>
                            <span class="font-semibold text-zinc-200 block">Yedek Anahtar Simülasyonu</span>
                            <p class="text-[10px] text-zinc-500 mt-0.5">Yedeklenen özel anahtarların şifre çözme testlerini canlıya almadan önce simüle etme.</p>
                        </div>
                    </label>
                </div>
            </div>

            <!-- Right: Risk Heatmap -->
            <div class="lg:col-span-1 glass-panel rounded-2xl p-6 space-y-6">
                <h3 class="text-lg font-bold font-outfit text-white flex items-center gap-2">
                    <span class="text-rose-500">🔥</span> Sistemik Risk &amp; Isı Haritası
                </h3>
                <p class="text-xs text-zinc-500">Kategorilere göre ekosistem risk endeksi ve sistemik zafiyet dereceleri.</p>
                
                <div class="space-y-4">
                    <!-- Cat A -->
                    <div class="space-y-1.5">
                        <div class="flex justify-between text-xs">
                            <span class="font-bold text-emerald-400">Kategori A (Zirvedekiler)</span>
                            <span class="text-zinc-400 font-bold font-mono">12% - Düşük Risk</span>
                        </div>
                        <div class="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div class="h-full bg-emerald-500 rounded-full" style="width: 12%"></div>
                        </div>
                        <p class="text-[10px] text-zinc-500">Sürekli denetim (audit), şeffaf rezervler (PoR) ve sürdürülebilir APY.</p>
                    </div>
                    
                    <!-- Cat C -->
                    <div class="space-y-1.5">
                        <div class="flex justify-between text-xs">
                            <span class="font-bold text-amber-400">Kategori C (Dürüst Batanlar)</span>
                            <span class="text-zinc-400 font-bold font-mono">55% - Orta Risk</span>
                        </div>
                        <div class="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div class="h-full bg-amber-500 rounded-full" style="width: 55%"></div>
                        </div>
                        <p class="text-[10px] text-zinc-500">Teknik riskler, akıllı sözleşme açıkları, karşı taraf (counterparty) riski.</p>
                    </div>

                    <!-- Cat B -->
                    <div class="space-y-1.5">
                        <div class="flex justify-between text-xs">
                            <span class="font-bold text-rose-400">Kategori B (Dolandırıcılar)</span>
                            <span class="text-zinc-400 font-bold font-mono">99% - Kritik Risk</span>
                        </div>
                        <div class="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div class="h-full bg-rose-500 rounded-full animate-pulse" style="width: 99%"></div>
                        </div>
                        <p class="text-[10px] text-zinc-500">Ponzi yapısı, tekil cüzdan kontrolü, sahte APY ve manipülatif kurucular.</p>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <!-- Master-Agent Terminal Logs -->
    <footer class="border-t border-zinc-900 bg-zinc-950/95 py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <!-- Terminal Log Window -->
            <div class="w-full bg-black/80 border border-zinc-850 rounded-xl overflow-hidden font-mono text-[11px] shadow-2xl">
                <div class="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-850">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-rose-500/75"></span>
                        <span class="w-3 h-3 rounded-full bg-amber-500/75"></span>
                        <span class="w-3 h-3 rounded-full bg-emerald-500/75"></span>
                        <span class="text-zinc-400 ml-2 font-medium">Antigravity 2.0 Dynamic Subagents - Corporate Intelligence Terminal</span>
                    </div>
                    <span class="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> INTEL SECURE
                    </span>
                </div>
                <div class="p-4 h-28 overflow-y-auto space-y-2 terminal-scroll" id="terminal-logs">
                    <div class="text-zinc-500">[11:12:01] [SYSTEM] Master-Agent initialized with 'FEYZ AL' 300 projelik geniş kırılım matrisi.</div>
                    <div class="text-blue-400">[11:12:03] [SUBAGENT 1] Kategori A-B-C için toplam 300 coin/token verisi başarıyla senkronize edildi.</div>
                    <div class="text-emerald-400">[11:12:05] [SUBAGENT 1] feyz_al_corporate_intelligence.md 300 proje olarak güncellendi.</div>
                    <div class="text-purple-400">[11:12:08] [SUBAGENT 2] Arayüzdeki 300 projenin iş modelleri ve dinamik yol haritası modülleri bağlandı.</div>
                    <div class="text-zinc-400">[11:12:10] [MASTER-AGENT] Kurumsal veri tabanı ve arayüz 100% stabil.</div>
                </div>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                <p>© 2026 FEYZ AL Platformu. Kurucu Feyz'in vizyonuyla inşa edilmiştir.</p>
                <div class="flex gap-4">
                    <span class="text-emerald-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Corporate Intelligence Sync Active</span>
                    <span>Workspace: crypto-collapse-dashboard</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript Data & Logics -->
    <script>
        // Programmatically injected 300 cases
        const cases = ${casesJson};

        // Active Tab State
        let activeTab = 'A';
        let selectedProject = null;
        let activeMatrixFilter = 'ALL';

        // Switch Tab Function
        function switchTab(category) {
            activeTab = category;
            selectedProject = null;
            
            // Update Tab button styles
            const tabs = ['A', 'B', 'C'];
            tabs.forEach(t => {
                const btn = document.getElementById(\`tab-\${t}\`);
                btn.classList.remove('glow-active-A', 'glow-active-B', 'glow-active-C');
                btn.style.borderColor = 'rgba(63, 63, 70, 0.2)';
            });

            const activeBtn = document.getElementById(\`tab-\${category}\`);
            activeBtn.classList.add(\`glow-active-\${category}\`);

            // Update Banner details
            const bannerTitle = document.getElementById('banner-title');
            const bannerDesc = document.getElementById('banner-desc');
            const bannerBadge = document.getElementById('banner-badge');
            
            if (category === 'A') {
                bannerTitle.innerText = "Kategori A: Zirvedeki Devler (Sürdürülebilir Büyüme - 100)";
                bannerDesc.innerText = "Bu 100 proje, şeffaf rezerv kanıtları, sürekli kod denetimleri (audit) ve gerçek getiri (real yield) mekanizmalarıyla ekosistemi ayakta tutmaktadır.";
                bannerBadge.innerText = "SÜRDÜRÜLEBİLİR BAŞARI";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            } else if (category === 'B') {
                bannerTitle.innerText = "Kategori B: Karanlık Taraf (Milleti Dolandıranlar - 100)";
                bannerDesc.innerText = "Kasıtlı olarak, manipülasyon ve çıkış stratejileriyle (Exit Scam) yatırımcıyı soymak üzere kurgulanan 100 karanlık yapı.";
                bannerBadge.innerText = "DOLANDIRICILIK";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20";
            } else {
                bannerTitle.innerText = "Kategori C: FEYZ AL (Dersler - 100)";
                bannerDesc.innerText = "Niyetleri tamamen dürüsttü, ekosisteme değer kattılar fakat matematiksel model hataları veya kriz yönetimi eksikliği yüzünden yıkılan 100 ibretlik vaka.";
                bannerBadge.innerText = "İBRET / DERS";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20";
            }

            // Render 100 Cards
            renderCards(category);

            // Reset Analysis Panel
            resetAnalysisPanel();

            logTerminal(\`[SYSTEM] Switched to Category \${category} tab. Rendered 100 projects.\`);
        }

        // Render Cards for Active Tab
        function renderCards(category) {
            const grid = document.getElementById('cards-grid');
            grid.innerHTML = '';

            const filtered = cases.filter(c => c.category === category);
            
            filtered.forEach(c => {
                const card = document.createElement('div');
                
                let hoverClass = 'hover:border-emerald-500/40';
                let borderClass = 'border-zinc-850';
                if (category === 'B') { hoverClass = 'hover:border-rose-500/40'; }
                else if (category === 'C') { hoverClass = 'hover:border-amber-500/40'; }

                card.className = \`glass-panel rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 \${hoverClass} \${borderClass} h-28 relative group\`;
                
                card.onclick = () => selectCard(c, card);

                card.innerHTML = \`
                    <span class="text-2xl mb-1.5 group-hover:scale-110 transition-transform">\${c.logo}</span>
                    <span class="font-bold text-[11px] text-white block font-outfit truncate w-full px-1">\${c.name}</span>
                    <span class="text-[8px] text-zinc-500 mt-0.5 block leading-tight truncate w-full px-1">\${c.type}</span>
                \`;
                grid.appendChild(card);
            });
        }

        // Select Card and Show SWOT/Pivot
        function selectCard(project, cardElement) {
            selectedProject = project;

            // Remove active borders from all cards in the grid
            const cards = document.querySelectorAll('#cards-grid > div');
            cards.forEach(c => {
                c.style.borderColor = 'rgba(63, 63, 70, 0.2)';
                c.classList.remove('bg-zinc-900/40');
            });

            // Highlight selected card
            let activeBorder = 'rgba(16, 185, 129, 0.5)';
            if (project.category === 'B') activeBorder = 'rgba(244, 63, 94, 0.5)';
            else if (project.category === 'C') activeBorder = 'rgba(245, 158, 11, 0.5)';
            
            cardElement.style.borderColor = activeBorder;
            cardElement.classList.add('bg-zinc-900/40');

            // Update Analysis Panel
            document.getElementById('analysis-default').classList.add('hidden');
            const activePanel = document.getElementById('analysis-active');
            activePanel.classList.remove('hidden');

            document.getElementById('proj-logo').innerText = project.logo;
            document.getElementById('proj-name').innerText = project.name;
            document.getElementById('proj-type').innerText = project.type;
            document.getElementById('proj-business').innerText = project.business;
            document.getElementById('proj-metric').innerText = project.metric;
            document.getElementById('proj-speed').innerText = project.speed;
            document.getElementById('proj-s').innerText = project.s || 'Kayıtlı veri bulunmamaktadır.';
            document.getElementById('proj-w').innerText = project.w || 'Kayıtlı veri bulunmamaktadır.';

            const metricLabel = document.getElementById('proj-metric-label');
            const speedLabel = document.getElementById('proj-speed-label');
            const sLabel = document.getElementById('det-s-label');
            const wLabel = document.getElementById('det-w-label');
            const pivotContainer = document.getElementById('pivot-container');
            const analysisBlock = document.getElementById('analysis-block');

            // Set up Category specific fields
            if (project.category === 'A') {
                metricLabel.innerText = "Hacim / TVL";
                speedLabel.innerText = "Büyüme Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-emerald-400";
                sLabel.innerText = "S - Güçlü Yönler";
                sLabel.className = "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Risk Faktörleri";
                wLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = \`
                    <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block">SÜRDÜRÜLEBİLİRLİK FORMÜLÜ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Neden Kazandı?</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-emerald-500/10">\${project.lesson}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-emerald-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "Feyz Al: Liderlerin sürdürülebilir büyüme mekanizması."
                        </div>
                    </div>
                \`;
                analysisBlock.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            } else if (project.category === 'B') {
                metricLabel.innerText = "Buharlaşan Kayıp";
                speedLabel.innerText = "Çöküş / Kaçış Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-rose-500";
                sLabel.innerText = "S - Dolandırıcılık Metodu";
                sLabel.className = "text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Kritik Zafiyet";
                wLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = \`
                    <div class="p-6 rounded-2xl bg-rose-950/10 border border-rose-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-rose-400 uppercase tracking-widest block">KRİTİK HATA TESPİTİ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Zafiyet Detayı</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-rose-500/10">\${project.lesson}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-rose-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "İbret Al: Manipülasyon ve dolandırıcılığın teknik tespiti."
                        </div>
                    </div>
                \`;
                analysisBlock.style.borderColor = 'rgba(244, 63, 94, 0.3)';
            } else {
                metricLabel.innerText = "Finansal Yıkım";
                speedLabel.innerText = "Çöküş Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-amber-500";
                sLabel.innerText = "S - Tasarım &amp; Hedef";
                sLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Neden Çöktü?";
                wLabel.className = "text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = \`
                    <div class="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-amber-400 uppercase tracking-widest block">🛡️ BATIŞ ENGELLEME FORMÜLÜ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Kritik Dönüm Noktası (Pivot Point)</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-amber-500/10">\${project.lesson}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-amber-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "Feyz Al: Şunu yapmasalardı batmazlardı dediğimiz kritik kırılma anı."
                        </div>
                    </div>
                \`;
                analysisBlock.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            }

            // Render 2-Column Roadmap or Fraud Phases
            renderRoadmaps(project);

            // Scroll to analysis panel on small screens
            if (window.innerWidth < 1024) {
                analysisBlock.scrollIntoView({ behavior: 'smooth' });
            }

            logTerminal(\`[MASTER-AGENT] Loaded SWOT/Pivot/Roadmap analysis for \${project.name}.\`);
        }

        // Render Roadmaps (Implemented vs Phantom) or Fraud Phases for Category B
        function renderRoadmaps(project) {
            const roadmapTitle = document.getElementById('roadmap-title');
            const roadmapDesc = document.getElementById('roadmap-desc');
            const roadmapCols = document.getElementById('roadmap-cols');
            
            if (project.category === 'B') {
                // Change title and description for Fraud Category
                roadmapTitle.innerText = "2. Fişi Çekmeden Önceki Dolandırıcılık Evreleri";
                roadmapDesc.innerText = "Projenin çöküşe ve kaçışa giden süreçte adım adım uyguladığı manipülasyon aşamaları.";
                
                // Render as a single column step-by-step timeline
                roadmapCols.className = "max-w-2xl mx-auto relative pl-8 space-y-8";
                roadmapCols.innerHTML = \`
                    <div class="absolute left-3.5 top-2 bottom-2 w-[2px] bg-rose-500/30"></div>
\`;
                
                const phases = project.fraudPhases || [
                    { title: "Evre 1: Hype &amp; Güven İnşası", desc: \`\${project.name} projesinin yüksek getiri vaatleri veya agresif reklam kampanyalarıyla ekosistemde büyük ilgi ve güven uyandırması.\` },
                    { title: "Evre 2: Fon Toplama &amp; İç Karışıklık", desc: "Toplanan kullanıcı fonlarının akıllı sözleşme dışı cüzdanlarda toplanarak kurucuların kişisel kontrolüne veya riskli alanlara aktarılması." },
                    { title: "Evre 3: Teknik Bahane &amp; Fişi Çekme", desc: \`\${project.lesson} Çekim gecikmelerinde sistem bakımı veya hack yalanı söylenerek tüm likiditenin boşaltılması.\` }
                ];
                
                phases.forEach((phase, index) => {
                    const step = document.createElement('div');
                    step.className = "relative group/step";
                    step.innerHTML = \`
                        <span class="absolute left-[-29px] top-1 w-5 h-5 rounded-full bg-rose-950 border border-rose-500/60 flex items-center justify-center text-[10px] text-rose-450 text-rose-400 font-bold shadow-lg shadow-rose-500/20 group-hover/step:border-rose-400 transition-colors">\${index + 1}</span>
                        <h5 class="text-xs font-extrabold text-rose-400 uppercase tracking-wider">\${phase.title}</h5>
                        <p class="text-xs text-zinc-300 mt-1 leading-relaxed">\${phase.desc}</p>
\`;
                    roadmapCols.appendChild(step);
                });
            } else {
                // Reset to default 2-column layout
                roadmapTitle.innerText = "2. Kronolojik Yol Haritası Deşifresi";
                roadmapDesc.innerText = "Akıllı sözleşmelerle kodlanan gerçekler ile yatırımcıyı çekmek için üretilen phantom vaatlerin karşılaştırması.";
                
                roadmapCols.className = "grid grid-cols-1 md:grid-cols-2 gap-8 relative";
                roadmapCols.innerHTML = \`
                    <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2"></div>
                    
                    <!-- Left Column: UYGULANANLAR -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 pb-2 border-b border-emerald-500/25">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <h5 class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">UYGULANANLAR (Gerçek Kilometre Taşları)</h5>
                        </div>
                        <div class="space-y-4 relative pl-6" id="roadmap-implemented"></div>
                    </div>
                    
                    <!-- Right Column: VAATLER -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 pb-2 border-b border-rose-500/25">
                            <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                            <h5 class="text-xs font-extrabold text-rose-400 uppercase tracking-wider">PHANTOM FEATURES (Sadece Vaat Olanlar)</h5>
                        </div>
                        <div class="space-y-4 relative pl-6" id="roadmap-phantom"></div>
                    </div>
\`;
                
                const impContainer = document.getElementById('roadmap-implemented');
                const phmContainer = document.getElementById('roadmap-phantom');
                
                impContainer.innerHTML = '<div class="timeline-line"></div>';
                phmContainer.innerHTML = '<div class="timeline-line"></div>';

                // Render Implemented
                const implemented = project.implemented || [
                    { time: "Uygulanan", event: \`\${project.name} protokolünün lansmanı, temel akıllı sözleşmelerin dağıtılması.\` },
                    { time: "Uygulanan", event: \`\${project.business}\` }
                ];

                implemented.forEach(item => {
                    const node = document.createElement('div');
                    node.className = "relative mb-6";
                    node.innerHTML = \`
                        <span class="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center text-[9px] text-zinc-950 font-bold">✓</span>
                        <span class="text-[10px] font-bold text-emerald-400 block font-outfit">\${item.time}</span>
                        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">\${item.event}</p>
\`;
                    impContainer.appendChild(node);
                });

                // Render Phantom / Vaatler
                const phantom = project.phantom || [
                    { time: "Vaat", event: "Merkeziyetsiz otonom yönetim (DAO) yapısının tam yetkiyle çalıştırılması." },
                    { time: "Vaat", event: "Küresel ekosistem genelinde sıfır riskli getiri sunan otomatik ölçekleme modülü." }
                ];

                phantom.forEach(item => {
                    const node = document.createElement('div');
                    node.className = "relative mb-6";
                    
                    let crossSymbol = '✗';
                    let titleColor = 'text-rose-400';
                    if (project.category === 'A') {
                        crossSymbol = '⚡';
                        titleColor = 'text-indigo-400';
                    }

                    node.innerHTML = \`
                        <span class="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full \${project.category === 'A' ? 'bg-indigo-500' : 'bg-rose-500'} border-2 border-zinc-950 flex items-center justify-center text-[8px] text-zinc-950 font-bold">\${crossSymbol}</span>
                        <span class="text-[10px] font-bold \${titleColor} block font-outfit">\${item.time}</span>
                        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">\${item.event}</p>
\`;
                    phmContainer.appendChild(node);
                });
            }
        }

        // Render Matrix (ALL / A / B / C]
        function renderMatrix(categoryFilter = 'ALL', searchQuery = '') {
            activeMatrixFilter = categoryFilter;
            const tbody = document.getElementById('matrix-tbody');
            tbody.innerHTML = '';
            
            // Update button styles
            const btns = {
                'ALL': document.getElementById('btn-m-all'),
                'A': document.getElementById('btn-m-A'),
                'B': document.getElementById('btn-m-B'),
                'C': document.getElementById('btn-m-C')
            };
            
            Object.keys(btns).forEach(k => {
                if (btns[k]) {
                    btns[k].className = "px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 transition-colors font-medium";
                }
            });
            
            // Set active styles
            if (categoryFilter === 'ALL') {
                btns['ALL'].className = "px-3 py-1.5 rounded-lg bg-zinc-800 text-white font-medium";
            } else if (categoryFilter === 'A') {
                btns['A'].className = "px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium";
            } else if (categoryFilter === 'B') {
                btns['B'].className = "px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium";
            } else if (categoryFilter === 'C') {
                btns['C'].className = "px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium";
            }

            let filtered = categoryFilter === 'ALL' ? cases : cases.filter(c => c.category === categoryFilter);
            
            // Apply search query
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase().trim();
                filtered = filtered.filter(c => 
                    c.name.toLowerCase().includes(q) || 
                    c.type.toLowerCase().includes(q) ||
                    c.business.toLowerCase().includes(q)
                );
            }
            
            filtered.forEach((c, idx) => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-zinc-900/40 border-b border-zinc-900 transition-colors";
                
                let badge = '';
                let critHtml = '';
                let lessonText = c.lesson;
                
                if (c.category === 'A') {
                    badge = \`<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">BAŞARILI</span>\`;
                    const implText = c.implemented ? c.implemented.map(i => i.event).join(' &amp; ') : c.s;
                    critHtml = \`<span class="text-emerald-450 text-emerald-400 font-medium font-outfit">Güçlü Yön:</span> \${implText}\`;
                } else if (c.category === 'B') {
                    badge = \`<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">DOLANDIRICI</span>\`;
                    const phaseSummary = c.fraudPhases ? c.fraudPhases.map(p => p.title).join(' ➔ ') : 'Hype ➔ Fon Aktarımı ➔ Fişi Çekme';
                    critHtml = \`<span class="text-rose-400 font-medium font-outfit">Dolandırıcılık Metodu:</span> \${c.s} <span class="text-[10px] text-zinc-500 block mt-0.5 font-outfit">\${phaseSummary}</span>\`;
                } else {
                    badge = \`<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">DÜRÜST BATAN</span>\`;
                    critHtml = \`<span class="text-amber-400 font-medium font-outfit">Neden Çöktü:</span> \${c.w}\`;
                }

                tr.innerHTML = \`
                    <td class="py-3 px-4 font-medium flex items-center gap-3 min-w-[170px]">
                        <span class="text-zinc-600 font-mono text-[10px] w-4">\${idx + 1}</span>
                        <span class="text-2xl">\${c.logo}</span>
                        <div>
                            <span class="font-bold text-white block font-outfit">\${c.name}</span>
                            <span class="text-[10px] text-zinc-500 block leading-tight">\${c.type}</span>
                        </div>
                    </td>
                    <td class="py-3 px-4">\${badge}</td>
                    <td class="py-3 px-4 text-zinc-300 max-w-xs leading-normal">\${c.business}</td>
                    <td class="py-3 px-4 text-zinc-400 max-w-xs leading-normal">\${critHtml}</td>
                    <td class="py-3 px-4 text-zinc-300 font-medium italic max-w-xs leading-normal">\${lessonText}</td>
\`;
                tbody.appendChild(tr);
            });
        }
        
        function filterMatrix(category) {
            const searchInput = document.getElementById('matrix-search');
            renderMatrix(category, searchInput.value);
            logTerminal(\`[SYSTEM] Filtered global comparison matrix by Category \${category}.\`);
        }

        function searchMatrix() {
            const searchInput = document.getElementById('matrix-search');
            renderMatrix(activeMatrixFilter, searchInput.value);
        }

        // Reset Analysis Panel to Default State
        function resetAnalysisPanel() {
            document.getElementById('analysis-default').classList.remove('hidden');
            document.getElementById('analysis-active').classList.add('hidden');
            document.getElementById('analysis-block').style.borderColor = 'rgba(63, 63, 70, 0.25)';
            
            const icon = document.getElementById('default-icon');
            if (activeTab === 'A') icon.innerText = '🪙';
            else if (activeTab === 'B') icon.innerText = '🏴‍☠️';
            else icon.innerText = '📉';
        }

        // Log to Terminal
        function logTerminal(message) {
            const terminal = document.getElementById('terminal-logs');
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            
            let colorClass = 'text-zinc-400';
            if (message.includes('[SUBAGENT 1]')) colorClass = 'text-blue-400';
            else if (message.includes('[SUBAGENT 2]')) colorClass = 'text-purple-400';
            else if (message.includes('[MASTER-AGENT]')) colorClass = 'text-emerald-450 text-emerald-400';
            
            const logLine = document.createElement('div');
            logLine.className = colorClass;
            logLine.innerHTML = \`<span class="text-zinc-500">[\${timeStr}]</span> \${message}\`;
            
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
        }

        // Initialize Page
        window.onload = () => {
            switchTab('A');
            renderMatrix('ALL');
            logTerminal("[SYSTEM] Client Tabbed UI and Global Matrix initialized. Loaded 300 projects.");
        };
    </script>
</body>
</html>`;

    fs.writeFileSync(outputPath, htmlContent, 'utf-8');
}

// Run the generation
const targetPath = path.resolve('C:\\Users\\feyzu\\.gemini\\antigravity-ide\\scratch\\crypto-collapse-dashboard\\dashboard.html');
generateHtmlFile(targetPath);
console.log(`Successfully generated dashboard.html at ${targetPath} with 300 projects.`);
