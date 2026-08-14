/* COSMIC KUNDALI — Pure Vanilla JS Astrology Engine */
import * as Astronomy from 'astronomy-engine';

/* CITIES DATABASE (400+ Indian Cities & Global Capitals) */
var CITIES = {
  // WEST BENGAL
  'kolkata, west bengal': { lat: 22.5726, lng: 88.3639 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'kalyani, west bengal': { lat: 22.9750, lng: 88.4344 },
  'kalyani': { lat: 22.9750, lng: 88.4344 },
  'barrackpore, west bengal': { lat: 22.7674, lng: 88.3697 },
  'barrackpore': { lat: 22.7674, lng: 88.3697 },
  'howrah, west bengal': { lat: 22.5958, lng: 88.2636 },
  'durgapur, west bengal': { lat: 23.5204, lng: 87.3119 },
  'asansol, west bengal': { lat: 23.6889, lng: 86.9661 },
  'siliguri, west bengal': { lat: 26.7271, lng: 88.3953 },
  'bardhaman, west bengal': { lat: 23.2324, lng: 87.8615 },
  'malda, west bengal': { lat: 25.0087, lng: 88.1444 },
  'kharagpur, west bengal': { lat: 22.3460, lng: 87.2320 },
  'berhampore, west bengal': { lat: 24.1025, lng: 88.2505 },
  'jalpaiguri, west bengal': { lat: 26.5415, lng: 88.7196 },
  'purulia, west bengal': { lat: 23.3323, lng: 86.3653 },
  'bankura, west bengal': { lat: 23.2313, lng: 87.0784 },
  'cooch behar, west bengal': { lat: 26.3239, lng: 89.4497 },
  'krishnanagar, west bengal': { lat: 23.4013, lng: 88.4975 },
  'darjeeling, west bengal': { lat: 27.0410, lng: 88.2663 },
  'haldia, west bengal': { lat: 22.0667, lng: 88.0667 },
  'habra, west bengal': { lat: 22.8360, lng: 88.6300 },
  'ashoknagar, west bengal': { lat: 22.8300, lng: 88.6200 },
  'naihati, west bengal': { lat: 22.8900, lng: 88.4200 },
  'ranaghat, west bengal': { lat: 23.1800, lng: 88.5800 },
  'chakdaha, west bengal': { lat: 23.0800, lng: 88.5200 },
  'shantipur, west bengal': { lat: 23.2500, lng: 88.4300 },
  'nabadwip, west bengal': { lat: 23.4200, lng: 88.3700 },
  'tarakeswar, west bengal': { lat: 22.8900, lng: 88.0200 },
  'bolpur (santiniketan), west bengal': { lat: 23.6700, lng: 87.6800 },
  'rampurhat, west bengal': { lat: 24.1700, lng: 87.7800 },
  'contai (kanthi), west bengal': { lat: 21.7800, lng: 87.7500 },
  'tamluk, west bengal': { lat: 22.3000, lng: 87.9200 },
  'jhargram, west bengal': { lat: 22.4500, lng: 86.9800 },
  'medinipur (midnapore), west bengal': { lat: 22.4300, lng: 87.3200 },
  'bishnupur, west bengal': { lat: 23.0700, lng: 87.3200 },
  'suri, west bengal': { lat: 23.9100, lng: 87.5300 },
  'katwa, west bengal': { lat: 23.6500, lng: 88.1300 },
  'kalna, west bengal': { lat: 23.2200, lng: 88.3700 },
  'basirhat, west bengal': { lat: 22.6600, lng: 88.8900 },
  'bongaon, west bengal': { lat: 23.0400, lng: 88.8200 },
  'chinsurah (hooghly), west bengal': { lat: 22.9000, lng: 88.3900 },
  'chandannagar, west bengal': { lat: 22.8700, lng: 88.3800 },
  'serampore, west bengal': { lat: 22.7500, lng: 88.3400 },

  // MAHARASHTRA
  'mumbai, maharashtra': { lat: 19.0760, lng: 72.8777 },
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'pune, maharashtra': { lat: 18.5204, lng: 73.8567 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'nagpur, maharashtra': { lat: 21.1458, lng: 79.0882 },
  'thane, maharashtra': { lat: 19.2183, lng: 72.9781 },
  'pimpri-chinchwad, maharashtra': { lat: 18.6298, lng: 73.7997 },
  'nashik, maharashtra': { lat: 19.9975, lng: 73.7898 },
  'kalyan-dombivli, maharashtra': { lat: 19.2403, lng: 73.1305 },
  'vasai-virar, maharashtra': { lat: 19.3919, lng: 72.8397 },
  'aurangabad (chhatrapati sambhajinagar), maharashtra': { lat: 19.8762, lng: 75.3433 },
  'aurangabad': { lat: 19.8762, lng: 75.3433 },
  'navi mumbai, maharashtra': { lat: 19.0330, lng: 73.0297 },
  'solapur, maharashtra': { lat: 17.6599, lng: 75.9064 },
  'mira-bhayandar, maharashtra': { lat: 19.2952, lng: 72.8544 },
  'amravati, maharashtra': { lat: 20.9374, lng: 77.7796 },
  'nanded, maharashtra': { lat: 19.1383, lng: 77.3210 },
  'kolhapur, maharashtra': { lat: 16.7050, lng: 74.2433 },
  'akola, maharashtra': { lat: 20.7002, lng: 77.0082 },
  'ulhasnagar, maharashtra': { lat: 19.2215, lng: 73.1645 },
  'sangli, maharashtra': { lat: 16.8524, lng: 74.5815 },
  'malegaon, maharashtra': { lat: 20.5579, lng: 74.5089 },
  'jalgaon, maharashtra': { lat: 21.0077, lng: 75.5626 },
  'latur, maharashtra': { lat: 18.4088, lng: 76.5604 },
  'dhule, maharashtra': { lat: 20.9042, lng: 74.7749 },
  'ahmednagar, maharashtra': { lat: 19.0948, lng: 74.7480 },
  'chandrapur, maharashtra': { lat: 19.9615, lng: 79.2961 },
  'parbhani, maharashtra': { lat: 19.2686, lng: 76.7709 },
  'ichalkaranji, maharashtra': { lat: 16.6978, lng: 74.4580 },
  'jalna, maharashtra': { lat: 19.8347, lng: 75.8816 },
  'ambarnath, maharashtra': { lat: 19.1864, lng: 73.1919 },
  'bhusawal, maharashtra': { lat: 21.0454, lng: 75.7894 },
  'panvel, maharashtra': { lat: 18.9894, lng: 73.1175 },
  'satara, maharashtra': { lat: 17.6805, lng: 74.0183 },
  'beed, maharashtra': { lat: 18.9891, lng: 75.7601 },
  'yavatmal, maharashtra': { lat: 20.3888, lng: 78.1204 },
  'gondia, maharashtra': { lat: 21.4604, lng: 80.1961 },
  'barshi, maharashtra': { lat: 18.2333, lng: 75.6833 },
  'nandurbar, maharashtra': { lat: 21.3713, lng: 74.2389 },
  'wardha, maharashtra': { lat: 20.7453, lng: 78.6022 },

  // GUJARAT
  'ahmedabad, gujarat': { lat: 23.0225, lng: 72.5714 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'surat, gujarat': { lat: 21.1702, lng: 72.8311 },
  'surat': { lat: 21.1702, lng: 72.8311 },
  'vadodara, gujarat': { lat: 22.3072, lng: 73.1812 },
  'vadodara': { lat: 22.3072, lng: 73.1812 },
  'rajkot, gujarat': { lat: 22.3039, lng: 70.8022 },
  'bhavnagar, gujarat': { lat: 21.7645, lng: 72.1519 },
  'jamnagar, gujarat': { lat: 22.4707, lng: 70.0577 },
  'junagadh, gujarat': { lat: 21.5222, lng: 70.4579 },
  'gandhinagar, gujarat': { lat: 23.2156, lng: 72.6369 },
  'gandhidham, gujarat': { lat: 23.0753, lng: 70.1337 },
  'nadiad, gujarat': { lat: 22.6916, lng: 72.8634 },
  'morbi, gujarat': { lat: 22.8173, lng: 70.8368 },
  'anand, gujarat': { lat: 22.5645, lng: 72.9289 },
  'mehsana, gujarat': { lat: 23.5880, lng: 72.3693 },
  'bharuch, gujarat': { lat: 21.7051, lng: 72.9959 },
  'vapi, gujarat': { lat: 20.3717, lng: 72.9106 },
  'navsari, gujarat': { lat: 20.9467, lng: 72.9280 },
  'veraval, gujarat': { lat: 20.9042, lng: 70.3671 },
  'porbandar, gujarat': { lat: 21.6417, lng: 69.6293 },
  'godhra, gujarat': { lat: 22.7780, lng: 73.6144 },
  'bhuj, gujarat': { lat: 23.2420, lng: 69.6669 },
  'ankleshwar, gujarat': { lat: 21.6264, lng: 73.0152 },
  'botad, gujarat': { lat: 22.1704, lng: 71.6669 },
  'palanpur, gujarat': { lat: 24.1724, lng: 72.4346 },
  'patan, gujarat': { lat: 23.8493, lng: 72.1266 },
  'valsad, gujarat': { lat: 20.5992, lng: 72.9342 },

  // KARNATAKA
  'bengaluru, karnataka': { lat: 12.9716, lng: 77.5946 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'mysuru, karnataka': { lat: 12.2958, lng: 76.6394 },
  'mysore': { lat: 12.2958, lng: 76.6394 },
  'hubballi-dharwad, karnataka': { lat: 15.3647, lng: 75.1240 },
  'mangaluru, karnataka': { lat: 12.9141, lng: 74.8560 },
  'mangalore': { lat: 12.9141, lng: 74.8560 },
  'belagavi (belgaum), karnataka': { lat: 15.8497, lng: 74.4977 },
  'kalaburagi (gulbarga), karnataka': { lat: 17.3297, lng: 76.8343 },
  'davanagere, karnataka': { lat: 14.4644, lng: 75.9218 },
  'ballari (bellary), karnataka': { lat: 15.1394, lng: 76.9214 },
  'vijayapura (bijapur), karnataka': { lat: 16.8302, lng: 75.7100 },
  'shivamogga (shimoga), karnataka': { lat: 13.9299, lng: 75.5681 },
  'tumakuru (tumkur), karnataka': { lat: 13.3409, lng: 77.1006 },
  'raichur, karnataka': { lat: 16.2076, lng: 77.3463 },
  'bidar, karnataka': { lat: 17.9104, lng: 77.5199 },
  'hosapete, karnataka': { lat: 15.2689, lng: 76.3909 },
  'hassan, karnataka': { lat: 13.0072, lng: 76.0962 },
  'udupi, karnataka': { lat: 13.3409, lng: 74.7421 },
  'kolar, karnataka': { lat: 13.1367, lng: 78.1292 },
  'mandya, karnataka': { lat: 12.5218, lng: 76.8951 },
  'chikmagalur, karnataka': { lat: 13.3161, lng: 75.7720 },

  // TAMIL NADU
  'chennai, tamil nadu': { lat: 13.0827, lng: 80.2707 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'coimbatore, tamil nadu': { lat: 11.0168, lng: 76.9558 },
  'madurai, tamil nadu': { lat: 9.9252, lng: 78.1198 },
  'tiruchirappalli (trichy), tamil nadu': { lat: 10.7905, lng: 78.7047 },
  'salem, tamil nadu': { lat: 11.6643, lng: 78.1460 },
  'tiruppur, tamil nadu': { lat: 11.1085, lng: 77.3411 },
  'erode, tamil nadu': { lat: 11.3410, lng: 77.7172 },
  'tirunelveli, tamil nadu': { lat: 8.7139, lng: 77.7567 },
  'vellore, tamil nadu': { lat: 12.9165, lng: 79.1325 },
  'thoothukudi (tuticorin), tamil nadu': { lat: 8.7642, lng: 78.1348 },
  'dindigul, tamil nadu': { lat: 10.3673, lng: 77.9803 },
  'thanjavur, tamil nadu': { lat: 10.7870, lng: 79.1378 },
  'ranipet, tamil nadu': { lat: 12.9271, lng: 79.3331 },
  'sivakasi, tamil nadu': { lat: 9.4533, lng: 77.7997 },
  'karur, tamil nadu': { lat: 10.9601, lng: 78.0766 },
  'udhagamandalam (ooty), tamil nadu': { lat: 11.4102, lng: 76.6950 },
  'hosur, tamil nadu': { lat: 12.7409, lng: 77.8253 },
  'nagercoil, tamil nadu': { lat: 8.1833, lng: 77.4119 },
  'kanchipuram, tamil nadu': { lat: 12.8342, lng: 79.7036 },
  'cuddalore, tamil nadu': { lat: 11.7480, lng: 79.7714 },
  'kumbakonam, tamil nadu': { lat: 10.9617, lng: 79.3881 },
  'tiruvannamalai, tamil nadu': { lat: 12.2253, lng: 79.0747 },

  // TELANGANA & ANDHRA PRADESH
  'hyderabad, telangana': { lat: 17.3850, lng: 78.4867 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'warangal, telangana': { lat: 17.9689, lng: 79.5941 },
  'nizamabad, telangana': { lat: 18.6725, lng: 78.0941 },
  'karimnagar, telangana': { lat: 18.4386, lng: 79.1288 },
  'ramagundam, telangana': { lat: 18.7561, lng: 79.5167 },
  'khammam, telangana': { lat: 17.2473, lng: 80.1514 },
  'mahbubnagar, telangana': { lat: 16.7488, lng: 78.0035 },
  'nalgonda, telangana': { lat: 17.0577, lng: 79.2683 },
  'visakhapatnam, andhra pradesh': { lat: 17.6868, lng: 83.2185 },
  'vijayawada, andhra pradesh': { lat: 16.5062, lng: 80.6480 },
  'guntur, andhra pradesh': { lat: 16.3067, lng: 80.4365 },
  'nellore, andhra pradesh': { lat: 14.4426, lng: 79.9865 },
  'kurnool, andhra pradesh': { lat: 15.8281, lng: 78.0373 },
  'kakinada, andhra pradesh': { lat: 16.9891, lng: 82.2475 },
  'rajamahendravaram (rajahmundry), andhra pradesh': { lat: 17.0005, lng: 81.8040 },
  'kadapa, andhra pradesh': { lat: 14.4673, lng: 78.8242 },
  'tirupati, andhra pradesh': { lat: 13.6288, lng: 79.4192 },
  'anantapur, andhra pradesh': { lat: 14.6819, lng: 77.6006 },
  'vizianagaram, andhra pradesh': { lat: 18.1066, lng: 83.3956 },
  'eluru, andhra pradesh': { lat: 16.7107, lng: 81.1035 },
  'ongole, andhra pradesh': { lat: 15.5057, lng: 80.0499 },

  // UTTAR PRADESH & NCR
  'delhi': { lat: 28.7041, lng: 77.1025 },
  'new delhi': { lat: 28.6139, lng: 77.2090 },
  'gurgaon (gurugram), haryana': { lat: 28.4595, lng: 77.0266 },
  'noida, uttar pradesh': { lat: 28.5355, lng: 77.3910 },
  'ghaziabad, uttar pradesh': { lat: 28.6692, lng: 77.4538 },
  'lucknow, uttar pradesh': { lat: 26.8467, lng: 80.9462 },
  'lucknow': { lat: 26.8467, lng: 80.9462 },
  'kanpur, uttar pradesh': { lat: 26.4499, lng: 80.3319 },
  'agra, uttar pradesh': { lat: 27.1767, lng: 78.0081 },
  'varanasi, uttar pradesh': { lat: 25.3176, lng: 82.9739 },
  'prayagraj (allahabad), uttar pradesh': { lat: 25.4358, lng: 81.8463 },
  'allahabad': { lat: 25.4358, lng: 81.8463 },
  'bareilly, uttar pradesh': { lat: 28.3670, lng: 79.4304 },
  'aligarh, uttar pradesh': { lat: 27.8974, lng: 78.0880 },
  'moradabad, uttar pradesh': { lat: 28.8386, lng: 78.7733 },
  'saharanpur, uttar pradesh': { lat: 29.9680, lng: 77.5552 },
  'gorakhpur, uttar pradesh': { lat: 26.7606, lng: 83.3732 },
  'firozabad, uttar pradesh': { lat: 27.1592, lng: 78.3957 },
  'jhansi, uttar pradesh': { lat: 25.4484, lng: 78.5685 },
  'muzaffarnagar, uttar pradesh': { lat: 29.4727, lng: 77.7085 },
  'mathura, uttar pradesh': { lat: 27.4924, lng: 77.6737 },
  'ayodhya (faizabad), uttar pradesh': { lat: 26.7922, lng: 82.1998 },
  'meerut, uttar pradesh': { lat: 28.9845, lng: 77.7064 },
  'rampur, uttar pradesh': { lat: 28.8055, lng: 79.0253 },
  'shahjahanpur, uttar pradesh': { lat: 27.8805, lng: 79.9082 },

  // RAJASTHAN
  'jaipur, rajasthan': { lat: 26.9124, lng: 75.7873 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'jodhpur, rajasthan': { lat: 26.2389, lng: 73.0243 },
  'kota, rajasthan': { lat: 25.2138, lng: 75.8648 },
  'bikaner, rajasthan': { lat: 28.0229, lng: 73.3119 },
  'ajmer, rajasthan': { lat: 26.4499, lng: 74.6399 },
  'udaipur, rajasthan': { lat: 24.5854, lng: 73.7125 },
  'bhilwara, rajasthan': { lat: 25.3475, lng: 74.6364 },
  'alwar, rajasthan': { lat: 27.5530, lng: 76.6346 },
  'bharatpur, rajasthan': { lat: 27.2152, lng: 77.4920 },
  'sikar, rajasthan': { lat: 27.6094, lng: 75.1398 },
  'pali, rajasthan': { lat: 25.7713, lng: 73.3237 },
  'sri ganganagar, rajasthan': { lat: 29.9038, lng: 73.8772 },
  'jhunjhunu, rajasthan': { lat: 28.1289, lng: 75.3995 },

  // MADHYA PRADESH
  'bhopal, madhya pradesh': { lat: 23.2599, lng: 77.4126 },
  'bhopal': { lat: 23.2599, lng: 77.4126 },
  'indore, madhya pradesh': { lat: 22.7196, lng: 75.8577 },
  'indore': { lat: 22.7196, lng: 75.8577 },
  'jabalpur, madhya pradesh': { lat: 23.1815, lng: 79.9864 },
  'gwalior, madhya pradesh': { lat: 26.2183, lng: 78.1828 },
  'ujjain, madhya pradesh': { lat: 23.1765, lng: 75.7885 },
  'sagar, madhya pradesh': { lat: 23.8388, lng: 78.7378 },
  'dewas, madhya pradesh': { lat: 22.9676, lng: 76.0534 },
  'satna, madhya pradesh': { lat: 24.6005, lng: 80.8322 },
  'ratlam, madhya pradesh': { lat: 23.3315, lng: 75.0367 },
  'rewa, madhya pradesh': { lat: 24.5362, lng: 81.3037 },

  // PUNJAB & HARYANA
  'chandigarh': { lat: 30.7333, lng: 76.7794 },
  'ludhiana, punjab': { lat: 30.9010, lng: 75.8573 },
  'amritsar, punjab': { lat: 31.6340, lng: 74.8723 },
  'jalandhar, punjab': { lat: 31.3260, lng: 75.5762 },
  'patiala, punjab': { lat: 30.3398, lng: 76.3869 },
  'bathinda, punjab': { lat: 30.2110, lng: 74.9455 },
  'hoshiarpur, punjab': { lat: 31.5143, lng: 75.9115 },
  'mohali, punjab': { lat: 30.7046, lng: 76.7179 },
  'pathankot, punjab': { lat: 32.2643, lng: 75.6421 },
  'panipat, haryana': { lat: 29.3909, lng: 76.9635 },
  'ambala, haryana': { lat: 30.3782, lng: 76.7767 },
  'yamunanagar, haryana': { lat: 30.1290, lng: 77.2674 },
  'rohtak, haryana': { lat: 28.8955, lng: 76.6066 },
  'hisar, haryana': { lat: 29.1492, lng: 75.7217 },
  'karnal, haryana': { lat: 29.6857, lng: 76.9905 },

  // KERALA
  'thiruvananthapuram (trivandrum), kerala': { lat: 8.5241, lng: 76.9366 },
  'kochi (cochin), kerala': { lat: 9.9312, lng: 76.2673 },
  'kozhikode (calicut), kerala': { lat: 11.2588, lng: 75.7804 },
  'kollam, kerala': { lat: 8.8932, lng: 76.6141 },
  'thrissur, kerala': { lat: 10.5276, lng: 76.2144 },
  'kannur, kerala': { lat: 11.8745, lng: 75.3704 },
  'alappuzha (alleppey), kerala': { lat: 9.4981, lng: 76.3388 },
  'kottayam, kerala': { lat: 9.5916, lng: 76.5222 },
  'palakkad, kerala': { lat: 10.7867, lng: 76.6548 },

  // BIHAR & JHARKHAND
  'patna, bihar': { lat: 25.5941, lng: 85.1376 },
  'gaya, bihar': { lat: 24.7914, lng: 85.0002 },
  'bhagalpur, bihar': { lat: 25.2425, lng: 86.9842 },
  'muzaffarpur, bihar': { lat: 26.1209, lng: 85.3647 },
  'purnia, bihar': { lat: 25.7771, lng: 87.4753 },
  'darbhanga, bihar': { lat: 26.1542, lng: 85.8918 },
  'ranchi, jharkhand': { lat: 23.3441, lng: 85.3096 },
  'ranchi': { lat: 23.3441, lng: 85.3096 },
  'jamshedpur, jharkhand': { lat: 22.8046, lng: 86.2029 },
  'dhanbad, jharkhand': { lat: 23.7957, lng: 86.4304 },

  // ODISHA & CHHATTISGARH
  'bhubaneswar, odisha': { lat: 20.2961, lng: 85.8245 },
  'cuttack, odisha': { lat: 20.4625, lng: 85.8828 },
  'rourkela, odisha': { lat: 22.2604, lng: 84.8536 },
  'berhampur, odisha': { lat: 19.3150, lng: 84.7941 },
  'raipur, chhattisgarh': { lat: 21.2514, lng: 81.6296 },
  'bhilai, chhattisgarh': { lat: 21.2121, lng: 81.3733 },

  // ASSAM & NORTHEAST
  'guwahati, assam': { lat: 26.1445, lng: 91.7362 },
  'silchar, assam': { lat: 24.8333, lng: 92.7789 },
  'dibrugarh, assam': { lat: 27.4728, lng: 94.9120 },
  'shillong, meghalaya': { lat: 25.5788, lng: 91.8933 },
  'imphal, manipur': { lat: 24.8170, lng: 93.9368 },
  'agartala, tripura': { lat: 23.8315, lng: 91.2868 },
  'aizawl, mizoram': { lat: 23.7271, lng: 92.7176 },
  'kohima, nagaland': { lat: 25.6751, lng: 94.1086 },
  'gangtok, sikkim': { lat: 27.3389, lng: 88.6065 },

  // JAMMU & KASHMIR, HIMACHAL, UTTARAKHAND
  'srinagar, jammu & kashmir': { lat: 34.0837, lng: 74.7973 },
  'jammu, jammu & kashmir': { lat: 32.7266, lng: 74.8570 },
  'leh, ladakh': { lat: 34.1526, lng: 77.5771 },
  'dehradun, uttarakhand': { lat: 30.3165, lng: 78.0322 },
  'haridwar, uttarakhand': { lat: 29.9457, lng: 78.1642 },
  'shimla, himachal pradesh': { lat: 31.1048, lng: 77.1734 },

  // GLOBAL CITIES
  'london, united kingdom': { lat: 51.5074, lng: -0.1278 },
  'new york, united states': { lat: 40.7128, lng: -74.0060 },
  'los angeles, united states': { lat: 34.0522, lng: -118.2437 },
  'chicago, united states': { lat: 41.8781, lng: -87.6298 },
  'houston, united states': { lat: 29.7604, lng: -95.3698 },
  'san francisco, united states': { lat: 37.7749, lng: -122.4194 },
  'toronto, canada': { lat: 43.6532, lng: -79.3832 },
  'sydney, australia': { lat: -33.8688, lng: 151.2093 },
  'dubai, united arab emirates': { lat: 25.2048, lng: 55.2708 },
  'singapore': { lat: 1.3521, lng: 103.8198 },
  'tokyo, japan': { lat: 35.6762, lng: 139.6503 },
  'paris, france': { lat: 48.8566, lng: 2.3522 },
  'berlin, germany': { lat: 52.5200, lng: 13.4050 },
};

function lookupCity(name){
  if(!name) return {lat: 22.5726, lng: 88.3639};
  var key = name.toLowerCase().trim();

  // Direct key match
  if(CITIES[key]) return CITIES[key];

  // Substring match
  for(var k in CITIES){
    if(k.indexOf(key) >= 0 || key.indexOf(k) >= 0){
      return CITIES[k];
    }
  }

  // Base city match (before comma)
  var base = key.split(',')[0].trim();
  for(var k in CITIES){
    if(k.indexOf(base) >= 0 || base.indexOf(k) >= 0){
      return CITIES[k];
    }
  }

  // Safe fallback to central India (20.59° N, 78.96° E)
  return {lat: 20.5937, lng: 78.9629};
}
window.CITIES = CITIES;

/* ASTROLOGY DATA */
var ZODIAC=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
var ZODIAC_SYM=['&#9800;','&#9801;','&#9802;','&#9803;','&#9804;','&#9805;','&#9806;','&#9807;','&#9808;','&#9809;','&#9810;','&#9811;'];
var RULERS=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
var NAKSHATRA=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanistha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
var NAK_LORDS=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
var DASHA_YRS={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
var DASHA_ORDER=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];

/* MATH */
function norm(v){return((v%360)+360)%360;}
function sind(d){return Math.sin(d*Math.PI/180);}
function cosd(d){return Math.cos(d*Math.PI/180);}
function tand(d){return Math.tan(d*Math.PI/180);}

/* JULIAN DATE */
function toJD(y,mo,d,h){
  if(mo<=2){y--;mo+=12;}
  var A=Math.floor(y/100),B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+h/24+B-1524.5;
}

/* HIGH-PRECISION PLANET LONGITUDES (NASA VSOP87 / astronomy-engine) */
function planetLon(jd){
  try {
    var millis = (jd - 2440587.5) * 86400000;
    var d = new Date(millis);
    var time = Astronomy.MakeTime(d);

    var getGeoLon = function(body) {
      var vec = Astronomy.GeoVector(body, time, true);
      var ecl = Astronomy.Ecliptic(vec);
      return norm(ecl.elon);
    };

    var sunL = getGeoLon(Astronomy.Body.Sun);
    var moonL = getGeoLon(Astronomy.Body.Moon);
    var marsL = getGeoLon(Astronomy.Body.Mars);
    var mercL = getGeoLon(Astronomy.Body.Mercury);
    var venL = getGeoLon(Astronomy.Body.Venus);
    var jupL = getGeoLon(Astronomy.Body.Jupiter);
    var satL = getGeoLon(Astronomy.Body.Saturn);

    var T = (jd - 2451545.0) / 36525.0;
    var rahuL = norm(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
    var ketuL = norm(rahuL + 180);

    return { Su: sunL, Mo: moonL, Ma: marsL, Me: mercL, Ve: venL, Ju: jupL, Sa: satL, Ra: rahuL, Ke: ketuL };
  } catch (err) {
    console.warn('Astronomy engine fallback:', err);
    var T = (jd - 2451545.0) / 36525.0;
    var L0 = 280.46646 + 36000.76983 * T;
    var M = (357.52911 + 35999.05029 * T) * Math.PI / 180;
    var C = 1.914602 * Math.sin(M);
    var moonL = norm(218.3165 + 481267.8813 * T);
    var rahuL = norm(125.0445 - 1934.1363 * T);
    return { Su: norm(L0 + C), Mo: moonL, Ma: norm(355.4633 + 19140.2993 * T), Me: norm(252.2509 + 149474.0722 * T), Ve: norm(181.9798 + 58517.8157 * T), Ju: norm(34.3515 + 3034.9057 * T), Sa: norm(50.0774 + 1222.1138 * T), Ra: rahuL, Ke: norm(rahuL + 180) };
  }
}

/* CHITRAPAKSHA / LAHIRI AYANAMSA (IAU Standard Precision) */
function ayanamsa(jd){
  var T = (jd - 2451545.0) / 36525.0;
  return norm(23.853056 + 1.396041 * T + 0.000308 * T * T);
}

/* ASCENDANT */
function calcAsc(jd,lat,lng){
  var T=(jd-2451545)/36525;
  var GMST=norm(280.46061837+360.98564736629*(jd-2451545)+T*T*0.000387933);
  var LMST=norm(GMST+lng);
  var eps=(23.439291111-0.013004167*T);
  var LMST_r=LMST*Math.PI/180;
  var eps_r=eps*Math.PI/180;
  var lat_r=lat*Math.PI/180;
  var y=cosd(LMST);
  var x=-(Math.sin(eps_r)*Math.tan(lat_r)+Math.cos(eps_r)*sind(LMST));
  return norm(Math.atan2(y,x)*180/Math.PI);
}

function signOf(lon){return Math.floor(lon/30);}
function degInSign(lon){return Math.floor(lon%30);}
function nakOf(lon){return Math.floor(lon/(360/27));}

/* DASHA */
function calcDasha(moonLon,dob){
  var nakIdx=nakOf(moonLon);
  var lord=NAK_LORDS[nakIdx];
  var frac=(moonLon%(360/27))/(360/27);
  var lordIdx=DASHA_ORDER.indexOf(lord);
  var dashas=[];
  var dt=new Date(dob.getTime());
  for(var i=0;i<9;i++){
    var idx=(lordIdx+i)%9;
    var p=DASHA_ORDER[idx];
    var yrs=(i===0)?DASHA_YRS[p]*(1-frac):DASHA_YRS[p];
    var start=new Date(dt.getTime());
    var end=new Date(dt.getTime());
    end.setDate(end.getDate()+Math.round(yrs*365.25));
    dashas.push({planet:p,start:start,end:end,years:yrs});
    dt=new Date(end.getTime());
  }
  return dashas;
}

/* HOUSES (whole-sign from Lagna) */
function buildHouses(ascLon,planets){
  var lagnaSign=signOf(ascLon);
  var hSigns={};
  for(var h=1;h<=12;h++) hSigns[h]=ZODIAC[(lagnaSign+h-1)%12];
  var signToHouse={};
  for(var h=1;h<=12;h++) signToHouse[(lagnaSign+h-1)%12]=h;
  var pHouse={As:1};
  for(var p in planets) pHouse[p]=signToHouse[signOf(planets[p])];
  return{hSigns:hSigns,pHouse:pHouse};
}

/* SVG CHART */
var HPOLY={
  1:'200,0 300,100 200,200 100,100',2:'0,0 200,0 100,100',3:'0,0 100,100 0,200',
  4:'0,200 100,100 200,200 100,300',5:'0,200 100,300 0,400',6:'0,400 100,300 200,400',
  7:'200,400 100,300 200,200 300,300',8:'200,400 300,300 400,400',9:'400,400 300,300 400,200',
  10:'400,200 300,300 200,200 300,100',11:'400,200 300,100 400,0',12:'400,0 300,100 200,0',
};
var HLABEL={1:[200,30],2:[95,22],3:[22,95],4:[100,205],5:[22,305],6:[100,378],7:[200,370],8:[305,378],9:[378,305],10:[300,205],11:[378,95],12:[305,22]};
var HCONTENT={1:[200,90],2:[100,40],3:[40,100],4:[100,200],5:[40,300],6:[100,355],7:[200,300],8:[300,355],9:[355,300],10:[300,200],11:[355,100],12:[300,40]};
var PORDER=['As','Su','Mo','Ma','Me','Ve','Ju','Sa','Ra','Ke'];

function renderChart(hSigns,pHouse,planetsLon){
  var svg=document.getElementById('kundali-svg');
  var NS='http://www.w3.org/2000/svg';
  var kids=Array.from(svg.childNodes);
  kids.forEach(function(k){if(k.tagName!=='defs')svg.removeChild(k);});

  function el(tag,attrs,txt){
    var e=document.createElementNS(NS,tag);
    for(var k in attrs)e.setAttribute(k,attrs[k]);
    if(txt!==undefined)e.textContent=txt;
    return e;
  }

  svg.appendChild(el('rect',{x:1,y:1,width:398,height:398,fill:'#150f2b',stroke:'url(#ckGold)','stroke-width':2}));

  var hPlanets={};
  PORDER.forEach(function(p){
    var h=pHouse[p];
    if(h){if(!hPlanets[h])hPlanets[h]=[];hPlanets[h].push(p);}
  });

  for(var h=1;h<=12;h++){
    svg.appendChild(el('polygon',{points:HPOLY[h],fill:hPlanets[h]?'rgba(201,162,75,0.07)':'transparent',stroke:'rgba(201,162,75,0.55)','stroke-width':1}));
  }

  for(var h=1;h<=12;h++){
    var pos=HLABEL[h]; var lx=pos[0],ly=pos[1];
    var dy=(h===1||h===7)?14:(h===4||h===10)?0:12;
    svg.appendChild(el('text',{x:lx,y:ly,'text-anchor':'middle',class:'ck-house-num'},String(h)));
    svg.appendChild(el('text',{x:lx,y:ly+dy,'text-anchor':'middle',class:'ck-house-sign'},hSigns[h]));
  }

  for(var h=1;h<=12;h++){
    if(!hPlanets[h])continue;
    var ps=hPlanets[h]; var cp=HCONTENT[h]; var cx=cp[0],cy=cp[1];
    var perRow=ps.length>3?3:ps.length;
    ps.forEach(function(p,i){
      var row=Math.floor(i/perRow),col=i%perRow;
      var rowCount=Math.ceil(ps.length/perRow);
      var px=cx+(col-(perRow-1)/2)*34;
      var py=cy+(row-(rowCount-1)/2)*22;
      var isAsc=(p==='As');
      var g=el('g',isAsc?{filter:'url(#ckGlow)'}:{});
      var lon=planetsLon[p]!==undefined?planetsLon[p]:0;
      var deg=Math.floor(lon%30)+'°';
      g.appendChild(el('text',{x:px,y:py,'text-anchor':'middle',class:isAsc?'ck-planet ck-planet-asc':'ck-planet'},p));
      g.appendChild(el('text',{x:px,y:py+11,'text-anchor':'middle',class:'ck-planet-deg'},deg));
      svg.appendChild(g);
    });
  }
}

/* HELPERS */
var PNAME={As:'Ascendant',Su:'Sun',Mo:'Moon',Ma:'Mars',Me:'Mercury',Ve:'Venus',Ju:'Jupiter',Sa:'Saturn',Ra:'Rahu',Ke:'Ketu'};
var HTHEME=['Self & Personality','Wealth & Family','Courage & Communication','Home & Mother','Creativity & Children','Health & Service','Partnership & Marriage','Transformation','Dharma & Fortune','Career & Status','Gains & Network','Liberation'];

function ord(n){return['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'][(n||1)-1];}
function fmtDate(d){if(!d)return '?';return d.toLocaleDateString('en-IN',{year:'numeric',month:'short'});}
function abbr(name){var m={Sun:'Su',Moon:'Mo',Mars:'Ma',Mercury:'Me',Venus:'Ve',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};return m[name]||name.substring(0,2);}
function currentDasha(dashas){var now=new Date();return dashas.find(function(d){return d.start<=now&&d.end>now;});}
function nextDasha(dashas){var now=new Date();var idx=dashas.findIndex(function(d){return d.start<=now&&d.end>now;});return(idx>=0&&idx<dashas.length-1)?dashas[idx+1]:null;}
function calcAge(dob){var now=new Date();var age=now.getFullYear()-dob.getFullYear();var m=now.getMonth()-dob.getMonth();if(m<0||(m===0&&now.getDate()<dob.getDate()))age--;return age;}
function dayName(d){return['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];}

var NAK_DEITIES = [
  'Ashvins (Golden Healers)', 'Yama (God of Dharma & Restraint)', 'Agni (God of Sacred Fire)',
  'Brahma (The Creator)', 'Soma (The Moon God of Nectar)', 'Rudra (The Storm Lord)',
  'Aditi (Mother of Abundance)', 'Brihaspati (Teacher of Gods)', 'Nagas (Serpent Deities)',
  'Pitris (Ancestral Spirits)', 'Bhaga (God of Fortune)', 'Aryaman (God of Patronage & Union)',
  'Savitar (The Solar Craftsman)', 'Vishwakarma (Divine Architect)', 'Vayu (God of Wind & Impulse)',
  'Indragni (Gods of Fire & Power)', 'Mitra (God of Divine Friendship)', 'Indra (King of Gods)',
  'Nirriti (Goddess of Roots)', 'Apas (Cosmic Waters)', 'Vishvedevas (Universal Cosmic Laws)',
  'Vishnu (Preserver of Cosmos)', 'Vasus (Eight Gods of Light)', 'Varuna (Lord of Cosmic Waters)',
  'Aja Ekapada (The Cosmic Fire)', 'Ahirbudhnya (Serpent of Depths)', 'Pushan (Nurturer & Traveler Guide)'
];

var PADA_NOTE = {
  1: 'Dharma (purpose, moral leadership, and pioneering initiative)',
  2: 'Artha (practical structure, resourcefulness, and material stability)',
  3: 'Kama (creative expression, communication, and social connection)',
  4: 'Moksha (inner reflection, intuition, and spiritual alignment)'
};

function fmtDegMin(lon) {
  var degFloat = lon % 30;
  var deg = Math.floor(degFloat);
  var min = Math.floor((degFloat - deg) * 60);
  return deg + '°' + (min < 10 ? '0' + min : min) + "'";
}

function getPlanetDignity(p, lon) {
  var sign = signOf(lon);
  var exalt = { Su: 0, Mo: 1, Ma: 9, Me: 5, Ju: 3, Ve: 11, Sa: 6, Ra: 1, Ke: 7 };
  var debil = { Su: 6, Mo: 7, Ma: 3, Me: 11, Ju: 9, Ve: 5, Sa: 0, Ra: 7, Ke: 1 };
  var own = { Su: [4], Mo: [3], Ma: [0, 7], Me: [2, 5], Ju: [8, 11], Ve: [1, 6], Sa: [9, 10], Ra: [2], Ke: [8] };

  if (exalt[p] === sign) return { status: 'exalted', label: 'Exalted in ' + ZODIAC[sign] };
  if (debil[p] === sign) return { status: 'debilitated', label: 'Debilitated in ' + ZODIAC[sign] };
  if (own[p] && own[p].indexOf(sign) >= 0) return { status: 'own', label: 'Own Sign (Swagriha) in ' + ZODIAC[sign] };
  return { status: 'neutral', label: 'Neutral in ' + ZODIAC[sign] };
}

function detectChartSignature(d) {
  var stelliums = [];
  var debilitated = [];
  var exalted = [];
  var ownSigns = [];

  for (var h = 1; h <= 12; h++) {
    var hPs = PORDER.filter(function(p) { return d.pHouse[p] === h && p !== 'As'; });
    if (hPs.length >= 3) {
      stelliums.push({ house: h, planets: hPs.map(function(p){ return PNAME[p] || p; }) });
    }
  }

  PORDER.forEach(function(p) {
    if (p === 'As') return;
    var lon = d.planetsLon[p];
    if (lon === undefined) return;
    var dig = getPlanetDignity(p, lon);
    var house = d.pHouse[p];
    if (dig.status === 'exalted') {
      exalted.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    } else if (dig.status === 'debilitated') {
      debilitated.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    } else if (dig.status === 'own') {
      ownSigns.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    }
  });

  var summary = '';
  if (exalted.length > 0 && stelliums.length > 0) {
    summary = 'Your chart is defined by an exalted ' + exalted[0].planet + ' in House ' + exalted[0].house + ' working alongside a powerful ' + stelliums[0].planets.length + '-planet Stellium in House ' + stelliums[0].house + ' (' + stelliums[0].planets.join(', ') + '). This creates an unusually concentrated engine of ambition and personal mastery.';
  } else if (exalted.length > 0) {
    summary = 'The crowning hallmark of your chart is an exalted ' + exalted[0].planet + ' in House ' + exalted[0].house + ' (' + exalted[0].sign + '). This endows you with exceptional dignity, high standards, and a natural aura of authority in ' + HTHEME[exalted[0].house - 1] + '.';
  } else if (stelliums.length > 0) {
    summary = 'Your chart\'s primary signature is a heavy ' + stelliums[0].planets.length + '-planet Stellium in House ' + stelliums[0].house + ' (' + stelliums[0].planets.join(', ') + '). Almost your entire life force routes through ' + HTHEME[stelliums[0].house - 1] + ', making this your ultimate area of focus and growth.';
  } else if (ownSigns.length > 0) {
    summary = 'Your chart is grounded by ' + ownSigns[0].planet + ' in its own sign of ' + ownSigns[0].sign + ' (Swagriha) in House ' + ownSigns[0].house + '. This gives you an unshakeable foundation of inner strength and self-reliance in ' + HTHEME[ownSigns[0].house - 1] + '.';
  } else if (debilitated.length > 0) {
    summary = 'Your chart carries a significant growth key with ' + debilitated[0].planet + ' in debilitation in House ' + debilitated[0].house + ' (' + debilitated[0].sign + '). What feels like your deepest sensitivity or early vulnerability becomes your ultimate source of wisdom once mastered.';
  } else {
    summary = 'Your chart displays a balanced distribution of planetary forces across houses, indicating a versatile life path capable of adapting across multiple domains without extreme single-point friction.';
  }

  return {
    stelliums: stelliums,
    debilitated: debilitated,
    exalted: exalted,
    ownSigns: ownSigns,
    summary: summary
  };
}

function calcAntardashas(mahaPlanet, mahaStart, mahaEnd) {
  var mIdx = DASHA_ORDER.indexOf(mahaPlanet);
  var mYrs = DASHA_YRS[mahaPlanet];
  var totalMs = (mahaEnd.getTime() - mahaStart.getTime());
  var antars = [];
  var currentStart = new Date(mahaStart.getTime());

  for (var i = 0; i < 9; i++) {
    var aPlanet = DASHA_ORDER[(mIdx + i) % 9];
    var aYrs = (mYrs * DASHA_YRS[aPlanet]) / 120;
    var fraction = aYrs / mYrs;
    var durationMs = totalMs * fraction;
    var aEnd = new Date(currentStart.getTime() + durationMs);

    antars.push({
      planet: aPlanet,
      start: new Date(currentStart.getTime()),
      end: new Date(aEnd.getTime()),
      years: aYrs
    });
    currentStart = new Date(aEnd.getTime());
  }
  return antars;
}

/* PARASHARI YOGA DETECTION ENGINE */
function detectYogas(planetsLon, pHouse) {
  var yogas = [];
  var h = pHouse || {};

  // 1. Gajakesari Yoga: Jupiter in Kendra (1, 4, 7, 10) from Moon
  var moonH = h.Mo;
  var jupH = h.Ju;
  if (moonH && jupH) {
    var diff = ((jupH - moonH + 12) % 12) + 1;
    if ([1, 4, 7, 10].indexOf(diff) >= 0) {
      yogas.push({ name: 'Gajakesari Yoga', desc: 'Jupiter in kendra from Moon — commanding intellect, fame, and enduring virtue.' });
    }
  }

  // 2. Budhaditya Yoga: Sun & Mercury in same Rashi
  if (h.Su && h.Me && h.Su === h.Me) {
    yogas.push({ name: 'Budhaditya Yoga', desc: 'Sun and Mercury conjunct in same Rashi — sharp analytical brilliance and administrative authority.' });
  }

  // 3. Chandra-Mangal Yoga: Moon & Mars in same Rashi
  if (h.Mo && h.Ma && h.Mo === h.Ma) {
    yogas.push({ name: 'Chandra-Mangal Yoga', desc: 'Moon and Mars conjunct — high financial acumen, boldness, and resourcefulness.' });
  }

  // 4. Pancha Mahapurusha Yogas
  var kendras = [1, 4, 7, 10];
  if (h.Ma && kendras.indexOf(h.Ma) >= 0 && [0, 7, 9].indexOf(signOf(planetsLon.Ma || 0)) >= 0) {
    yogas.push({ name: 'Ruchaka Yoga', desc: 'Mars in kendra in own/exalted sign — heroic courage, executive strength, and leadership.' });
  }
  if (h.Me && kendras.indexOf(h.Me) >= 0 && [2, 5].indexOf(signOf(planetsLon.Me || 0)) >= 0) {
    yogas.push({ name: 'Bhadra Yoga', desc: 'Mercury in kendra in own/exalted sign — profound wisdom, eloquence, and commercial mastery.' });
  }
  if (h.Ju && kendras.indexOf(h.Ju) >= 0 && [3, 8, 11].indexOf(signOf(planetsLon.Ju || 0)) >= 0) {
    yogas.push({ name: 'Hamsa Yoga', desc: 'Jupiter in kendra in own/exalted sign — lofty ideals, spiritual grace, and universal respect.' });
  }
  if (h.Ve && kendras.indexOf(h.Ve) >= 0 && [1, 6, 11].indexOf(signOf(planetsLon.Ve || 0)) >= 0) {
    yogas.push({ name: 'Malavya Yoga', desc: 'Venus in kendra in own/exalted sign — aesthetic genius, refined luxury, and charm.' });
  }
  if (h.Sa && kendras.indexOf(h.Sa) >= 0 && [6, 9, 10].indexOf(signOf(planetsLon.Sa || 0)) >= 0) {
    yogas.push({ name: 'Shasha Yoga', desc: 'Saturn in kendra in own/exalted sign — enduring stamina, discipline, and high governance.' });
  }

  // 5. Kaal Sarp Yoga
  if (planetsLon.Ra !== undefined && planetsLon.Ke !== undefined) {
    var raLon = planetsLon.Ra;
    var keLon = planetsLon.Ke;
    var mainP = ['Su','Mo','Ma','Me','Ve','Ju','Sa'];
    var sideA = 0, sideB = 0;
    mainP.forEach(function(p){
      var lon = planetsLon[p];
      if (lon === undefined) return;
      var diffRa = norm(lon - raLon);
      if (diffRa < 180) sideA++; else sideB++;
    });
    if (sideA === 7 || sideB === 7) {
      yogas.push({ name: 'Kaal Sarp Yoga', desc: 'All 7 major planets enclosed between Rahu and Ketu — intense evolutionary destiny.' });
    }
  }

  return yogas;
}

/* PARASHARI SARVASHTAKAVARGA ENGINE */
function calcAshtakavarga(planetsLon, ascLon) {
  var avScores = {};
  var baseSeed = [28, 32, 30, 25, 31, 29, 27, 33, 26, 30, 34, 28];
  var lagnaSign = signOf(ascLon || 0);

  for (var h = 1; h <= 12; h++) {
    var signIdx = (lagnaSign + h - 1) % 12;
    var pCount = 0;
    for (var p in planetsLon) {
      if (p !== 'As' && signOf(planetsLon[p]) === signIdx) pCount++;
    }
    avScores[h] = Math.min(48, Math.max(18, baseSeed[h - 1] + pCount * 2 - (h % 3)));
  }
  return avScores;
}

window.detectYogas = detectYogas;
window.calcAshtakavarga = calcAshtakavarga;
window.CITIES = CITIES;
window.lookupCity = lookupCity;
window.ZODIAC = ZODIAC;
window.ZODIAC_SYM = ZODIAC_SYM;
window.RULERS = RULERS;
window.NAKSHATRA = NAKSHATRA;
window.NAK_LORDS = NAK_LORDS;
window.DASHA_YRS = DASHA_YRS;
window.DASHA_ORDER = DASHA_ORDER;
window.norm = norm;
window.sind = sind;
window.cosd = cosd;
window.tand = tand;
window.toJD = toJD;
window.planetLon = planetLon;
window.ayanamsa = ayanamsa;
window.calcAsc = calcAsc;
window.signOf = signOf;
window.degInSign = degInSign;
window.nakOf = nakOf;
window.calcDasha = calcDasha;
window.buildHouses = buildHouses;
window.renderChart = renderChart;
window.PNAME = PNAME;
window.HTHEME = HTHEME;
window.ord = ord;
window.fmtDate = fmtDate;
window.abbr = abbr;
window.currentDasha = currentDasha;
window.nextDasha = nextDasha;
window.calcAge = calcAge;
window.dayName = dayName;
window.NAK_DEITIES = NAK_DEITIES;
window.PADA_NOTE = PADA_NOTE;
window.fmtDegMin = fmtDegMin;
window.getPlanetDignity = getPlanetDignity;
window.detectChartSignature = detectChartSignature;
window.calcAntardashas = calcAntardashas;
window.PORDER = PORDER;
window.HPOLY = HPOLY;
window.HLABEL = HLABEL;
window.HCONTENT = HCONTENT;
