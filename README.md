# አበጋዝ ሞተርስ ኢንጂነሪንግ — የድረ-ገጽ ስርዓት (Abegaz Motors Engineering)
**Wise Digital Marketing · Version 1.0 Production Ready Implementation**

ይህ ፕሮጀክት በ «አበጋዝ ሞተርስ ኢንጂነሪንግ — የድረ-ገጽ ዲዛይን እቅድ» መሰረት የተገነባ ሙሉና ዝግጁ የድረ-ገጽ፣ የቀጠሮ ስርዓት (Booking Wizard)፣ Customer Account፣ Admin እና Staff Dashboard ስብስብ ነው።

---

## 🚀 እንዴት ማስጀመር ይቻላል (Quick Start)

1. **ወደ ፎልደሩ ይግቡ፦**
   ```bash
   cd c:\Users\hp\Downloads\python\abegaz-motors
   ```

2. **የዲቨሎፕመንት ሰርቨር ያስጀምሩ፦**
   ```bash
   npm run dev
   ```
   *አሳሽዎን (Browser) በ `http://localhost:3000` ይክፈቱ።*

3. **Production Build ለማዘጋጀት፦**
   ```bash
   npm run build
   ```

---

## 🎨 የዲዛይን ስርዓት (Design System & Color System)

በ 60 · 30 · 10 ህግ መሰረት የተዋቀረ፦
* **Graphite Navy (`#0F172A`)**: Hero፣ Footer፣ ጥቁር Section፣ ዋና ርዕስ ጽሑፍ።
* **Slate (`#1E293B`)**: Cards፣ Admin sidebar።
* **Signal Orange (`#F97316`)**: ዋና ቁልፍ (CTA)፣ ትኩረት፣ active ምልክት።
* **Orange Deep (`#C2410C`)**: Hover፣ የጽሑፍ link።
* **Orange Tint (`#FFF1E6`)**: ለስላሳ highlight ዳራ፣ የተመረጠ card።
* **White (`#FFFFFF`) & Mist (`#F4F6F9`)**: ዋና ዳራና Section ዳራ።
* **Typography**: Plus Jakarta Sans (ርዕስ)፣ Inter (እንግሊዝኛ አካል)፣ Noto Sans Ethiopic (የአማርኛ ፊደላት)።

---

## 📱 የተካተቱ ገጾችና ክፍሎች (Covered Features)

1. **Header & Navigation (PC, Tablet, Mobile)**:
   * 🖥 PC: 72px፣ ስስ Info bar (ስልክ፣ ሰዓት፣ አድራሻ)፣ የቋንቋ መቀየሪያ (`EN | አማ`)፣ Account icon፣ Admin/Staff portal shortcuts።
   * 📱 Mobile: ቋሚ የ Menu Drawer እና ከታች ቋሚ **Sticky Action Bar** (📞 ደውል | ✈ Telegram | 📅 ቀጠሮ ይያዙ)።

2. **Home Page (`/`)**:
   * Hero ከ Quick Booking Card ጋር
   * Trust Strip (12+ ዓመት ልምድ፣ 6,500+ መኪኖች፣ 99.4% እርካታ)
   * 6 ዋና ዋና አገልግሎቶች (Featured Services)
   * Why Choose Us (4 ጥቅሞች)
   * How Booking Works (01 ➔ 02 ➔ 03 ➔ 04 አግድም ሂደት)
   * Packages Preview (ተመራጭ ባጅ ያለው)
   * Before/After Interactive Comparison Slider (በፊትና በኋላ እጀታውን በመጎተት ማነፃፀሪያ)
   * Testimonials (የደንበኞች ምስክርነት)
   * Final CTA Band

3. **Services (`/services`)**:
   * Category Filter Chips (ሞተር፣ ኤሌክትሪክ፣ ብሬክ፣ ምርመራ፣ መደበኛ ጥገና፣ ቦዲ)
   * Service Cards (ግምታዊ ጊዜና ዋጋ)
   * Interactive Service Detail Side Drawer
   * ለድርጅቶችና ፍሊት (Corporate Fleets) ካርድ

4. **Packages (`/packages`)**:
   * የግል መኪና vs ድርጅት/ፍሊት መቀያየሪያ
   * 3 የተሟሉ ጥቅሎች (Basic Care, Precision Master, Fleet Pro)
   * ሙሉ የማወዳደሪያ ሰንጠረዥ (Comparison Matrix Table)
   * ሚኒ FAQ እና የቴሌግራም አማካሪ CTA

5. **Booking Wizard (`/book`) — 5 ደረጃ የቀጠሮ ስርዓት**:
   * ደረጃ ①: አገልግሎት ወይም ጥቅል መምረጥ (የግል/ድርጅት፣ "እርግጠኛ አይደለሁም" fallback)
   * ደረጃ ②: የመኪና አምራች (Make Searchable Select)፣ ሞዴል፣ የሰሌዳ ቁጥር (Auto-Capitalized)፣ ዓመት
   * ደረጃ ③: የችግር ፈጣን ምልክቶች (Tags)፣ ዝርዝር መግለጫና የፎቶ መስቀያ (ከነ ማስወገጃው)
   * ደረጃ ④: የቀንና ሰዓት መምረጫ — **የኢትዮጵያ ካላንደርና ሰዓት** ጎን ለጎን ማሳያ (ምሳሌ፡ `ጥቅምት 27 ቀን 2019` እና `09:00 (3:00 ጠዋት)`)
   * ደረጃ ⑤: ማጠቃለያ፣ የመገናኛ መረጃና **Telegram Bot Deep-Link የማገናኛ ሲሙሌተር**
   * **Success ማያ**: ትልቅ ✔፣ ልዩ የቀጠሮ መለያ ቁጥር (ምሳሌ `ABG-2026-0042`) ከቅጂ ቁልፍ ጋር፣ የሁኔታ ባጅ 🟡 በመጠባበቅ ላይ፣ ቀጣይ 3 እርምጃዎችና የኢሜይል/ቴሌግራም መላኪያ ማረጋገጫዎች።

6. **Customer Portal (`/account`)**:
   * የኔ ቀጠሮዎች ዝርዝር በሁኔታ ማጣሪያ (በመጠባበቅ፣ የጸደቁ፣ በስራ ላይ፣ የተጠናቀቁ)
   * የቀጠሮ ቋሚ የስራ ሂደት ታይምላይን (Timeline)
   * ከጸደቀ: አረንጓዴ ካርድ ከካርታ አቅጣጫ ቁልፍ ጋር፤ ውድቅ ከሆነ: ምክንያትና ዳግም መመዝገቢያ ቁልፍ
   * የግል መገለጫና የ Telegram ግንኙነት አስተዳዳሪ

7. **Admin Dashboard (`/admin`)**:
   * 4 KPI ካርዶችና «ትኩረት የሚሹ አዳዲስ ጥያቄዎች»
   * Appointments ዝርዝር ሰንጠረዥ ከፍለጋ (Search) እና ማጣሪያ ጋር
   * የቀጠሮ ግምገማ 480px Side Drawer
   * **አጽድቅ (Approve) Modal**: ለደንበኛው የሚላክ ማስታወሻ ቅድመ-እይታ ጋር
   * **ውድቅ (Reject) Modal**: የግዴታ የውድቅ ምክንያት ማስገቢያ
   * ሳምንታዊ የስራ ሰዓትና የኢትዮጵያ ህዝባዊ በዓላት (Closed Dates) አስተዳደር
   * የተላኩ የኢሜይልና ቴሌግራም ማሳወቂያዎች መዝገብ (Logs)

8. **Staff Workshop Portal (`/staff`)**:
   * Tablet-First ዲዛይን — በወርክሾፕ ውስጥ በቆሸሸ እጅ ለመንካት የሚመቹ ትላልቅ ቁልፎች (≥ 56px)
   * «ቀጣይ ተረኛ መኪና» ፈጣን የደውል ቁልፍ ያለው ካርድ
   * የቀጠሮ ሁኔታዎችን በቀጥታ የማዘመን ፍሰት (በመጠባበቅ ➔ በስራ ላይ ➔ ተጠናቋል)

9. **Live Telegram & Email Notification Simulator**:
   * በ Header ወይም Admin ዳሽቦርድ ላይ ያለውን `Demo Simulator` በመጫን በቅጽበት ደንበኞችና ሰራተኞች በስልካቸው የሚያዩትን የቴሌግራም መልእክትና የ React Email ቅርጸት በቀጥታ መሞከር ይችላሉ።
