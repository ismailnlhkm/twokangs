function toRupiah (value) {
    let number = value.toLocaleString("id-ID");
    return `Rp${number},00`
}

module.exports = toRupiah