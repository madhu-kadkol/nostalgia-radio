export interface Track {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number | string;
  duration: number; // in seconds
  videoId: string;
  musicalKey?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  keyLabel?: string;
  tracks: Track[];
}

// NOTE: 100 Classic Hindi Songs organized across 7 Musical Keys.
// Each track is formatted as a single line for simple 1-line additions.
// Only songs streamed from rights-holder verified uploads with embedding enabled.
export const PLAYLISTS: Playlist[] = [
  {
    id: "d-major",
    name: "D Major Tape",
    keyLabel: "D Major",
    description: "Joyful, uplifting, romantic melodies & evergreen Kishore/Rafi classics (25 tracks)",
    tracks: [
      { id: "d1", title: "Chookar Mere Mann Ko", artist: "Kishore Kumar", film: "Yaarana", year: 1981, duration: 220, videoId: "4w9FBmbCfws", musicalKey: "D Major" },
      { id: "d2", title: "Mere Samne Wali Khidki Mein", artist: "Kishore Kumar", film: "Padosan", year: 1968, duration: 172, videoId: "MLnxo4rp2lk", musicalKey: "D Major" },
      { id: "d3", title: "Yeh Dil Na Hota Bechara", artist: "Kishore Kumar", film: "Jewel Thief", year: 1967, duration: 260, videoId: "FKRdfz466wE", musicalKey: "D Major" },
      { id: "d4", title: "Kya Hua Tera Wada", artist: "Mohammed Rafi, Sushma Shrestha", film: "Hum Kisise Kum Naheen", year: 1977, duration: 255, videoId: "Z5D1dhTMclI", musicalKey: "D Major" },
      { id: "d5", title: "Tumko Dekha To Yeh Khayal Aaya", artist: "Jagjit Singh, Chitra Singh", film: "Saath Saath", year: 1982, duration: 290, videoId: "Jc9PBgHwdII", musicalKey: "D Major" },
      { id: "d6", title: "Raat Kali Ek Khwab Mein Aayi", artist: "Kishore Kumar", film: "Buddha Mil Gaya", year: 1971, duration: 240, videoId: "0PmFXAabFzA", musicalKey: "D Major" },
      { id: "d7", title: "Hum Bewafa Hargiz Na The", artist: "Kishore Kumar", film: "Shalimar", year: 1978, duration: 242, videoId: "2CeEnk_3o5g", musicalKey: "D Major" },
      { id: "d8", title: "Mehbooba Mehbooba", artist: "R.D. Burman", film: "Sholay", year: 1975, duration: 235, videoId: "Nl9-rpuwp3E", musicalKey: "D Major" },
      { id: "d9", title: "Bhanwre Ki Gunjan", artist: "Kishore Kumar", film: "Kal Aaj Aur Kal", year: 1971, duration: 264, videoId: "tUHMjYoQ1iM", musicalKey: "D Major" },
      { id: "d10", title: "Jab Koi Baat Bigad Jaye", artist: "Kumar Sanu, Sadhana Sargam", film: "Jurm", year: 1990, duration: 310, videoId: "ln3meCI0LFM", musicalKey: "D Major" },
      { id: "d11", title: "Jahan Teri Yeh Nazar Hai", artist: "Kishore Kumar", film: "Kaalia", year: 1981, duration: 320, videoId: "DQQlWalAIqo", musicalKey: "D Major" },
      { id: "d12", title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", film: "Jo Jeeta Wohi Sikandar", year: 1992, duration: 291, videoId: "SBfPs-PMGTA", musicalKey: "D Major" },
      { id: "d13", title: "Pyar Deewana Hota Hai", artist: "Kishore Kumar", film: "Kati Patang", year: 1970, duration: 285, videoId: "yiHfWoN33c8", musicalKey: "D Major" },
      { id: "d14", title: "Samne Yeh Kaun Aaya", artist: "Kishore Kumar", film: "Jawani Diwani", year: 1972, duration: 250, videoId: "YMjtcNnXDWA", musicalKey: "D Major" },
      { id: "d15", title: "Aaj Jaane Ki Zid Na Karo", artist: "Farida Khanum", film: "Ghazal", year: 1976, duration: 340, videoId: "CfUDuYAasjE", musicalKey: "D Major" },
      { id: "d16", title: "Chala Jata Hoon", artist: "Kishore Kumar", film: "Mere Jeevan Saathi", year: 1972, duration: 270, videoId: "UNjhqT_hlbg", musicalKey: "D Major" },
      { id: "d17", title: "Ehsaan Tera Hoga Mujh Par", artist: "Mohammed Rafi", film: "Junglee", year: 1961, duration: 215, videoId: "q7n8dmvFkc0", musicalKey: "D Major" },
      { id: "d18", title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", film: "Aradhana", year: 1969, duration: 300, videoId: "6yL7e60G17c", musicalKey: "D Major" },
      { id: "d19", title: "Zindagi Ek Safar Hai Suhana", artist: "Kishore Kumar", film: "Andaz", year: 1971, duration: 260, videoId: "mzxHflxI-es", musicalKey: "D Major" },
      { id: "d20", title: "Dil Kya Kare Jab Kisi Se", artist: "Kishore Kumar", film: "Julie", year: 1975, duration: 330, videoId: "iaaBqrQrtUM", musicalKey: "D Major" },
      { id: "d21", title: "Kora Kagaz Tha Yeh Man Mera", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aradhana", year: 1969, duration: 335, videoId: "kqXs4GGp8bw", musicalKey: "D Major" },
      { id: "d22", title: "Neele Neele Ambar Par", artist: "Kishore Kumar", film: "Kalaakaar", year: 1983, duration: 315, videoId: "eVnG_Rqfgg4", musicalKey: "D Major" },
      { id: "d23", title: "Rimjhim Gire Sawan", artist: "Kishore Kumar", film: "Manzil", year: 1979, duration: 235, videoId: "kAU8_00hAhs", musicalKey: "D Major" },
      { id: "d24", title: "Aane Wala Pal Jaane Wala Hai", artist: "Kishore Kumar", film: "Gol Maal", year: 1979, duration: 280, videoId: "4xcZvqCh-ic", musicalKey: "D Major" },
      { id: "d25", title: "Main Shayar To Nahin", artist: "Shailendra Singh", film: "Bobby", year: 1973, duration: 330, videoId: "RSIpO_8v7Ds", musicalKey: "D Major" },
    ],
  },
  {
    id: "c-major",
    name: "C Major Tape",
    keyLabel: "C Major",
    description: "Pure, open, timeless anthems & reflective melodies (20 tracks)",
    tracks: [
      { id: "c1", title: "Pal Pal Dil Ke Paas", artist: "Kishore Kumar", film: "Blackmail", year: 1973, duration: 328, videoId: "AMuRRXCuy-4", musicalKey: "C Major" },
      { id: "c2", title: "Roop Tera Mastana", artist: "Kishore Kumar", film: "Aradhana", year: 1969, duration: 225, videoId: "zbvfAkJWntc", musicalKey: "C Major" },
      { id: "c3", title: "Yeh Jawani Hai Deewani", artist: "Kishore Kumar", film: "Jawani Diwani", year: 1972, duration: 280, videoId: "PVigH5kih10", musicalKey: "C Major" },
      { id: "c4", title: "Musafir Hoon Yaaron", artist: "Kishore Kumar", film: "Parichay", year: 1972, duration: 185, videoId: "Yd62azPw4hI", musicalKey: "C Major" },
      { id: "c5", title: "Papa Kehte Hain Bada Naam Karega", artist: "Udit Narayan", film: "Qayamat Se Qayamat Tak", year: 1988, duration: 355, videoId: "FEvBiayarlc", musicalKey: "C Major" },
      { id: "c6", title: "Tere Jaisa Yaar Kahan", artist: "Kishore Kumar", film: "Yaarana", year: 1981, duration: 275, videoId: "AhGGF5uN4zE", musicalKey: "C Major" },
      { id: "c7", title: "Ek Pyar Ka Nagma Hai", artist: "Mukesh, Lata Mangeshkar", film: "Shor", year: 1972, duration: 350, videoId: "H2BTCPW3Hw8", musicalKey: "C Major" },
      { id: "c8", title: "Gaata Rahe Mera Dil", artist: "Kishore Kumar, Lata Mangeshkar", film: "Guide", year: 1965, duration: 290, videoId: "63l_CnFV4Cw", musicalKey: "C Major" },
      { id: "c9", title: "Kabhi Kabhie Mere Dil Mein", artist: "Mukesh", film: "Kabhi Kabhie", year: 1976, duration: 290, videoId: "o-j2hFfLOSE", musicalKey: "C Major" },
      { id: "c10", title: "Chura Liya Hai Tumne Jo Dil Ko", artist: "Asha Bhosle, Mohammed Rafi", film: "Yaadon Ki Baaraat", year: 1973, duration: 285, videoId: "ysoXp9IcSDs", musicalKey: "C Major" },
      { id: "c11", title: "Bheegi Bheegi Raaton Mein", artist: "Kishore Kumar, Lata Mangeshkar", film: "Ajanabee", year: 1974, duration: 230, videoId: "xqrG01eFfTc", musicalKey: "C Major" },
      { id: "c12", title: "Aap Ki Ankhon Mein Kuch", artist: "Kishore Kumar, Lata Mangeshkar", film: "Ghar", year: 1978, duration: 250, videoId: "uq00EreNHYk", musicalKey: "C Major" },
      { id: "c13", title: "Kya Khoob Lagti Ho", artist: "Mukesh, Kanchan", film: "Dharmatma", year: 1975, duration: 240, videoId: "Q5k2WElNhxg", musicalKey: "C Major" },
      { id: "c14", title: "Gulaabi Aankhen Jo Teri Dekhi", artist: "Mohammed Rafi", film: "The Train", year: 1970, duration: 195, videoId: "hgi2MYAFgE8", musicalKey: "C Major" },
      { id: "c15", title: "Hawa Hawaai", artist: "Kavita Krishnamurthy", film: "Mr. India", year: 1987, duration: 420, videoId: "IgKdXLfxgQQ", musicalKey: "C Major" },
      { id: "c16", title: "Likhe Jo Khat Tujhe", artist: "Mohammed Rafi", film: "Kanyadaan", year: 1968, duration: 270, videoId: "o-CLed_7rCQ", musicalKey: "C Major" },
      { id: "c17", title: "O Saathi Re Tere Bina Bhi Kya Jeena", artist: "Kishore Kumar", film: "Muqaddar Ka Sikandar", year: 1978, duration: 270, videoId: "Wy6ec9YTO8g", musicalKey: "C Major" },
      { id: "c18", title: "Tere Chehre Mein Woh Jaadu Hai", artist: "Kishore Kumar", film: "Dharmatma", year: 1975, duration: 250, videoId: "jWcQa_JhZLg", musicalKey: "C Major" },
      { id: "c19", title: "Raina Beeti Jaaye", artist: "Lata Mangeshkar", film: "Amar Prem", year: 1972, duration: 335, videoId: "_UqpW8YE994", musicalKey: "C Major" },
      { id: "c20", title: "Chingari Koi Bhadke", artist: "Kishore Kumar", film: "Amar Prem", year: 1972, duration: 320, videoId: "VeC9L7XS4og", musicalKey: "C Major" },
    ],
  },
  {
    id: "g-major",
    name: "G Major Tape",
    keyLabel: "G Major",
    description: "Soulful, acoustic, reflective afternoon & evening melodies (15 tracks)",
    tracks: [
      { id: "g1", title: "Tera Mujhse Hai Pehle Ka", artist: "Kishore Kumar", film: "Aa Gale Lag Jaa", year: 1973, duration: 275, videoId: "3IF9o2crV84", musicalKey: "G Major" },
      { id: "g2", title: "Tujhse Naraz Nahi Zindagi", artist: "Anup Ghoshal, Lata Mangeshkar", film: "Masoom", year: 1983, duration: 340, videoId: "iiYGuARt-Jo", musicalKey: "G Major" },
      { id: "g3", title: "Yeh Shaam Mastani", artist: "Kishore Kumar", film: "Kati Patang", year: 1970, duration: 275, videoId: "wp7zOathDFo", musicalKey: "G Major" },
      { id: "g4", title: "Main Zindagi Ka Saath Nibhata", artist: "Mohammed Rafi", film: "Hum Dono", year: 1961, duration: 230, videoId: "8xLGdI9_jak", musicalKey: "G Major" },
      { id: "g5", title: "Tum Paas Aaye", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: 320, videoId: "bKZTnnFU9HA", musicalKey: "G Major" },
      { id: "g6", title: "Lag Ja Gale", artist: "Lata Mangeshkar", film: "Woh Kaun Thi?", year: 1964, duration: 255, videoId: "QE2Y7wZC_CY", musicalKey: "G Major" },
      { id: "g7", title: "Pardesia Yeh Sach Hai Piya", artist: "Lata Mangeshkar, Kishore Kumar", film: "Mr. Natwarlal", year: 1979, duration: 290, videoId: "G_asMLk8SX0", musicalKey: "G Major" },
      { id: "g8", title: "Jaane Kahan Gaye Woh Din", artist: "Mukesh", film: "Mera Naam Joker", year: 1970, duration: 225, videoId: "tbYf5jRn3mc", musicalKey: "G Major" },
      { id: "g9", title: "Deewana Hua Badal", artist: "Mohammed Rafi, Asha Bhosle", film: "Kashmir Ki Kali", year: 1964, duration: 350, videoId: "CM2a-lRaYDw", musicalKey: "G Major" },
      { id: "g10", title: "Suno Kaho Suna", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aap Ki Kasam", year: 1974, duration: 260, videoId: "abcMueS_Siw", musicalKey: "G Major" },
      { id: "g11", title: "Bade Acche Lagte Hai", artist: "Amit Kumar", film: "Balika Badhu", year: 1976, duration: 230, videoId: "8HMTJbaFdsQ", musicalKey: "G Major" },
      { id: "g12", title: "Kitna Haseen Chehra", artist: "Kumar Sanu", film: "Dilwale", year: 1994, duration: 340, videoId: "NzZxyWr9OA4", musicalKey: "G Major" },
      { id: "g13", title: "Humein Tumse Pyaar Kitna", artist: "Kishore Kumar", film: "Kudrat", year: 1981, duration: 240, videoId: "065XvnmiSVI", musicalKey: "G Major" },
      { id: "g14", title: "Aap Jaisa Koi Meri Zindagi Mein Aaye", artist: "Nazia Hassan", film: "Qurbani", year: 1980, duration: 245, videoId: "z-nc1VqiuF4", musicalKey: "G Major" },
      { id: "g15", title: "Kahin Door Jab Din Dhal Jaye", artist: "Mukesh", film: "Anand", year: 1971, duration: 335, videoId: "ALcunSNj794", musicalKey: "G Major" },
    ],
  },
  {
    id: "f-major",
    name: "F Major Tape",
    keyLabel: "F Major",
    description: "Warm, nostalgic, deeply evocative golden era cinema (15 tracks)",
    tracks: [
      { id: "f1", title: "Ajeeb Dastan Hai Yeh", artist: "Lata Mangeshkar", film: "Dil Apna Aur Preet Parai", year: 1960, duration: 315, videoId: "AU-hut9lGQ4", musicalKey: "F Major" },
      { id: "f2", title: "Madhuban Mein Radhika Nache Re", artist: "Mohammed Rafi", film: "Kohinoor", year: 1960, duration: 360, videoId: "1aCWGqUcP3o", musicalKey: "F Major" },
      { id: "f3", title: "Awaara Hoon", artist: "Mukesh", film: "Awaara", year: 1951, duration: 185, videoId: "Q3Sy8rdD_3Y", musicalKey: "F Major" },
      { id: "f4", title: "Aajkal Tere Mere Pyar Ke Charche", artist: "Mohammed Rafi, Suman Kalyanpur", film: "Brahmachari", year: 1968, duration: 305, videoId: "lndSL5RbkRg", musicalKey: "F Major" },
      { id: "f5", title: "Ek Ajnabee Haseena Se", artist: "Kishore Kumar", film: "Ajanabee", year: 1974, duration: 260, videoId: "vS_JXshiu68", musicalKey: "F Major" },
      { id: "f6", title: "Isharon Isharon Mein Dil Lene Wale", artist: "Mohammed Rafi, Asha Bhosle", film: "Kashmir Ki Kali", year: 1964, duration: 305, videoId: "YeV4QrHlgCg", musicalKey: "F Major" },
      { id: "f7", title: "Meri Umar Ke Naujawano", artist: "Kishore Kumar", film: "Karz", year: 1980, duration: 410, videoId: "LKCuJcjqOwI", musicalKey: "F Major" },
      { id: "f8", title: "Tum Aa Gaye Ho Noor Aa Gaya Hai", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aandhi", year: 1975, duration: 250, videoId: "UB3hmT5-Tqo", musicalKey: "F Major" },
      { id: "f9", title: "Piya Tose Naina Laage Re", artist: "Lata Mangeshkar", film: "Guide", year: 1965, duration: 490, videoId: "j0d-Rwr1FYA", musicalKey: "F Major" },
      { id: "f10", title: "Mera Joota Hai Japani", artist: "Mukesh", film: "Shree 420", year: 1955, duration: 270, videoId: "fy7P_Uu3alA", musicalKey: "F Major" },
      { id: "f11", title: "Suhana Safar Aur Yeh Mausam Haseen", artist: "Mukesh", film: "Madhumati", year: 1958, duration: 225, videoId: "pK2WFw8nypc", musicalKey: "F Major" },
      { id: "f12", title: "Zindagi Kaisi Hai Paheli", artist: "Manna Dey", film: "Anand", year: 1971, duration: 220, videoId: "cP44iDZZ_wY", musicalKey: "F Major" },
      { id: "f13", title: "Dum Maro Dum", artist: "Asha Bhosle", film: "Hare Rama Hare Krishna", year: 1971, duration: 155, videoId: "_B4PaAaLERE", musicalKey: "F Major" },
      { id: "f14", title: "Jai Jai Shiv Shankar", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aap Ki Kasam", year: 1974, duration: 335, videoId: "bGSvN6AEtBc", musicalKey: "F Major" },
      { id: "f15", title: "Yeh Kya Hua Kaise Hua", artist: "Kishore Kumar", film: "Amar Prem", year: 1972, duration: 270, videoId: "BmAoNKeI6ZQ", musicalKey: "F Major" },
    ],
  },
  {
    id: "a-major",
    name: "A Major Tape",
    keyLabel: "A Major",
    description: "Romantic, tender, breezy acoustic melodies (10 tracks)",
    tracks: [
      { id: "a1", title: "Tere Bina Zindagi Se Koi Shikwa", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aandhi", year: 1975, duration: 350, videoId: "dLgmfolMaKc", musicalKey: "A Major" },
      { id: "a2", title: "Kuch Na Kaho", artist: "Kumar Sanu", film: "1942: A Love Story", year: 1994, duration: 362, videoId: "I2NKqUvAwpE", musicalKey: "A Major" },
      { id: "a3", title: "Do Dil Mil Rahe Hain", artist: "Kumar Sanu", film: "Pardes", year: 1997, duration: 395, videoId: "5SvIuD6wJRI", musicalKey: "A Major" },
      { id: "a4", title: "Chand Si Mehbooba Hogi Meri", artist: "Mukesh", film: "Himalay Ki Godmein", year: 1965, duration: 240, videoId: "9DfuKXJNCyM", musicalKey: "A Major" },
      { id: "a5", title: "Main Pal Do Pal Ka Shayar Hoon", artist: "Mukesh", film: "Kabhi Kabhie", year: 1976, duration: 210, videoId: "kxT-5glSScc", musicalKey: "A Major" },
      { id: "a6", title: "Ek Haseena Thi Ek Deewana Tha", artist: "Kishore Kumar, Asha Bhosle", film: "Karz", year: 1980, duration: 460, videoId: "CI1fR6bO5DI", musicalKey: "A Major" },
      { id: "a7", title: "Pyaar Manga Hai Tumhi Se", artist: "Kishore Kumar", film: "College Girl", year: 1978, duration: 305, videoId: "xPl-cM2dDj0", musicalKey: "A Major" },
      { id: "a8", title: "Tum Itna Jo Muskura Rahe Ho", artist: "Jagjit Singh", film: "Arth", year: 1982, duration: 320, videoId: "C8eAKT-zQXk", musicalKey: "A Major" },
      { id: "a9", title: "Pyar Hua Iqrar Hua", artist: "Manna Dey, Lata Mangeshkar", film: "Shree 420", year: 1955, duration: 260, videoId: "X3Twhs6Tnws", musicalKey: "A Major" },
      { id: "a10", title: "Babul Ki Duayen Leti Ja", artist: "Mohammed Rafi", film: "Neel Kamal", year: 1968, duration: 300, videoId: "llMbGE2iYd8", musicalKey: "A Major" },
    ],
  },
  {
    id: "e-major",
    name: "E Major Tape",
    keyLabel: "E Major",
    description: "Bright, energetic & legendary romantic duets (8 tracks)",
    tracks: [
      { id: "e1", title: "Ek Din Aap Yun Humko Mil Jayenge", artist: "Kumar Sanu, Alka Yagnik", film: "Yes Boss", year: 1997, duration: 290, videoId: "90Q5bMN6u2w", musicalKey: "E Major" },
      { id: "e2", title: "Dard-E-Dil Dard-E-Jigar", artist: "Mohammed Rafi", film: "Karz", year: 1980, duration: 420, videoId: "uMWRl5c1brI", musicalKey: "E Major" },
      { id: "e3", title: "Khoya Khoya Chand", artist: "Mohammed Rafi", film: "Kala Bazar", year: 1960, duration: 280, videoId: "jgINHfzMQuQ", musicalKey: "E Major" },
      { id: "e4", title: "Baar Baar Dekho Hazaar Baar Dekho", artist: "Mohammed Rafi", film: "China Town", year: 1962, duration: 300, videoId: "xFWq3QWKDMs", musicalKey: "E Major" },
      { id: "e5", title: "Aao Twist Karein", artist: "Manna Dey", film: "Bhoot Bungla", year: 1965, duration: 250, videoId: "lokpohoCyF8", musicalKey: "E Major" },
      { id: "e6", title: "Taarif Karoon Kya Uski", artist: "Mohammed Rafi", film: "Kashmir Ki Kali", year: 1964, duration: 320, videoId: "dIEXIq9fTHQ", musicalKey: "E Major" },
      { id: "e7", title: "Chup Gaye Saare Nazaare", artist: "Mohammed Rafi, Lata Mangeshkar", film: "Do Raaste", year: 1969, duration: 310, videoId: "Kjkg9NlUpeM", musicalKey: "E Major" },
      { id: "e8", title: "Pardesiyon Se Na Ankhiyan Milana", artist: "Mohammed Rafi", film: "Jab Jab Phool Khile", year: 1965, duration: 200, videoId: "tO98OO8LUZA", musicalKey: "E Major" },
    ],
  },
  {
    id: "b-major",
    name: "B Major Tape",
    keyLabel: "B Major",
    description: "Rich, resonant ghazals & intimate late-night acoustic scales (7 tracks)",
    tracks: [
      { id: "b1", title: "Abhi Na Jao Chhod Kar", artist: "Mohammed Rafi, Asha Bhosle", film: "Hum Dono", year: 1961, duration: 255, videoId: "CIIW0qm6H80", musicalKey: "B Major" },
      { id: "b2", title: "Lag Ja Gale (Acoustic Scale)", artist: "Lata Mangeshkar", film: "Woh Kaun Thi?", year: 1964, duration: 255, videoId: "QE2Y7wZC_CY", musicalKey: "B Major" },
      { id: "b3", title: "O Mere Dil Ke Chain", artist: "Kishore Kumar", film: "Mere Jeevan Saathi", year: 1972, duration: 275, videoId: "5eyflIV8pzM", musicalKey: "B Major" },
      { id: "b4", title: "Hothon Se Chhu Lo Tum", artist: "Jagjit Singh", film: "Prem Geet", year: 1981, duration: 300, videoId: "UvYcuPGosWg", musicalKey: "B Major" },
      { id: "b5", title: "Chaudhvin Ka Chand Ho", artist: "Mohammed Rafi", film: "Chaudhvin Ka Chand", year: 1960, duration: 220, videoId: "Iz8E5cFYfZE", musicalKey: "B Major" },
      { id: "b6", title: "Tere Bina Zindagi Se (Acoustic Scale)", artist: "Kishore Kumar, Lata Mangeshkar", film: "Aandhi", year: 1975, duration: 350, videoId: "dLgmfolMaKc", musicalKey: "B Major" },
      { id: "b7", title: "Yeh Kahan Aa Gaye Hum", artist: "Lata Mangeshkar, Amitabh Bachchan", film: "Silsila", year: 1981, duration: 460, videoId: "kzS-_YiqXTc", musicalKey: "B Major" },
    ],
  },
];
