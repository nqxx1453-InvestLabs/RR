import json
import os

# Define the 300 projects (100 per category)
# Kategori A: Zirvedeki Devler (100)
cat_a = [
    # Top 10 Detailed
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
            {"time": "Vaat", "event": "Tamamente yapay zekaya bağlı otonom faiz dengeleme modülü."}
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
]

# Generate remaining 90 for Cat A
remaining_a = [
    ("Curve Finance", "🌀", "Stablecoin AMM Havuzu", "$2.0 Milyar+ (TVL)", "Dengeli", "Düşük sapmalı stabil coin takaslarından alınan işlem ücretleri.", "Stablecoin piyasasındaki en derin likidite.", "Akıllı sözleşme karmaşıklığı.", "Neden Kazandı: Ahır coinler için en düşük slippage (kayma) oranını sunan likidite havuz standartını getirmesi."),
    ("GMX", "📈", "Merkeziyetsiz Perp DEX", "$500 Milyon+ (TVL)", "Hızlı Büyüme", "Kaldıraçlı işlemlerden alınan komisyonlar ve GLP havuzu gelirleri.", "Sıfır slippage ile kaldıraçlı işlem.", "GLP havuzunun trader kar riski.", "Neden Kazandı: Likidite sağlayıcılara sahte tokenlar yerine işlem ücretlerinden oluşan saf ETH/USDC (real yield) dağıtması."),
    ("Pendle Finance", "⏳", "Faiz & Getiri Ticareti", "$3.0 Milyar+ (TVL)", "Çok Hızlı", "Getiri getiren varlıkları anapara ve getiri olarak ikiye bölerek ticaret imkanı sunar.", "DeFi'de faiz oranları üzerine spekülasyon.", "Yüksek finansal karmaşıklık.", "Neden Kazandı: DeFi varlıklarının getirilerini tokenize ederek benzersiz bir türev pazarı kurması."),
    ("Stader Labs", "🌐", "Çoklu Zincir Staking", "$400 Milyon+ (TVL)", "Dengeli", "Çoklu zincirlerde likit staking türevleri sunarak staking ödüllerinden %10 komisyon alır.", "Çoklu zincir uyumluluğu.", "L2'lerde daha düşük marka bilinirliği.", "Neden Kazandı: Tek bir ağa bağımlı kalmayıp, 6 farklı blokzincirde likit staking sunması."),
    ("Binance Earn", "💛", "CEX Staking Portalı", "Milyarlarca Dolar", "Stabil", "Kullanıcıların borsada tuttukları coinleri stake ederek faiz almasını sağlar.", "Zirve kullanıcı erişimi, sıfır teknik karmaşıklık.", "Merkezi saklama riskleri.", "Neden Kazandı: Blokzincir işlemlerinden korkan perakende kullanıcıya tek tıkla getiri kolaylığı sağlaması."),
    ("Ankr", "⚓", "RPC & Düğüm Servisi", "$200 Milyon+", "Dengeli", "Geliştiricilere RPC düğüm erişimi satar ve likit staking çalıştırır.", "Blokzincir altyapısında küresel güç.", "Merkezi düğüm dağılımı eleştirileri.", "Neden Kazandı: Geliştiricilere kesintisiz altyapı sunarken likit staking pazarında da yer edinmesi."),
    ("Marinade Finance", "🍊", "Solana Staking Optimizasyonu", "$1.0 Milyar+ (TVL)", "Dengeli", "Solana doğrulayıcılarını performanslarına göre delege eden optimizasyon motoru.", "Solana ağındaki en eski ve güvenilir LST.", "Sadece tek bir ağa bağımlılık.", "Neden Kazandı: Solana doğrulayıcı dağılımını optimize ederek ağın merkeziyetsizliğini desteklemesi."),
    ("Save", "💰", "Solana Likidite Pazarı", "$300 Milyon+", "Dengeli", "Borç verme/alma faiz marjları ve kaldıraçlı işlemler üzerinden komisyon alır.", "Solana ekosisteminde derin likidite.", "Solana ağ tıkanıklıklarında tasfiye riski.", "Neden Kazandı: Solana ekosisteminde borç alma ve verme mekanizmasını en erken kuran protokol olması."),
    ("Jupiter", "🪐", "Solana Likidite Toplayıcı", "Sınırsız (Hacim)", "Çok Hızlı", "Solana ağındaki en ucuz takas yollarını bulur.", "Solana takas işlemlerinin %70'ini yönetmesi.", "Solana ağ kesintilerine bağımlılık.", "Neden Kazandı: Solana'daki tüm likiditeyi tek noktada toplayıp en iyi fiyatı ve araçları sunması."),
    ("Ether.fi", "🔌", "Likit Restaking (LRT)", "$6.0 Milyar+", "Çok Hızlı", "Kullanıcıların ETH'lerini restake ederek EigenLayer ve base staking ödüllerini toplar.", "EigenLayer üzerindeki en büyük LRT.", "Çok katmanlı akıllı sözleşme riskleri.", "Neden Kazandı: Kullanıcılara hem Ethereum staking hem EigenLayer restaking ödüllerini eETH ile sunması."),
    ("Renzo", "🧬", "Likit Restaking Ajanı", "$2.5 Milyar+", "Hızlı Büyüme", "EigenLayer strateji yöneticisi olarak çalışır.", "L2 ağları üzerinden doğrudan restaking.", "ezETH de-peg riskleri.", "Neden Kazandı: Kullanıcıların L2'lerden doğrudan restaking yapmasını sağlayarak gas ücretlerini düşürmesi."),
    ("Puffer Finance", "🐡", "Merkeziyetsiz Restaking", "$1.5 Milyar+", "Dengeli", "Bireysel doğrulayıcıların EigenLayer'da risksiz çalışmasını sağlayan anti-slashing teknolojisi.", "Anti-slashing donanım desteği.", "SGX donanım bağımlılığı.", "Neden Kazandı: Bireysel düğüm operatörlerinin risklerini azaltan donanımsal güvenlik çözümleri sunması."),
    ("Kelp DAO", "🌾", "Çoklu LST Restaking", "$1.0 Milyar+", "Dengeli", "stETH ve reth gibi farklı LST'leri kabul ederek rsETH basar.", "Farklı staking tokenlarını doğrudan kabul etme.", "Kendi yerel altyapısının olmaması.", "Neden Kazandı: Kullanıcıların ellerindeki hazır LST'leri bozmadan doğrudan restaking havuzuna alması."),
    ("Swell Network", "🌊", "LST & LRT Protokolü", "$1.0 Milyar+", "Dengeli", "swETH ve rswETH ihraç ederek staking/restaking komisyonları alır.", "Kendi L2 ağını kurarak ekosistem oluşturma.", "Restaking pazarındaki yoğun rekabet.", "Neden Kazandı: Staking hizmetini kendi L2 toplama (rollup) ağına entegre ederek ekosistem kurması."),
    ("Mantle LSP", "🧤", "L2 Staking Protokolü", "$800 Milyon+", "Hızlı Büyüme", "Mantle L2 ağında mETH likit staking tokenı basar.", "Mantle hazinesi tarafından desteklenen yüksek APY.", "Mantle ekosistemine bağımlılık.", "Neden Kazandı: Mantle hazinesindeki devasa ETH likiditesini kullanarak yüksek APY sunması."),
    ("Benqi", "🔺", "Avalanche Likidite Merkezi", "$300 Milyon+", "Dengeli", "sAVAX likit staking ve borç verme faiz marjlarından gelir sağlar.", "Avalanche ağındaki en derin likidite.", "Avalanche dışındaki zincirlerde olmaması.", "Neden Kazandı: Avalanche ağının yerleşik finansal merkezi haline gelerek sAVAX ve lending'i birleştirmesi."),
    ("Stride", "👣", "Cosmos Likit Staking", "$150 Milyon+", "Dengeli", "Cosmos ekosistemindeki zincirler için stTokens basar.", "Cosmos ekosistemindeki zincirler arası staking tekeli.", "Cosmos genel hacim düşüşü riskleri.", "Neden Kazandı: Cosmos'un modüler yapısına uygun zincirler arası likit staking standardını ilk kurması."),
    ("dYdX", "✴️", "On-Chain Emir Defteri", "Milyarlarca Dolar", "İstikrarlı", "Kaldıraçlı işlemlerden alınan borsa komisyonları.", "Merkezi borsalara en yakın hızda çalışan emir defteri.", "Merkeziyetsizliğe geçişdeki teknik zorluklar.", "Neden Kazandı: AMM yerine, profesyonel traderların alışık olduğu hızlı emir defteri yapısını zincire taşıması."),
    ("Synthetix", "⚔️", "Sentetik Varlık Motoru", "$400 Milyon+", "Dengeli", "SNX stake edenlerin havuz fonlarını teminat göstererek sentetik varlık basar.", "Slippage olmadan sentetik varlık ticareti.", "SNX fiyat dalgalanmalarına duyarlı teminat.", "Neden Kazandı: DeFi genelindeki kaldıraçlı borsalara arkadaki derin sentetik likiditeyi sağlaması."),
    ("Yearn Finance", "🕳️", "Getiri Toplayıcı", "$200 Milyon+", "Yavaş", "Kullanıcı fonlarını otomatik en yüksek faiz veren DeFi havuzlarına plase eder.", "DeFi tarihinin en eski ve en güvenilir getiri otomasyonu.", "DeFi faiz oranlarının genel olarak düşmesi.", "Neden Kazandı: Kullanıcıların faiz takibi yapmasına gerek bırakmadan fonları en verimli havuzlara yönlendirmesi."),
    ("Morpho", "🦋", "Kredi Optimizasyonu", "$2.0 Milyar+", "Hızlı Büyüme", "Aave ve Compound üzerinde borç verenleri ve alanları doğrudan P2P eşleştirir.", "DeFi borçlanma faizlerini doğrudan iyileştiren ek katman.", "Alttaki ana protokollerin teknik riskleri.", "Neden Kazandı: Likidite havuz yapısını bozmadan borçluları P2P eşleştirerek verimlilik sunması."),
    ("Instadapp", "📱", "DeFi Akıllı Hesap", "$2.0 Milyar+", "Dengeli", "Kullanıcıların DSL cüzdanları üzerinden yaptıkları karmaşık DeFi işlemlerinden komisyon alır.", "Flaş kredilerle tek tıkla borç taşıma.", "Arayüzün hala teknik kalması.", "Neden Kazandı: Farklı DeFi protokolleri arasındaki varlık geçişlerini tek tıkla yapılabilir kılması."),
    ("Ethena", "🖤", "Sentetik Dolar (USDe)", "$3.0 Milyar+", "Çok Hızlı", "Ethereum staking getirisi ile vadeli işlemlerdeki short pozisyon fonlama ücretlerini birleştirir.", "Piyasadaki en yüksek stablecoin getiri oranını sunması.", "Negatif fonlama oranlarında rezervlerin erime riski.", "Neden Kazandı: Delta-nötr arbitraj stratejisiyle hem çıpayı koruyan hem getiri sunan model kurması."),
    ("Balancer", "⚖️", "Modüler AMM", "$1.0 Milyar+", "Dengeli", "Çoklu varlık havuzlarına izin veren modüler yapısıyla işlem ücreti toplar.", "Endeks benzeri havuzlar ve yüksek gaz verimliliği.", "Curve ve Uniswap arasındaki sıkı rekabet.", "Neden Kazandı: İkiden fazla varlık içeren havuz yapılarıyla portföy yönetimini DeFi'ye entegre etmesi."),
    ("SushiSwap", "🍣", "Çok Zincirli DEX", "$300 Milyon+", "Stabil", "Çoklu zincirlerdeki AMM havuzlarından işlem ücreti alır.", "Topluluk odaklı yapı ve geniş zincir desteği.", "Yönetim içi anlaşmazlıklar ve pazar payı kaybı.", "Neden Kazandı: Uniswap'a karşı başlattığı vampir saldırısıyla topluluk odaklı DeFi token modelini popüler yapması."),
    ("PancakeSwap", "🥞", "BNB Chain Lider DEX'i", "$1.5 Milyar+", "Dengeli", "BNB Chain üzerindeki takas işlemlerinden komisyon alır.", "Çok düşük işlem ücretleri ve yüksek oyunlaştırılmış arayüz.", "BNB Chain ekosistemine olan yüksek bağımlılık.", "Neden Kazandı: Binance desteğiyle BNB Chain'in mutlak likidite ve getiri merkezi haline gelmesi."),
    ("Compound", "🧪", "DeFi Kredi Öncüsü", "$2.0 Milyar+", "Stabil", "Borç verme ve alma faiz farklarından gelir yaratır.", "DeFi'nin en eski ve kod kalitesi en çok test edilmiş protokolü.", "Aave karşısında pazar payı kaybetmesi.", "Neden Kazandı: Likidite havuzu tabanlı borçlanma modelini ve COMP tokenı ile likidite madenciliğini başlatması."),
    ("Gnosis Safe", "🔒", "Multisig Güvenlik Standardı", "Milyarlarca Dolar", "İstikrarlı", "Kurumsal multisig cüzdan kurulumu ve ek servislerden gelir sağlar.", "DeFi ve kurumsal saklamadaki mutlak güvenlik standardı.", "Bireysel kullanıcılar için kurulum zorluğu.", "Neden Kazandı: Çoklu imza gerektiren akıllı sözleşme cüzdan mimarisini endüstri standardı yapması."),
    ("Thorchain", "⚡", "Çapraz Zincir Likidite", "$800 Milyon+", "Hızlı Büyüme", "Sentetik köprü kullanmadan yerel BTC/ETH takas işlem ücretlerinden gelir alır.", "Gerçek yerel varlıklar arası takas imkanı.", "Geçmişte yaşanan akıllı sözleşme hackleri.", "Neden Kazandı: Köprülerin güvenlik risklerini ortadan kaldırarak yerel Bitcoin ve Ethereum takasını sağlaması."),
    ("Quickswap", "🐉", "Polygon Yerel DEX'i", "$150 Milyon+", "Stabil", "Polygon ve L2 üzerindeki takas işlemlerinden komisyon alır.", "Polygon ağındaki ilk ve en derin likiditeli DEX olması.", "Polygon dışındaki zincirlerde pazar payının olmaması.", "Neden Kazandı: Polygon ağının lansmanında en derin likiditeyi sunarak ağın yerel takas merkezi olması."),
    ("Trader Joe", "🔺", "Avalanche Konsantre AMM", "$250 Milyon+", "Dengeli", "Avalanche ve Arbitrum üzerindeki takas işlemlerinden komisyon alır.", "Liquidity Book modeliyle sıfır kayma ve yüksek verim.", "Uniswap V3 konsantre likidite rekabeti.", "Neden Kazandı: Likiditeyi fiyat aralıklarına bölerek sermaye verimliliğini artıran benzersiz bir AMM tasarlaması."),
    ("Raydium", "⚡", "Solana AMM & Sipariş Defteri", "$300 Milyon+", "Dengeli", "Solana üzerindeki AMM işlemlerinden komisyon alır.", "Solana ağındaki en yüksek likiditeli AMM havuzları.", "Merkeziyetsiz sipariş defterlerine bağımlılık.", "Neden Kazandı: Solana'nın yüksek hızıyla emir defterini AMM havuzlarıyla birleştiren ilk protokol olması."),
    ("Orca", "🐬", "Solana Konsantre DEX", "$200 Milyon+", "Dengeli", "Solana ağındaki konsantre likidite işlemlerinden komisyon alır.", "Mükemmel kullanıcı arayüzü ve yüksek işlem hızı.", "Raydium ve Jupiter arasındaki yoğun rekabet.", "Neden Kazandı: Solana üzerinde en temiz ve kullanıcı dostu konsantre likidite takas deneyimini sunması."),
    ("Camelot", "🏰", "Arbitrum Ekosistem AMM'i", "$100 Milyon+", "Dengeli", "Arbitrum üzerindeki projelerin lansmanlarından ve takaslarından gelir elde eder.", "Arbitrum projeleri için özel tasarlanmış yönlendirmeli likidite.", "Arbitrum ekosistemine yüksek bağımlılık.", "Neden Kazandı: Yeni çıkan projelere özel likidite teşvikleri sunarak Arbitrum'un resmi fırlatma paneli olması."),
    ("Velodrome", "🚲", "Optimism Likidite Motoru", "$200 Milyon+", "Dengeli", "Optimism üzerindeki ve33 rüşvet ve takas işlemlerinden komisyon alır.", "Optimism ağının en derin likidite teşvik mekanizması.", "Optimism dışındaki ağlarda zayıf olması.", "Neden Kazandı: Solidly modelini geliştirerek Optimism ekosisteminin resmi likidite yönlendiricisi olması."),
    ("Aerodrome", "✈️", "Base Likidite Motoru", "$500 Milyon+", "Çok Hızlı", "Base üzerindeki ve33 rüşvet ve takas işlemlerinden gelir sağlar.", "Base ağındaki en büyük TVL ve likidite kontrolü.", "Base ekosistemindeki hızlı değişimler.", "Neden Kazandı: Velodrome modelini Base ağına taşıyarak ağın en büyük likidite yönlendiricisi olması."),
    ("Thena", "🏛️", "BNB Chain ve33 DEX", "$80 Milyon+", "Dengeli", "BNB Chain üzerindeki takas ve rüşvet işlemlerinden komisyon alır.", "BNB Chain üzerindeki yeni projeler için derin likidite.", "PancakeSwap'ın mutlak hakimiyeti.", "Neden Kazandı: ve33 rüşvet modelini BNB Chain'e getirerek PancakeSwap dışındaki projeleri çekmesi."),
    ("Wombat Exchange", "🐹", "Tek Taraf Stablecoin AMM", "$50 Milyon+", "Stabil", "Çoklu zincirde stablecoin takas ücretlerinden gelir sağlar.", "Tek taraflı likidite sağlama ve sıfır kayma oranı.", "Büyük rakipler karşısında sınırlı hacim.", "Neden Kazandı: Kullanıcıların tek bir stablecoin yatırarak getiri elde etmesini sağlayan havuz yapısı kurması."),
    ("Loopring", "💍", "zkRollup Sipariş Defteri", "$150 Milyon+", "Stabil", "Ethereum L2 zkRollup üzerindeki takas ve transfer ücretlerinden gelir elde eder.", "Ethereum güvenliğinde gazsız ve hızlı sipariş defteri.", "L2 rekabetinde genel TVL kaybı.", "Neden Kazandı: Ethereum üzerinde zkRollup teknolojisini kullanarak çalışan ilk performanslı borsayı kurması."),
    ("Osmosis", "🧪", "Cosmos Likidite Merkezi", "$300 Milyon+", "Dengeli", "Cosmos IBC üzerindeki takas ve zincirler arası transferlerden komisyon alır.", "Cosmos ekosisteminin mutlak likidite ve fiyat belirleme merkezi.", "Cosmos ekosisteminin genel hacim kaybı.", "Neden Kazandı: Cosmos ağındaki tüm bağımsız zincirleri IBC üzerinden bağlayan merkeziyetsiz borsa olması."),
    ("Cetus", "🐙", "Sui Konsantre AMM", "$100 Milyon+", "Hızlı Büyüme", "Sui ve Aptos ağlarındaki konsantre likidite takaslarından komisyon alır.", "Move diliyle yazılmış ultra hızlı konsantre likidite.", "Sui ekosisteminin yeni kuruluyor olması.", "Neden Kazandı: Sui ağında konsantre likidite modelini en erken ve en kararlı uygulayan borsa olması."),
    ("Kujira", "🐳", "Cosmos Yarı-Algoritmik Ağ", "$80 Milyon+", "Dengeli", "Tasfiye kuyrukları, borç verme ve USK stablecoin faizlerinden gelir sağlar.", "Tasfiyeleri perakende kullanıcılar için demokratikleştiren BLUE paneli.", "Hızlı büyüme sonrası yaşanan bazı borç krizleri.", "Neden Kazandı: DeFi tasfiyelerini ihale usulüyle normal kullanıcılara açan yenilikçi bir finansal altyapı sunması."),
    ("Injective", "🥷", "Finansal L1 Blokzinciri", "Milyarlarca Dolar", "Hızlı Büyüme", "Ağ üzerindeki tüm dApp işlemlerinden ve yerleşik sipariş defteri komisyonlarından gelir sağlar.", "Finansal uygulamalar için optimize edilmiş sıfır gas ücretli altyapı.", "EVM ağlarına karşı kullanıcı edinme zorluğu.", "Neden Kazandı: Borsalar ve kaldıraçlı işlemler için zincir seviyesinde paylaşımlı sipariş defteri sunması."),
    ("Lyra", "🎼", "On-Chain Opsiyon Borsası", "$50 Milyon+", "Dengeli", "Ethereum ve L2'lerdeki opsiyon alım-satım komisyonlarından gelir alır.", "Black-Scholes modelini zincir üstünde çalıştıran ilk opsiyon AMM'i.", "Opsiyon piyasasının zincir üstünde hala düşük hacimli olması.", "Neden Kazandı: Karmaşık opsiyon fiyatlandırma mekanizmalarını akıllı sözleşmelerle hatasız çalıştırabilmesi."),
    ("Ribbon Finance", "🎀", "Otomatik Opsiyon Kasaları", "$100 Milyon+", "Stabil", "Kullanıcı fonlarını otomatik opsiyon satarak işletir, %2 performans ücreti alır.", "Kullanıcılar için tek tıkla pasif opsiyon getirisi.", "Piyasa dalgalanmalarında kasaların zarar yazma riski.", "Neden Kazandı: DeFi'de yapılandırılmış finansal ürünleri (DOV) başlatan ilk protokol olması."),
    ("Hegic", "🎯", "Akıllı Sözleşmeli Opsiyon", "$30 Milyon+", "Stabil", "Kullanıcıların on-chain opsiyon alırken ödediği primlerden gelir sağlar.", "Kilit süresi olmadan anlık opsiyon alım-satım kolaylığı.", "Sıvı havuzların derinlik yetersizliği.", "Neden Kazandı: Likidite sağlayıcıları tek bir havuzda toplayıp alıcılara karşı taraflık yapan basit opsiyon modeli."),
    ("Gains Network", "🍏", "Sentetik Kaldıraç Borsası", "$100 Milyon+", "Hızlı Büyüme", "Forex, kripto ve hisse senedi kaldıraç komisyonlarından gelir elde eder.", "gDAI havuzu üzerinden sıfır slippage ile 150x kaldıraç.", "Büyük kâr dalgalanmalarında gDAI havuzunun maruz kaldığı risk.", "Neden Kazandı: Kripto dışı varlıkları (forex/hisseler) sentetik olarak zincir üstünde kaldıraçlı ticarete açması."),
    ("Kwenta", "🦊", "Synthetix Kaldıraç Arayüzü", "$50 Milyon+", "Dengeli", "Synthetix v3 altyapısı üzerindeki kaldıraçlı işlemlerden komisyon alır.", "Synthetix'in derin likiditesini kullanan profesyonel arayüz.", "Synthetix'in genel işlem ücreti politikalarına bağımlılık.", "Neden Kazandı: Synthetix'in arkadaki karmaşık sentetik motorunu traderlar için şık bir panele dönüştürmesi."),
    ("HMX", "👾", "Çoklu Teminatlı Perp DEX", "$40 Milyon+", "Dengeli", "GMX ve kendi havuzları üzerindeki kaldıraçlı işlemlerden gelir sağlar.", "Çoklu farklı varlığı (ETH, BTC, USDC) aynı anda teminat gösterme.", "Arbitrum ağındaki yoğun perp DEX rekabeti.", "Neden Kazandı: Kullanıcıların farklı DeFi varlıklarını tek hesapta teminatlandırarak kaldıraç açmasını sağlaması."),
    ("Drift Protocol", "⛵", "Solana Kaldıraç & Lending", "$150 Milyon+", "Dengeli", "Solana üzerindeki borç verme ve dinamik AMM kaldıraç işlemlerinden gelir sağlar.", "Solana üzerindeki en kapsamlı kaldıraçlı işlem ve lending paketi.", "Solana tıkanıklıklarında tasfiye motorunun gecikmesi.", "Neden Kazandı: Sanal AMM (vAMM) teknolojisini borç verme havuzlarıyla birleştirerek Solana'da kaldıraç sunması."),
    ("Vertex Protocol", "📐", "Hibrit L2 Sipariş Defteri", "$80 Milyon+", "Dengeli", "Arbitrum üzerindeki hızlı sipariş defteri ve AMM işlemlerinden gelir elde eder.", "Merkezi borsalarla yarışan 15 milisaniye işlem onay süresi.", "Arbitrum dışındaki zincirlerde zayıf olması.", "Neden Kazandı: L2 rollup üzerinde hem AMM likiditesini hem de limit emir defterini tek motorda birleştirmesi."),
    ("Hyperliquid", "⚡", "Kendi L1 Zincirindeki Perp DEX", "$400 Milyon+", "Çok Hızlı", "Kendi L1 zincirindeki sipariş defteri işlemlerinden komisyon alır.", "Saniyede binlerce işlem, sıfır gas ücreti ve devasa likidite.", "Kendi zincirinin doğrulayıcılarının henüz tam merkezileşmemiş olması.", "Neden Kazandı: DeFi'deki en hızlı ve en derin likiditeli kaldıraçlı sipariş defteri platformunu kendi L1'inde kurması."),
    ("Aevo", "🛸", "L2 Opsiyon & Perp Rollup", "$100 Milyon+", "Dengeli", "Kendi L2 rollup ağı üzerindeki opsiyon ve perp işlemlerinden gelir sağlar.", "Kurumsal düzeyde opsiyon emir defteri ve pre-launch token ticareti.", "Token lansmanı sonrası hacim dalgalanmalarına duyarlılık.", "Neden Kazandı: Yeni çıkacak tokenların ticaretini (Pre-Launch) dünyada ilk kez kaldıraçlı olarak zincir üstüne taşıması."),
    ("Spark Protocol", "⚡", "DAI Odaklı Kredi Havuzu", "$500 Milyon+", "Dengeli", "DAI borçlanma faizleri ve sDAI tasarruf oranlarından gelir sağlar.", "MakerDAO tarafından doğrudan likidite fonlanması.", "Sadece MakerDAO ekosistemiyle sınırlı olması.", "Neden Kazandı: DAI stabil coini için en düşük borçlanma ve en yüksek tasarruf oranlarını doğrudan sunması."),
    ("Gearbox", "⚙️", "Kaldıraçlı Borçlanma Servisi", "$100 Milyon+", "Dengeli", "Kullanıcıların kaldıraçlı borçlanma hesaplarından komisyon alır.", "DeFi protokollerinde (Uniswap, Curve) 10 kata kadar kaldıraçlı işlem.", "Flaş kredi tasfiye riskleri.", "Neden Kazandı: Borç vermeyi doğrudan kaldıraçlı akıllı sözleşme hesaplarına bağlayan benzersiz bir mimari kurması."),
    ("Notional Finance", "📊", "Sabit Faizli Borçlanma", "$50 Milyon+", "Stabil", "Kullanıcılara sunduğu sabit faizli borç verme ve alma marjlarından gelir sağlar.", "DeFi'de dalgalı faiz yerine 1 yıllık net sabit faiz garantisi.", "Dalgalı faiz havuzlarına göre daha düşük likidite.", "Neden Kazandı: fCash tokenları kullanarak DeFi'ye geleneksel finansın sabit faizli tahvil modelini getirmesi."),
    ("Silo Finance", "🛡️", "Izole Kredi Pazarı", "$200 Milyon+", "Dengeli", "İzole borçlanma havuzlarındaki faiz marjlarından gelir elde eder.", "Tek bir varlığın hacklenmesi durumunda diğer havuzların etkilenmemesi.", "Paylaşımlı havuzlara (Aave) göre daha düşük sermaye verimliliği.", "Neden Kazandı: Her borçlanma çifti için izole havuzlar kurarak köprü hacklerinin sistemik riskini sıfırlaması."),
    ("Radiant Capital", "🌐", "Zincirler Arası Lending", "$200 Milyon+", "Dengeli", "LayerZero altyapısıyla çoklu zincirler arası borç verme faizlerinden gelir sağlar.", "Tek zincirde teminat gösterip, diğer zincirde borç alabilme kolaylığı.", "Geçmişte yaşanan akıllı sözleşme açıkları.", "Neden Kazandı: LayerZero mesajlaşma teknolojisini borç verme havuzlarına entegre eden ilk büyük protokol olması."),
    ("Venus Protocol", "🪐", "BNB Chain Kredi Lideri", "$800 Milyon+", "Stabil", "BNB Chain üzerindeki borç verme faizlerinden ve VAI stablecoin faizinden gelir alır.", "BNB Chain üzerindeki en derin ve en eski borç verme likiditesi.", "Geçmişte yaşanan kurucu tasfiye krizleri.", "Neden Kazandı: Binance Smart Chain lansmanında en derin likiditeyi sunarak ağın kredi lideri olması."),
    ("Seamless Protocol", "🧩", "Base Topluluk Lending'i", "$50 Milyon+", "Dengeli", "Base ağındaki borç verme işlemlerinden ve getiri stratejilerinden komisyon alır.", "Tamamen topluluk odaklı, ön satışsız ve adil dağıtımlı token yapısı.", "Base dışındaki zincirlerde olmaması.", "Neden Kazandı: Base ağında en temiz ve entegre perakende borç verme deneyimini sunması."),
    ("ZeroLend", "0️⃣", "L2 Staking Borçlanması", "$100 Milyon+", "Hızlı Büyüme", "L2 ağlarındaki borç verme ve LRT puan entegrasyonlarından komisyon alır.", "zkSync ve Manta üzerinde en yüksek LRT teminat desteği.", "L2 ağlarındaki kullanıcı dalgalanmaları.", "Neden Kazandı: Likit restaking tokenlarını (LRT) teminat olarak kabul ederek L2'lerde borçlanma açması."),
    ("Kamino Finance", "🦎", "Solana Süper Finans Uygulaması", "$500 Milyon+", "Çok Hızlı", "Solana üzerinde likidite yönetimi, borç verme ve kaldıraçlı işlemlerden gelir sağlar.", "Lending, AMM likiditesi ve kaldıraçlı getiri stratejilerinin tek çatı altında olması.", "Solana ağındaki yoğun rekabet.", "Neden Kazandı: Solana'da kullanıcıların tek tıkla hem borç alıp hem otomatik likidite sağlamasını sağlayan entegre yapı."),
    ("Marginfi", "📈", "Solana Puan Tabanlı Lending", "$400 Milyon+", "Dengeli", "Solana üzerindeki borç verme faizlerinden ve LST komisyonlarından gelir sağlar.", "Kullanıcıları sadakate göre ödüllendiren gelişmiş puanlama sistemi.", "Yönetim ekibinde yaşanan istifa krizleri.", "Neden Kazandı: DeFi'de puan (points) sistemini en agresif kullanan borç verme protokolü olarak milyarlarca dolar çekmesi."),
    ("Kinza Finance", "🔑", "BNB Chain ve33 Lending'i", "$60 Milyon+", "Dengeli", "BNB Chain üzerindeki borç verme ve rüşvet teşviklerinden komisyon alır.", "ve33 modelini borç verme teşviklerine entegre etmesi.", "PancakeSwap ve Venus arasındaki ezici rekabet.", "Neden Kazandı: Borç verenlere ve alanlara ve33 rüşvet modeliyle ek getiri teşvikleri sunması."),
    ("Karak", "🛡️", "Çoklu Varlık Restaking'i", "$300 Milyon+", "Hızlı Büyüme", "Çoklu zincirlerdeki restaking güvenlik hizmetlerinden komisyon alır.", "Sadece ETH değil, stablecoin ve LST restaking desteği sunması.", "EigenLayer karşısında pazar payı savaşı.", "Neden Kazandı: Restaking pazarında varlık çeşitliliğini serbest bırakarak EigenLayer'a alternatif olması."),
    ("Symbiotic", "🔄", "Modüler Restaking Ağı", "$500 Milyon+", "Çok Hızlı", "İzinsiz ve modüler restaking güvenlik servislerinden komisyon alır.", "Herhangi bir ERC20 tokenının restake edilerek güvenlik sağlanabilmesi.", "Yeni kurulmuş olması ve test süreçleri.", "Neden Kazandı: Paradigm desteğiyle tamamen modüler ve izinsiz bir restaking altyapısı sunması."),
    ("Picasso", "🎨", "IBC Restaking Altyapısı", "$40 Milyon+", "Dengeli", "Cosmos IBC'yi Solana ve Ethereum'a bağlayan restaking işlemlerinden komisyon alır.", "Solana ile Cosmos arasında doğrudan IBC mesajlaşma güvenliği.", "IBC entegrasyonunun teknik karmaşıklığı.", "Neden Kazandı: Cosmos'un güvenli zincirler arası iletişim standardını (IBC) restaking ile Solana'ya taşıması."),
    ("BlazeStake", "🔥", "Solana Çoklu Doğrulayıcı LST", "$200 Milyon+", "Dengeli", "bSOL basarak staking ödüllerinden %10 komisyon alır.", "Solana ağındaki yüzlerce küçük doğrulayıcıya otomatik delegasyon.", "Jito ve Marinade karşısında daha düşük doğrudan DeFi entegrasyonu.", "Neden Kazandı: Solana ağının merkeziyetsizliğini desteklemek için en fazla doğrulayıcıya dağılım yapan LST olması."),
    ("Cogent Sharing", "⚙️", "Solana Optimize Staking", "$50 Milyon+", "Stabil", "Solana düğüm performansı ve MEV ödülleri dağıtımından komisyon alır.", "En yüksek uptime ve en düşük blok kaçırma oranına sahip Solana düğümü.", "Bireysel staking pazarının küçüklüğü.", "Neden Kazandı: Solana doğrulayıcı operasyonlarında teknik mükemmellik ve MEV paylaşımı sunması."),
    ("Helius", "🟠", "Solana DePIN Altyapısı", "Kurumsal Hacim", "İstikrarlı", "Solana geliştiricilerine RPC erişimi ve veri API'leri satarak gelir sağlar.", "Solana ağındaki en hızlı ve en güvenilir veri indeksleme altyapısı.", "Solana ağı dışına hizmet vermemesi.", "Neden Kazandı: Solana geliştiricilerinin düğüm kurma zahmetini ortadan kaldıran DePIN veri hizmetleri sunması."),
    ("Chainlink", "🔗", "DeFi Oracle Standardı", "Milyarlarca Dolar", "İstikrarlı", "Akıllı sözleşmelere veri aktaran düğüm ücretlerinden ve CCIP transferlerinden gelir sağlar.", "DeFi ekosisteminin %90'ının fiyat verisini sağlayan mutlak tekel.", "Merkezi veri sağlayıcılarına olan dolaylı bağımlılık.", "Neden Kazandı: Blokzincir dışı verileri güvenli ve manipüle edilemez şekilde akıllı sözleşmelere aktaran ilk oracle olması."),
    ("Pyth Network", "🔮", "Milisaniyelik Oracle", "Milyarlarca Dolar", "Hızlı Büyüme", "Birinci el finansal kurumların verilerini borsalardan alıp zincire aktarır.", "Milisaniyeler içinde güncellenen fiyat beslemesi.", "Solana dışındaki ağlarda yeni yaygınlaşması.", "Neden Kazandı: Borsalar ve piyasa yapıcılarla doğrudan ortaklık kurarak veriyi aracı olmadan en hızlı sunan oracle olması."),
    ("The Graph", "📊", "Zincir Üstü İndeksleme", "Kurumsal Hacim", "İstikrarlı", "Geliştiricilerin alt-grafikler üzerinden blokzincir verilerini sorgulama ücretlerinden gelir alır.", "Blokzincir verilerini sorgulamayı kolaylaştıran tek büyük indeksleme standardı.", "Sorgu ücretlerinin karmaşık yapısı.", "Neden Kazandı: Blokzincirlerin karmaşık verilerini web geliştiricilerinin anlayacağı SQL benzeri sorgulara dönüştürmesi."),
    ("Arweave", "🐘", "Kalıcı Veri Depolama", "Veri Hacmi", "İstikrarlı", "Kullanıcıların tek seferlik ödemeyle verilerini sonsuza kadar saklama ücretlerinden gelir alır.", "Verilerin silinme riski olmadan yüzlerce yıl boyunca kalıcı saklanma garantisi.", "Dosya yükleme hızlarının IPFS'e göre daha yavaş olması.", "Neden Kazandı: Blokzincir madencilerine veriyi saklama kanıtı (PoA) sunarak kalıcı depolama pazarı yaratması."),
    ("Filecoin", "📄", "Merkeziyetsiz Bulut Depolama", "Depolama Kapasitesi", "İstikrarlı", "Dünya genelindeki boş disk alanlarını kiralayan depolama sağlayıcılarından komisyon alır.", "Geleneksel bulut sağlayıcılarına (AWS) göre %90 daha ucuz veri saklama maliyeti.", "Kullanıcı arayüzünün ve veri yükleme süreçlerinin karmaşıklığı.", "Neden Kazandı: Dünyadaki atıl veri depolama kapasitesini blokzincir ekonomisiyle birleştiren en büyük ağ olması."),
    ("Render Network", "🎨", "Merkeziyetsiz GPU Render", "GPU Hacmi", "Hızlı Büyüme", "GPU gücünü kiralayan yapay zeka şirketleri ve sanatçıların ödediği komisyonlardan gelir alır.", "Apple ve Nvidia işbirlikleriyle en yüksek kaliteli 3D render ve AI hesaplama gücü.", "Küresel GPU tedarik krizleri.", "Neden Kazandı: Yapay zeka ve 3D grafik dünyasının ihtiyaç duyduğu GPU gücünü merkezsizleştirerek ucuza sunması."),
    ("Akash Network", "☁️", "Merkezsiz Sunucu Pazarı", "Sunucu Hacmi", "Dengeli", "Boş veri merkezi sunucularını kiralayan geliştiricilerden komisyon alır.", "Süper bilgisayarlar ve sunucuları AWS/Google Cloud'a göre yarı fiyatına kiralama.", "Bireysel perakende kullanıcılar için teknik kurulum zorluğu.", "Neden Kazandı: Veri merkezlerindeki atıl sunucu kapasitesini dApp geliştiricilerine açan ilk DePIN olması."),
    ("Livepeer", "📹", "Merkezsiz Video İşleme", "Video Hacmi", "Stabil", "Video yayıncılarının transcoding işlemlerinden alınan komisyonlar.", "Geleneksel video işleme sunucularına göre %50 daha düşük maliyet.", "Video yayıncılığı sektörünün merkezileşmiş yapısı.", "Neden Kazandı: GPU madencilerinin boş zamanlarında video işlemesini sağlayarak video altyapı maliyetini düşürmesi."),
    ("Pocket Network", " pocket", "Merkezsiz RPC Düğümleri", "RPC Hacmi", "Stabil", "dApp'lerin RPC isteklerini düğümlere dağıtarak aldığı servis ücretleri.", "Tekil hata noktası olmayan, sansüre dayanıklı RPC altyapısı.", "Infura gibi dev merkezi rakiplerin pazar hakimiyeti.", "Neden Kazandı: Blokzincir geliştiricilerine binlerce bağımsız düğüm üzerinden kesintisiz RPC erişimi sunması."),
    ("Helium", "🎈", "Merkezsiz Kablosuz Ağ", "Fiziksel Cihazlar", "Stabil", "Kullanıcıların kurduğu baz istasyonları üzerinden veri transfer ücretlerinden gelir alır.", "Halk tarafından kurulan dünyanın en büyük LoRaWAN kablosuz veri ağı.", "Cihaz satış gelirlerinin azalması sonrası yaşanan tıkanıklıklar.", "Neden Kazandı: Bireysel kullanıcılara madencilik ödülü vererek kablosuz ağ altyapısını sıfır maliyetle kurması."),
    ("io.net", "🌐", "Yapay Zeka GPU Kümesi", "GPU Hacmi", "Çok Hızlı", "Yapay zeka modellerini eğitmek isteyen şirketlerin ödediği GPU kiralama komisyonları.", "Dünyanın en büyük merkezsiz yapay zeka hesaplama ve GPU kümeleme ağı.", "Cihazların internet bağlantı kalitesindeki dalgalanmalar.", "Neden Kazandı: Binlerce bağımsız GPU'yu tek bir süper bilgisayar gibi çalıştırabilen kümeleme teknolojisi sunması."),
    ("Gnosis Chain", "🦉", "Ethereum Uyumlu L1", "İşlem Hacmi", "Stabil", "Ağ üzerindeki gas ücretlerinden (xDAI) gelir elde eder.", "Ethereum ile tam uyumlu, neredeyse sıfır gas ücretli ve son derece merkeziyetsiz doğrulayıcı yapısı.", "Diğer L2 rollup'larının gölgesinde kalması.", "Neden Kazandı: Kararlı xDAI çıpasıyla çalışan ve doğrulayıcı sansürüne karşı en dayanıklı ağlardan birini kurması."),
    ("Fraxtal", "⛓️", "Frax L2 Rollup", "$80 Milyon+ (TVL)", "Hızlı Büyüme", "L2 ağındaki gas ücretlerinden ve yerleşik DeFi entegrasyonlarından komisyon alır.", "Frax Finance'in tüm DeFi ürünleriyle yerleşik entegrasyon.", "Yeni kurulan bir L2 olmasının getirdiği kullanıcı azlığı.", "Neden Kazandı: Blok alanı tüketen kullanıcılara doğrudan gas iadesi sunması."),
    ("Base", "🔵", "Coinbase Ethereum L2'si", "Milyarlarca Dolar", "Çok Hızlı", "L2 üzerindeki gas ücretleri ve işlem sıralama gelirlerinden pay alır.", "Coinbase'in milyonlarca kullanıcısına doğrudan ve ucuz L2 erişimi sunması.", "Sequencer mekanizmasının henüz tam merkeziyetsiz olmaması.", "Neden Kazandı: Coinbase'in kurumsal gücü ve kullanıcı tabanıyla entegre çalışarak en hızlı büyüyen L2 olması."),
    ("Arbitrum One", "💙", "Lider Ethereum L2 Rollup'ı", "Milyarlarca Dolar", "İstikrarlı", "L2 üzerindeki gas ve sequencer ücretlerinden gelir elde eder.", "DeFi ekosistemindeki en derin likiditeye ve en fazla dApp çeşitliliğine sahip L2 olması.", "Optimism ve Base ile yaşanan yoğun L2 pazar payı rekabeti.", "Neden Kazandı: Ethereum genelindeki en iyi EVM uyumluluğunu ve en ucuz işlem ücretlerini en erken sunan L2 olması."),
    ("Optimism", "🔴", "Süper Zincir Altyapısı", "Milyarlarca Dolar", "İstikrarlı", "OP Stack kullanan diğer zincirlerin sequencer gelirlerinden pay alır.", "OP Stack ile oluşturulan Süper Zincir ekosisteminin merkezinde yer alması.", "Bireysel kullanıcılar için Arbitrum karşısında daha düşük doğrudan TVL.", "Neden Kazandı: Kendi L2'sini kurmak isteyen şirketlere standart ve güvenli bir altyapı (OP Stack) sunması."),
    ("Sui Network", "💧", "Move Dilli Hızlı L1", "Milyarlarca Dolar", "Çok Hızlı", "Ağ üzerindeki gas ücretlerinden pay alır.", "Move dili sayesinde saniyede 297.000 işlem yapabilen, nesne tabanlı mimari.", "EVM dışı olmasının getirdiği cüzdan ve dApp taşıma zorlukları.", "Neden Kazandı: Paralel işlem yürütme teknolojisiyle blokzincirlerdeki tıkanıklık sorununu çözmesi."),
    ("Aptos", "🧬", "Kurumsal Move L1'i", "Milyarlarca Dolar", "Hızlı Büyüme", "Ağ üzerindeki gas ücretlerinden ve kurumsal entegrasyonlardan gelir sağlar.", "Meta'nın Diem projesinden gelen, kurumsal düzeyde güvenlik ve hız altyapısı.", "Sui ile yaşanan doğrudan Move dili liderliği rekabeti.", "Neden Kazandı: Kurumsal şirketlerin blokzincir entegrasyonu için en güvenli akıllı sözleşme dili olan Move'u sunması."),
    ("Near Protocol", "🌌", "Sharding Tabanlı L1", "Milyarlarca Dolar", "Dengeli", "Ağ üzerindeki gas ücretlerinden ve bulut veri saklama komisyonlarından gelir elde eder.", "Gece-gündüz çalışan dinamik sharding teknolojisi ve kolay kullanıcı adları.", "EVM ağlarının yarattığı ezici pazarlama baskısı.", "Neden Kazandı: Kullanıcıların karmaşık cüzdan adresleri yerine 'isim.near' şeklinde kolay hesaplar kullanmasını sağlaması."),
    ("Gnosis Safe", "🛡️", "Çoklu İmza Güvenliği", "Milyarlarca Dolar", "İstikrarlı", "Akıllı sözleşme cüzdanı ve çoklu imza standardıyla kurumsal varlıkları korur.", "Kripto para ekosistemindeki en güvenilir ve en çok denetlenmiş saklama standardı.", "Bireysel web3 kullanıcıları için ilk kurulum maliyetleri.", "Neden Kazandı: Akıllı sözleşme cüzdanlarını kurumsal hazine yönetimi için güvenli ve modüler bir standarda dönüştürmesi.")
]

for item in remaining_c:
    cat_c.append({
        "name": item[0], "logo": item[1], "type": item[2], "metric": item[3], "speed": item[4],
        "business": item[5], "s": item[6], "w": item[7], "lesson": item[8]
    })

# Output the HTML file template programmatically
def generate_html_file(output_path):
    # Serialized cases data
    all_cases = cat_a + cat_b + cat_c
    cases_json = json.dumps(all_cases, ensure_ascii=False, indent=4)
    
    html_content = f"""<!DOCTYPE html>
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
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        outfit: ['Outfit', 'sans-serif'],
                    }},
                    colors: {{
                        zinc: {{
                            950: '#09090b',
                        }}
                    }}
                }}
            }}
        }}
    </script>
    <style>
        body {{
            background-color: #09090b;
            background-image: 
                radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.04) 0px, transparent 50%),
                radial-gradient(at 50% 0%, rgba(245, 158, 11, 0.02) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(244, 63, 94, 0.04) 0px, transparent 50%);
        }}
        .glass-panel {{
            background: rgba(15, 15, 22, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(63, 63, 70, 0.2);
        }}
        .glow-active-A {{
            box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.25);
            border-color: rgba(16, 185, 129, 0.5) !important;
        }}
        .glow-active-B {{
            box-shadow: 0 0 30px -5px rgba(244, 63, 94, 0.25);
            border-color: rgba(244, 63, 94, 0.5) !important;
        }}
        .glow-active-C {{
            box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.3);
            border-color: rgba(245, 158, 11, 0.55) !important;
        }}
        .timeline-line {{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 15px;
            width: 2px;
            background: rgba(63, 63, 70, 0.3);
        }}
        .terminal-scroll::-webkit-scrollbar {{
            width: 6px;
        }}
        .terminal-scroll::-webkit-scrollbar-track {{
            background: rgba(9, 9, 11, 0.5);
        }}
        .terminal-scroll::-webkit-scrollbar-thumb {{
            background: rgba(63, 63, 70, 0.5);
            border-radius: 3px;
        }}
        /* Custom scrollbar for entire page */
        ::-webkit-scrollbar {{
            width: 8px;
        }}
        ::-webkit-scrollbar-track {{
            background: #09090b;
        }}
        ::-webkit-scrollbar-thumb {{
            background: #27272a;
            border-radius: 4px;
        }}
        ::-webkit-scrollbar-thumb:hover {{
            background: #3f3f46;
        }}
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
                Küresel Ekosistem Analizi ve Kırılım Matrisi (Top 300)
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

            <!-- Grid of 100 Cards (Responsive and scrollable or paginated if needed - but a clean grid wrapped works beautifully) -->
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
                        <span class="text-indigo-500">📊</span> Küresel Kırılım &amp; Karşılaştırma Matrisi (Top 300 Proje)
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
        const cases = {cases_json};

        // Active Tab State
        let activeTab = 'A';
        let selectedProject = null;
        let activeMatrixFilter = 'ALL';

        // Switch Tab Function
        function switchTab(category) {{
            activeTab = category;
            selectedProject = null;
            
            // Update Tab button styles
            const tabs = ['A', 'B', 'C'];
            tabs.forEach(t => {{
                const btn = document.getElementById(`tab-${{t}}`);
                btn.classList.remove('glow-active-A', 'glow-active-B', 'glow-active-C');
                btn.style.borderColor = 'rgba(63, 63, 70, 0.2)';
            }});

            const activeBtn = document.getElementById(`tab-${{category}}`);
            activeBtn.classList.add(`glow-active-${{category}}`);

            // Update Banner details
            const bannerTitle = document.getElementById('banner-title');
            const bannerDesc = document.getElementById('banner-desc');
            const bannerBadge = document.getElementById('banner-badge');
            
            if (category === 'A') {{
                bannerTitle.innerText = "Kategori A: Zirvedeki Devler (Sürdürülebilir Büyüme - 100)";
                bannerDesc.innerText = "Bu 100 proje, şeffaf rezerv kanıtları, sürekli kod denetimleri (audit) ve gerçek getiri (real yield) mekanizmalarıyla ekosistemi ayakta tutmaktadır.";
                bannerBadge.innerText = "SÜRDÜRÜLEBİLİR BAŞARI";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            }} else if (category === 'B') {{
                bannerTitle.innerText = "Kategori B: Karanlık Taraf (Milleti Dolandıranlar - 100)";
                bannerDesc.innerText = "Kasıtlı olarak, manipülasyon ve çıkış stratejileriyle (Exit Scam) yatırımcıyı soymak üzere kurgulanan 100 karanlık yapı.";
                bannerBadge.innerText = "DOLANDIRICILIK";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20";
            }} else {{
                bannerTitle.innerText = "Kategori C: FEYZ AL (Dersler - 100)";
                bannerDesc.innerText = "Niyetleri tamamen dürüsttü, ekosisteme değer kattılar fakat matematiksel model hataları veya kriz yönetimi eksikliği yüzünden yıkılan 100 ibretlik vaka.";
                bannerBadge.innerText = "İBRET / DERS";
                bannerBadge.className = "px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20";
            }}

            // Render 100 Cards
            renderCards(category);

            // Reset Analysis Panel
            resetAnalysisPanel();

            logTerminal(`[SYSTEM] Switched to Category ${{category}} tab. Rendered 100 projects.`);
        }}

        // Render Cards for Active Tab
        function renderCards(category) {{
            const grid = document.getElementById('cards-grid');
            grid.innerHTML = '';

            const filtered = cases.filter(c => c.category === category);
            
            filtered.forEach(c => {{
                const card = document.createElement('div');
                
                let hoverClass = 'hover:border-emerald-500/40';
                let borderClass = 'border-zinc-850';
                if (category === 'B') {{ hoverClass = 'hover:border-rose-500/40'; }}
                else if (category === 'C') {{ hoverClass = 'hover:border-amber-500/40'; }}

                card.className = `glass-panel rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 ${{hoverClass}} ${{borderClass}} h-28 relative group`;
                
                card.onclick = () => selectCard(c, card);

                card.innerHTML = `
                    <span class="text-2xl mb-1.5 group-hover:scale-110 transition-transform">${{c.logo}}</span>
                    <span class="font-bold text-[11px] text-white block font-outfit truncate w-full px-1">${{c.name}}</span>
                    <span class="text-[8px] text-zinc-500 mt-0.5 block leading-tight truncate w-full px-1">${{c.type}}</span>
                `;
                grid.appendChild(card);
            }});
        }}

        // Select Card and Show SWOT/Pivot
        function selectCard(project, cardElement) {{
            selectedProject = project;

            // Remove active borders from all cards in the grid
            const cards = document.querySelectorAll('#cards-grid > div');
            cards.forEach(c => {{
                c.style.borderColor = 'rgba(63, 63, 70, 0.2)';
                c.classList.remove('bg-zinc-900/40');
            }});

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
            if (project.category === 'A') {{
                metricLabel.innerText = "Hacim / TVL";
                speedLabel.innerText = "Büyüme Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-emerald-400";
                sLabel.innerText = "S - Güçlü Yönler";
                sLabel.className = "text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Risk Faktörleri";
                wLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = `
                    <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block">SÜRDÜRÜLEBİLİRLİK FORMÜLÜ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Neden Kazandı?</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-emerald-500/10">${{project.lesson}}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-emerald-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "Feyz Al: Liderlerin sürdürülebilir büyüme mekanizması."
                        </div>
                    </div>
                `;
                analysisBlock.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            }} else if (project.category === 'B') {{
                metricLabel.innerText = "Buharlaşan Kayıp";
                speedLabel.innerText = "Çöküş / Kaçış Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-rose-500";
                sLabel.innerText = "S - Dolandırıcılık Metodu";
                sLabel.className = "text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Kritik Zafiyet";
                wLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = `
                    <div class="p-6 rounded-2xl bg-rose-950/10 border border-rose-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-rose-400 uppercase tracking-widest block">KRİTİK HATA TESPİTİ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Zafiyet Detayı</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-rose-500/10">${{project.lesson}}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-rose-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "İbret Al: Manipülasyon ve dolandırıcılığın teknik tespiti."
                        </div>
                    </div>
                `;
                analysisBlock.style.borderColor = 'rgba(244, 63, 94, 0.3)';
            }} else {{
                metricLabel.innerText = "Finansal Yıkım";
                speedLabel.innerText = "Çöküş Hızı";
                document.getElementById('proj-metric').className = "font-bold font-outfit text-amber-500";
                sLabel.innerText = "S - Tasarım &amp; Hedef";
                sLabel.className = "text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1";
                wLabel.innerText = "W - Neden Çöktü?";
                wLabel.className = "text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1";
                
                pivotContainer.innerHTML = `
                    <div class="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/25 space-y-4 h-full flex flex-col justify-between">
                        <div class="space-y-2">
                            <span class="text-xs font-extrabold text-amber-400 uppercase tracking-widest block">🛡️ BATIŞ ENGELLEME FORMÜLÜ</span>
                            <h4 class="text-md font-bold font-outfit text-white">Kritik Dönüm Noktası (Pivot Point)</h4>
                            <p class="text-xs text-zinc-300 leading-relaxed italic pt-2 border-t border-amber-500/10">${{project.lesson}}</p>
                        </div>
                        <div class="bg-zinc-950/60 p-3 rounded-lg border border-amber-500/10 text-[10px] text-zinc-500 font-mono mt-4">
                            "Feyz Al: Şunu yapmasalardı batmazlardı dediğimiz kritik kırılma anı."
                        </div>
                    </div>
                `;
                analysisBlock.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            }}

            // Render 2-Column Roadmap or Fraud Phases
            renderRoadmaps(project);

            // Scroll to analysis panel on small screens
            if (window.innerWidth < 1024) {{
                analysisBlock.scrollIntoView({{ behavior: 'smooth' }});
            }}

            logTerminal(`[MASTER-AGENT] Loaded SWOT/Pivot/Roadmap analysis for ${{project.name}}.`);
        }}

        // Render Roadmaps (Implemented vs Phantom) or Fraud Phases for Category B
        function renderRoadmaps(project) {{
            const roadmapTitle = document.getElementById('roadmap-title');
            const roadmapDesc = document.getElementById('roadmap-desc');
            const roadmapCols = document.getElementById('roadmap-cols');
            
            if (project.category === 'B') {{
                // Change title and description for Fraud Category
                roadmapTitle.innerText = "2. Fişi Çekmeden Önceki Dolandırıcılık Evreleri";
                roadmapDesc.innerText = "Projenin çöküşe ve kaçışa giden süreçte adım adım uyguladığı manipülasyon aşamaları.";
                
                // Render as a single column step-by-step timeline
                roadmapCols.className = "max-w-2xl mx-auto relative pl-8 space-y-8";
                roadmapCols.innerHTML = `
                    <div class="absolute left-3.5 top-2 bottom-2 w-[2px] bg-rose-500/30"></div>
                `;
                
                const phases = project.fraudPhases || [
                    {{ title: "Evre 1: Hype &amp; Güven İnşası", desc: `${{project.name}} projesinin yüksek getiri vaatleri veya agresif reklam kampanyalarıyla ekosistemde büyük ilgi ve güven uyandırması.` }},
                    {{ title: "Evre 2: Fon Toplama &amp; İç Karışıklık", desc: "Toplanan kullanıcı fonlarının akıllı sözleşme dışı cüzdanlarda toplanarak kurucuların kişisel kontrolüne veya riskli alanlara aktarılması." }},
                    {{ title: "Evre 3: Teknik Bahane &amp; Fişi Çekme", desc: `${{project.lesson}} Çekim gecikmelerinde sistem bakımı veya hack yalanı söylenerek tüm likiditenin boşaltılması.` }}
                ];
                
                phases.forEach((phase, index) => {{
                    const step = document.createElement('div');
                    step.className = "relative group/step";
                    step.innerHTML = `
                        <span class="absolute left-[-29px] top-1 w-5 h-5 rounded-full bg-rose-950 border border-rose-500/60 flex items-center justify-center text-[10px] text-rose-450 text-rose-400 font-bold shadow-lg shadow-rose-500/20 group-hover/step:border-rose-400 transition-colors">${{index + 1}}</span>
                        <h5 class="text-xs font-extrabold text-rose-400 uppercase tracking-wider">${{phase.title}}</h5>
                        <p class="text-xs text-zinc-300 mt-1 leading-relaxed">${{phase.desc}}</p>
                    `;
                    roadmapCols.appendChild(step);
                }});
            }} else {{
                // Reset to default 2-column layout
                roadmapTitle.innerText = "2. Kronolojik Yol Haritası Deşifresi";
                roadmapDesc.innerText = "Akıllı sözleşmelerle kodlanan gerçekler ile yatırımcıyı çekmek için üretilen phantom vaatlerin karşılaştırması.";
                
                roadmapCols.className = "grid grid-cols-1 md:grid-cols-2 gap-8 relative";
                roadmapCols.innerHTML = `
                    <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2"></div>
                    
                    <!-- Left Column: UYGULANANLAR -->
                    <div class="flex items-center gap-2 pb-2 border-b border-emerald-500/25">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <h5 class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">UYGULANANLAR (Gerçek Kilometre Taşları)</h5>
                    </div>
                    <div class="space-y-4 relative pl-6" id="roadmap-implemented"></div>
                    
                    <!-- Right Column: VAATLER -->
                    <div class="flex items-center gap-2 pb-2 border-b border-rose-500/25">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <h5 class="text-xs font-extrabold text-rose-400 uppercase tracking-wider">PHANTOM FEATURES (Sadece Vaat Olanlar)</h5>
                    </div>
                    <div class="space-y-4 relative pl-6" id="roadmap-phantom"></div>
                `;
                
                const impContainer = document.getElementById('roadmap-implemented');
                const phmContainer = document.getElementById('roadmap-phantom');
                
                impContainer.innerHTML = '<div class="timeline-line"></div>';
                phmContainer.innerHTML = '<div class="timeline-line"></div>';

                // Render Implemented
                const implemented = project.implemented || [
                    {{ time: "Uygulanan", event: `${{project.name}} protokolünün lansmanı, temel akıllı sözleşmelerin dağıtılması.` }},
                    {{ time: "Uygulanan", event: `${{project.business}}` }}
                ];

                implemented.forEach(item => {{
                    const node = document.createElement('div');
                    node.className = "relative mb-6";
                    node.innerHTML = `
                        <span class="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center text-[9px] text-zinc-950 font-bold">✓</span>
                        <span class="text-[10px] font-bold text-emerald-400 block font-outfit">${{item.time}}</span>
                        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">${{item.event}}</p>
                    `;
                    impContainer.appendChild(node);
                }});

                // Render Phantom / Vaatler
                const phantom = project.phantom || [
                    {{ time: "Vaat", event: "Merkeziyetsiz otonom yönetim (DAO) yapısının tam yetkiyle çalıştırılması." }},
                    {{ time: "Vaat", event: "Küresel ekosistem genelinde sıfır riskli getiri sunan otomatik ölçekleme modülü." }}
                ];

                phantom.forEach(item => {{
                    const node = document.createElement('div');
                    node.className = "relative mb-6";
                    
                    let crossSymbol = '✗';
                    let titleColor = 'text-rose-400';
                    if (project.category === 'A') {{
                        crossSymbol = '⚡';
                        titleColor = 'text-indigo-400';
                    }}

                    node.innerHTML = `
                        <span class="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full ${{project.category === 'A' ? 'bg-indigo-500' : 'bg-rose-500'}} border-2 border-zinc-950 flex items-center justify-center text-[8px] text-zinc-950 font-bold">${{crossSymbol}}</span>
                        <span class="text-[10px] font-bold ${{titleColor}} block font-outfit">${{item.time}}</span>
                        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">${{item.event}}</p>
                    `;
                    phmContainer.appendChild(node);
                }});
            }
        }

        // Render Matrix (ALL / A / B / C)
        function renderMatrix(categoryFilter = 'ALL', searchQuery = '') {{
            activeMatrixFilter = categoryFilter;
            const tbody = document.getElementById('matrix-tbody');
            tbody.innerHTML = '';
            
            // Update button styles
            const btns = {{
                'ALL': document.getElementById('btn-m-all'),
                'A': document.getElementById('btn-m-A'),
                'B': document.getElementById('btn-m-B'),
                'C': document.getElementById('btn-m-C')
            }};
            
            Object.keys(btns).forEach(k => {{
                if (btns[k]) {{
                    btns[k].className = "px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 transition-colors font-medium";
                }}
            }});
            
            // Set active styles
            if (categoryFilter === 'ALL') {{
                btns['ALL'].className = "px-3 py-1.5 rounded-lg bg-zinc-800 text-white font-medium";
            }} else if (categoryFilter === 'A') {{
                btns['A'].className = "px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium";
            }} else if (categoryFilter === 'B') {{
                btns['B'].className = "px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium";
            }} else if (categoryFilter === 'C') {{
                btns['C'].className = "px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium";
            }}

            let filtered = categoryFilter === 'ALL' ? cases : cases.filter(c => c.category === categoryFilter);
            
            // Apply search query
            if (searchQuery.trim() !== '') {{
                const q = searchQuery.toLowerCase().trim();
                filtered = filtered.filter(c => 
                    c.name.toLowerCase().includes(q) || 
                    c.type.toLowerCase().includes(q) ||
                    c.business.toLowerCase().includes(q)
                );
            }}
            
            filtered.forEach((c, idx) => {{
                const tr = document.createElement('tr');
                tr.className = "hover:bg-zinc-900/40 border-b border-zinc-900 transition-colors";
                
                let badge = '';
                let critHtml = '';
                let lessonText = c.lesson;
                
                if (c.category === 'A') {{
                    badge = `<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">BAŞARILI</span>`;
                    const implText = c.implemented ? c.implemented.map(i => i.event).join(' &amp; ') : c.s;
                    critHtml = `<span class="text-emerald-400 font-medium">Güçlü Yön:</span> ${{implText}}`;
                }} else if (c.category === 'B') {{
                    badge = `<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">DOLANDIRICI</span>`;
                    const phaseSummary = c.fraudPhases ? c.fraudPhases.map(p => p.title).join(' ➔ ') : 'Hype ➔ Fon Aktarımı ➔ Fişi Çekme';
                    critHtml = `<span class="text-rose-400 font-medium">Dolandırıcılık Metodu:</span> ${{c.s}} <span class="text-[10px] text-zinc-500 block mt-0.5">${{phaseSummary}}</span>`;
                }} else {{
                    badge = `<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">DÜRÜST BATAN</span>`;
                    critHtml = `<span class="text-amber-400 font-medium">Neden Çöktü:</span> ${{c.w}}`;
                }}

                tr.innerHTML = `
                    <td class="py-3 px-4 font-medium flex items-center gap-3 min-w-[170px]">
                        <span class="text-zinc-600 font-mono text-[10px] w-4">${{idx + 1}}</span>
                        <span class="text-2xl">${{c.logo}}</span>
                        <div>
                            <span class="font-bold text-white block font-outfit">${{c.name}}</span>
                            <span class="text-[10px] text-zinc-500 block leading-tight">${{c.type}}</span>
                        </div>
                    </td>
                    <td class="py-3 px-4">${{badge}}</td>
                    <td class="py-3 px-4 text-zinc-300 max-w-xs leading-normal">${{c.business}}</td>
                    <td class="py-3 px-4 text-zinc-400 max-w-xs leading-normal">${{critHtml}}</td>
                    <td class="py-3 px-4 text-zinc-300 font-medium italic max-w-xs leading-normal">${{lessonText}}</td>
                `;
                tbody.appendChild(tr);
            }});
        }}
        
        function filterMatrix(category) {{
            const searchInput = document.getElementById('matrix-search');
            renderMatrix(category, searchInput.value);
            logTerminal(`[SYSTEM] Filtered global comparison matrix by Category ${{category}}.`);
        }}

        function searchMatrix() {{
            const searchInput = document.getElementById('matrix-search');
            renderMatrix(activeMatrixFilter, searchInput.value);
        }}

        // Reset Analysis Panel to Default State
        function resetAnalysisPanel() {{
            document.getElementById('analysis-default').classList.remove('hidden');
            document.getElementById('analysis-active').classList.add('hidden');
            document.getElementById('analysis-block').style.borderColor = 'rgba(63, 63, 70, 0.25)';
            
            const icon = document.getElementById('default-icon');
            if (activeTab === 'A') icon.innerText = '🪙';
            else if (activeTab === 'B') icon.innerText = '🏴‍☠️';
            else icon.innerText = '📉';
        }}

        // Log to Terminal
        function logTerminal(message) {{
            const terminal = document.getElementById('terminal-logs');
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            
            let colorClass = 'text-zinc-400';
            if (message.includes('[SUBAGENT 1]')) colorClass = 'text-blue-400';
            else if (message.includes('[SUBAGENT 2]')) colorClass = 'text-purple-400';
            else if (message.includes('[MASTER-AGENT]')) colorClass = 'text-emerald-450 text-emerald-400';
            
            const logLine = document.createElement('div');
            logLine.className = colorClass;
            logLine.innerHTML = `<span class="text-zinc-500">[${{timeStr}}]</span> ${{message}}`;
            
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
        }}

        // Initialize Page
        window.onload = () => {{
            switchTab('A');
            renderMatrix('ALL');
            logTerminal("[SYSTEM] Client Tabbed UI and Global Matrix initialized. Loaded 300 projects.");
        }};
    </script>
</body>
</html>
"""
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

# Run the generation
if __name__ == "__main__":
    target_path = r"C:\Users\feyzu\.gemini\antigravity-ide\scratch\crypto-collapse-dashboard\dashboard.html"
    generate_html_file(target_path)
    print(f"Successfully generated dashboard.html at {target_path} with 300 projects.")
