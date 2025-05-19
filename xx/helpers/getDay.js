function getDayDifferenceFromNow(pastDate) {
    let now = new Date();
    let then = new Date(Number(pastDate)); // Ganti dengan tanggal yang ingin dibandingkan

    // Hitung selisih dalam milidetik
    const diffInMs = now - then;

    // Konversi ke hari (1 hari = 1000 * 60 * 60 * 24 ms)
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
}

export default getDayDifferenceFromNow;