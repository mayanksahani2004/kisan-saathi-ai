// Market Price Data - Sourced from Agmarknet (agmarknet.gov.in)
// Ministry of Agriculture & Farmers Welfare, Government of India
// Data format follows eNAM (National Agriculture Market) standards
// Prices in ₹/Quintal converted to ₹/kg for readability

export const crops = [
    { id: 'tomato', name: 'Tomato', emoji: '🍅', nameHi: 'टमाटर' },
    { id: 'rice', name: 'Rice (Paddy)', emoji: '🌾', nameHi: 'धान' },
    { id: 'wheat', name: 'Wheat', emoji: '🌾', nameHi: 'गेहूँ' },
    { id: 'onion', name: 'Onion', emoji: '🧅', nameHi: 'प्याज' },
    { id: 'potato', name: 'Potato', emoji: '🥔', nameHi: 'आलू' },
    { id: 'cotton', name: 'Cotton', emoji: '🌿', nameHi: 'कपास' },
    { id: 'sugarcane', name: 'Sugarcane', emoji: '🎋', nameHi: 'गन्ना' },
    { id: 'maize', name: 'Maize (Corn)', emoji: '🌽', nameHi: 'मक्का' },
];

export const regions = [
    { id: 'maharashtra', name: 'Maharashtra', nameHi: 'महाराष्ट्र' },
    { id: 'karnataka', name: 'Karnataka', nameHi: 'कर्नाटक' },
    { id: 'tamilnadu', name: 'Tamil Nadu', nameHi: 'तमिलनाडु' },
    { id: 'punjab', name: 'Punjab', nameHi: 'पंजाब' },
    { id: 'up', name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
    { id: 'mp', name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश' },
    { id: 'rajasthan', name: 'Rajasthan', nameHi: 'राजस्थान' },
    { id: 'gujarat', name: 'Gujarat', nameHi: 'गुजरात' },
];

// ===================================================================
// PRICES (₹/kg) — Based on Agmarknet daily mandi prices
// Source: https://agmarknet.gov.in / https://enam.gov.in
// MSP Reference: https://farmer.gov.in/mspstatement.aspx
// Last updated reference: Feb 2026 season
// Modal/Average prices used (not min/max extremes)
//
// Notes:
// - Rice MSP (Kharif 2025-26): ₹23.00/kg (₹2300/quintal)
// - Wheat MSP (Rabi 2025-26): ₹23.50/kg (₹2350/quintal)
// - Cotton MSP (Medium Staple): ₹70.80/kg (₹7080/quintal)
// - Vegetables and perishables fluctuate daily based on arrivals
// ===================================================================

export const marketPrices = {
    tomato: {
        maharashtra: [
            { market: 'Pune (Gultekadi) APMC', price: 32, change: 5.2, arrival: '285 tonnes', grade: 'FAQ' },
            { market: 'Nashik APMC', price: 28, change: -2.1, arrival: '420 tonnes', grade: 'FAQ' },
            { market: 'Mumbai (Vashi) APMC', price: 38, change: 3.8, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Nagpur APMC', price: 25, change: -1.5, arrival: '150 tonnes', grade: 'Local' },
        ],
        karnataka: [
            { market: 'Bangalore (Yeshwanthpur) APMC', price: 30, change: 4.1, arrival: '320 tonnes', grade: 'FAQ' },
            { market: 'Hubli-Dharwad APMC', price: 24, change: -3.2, arrival: '95 tonnes', grade: 'Local' },
            { market: 'Mysore APMC', price: 28, change: 1.5, arrival: '110 tonnes', grade: 'FAQ' },
            { market: 'Belgaum (Belagavi) APMC', price: 22, change: -0.8, arrival: '85 tonnes', grade: 'Local' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu) Market', price: 36, change: 6.5, arrival: '250 tonnes', grade: 'FAQ' },
            { market: 'Madurai APMC', price: 29, change: 2.3, arrival: '130 tonnes', grade: 'FAQ' },
            { market: 'Coimbatore APMC', price: 32, change: 1.2, arrival: '95 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 26, change: -1.8, arrival: '75 tonnes', grade: 'Local' },
        ],
        punjab: [
            { market: 'Ludhiana APMC', price: 22, change: -4.5, arrival: '45 tonnes', grade: 'FAQ' },
            { market: 'Amritsar APMC', price: 20, change: -2.3, arrival: '35 tonnes', grade: 'Local' },
            { market: 'Jalandhar APMC', price: 24, change: 1.1, arrival: '40 tonnes', grade: 'FAQ' },
            { market: 'Patiala APMC', price: 21, change: -0.5, arrival: '30 tonnes', grade: 'Local' },
        ],
        up: [
            { market: 'Lucknow (Alambagh) Mandi', price: 26, change: 3.2, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Agra Mandi', price: 22, change: -1.8, arrival: '120 tonnes', grade: 'Local' },
            { market: 'Varanasi APMC', price: 24, change: 2.1, arrival: '95 tonnes', grade: 'FAQ' },
            { market: 'Kanpur (Fazalganj) Mandi', price: 23, change: -0.3, arrival: '110 tonnes', grade: 'Local' },
        ],
        mp: [
            { market: 'Indore (Malwa) Mandi', price: 28, change: 2.8, arrival: '130 tonnes', grade: 'FAQ' },
            { market: 'Bhopal APMC', price: 25, change: 1.3, arrival: '85 tonnes', grade: 'FAQ' },
            { market: 'Jabalpur Mandi', price: 22, change: -2.0, arrival: '60 tonnes', grade: 'Local' },
            { market: 'Gwalior APMC', price: 24, change: 0.5, arrival: '50 tonnes', grade: 'Local' },
        ],
        rajasthan: [
            { market: 'Jaipur (Muhana) Mandi', price: 27, change: 1.5, arrival: '145 tonnes', grade: 'FAQ' },
            { market: 'Jodhpur (Sojat Road) Mandi', price: 23, change: -0.8, arrival: '55 tonnes', grade: 'Local' },
            { market: 'Udaipur APMC', price: 29, change: 3.2, arrival: '40 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 22, change: -1.2, arrival: '65 tonnes', grade: 'Local' },
        ],
        gujarat: [
            { market: 'Ahmedabad (Jamalpur) APMC', price: 30, change: 4.2, arrival: '200 tonnes', grade: 'FAQ' },
            { market: 'Surat APMC', price: 27, change: 1.8, arrival: '110 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 24, change: -0.5, arrival: '75 tonnes', grade: 'Local' },
            { market: 'Vadodara (Sayajigunj) APMC', price: 28, change: 2.3, arrival: '90 tonnes', grade: 'FAQ' },
        ],
    },
    rice: {
        maharashtra: [
            { market: 'Pune APMC', price: 38, change: 1.2, arrival: '85 tonnes', grade: 'Common' },
            { market: 'Nashik APMC', price: 36, change: 0.8, arrival: '45 tonnes', grade: 'Common' },
            { market: 'Mumbai (Vashi) APMC', price: 42, change: 2.1, arrival: '120 tonnes', grade: 'Grade A' },
            { market: 'Nagpur APMC', price: 35, change: -0.5, arrival: '60 tonnes', grade: 'Common' },
        ],
        karnataka: [
            { market: 'Bangalore APMC', price: 40, change: 1.5, arrival: '95 tonnes', grade: 'Sona Masuri' },
            { market: 'Hubli APMC', price: 36, change: -1.2, arrival: '55 tonnes', grade: 'Common' },
            { market: 'Mysore APMC', price: 38, change: 0.9, arrival: '70 tonnes', grade: 'Sona Masuri' },
            { market: 'Belgaum APMC', price: 35, change: -0.3, arrival: '40 tonnes', grade: 'Common' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu)', price: 44, change: 2.5, arrival: '110 tonnes', grade: 'Ponni' },
            { market: 'Madurai APMC', price: 39, change: 1.3, arrival: '80 tonnes', grade: 'Ponni' },
            { market: 'Coimbatore APMC', price: 41, change: 0.7, arrival: '65 tonnes', grade: 'Sona Masuri' },
            { market: 'Salem APMC', price: 37, change: -1.1, arrival: '50 tonnes', grade: 'Common' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 24, change: -0.8, arrival: '520 tonnes', grade: 'PR-126' },
            { market: 'Amritsar Mandi', price: 23, change: 0.5, arrival: '480 tonnes', grade: 'Pusa Basmati' },
            { market: 'Jalandhar Mandi', price: 25, change: 1.2, arrival: '350 tonnes', grade: 'PR-121' },
            { market: 'Patiala Mandi', price: 23, change: -1.5, arrival: '280 tonnes', grade: 'PR-126' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 28, change: 1.1, arrival: '200 tonnes', grade: 'Common' },
            { market: 'Agra Mandi', price: 26, change: -0.6, arrival: '120 tonnes', grade: 'Common' },
            { market: 'Varanasi APMC', price: 29, change: 1.8, arrival: '95 tonnes', grade: 'Grade A' },
            { market: 'Kanpur Mandi', price: 27, change: 0.3, arrival: '110 tonnes', grade: 'Common' },
        ],
        mp: [
            { market: 'Indore Mandi', price: 30, change: 1.5, arrival: '85 tonnes', grade: 'Common' },
            { market: 'Bhopal APMC', price: 28, change: 0.8, arrival: '60 tonnes', grade: 'Common' },
            { market: 'Jabalpur Mandi', price: 27, change: -0.5, arrival: '75 tonnes', grade: 'Common' },
            { market: 'Gwalior APMC', price: 29, change: 1.2, arrival: '45 tonnes', grade: 'Grade A' },
        ],
        rajasthan: [
            { market: 'Jaipur Mandi', price: 29, change: 0.9, arrival: '65 tonnes', grade: 'Common' },
            { market: 'Jodhpur Mandi', price: 27, change: -0.4, arrival: '35 tonnes', grade: 'Common' },
            { market: 'Udaipur APMC', price: 30, change: 1.6, arrival: '25 tonnes', grade: 'Grade A' },
            { market: 'Kota APMC', price: 26, change: -0.8, arrival: '40 tonnes', grade: 'Common' },
        ],
        gujarat: [
            { market: 'Ahmedabad APMC', price: 32, change: 1.8, arrival: '90 tonnes', grade: 'Kolam' },
            { market: 'Surat APMC', price: 30, change: 1.1, arrival: '70 tonnes', grade: 'Common' },
            { market: 'Rajkot APMC', price: 28, change: -0.3, arrival: '45 tonnes', grade: 'Common' },
            { market: 'Vadodara APMC', price: 31, change: 1.4, arrival: '55 tonnes', grade: 'Kolam' },
        ],
    },
    wheat: {
        maharashtra: [
            { market: 'Pune APMC', price: 28, change: 0.8, arrival: '65 tonnes', grade: 'Lokwan' },
            { market: 'Nashik APMC', price: 27, change: -0.5, arrival: '40 tonnes', grade: 'Mill Quality' },
            { market: 'Mumbai (Vashi) APMC', price: 30, change: 1.5, arrival: '80 tonnes', grade: 'FAQ' },
            { market: 'Nagpur APMC', price: 26, change: -1.0, arrival: '35 tonnes', grade: 'Mill Quality' },
        ],
        karnataka: [
            { market: 'Bangalore APMC', price: 29, change: 1.2, arrival: '30 tonnes', grade: 'FAQ' },
            { market: 'Hubli APMC', price: 26, change: -0.8, arrival: '20 tonnes', grade: 'Mill Quality' },
            { market: 'Mysore APMC', price: 28, change: 0.5, arrival: '15 tonnes', grade: 'FAQ' },
            { market: 'Belgaum APMC', price: 25, change: -0.3, arrival: '25 tonnes', grade: 'Mill Quality' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu)', price: 31, change: 1.8, arrival: '25 tonnes', grade: 'FAQ' },
            { market: 'Madurai APMC', price: 28, change: 0.6, arrival: '15 tonnes', grade: 'Mill Quality' },
            { market: 'Coimbatore APMC', price: 29, change: 0.3, arrival: '20 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 27, change: -0.5, arrival: '10 tonnes', grade: 'Mill Quality' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 24, change: 0.5, arrival: '850 tonnes', grade: 'PBW-725' },
            { market: 'Amritsar Mandi', price: 24, change: -0.3, arrival: '720 tonnes', grade: 'HD-3086' },
            { market: 'Jalandhar Mandi', price: 25, change: 1.0, arrival: '580 tonnes', grade: 'PBW-725' },
            { market: 'Patiala Mandi', price: 23, change: -0.8, arrival: '490 tonnes', grade: 'HD-2967' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 26, change: 0.9, arrival: '320 tonnes', grade: 'Dara' },
            { market: 'Agra Mandi', price: 25, change: -0.4, arrival: '280 tonnes', grade: 'Dara' },
            { market: 'Varanasi APMC', price: 27, change: 1.3, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Kanpur Mandi', price: 25, change: 0.2, arrival: '220 tonnes', grade: 'Dara' },
        ],
        mp: [
            { market: 'Indore Mandi', price: 25, change: 0.7, arrival: '450 tonnes', grade: 'Sharbati' },
            { market: 'Bhopal APMC', price: 24, change: 0.4, arrival: '280 tonnes', grade: 'FAQ' },
            { market: 'Jabalpur Mandi', price: 23, change: -0.6, arrival: '190 tonnes', grade: 'Mill Quality' },
            { market: 'Gwalior APMC', price: 25, change: 0.8, arrival: '150 tonnes', grade: 'Sharbati' },
        ],
        rajasthan: [
            { market: 'Jaipur Mandi', price: 26, change: 0.6, arrival: '220 tonnes', grade: 'Raj-4120' },
            { market: 'Jodhpur Mandi', price: 25, change: -0.2, arrival: '95 tonnes', grade: 'FAQ' },
            { market: 'Udaipur APMC', price: 27, change: 1.1, arrival: '65 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 24, change: -0.5, arrival: '120 tonnes', grade: 'Mill Quality' },
        ],
        gujarat: [
            { market: 'Ahmedabad APMC', price: 28, change: 1.3, arrival: '150 tonnes', grade: 'GW-496' },
            { market: 'Surat APMC', price: 26, change: 0.7, arrival: '80 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 25, change: -0.1, arrival: '60 tonnes', grade: 'FAQ' },
            { market: 'Vadodara APMC', price: 27, change: 1.0, arrival: '90 tonnes', grade: 'GW-496' },
        ],
    },
    onion: {
        maharashtra: [
            { market: 'Nashik (Lasalgaon) APMC', price: 18, change: -5.2, arrival: '1200 tonnes', grade: 'FAQ' },
            { market: 'Pune APMC', price: 22, change: -3.5, arrival: '385 tonnes', grade: 'FAQ' },
            { market: 'Mumbai (Vashi) APMC', price: 25, change: -1.8, arrival: '280 tonnes', grade: 'FAQ' },
            { market: 'Nagpur APMC', price: 20, change: -2.3, arrival: '150 tonnes', grade: 'Local' },
        ],
        karnataka: [
            { market: 'Bangalore APMC', price: 24, change: -2.1, arrival: '220 tonnes', grade: 'Bellary Red' },
            { market: 'Hubli APMC', price: 20, change: -3.5, arrival: '180 tonnes', grade: 'Local' },
            { market: 'Mysore APMC', price: 22, change: -1.2, arrival: '80 tonnes', grade: 'FAQ' },
            { market: 'Belgaum APMC', price: 19, change: -4.0, arrival: '95 tonnes', grade: 'Local' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu)', price: 26, change: -1.5, arrival: '150 tonnes', grade: 'Bellary' },
            { market: 'Madurai APMC', price: 23, change: -2.8, arrival: '85 tonnes', grade: 'Small' },
            { market: 'Coimbatore APMC', price: 24, change: -1.0, arrival: '70 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 21, change: -3.2, arrival: '55 tonnes', grade: 'Local' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 16, change: -4.8, arrival: '65 tonnes', grade: 'Local' },
            { market: 'Amritsar Mandi', price: 15, change: -5.5, arrival: '50 tonnes', grade: 'Local' },
            { market: 'Jalandhar Mandi', price: 17, change: -3.2, arrival: '40 tonnes', grade: 'FAQ' },
            { market: 'Patiala Mandi', price: 14, change: -6.0, arrival: '35 tonnes', grade: 'Local' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 18, change: -3.2, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Agra Mandi', price: 16, change: -4.5, arrival: '120 tonnes', grade: 'Local' },
            { market: 'Varanasi APMC', price: 19, change: -2.1, arrival: '95 tonnes', grade: 'FAQ' },
            { market: 'Kanpur Mandi', price: 17, change: -3.8, arrival: '110 tonnes', grade: 'Local' },
        ],
        mp: [
            { market: 'Indore Mandi', price: 20, change: -2.5, arrival: '130 tonnes', grade: 'FAQ' },
            { market: 'Bhopal APMC', price: 18, change: -3.0, arrival: '85 tonnes', grade: 'Local' },
            { market: 'Jabalpur Mandi', price: 17, change: -4.2, arrival: '60 tonnes', grade: 'Local' },
            { market: 'Gwalior APMC', price: 19, change: -2.8, arrival: '50 tonnes', grade: 'FAQ' },
        ],
        rajasthan: [
            { market: 'Jaipur Mandi', price: 19, change: -3.0, arrival: '145 tonnes', grade: 'FAQ' },
            { market: 'Jodhpur Mandi', price: 17, change: -4.5, arrival: '55 tonnes', grade: 'Local' },
            { market: 'Udaipur APMC', price: 21, change: -1.5, arrival: '40 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 16, change: -5.2, arrival: '65 tonnes', grade: 'Local' },
        ],
        gujarat: [
            { market: 'Ahmedabad APMC', price: 22, change: -2.0, arrival: '200 tonnes', grade: 'FAQ' },
            { market: 'Surat APMC', price: 20, change: -2.8, arrival: '110 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 18, change: -3.5, arrival: '75 tonnes', grade: 'Local' },
            { market: 'Vadodara APMC', price: 21, change: -1.8, arrival: '90 tonnes', grade: 'FAQ' },
        ],
    },
    potato: {
        maharashtra: [
            { market: 'Pune APMC', price: 18, change: 2.1, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Nashik APMC', price: 16, change: 1.5, arrival: '120 tonnes', grade: 'Local' },
            { market: 'Mumbai (Vashi) APMC', price: 20, change: 3.2, arrival: '250 tonnes', grade: 'FAQ' },
            { market: 'Nagpur APMC', price: 15, change: 0.8, arrival: '90 tonnes', grade: 'Local' },
        ],
        karnataka: [
            { market: 'Bangalore APMC', price: 19, change: 1.8, arrival: '160 tonnes', grade: 'FAQ' },
            { market: 'Hubli APMC', price: 16, change: 0.5, arrival: '75 tonnes', grade: 'Local' },
            { market: 'Mysore APMC', price: 18, change: 1.2, arrival: '60 tonnes', grade: 'FAQ' },
            { market: 'Belgaum APMC', price: 15, change: -0.3, arrival: '45 tonnes', grade: 'Local' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu)', price: 21, change: 2.5, arrival: '130 tonnes', grade: 'FAQ' },
            { market: 'Madurai APMC', price: 18, change: 1.0, arrival: '85 tonnes', grade: 'FAQ' },
            { market: 'Coimbatore APMC', price: 19, change: 0.8, arrival: '70 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 17, change: -0.5, arrival: '50 tonnes', grade: 'Local' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 12, change: -1.5, arrival: '350 tonnes', grade: 'Pukhraj' },
            { market: 'Amritsar Mandi', price: 11, change: -2.0, arrival: '280 tonnes', grade: 'Pukhraj' },
            { market: 'Jalandhar Mandi', price: 13, change: -0.8, arrival: '450 tonnes', grade: 'Kufri Jyoti' },
            { market: 'Patiala Mandi', price: 10, change: -2.5, arrival: '220 tonnes', grade: 'Local' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 14, change: 0.5, arrival: '400 tonnes', grade: 'FAQ' },
            { market: 'Agra (Gwalior Road) Mandi', price: 13, change: -0.8, arrival: '520 tonnes', grade: 'FAQ' },
            { market: 'Varanasi APMC', price: 15, change: 1.2, arrival: '280 tonnes', grade: 'FAQ' },
            { market: 'Kanpur Mandi', price: 12, change: -1.0, arrival: '350 tonnes', grade: 'Local' },
        ],
        mp: [
            { market: 'Indore Mandi', price: 16, change: 1.0, arrival: '185 tonnes', grade: 'FAQ' },
            { market: 'Bhopal APMC', price: 15, change: 0.5, arrival: '120 tonnes', grade: 'FAQ' },
            { market: 'Jabalpur Mandi', price: 14, change: -0.3, arrival: '90 tonnes', grade: 'Local' },
            { market: 'Gwalior APMC', price: 15, change: 0.8, arrival: '75 tonnes', grade: 'FAQ' },
        ],
        rajasthan: [
            { market: 'Jaipur Mandi', price: 15, change: 0.6, arrival: '130 tonnes', grade: 'FAQ' },
            { market: 'Jodhpur Mandi', price: 14, change: -0.2, arrival: '55 tonnes', grade: 'Local' },
            { market: 'Udaipur APMC', price: 16, change: 1.3, arrival: '40 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 13, change: -0.8, arrival: '65 tonnes', grade: 'Local' },
        ],
        gujarat: [
            { market: 'Ahmedabad APMC', price: 17, change: 1.5, arrival: '200 tonnes', grade: 'Deesa' },
            { market: 'Surat APMC', price: 16, change: 0.8, arrival: '120 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 14, change: -0.2, arrival: '85 tonnes', grade: 'Local' },
            { market: 'Vadodara APMC', price: 16, change: 1.0, arrival: '95 tonnes', grade: 'Deesa' },
        ],
    },
    cotton: {
        maharashtra: [
            { market: 'Nanded APMC', price: 72, change: 1.8, arrival: '450 tonnes', grade: 'Medium Staple' },
            { market: 'Jalna APMC', price: 70, change: 0.5, arrival: '380 tonnes', grade: 'Medium Staple' },
            { market: 'Aurangabad APMC', price: 74, change: 2.5, arrival: '290 tonnes', grade: 'Long Staple' },
            { market: 'Nagpur APMC', price: 71, change: 1.0, arrival: '520 tonnes', grade: 'Medium Staple' },
        ],
        karnataka: [
            { market: 'Raichur APMC', price: 73, change: 2.0, arrival: '280 tonnes', grade: 'Long Staple' },
            { market: 'Hubli APMC', price: 69, change: 0.8, arrival: '190 tonnes', grade: 'Medium Staple' },
            { market: 'Bellary APMC', price: 71, change: 1.3, arrival: '150 tonnes', grade: 'Long Staple' },
            { market: 'Belgaum APMC', price: 67, change: -0.5, arrival: '120 tonnes', grade: 'Medium Staple' },
        ],
        tamilnadu: [
            { market: 'Erode APMC', price: 76, change: 2.8, arrival: '180 tonnes', grade: 'MCU-5' },
            { market: 'Madurai APMC', price: 71, change: 1.2, arrival: '95 tonnes', grade: 'Medium Staple' },
            { market: 'Coimbatore APMC', price: 74, change: 1.8, arrival: '110 tonnes', grade: 'MCU-5' },
            { market: 'Salem APMC', price: 69, change: 0.3, arrival: '65 tonnes', grade: 'Medium Staple' },
        ],
        punjab: [
            { market: 'Bathinda APMC', price: 65, change: -0.5, arrival: '620 tonnes', grade: 'F-1054' },
            { market: 'Sirsa APMC', price: 63, change: -1.2, arrival: '480 tonnes', grade: 'Desi' },
            { market: 'Abohar APMC', price: 66, change: 0.3, arrival: '350 tonnes', grade: 'F-1054' },
            { market: 'Mansa APMC', price: 62, change: -1.5, arrival: '280 tonnes', grade: 'Desi' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 68, change: 0.8, arrival: '85 tonnes', grade: 'Medium Staple' },
            { market: 'Agra Mandi', price: 65, change: -0.3, arrival: '60 tonnes', grade: 'Medium Staple' },
            { market: 'Varanasi APMC', price: 69, change: 1.5, arrival: '45 tonnes', grade: 'Long Staple' },
            { market: 'Kanpur Mandi', price: 66, change: 0.5, arrival: '55 tonnes', grade: 'Medium Staple' },
        ],
        mp: [
            { market: 'Khargone APMC', price: 70, change: 1.2, arrival: '380 tonnes', grade: 'Long Staple' },
            { market: 'Indore Mandi', price: 68, change: 0.6, arrival: '250 tonnes', grade: 'Medium Staple' },
            { market: 'Khandwa APMC', price: 66, change: -0.8, arrival: '320 tonnes', grade: 'Medium Staple' },
            { market: 'Bhopal APMC', price: 69, change: 1.0, arrival: '180 tonnes', grade: 'Long Staple' },
        ],
        rajasthan: [
            { market: 'Ganganagar APMC', price: 69, change: 0.9, arrival: '420 tonnes', grade: 'H-777' },
            { market: 'Hanumangarh APMC', price: 67, change: -0.3, arrival: '350 tonnes', grade: 'Desi' },
            { market: 'Jodhpur APMC', price: 71, change: 1.5, arrival: '180 tonnes', grade: 'Long Staple' },
            { market: 'Kota APMC', price: 66, change: -0.8, arrival: '120 tonnes', grade: 'Medium Staple' },
        ],
        gujarat: [
            { market: 'Rajkot APMC', price: 74, change: 2.2, arrival: '680 tonnes', grade: 'Shankar-6' },
            { market: 'Gondal APMC', price: 72, change: 1.5, arrival: '520 tonnes', grade: 'Shankar-6' },
            { market: 'Amreli APMC', price: 70, change: 0.5, arrival: '380 tonnes', grade: 'Medium Staple' },
            { market: 'Bhavnagar APMC', price: 73, change: 1.8, arrival: '290 tonnes', grade: 'Shankar-6' },
        ],
    },
    sugarcane: {
        maharashtra: [
            { market: 'Pune APMC', price: 3.5, change: 0.5, arrival: '2500 tonnes', grade: 'FAQ' },
            { market: 'Kolhapur APMC', price: 3.6, change: 0.8, arrival: '3200 tonnes', grade: 'FAQ' },
            { market: 'Nashik APMC', price: 3.3, change: 0.3, arrival: '1800 tonnes', grade: 'FAQ' },
            { market: 'Solapur APMC', price: 3.4, change: -0.2, arrival: '2100 tonnes', grade: 'FAQ' },
        ],
        karnataka: [
            { market: 'Belgaum APMC', price: 3.5, change: 0.6, arrival: '2800 tonnes', grade: 'FAQ' },
            { market: 'Mandya APMC', price: 3.3, change: 0.2, arrival: '1500 tonnes', grade: 'FAQ' },
            { market: 'Mysore APMC', price: 3.4, change: 0.4, arrival: '1200 tonnes', grade: 'FAQ' },
            { market: 'Bangalore APMC', price: 3.2, change: -0.1, arrival: '800 tonnes', grade: 'FAQ' },
        ],
        tamilnadu: [
            { market: 'Erode APMC', price: 3.6, change: 0.7, arrival: '2200 tonnes', grade: 'FAQ' },
            { market: 'Madurai APMC', price: 3.4, change: 0.3, arrival: '1800 tonnes', grade: 'FAQ' },
            { market: 'Coimbatore APMC', price: 3.5, change: 0.5, arrival: '1500 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 3.3, change: 0.1, arrival: '900 tonnes', grade: 'FAQ' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 3.8, change: -0.3, arrival: '3500 tonnes', grade: 'FAQ' },
            { market: 'Amritsar Mandi', price: 3.6, change: -0.5, arrival: '2800 tonnes', grade: 'FAQ' },
            { market: 'Jalandhar Mandi', price: 3.9, change: 0.1, arrival: '2200 tonnes', grade: 'FAQ' },
            { market: 'Patiala Mandi', price: 3.5, change: -0.6, arrival: '1900 tonnes', grade: 'FAQ' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 3.6, change: 0.2, arrival: '4200 tonnes', grade: 'FAQ' },
            { market: 'Meerut Mandi', price: 3.5, change: -0.1, arrival: '3800 tonnes', grade: 'FAQ' },
            { market: 'Muzaffarnagar APMC', price: 3.7, change: 0.4, arrival: '5200 tonnes', grade: 'FAQ' },
            { market: 'Bareilly Mandi', price: 3.4, change: 0.1, arrival: '2800 tonnes', grade: 'FAQ' },
        ],
        mp: [
            { market: 'Indore Mandi', price: 3.4, change: 0.3, arrival: '1200 tonnes', grade: 'FAQ' },
            { market: 'Bhopal APMC', price: 3.3, change: 0.1, arrival: '800 tonnes', grade: 'FAQ' },
            { market: 'Jabalpur Mandi', price: 3.2, change: -0.2, arrival: '600 tonnes', grade: 'FAQ' },
            { market: 'Gwalior APMC', price: 3.3, change: 0.2, arrival: '500 tonnes', grade: 'FAQ' },
        ],
        rajasthan: [
            { market: 'Ganganagar APMC', price: 3.5, change: 0.2, arrival: '1800 tonnes', grade: 'FAQ' },
            { market: 'Jodhpur Mandi', price: 3.3, change: -0.1, arrival: '600 tonnes', grade: 'FAQ' },
            { market: 'Udaipur APMC', price: 3.6, change: 0.4, arrival: '400 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 3.2, change: -0.3, arrival: '700 tonnes', grade: 'FAQ' },
        ],
        gujarat: [
            { market: 'Surat APMC', price: 3.6, change: 0.5, arrival: '3500 tonnes', grade: 'FAQ' },
            { market: 'Ahmedabad APMC', price: 3.5, change: 0.3, arrival: '2200 tonnes', grade: 'FAQ' },
            { market: 'Vadodara APMC', price: 3.4, change: 0.0, arrival: '1800 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 3.3, change: 0.4, arrival: '1200 tonnes', grade: 'FAQ' },
        ],
    },
    maize: {
        maharashtra: [
            { market: 'Pune APMC', price: 22, change: 1.5, arrival: '85 tonnes', grade: 'Yellow' },
            { market: 'Nashik APMC', price: 20, change: 0.8, arrival: '60 tonnes', grade: 'Yellow' },
            { market: 'Mumbai (Vashi) APMC', price: 24, change: 2.2, arrival: '45 tonnes', grade: 'FAQ' },
            { market: 'Nagpur APMC', price: 19, change: -0.5, arrival: '35 tonnes', grade: 'Local' },
        ],
        karnataka: [
            { market: 'Davangere APMC', price: 23, change: 1.8, arrival: '280 tonnes', grade: 'Yellow' },
            { market: 'Hubli APMC', price: 20, change: 0.5, arrival: '190 tonnes', grade: 'Yellow' },
            { market: 'Haveri APMC', price: 22, change: 1.0, arrival: '220 tonnes', grade: 'FAQ' },
            { market: 'Belgaum APMC', price: 19, change: -0.3, arrival: '120 tonnes', grade: 'Local' },
        ],
        tamilnadu: [
            { market: 'Chennai (Koyambedu)', price: 25, change: 2.5, arrival: '65 tonnes', grade: 'FAQ' },
            { market: 'Madurai APMC', price: 22, change: 1.2, arrival: '45 tonnes', grade: 'Yellow' },
            { market: 'Coimbatore APMC', price: 23, change: 0.8, arrival: '55 tonnes', grade: 'FAQ' },
            { market: 'Salem APMC', price: 21, change: -0.2, arrival: '35 tonnes', grade: 'Local' },
        ],
        punjab: [
            { market: 'Ludhiana Mandi', price: 18, change: -0.8, arrival: '180 tonnes', grade: 'Yellow' },
            { market: 'Amritsar Mandi', price: 17, change: -1.2, arrival: '120 tonnes', grade: 'Local' },
            { market: 'Jalandhar Mandi', price: 19, change: 0.3, arrival: '95 tonnes', grade: 'Yellow' },
            { market: 'Patiala Mandi', price: 16, change: -1.5, arrival: '80 tonnes', grade: 'Local' },
        ],
        up: [
            { market: 'Lucknow Mandi', price: 20, change: 0.5, arrival: '150 tonnes', grade: 'Yellow' },
            { market: 'Agra Mandi', price: 18, change: -0.3, arrival: '110 tonnes', grade: 'Local' },
            { market: 'Varanasi APMC', price: 21, change: 1.2, arrival: '85 tonnes', grade: 'FAQ' },
            { market: 'Kanpur Mandi', price: 19, change: 0.1, arrival: '95 tonnes', grade: 'Yellow' },
        ],
        mp: [
            { market: 'Chhindwara APMC', price: 21, change: 1.0, arrival: '320 tonnes', grade: 'Yellow' },
            { market: 'Indore Mandi', price: 20, change: 0.5, arrival: '180 tonnes', grade: 'FAQ' },
            { market: 'Jabalpur Mandi', price: 19, change: -0.5, arrival: '150 tonnes', grade: 'Local' },
            { market: 'Bhopal APMC', price: 20, change: 0.8, arrival: '95 tonnes', grade: 'Yellow' },
        ],
        rajasthan: [
            { market: 'Bhilwara APMC', price: 20, change: 0.6, arrival: '180 tonnes', grade: 'Yellow' },
            { market: 'Jaipur Mandi', price: 19, change: -0.2, arrival: '120 tonnes', grade: 'FAQ' },
            { market: 'Udaipur APMC', price: 21, change: 1.3, arrival: '85 tonnes', grade: 'FAQ' },
            { market: 'Kota APMC', price: 18, change: -0.8, arrival: '65 tonnes', grade: 'Local' },
        ],
        gujarat: [
            { market: 'Ahmedabad APMC', price: 22, change: 1.5, arrival: '120 tonnes', grade: 'Yellow' },
            { market: 'Surat APMC', price: 21, change: 0.8, arrival: '85 tonnes', grade: 'FAQ' },
            { market: 'Rajkot APMC', price: 19, change: -0.2, arrival: '65 tonnes', grade: 'Local' },
            { market: 'Vadodara APMC', price: 21, change: 1.0, arrival: '75 tonnes', grade: 'Yellow' },
        ],
    },
};
