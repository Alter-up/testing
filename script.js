// Predefined wallet addresses
const wallets = [
    "0x1aB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
    "0xA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T1",
    "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "0xF1E2D3C4B5A69788776655443322110099887766",
    "0x7B1A0C3D5E6F8G9H2I4J5K6L7M8N9O0P1Q2R3S4T",
];

// Generate a random transaction
function generateTransaction() {
    const address = wallets[Math.floor(Math.random() * wallets.length)];
    const amount = (Math.random() * 10 + 1).toFixed(4); // Random number between 1 and 10
    return { address, amount };
}

// Add a transaction to the DOM
function addTransaction() {
    const { address, amount } = generateTransaction();
    const transactionList = document.getElementById("transaction-list");

    // Create transaction element
    const transaction = document.createElement("div");
    transaction.classList.add("transaction");

    // Add content
    transaction.innerHTML = `
        <span class="address" title="${address}">${address}</span>
        <span class="amount">+${amount} ETH</span>
    `;

    // Prepend transaction
    transactionList.prepend(transaction);

    // Limit displayed transactions to 10
    if (transactionList.children.length > 10) {
        transactionList.removeChild(transactionList.lastChild);
    }
}

// Initialize: add transactions every 2 seconds
setInterval(addTransaction, 2000);

window.onload = function () {
    console.log("Скрипт начат");

    const logo = document.getElementById("logo");

    if (!logo) {
        console.error("Логотип не найден на странице. Проверьте ID 'logo'.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Не удалось получить контекст 2D для canvas.");
        return;
    }

    logo.onload = () => {
        console.log("Логотип успешно загружен.");
        canvas.width = logo.width;
        canvas.height = logo.height;

        ctx.drawImage(logo, 0, 0);

        try {
            const imageData = ctx.getImageData(0, 0, logo.width, logo.height);
            console.log("Данные изображения получены:", imageData);

            const dominantColor = getDominantColor(imageData.data);
            console.log("Доминирующий цвет:", dominantColor);

            applyColorTheme(dominantColor);
        } catch (error) {
            console.error("Ошибка при извлечении данных изображения:", error);
        }
    };

    logo.onerror = () => {
        console.error("Ошибка при загрузке логотипа. Проверьте путь к изображению.");
    };

    if (logo.complete) {
        console.log("Логотип уже загружен. Обрабатываю.");
        logo.onload();
    }

    function getDominantColor(data) {
        const colorCounts = {};
        let maxCount = 0;
        let dominantColor = "";

        for (let i = 0; i < data.length; i += 4) {
            const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`;
            colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;

            if (colorCounts[rgb] > maxCount) {
                maxCount = colorCounts[rgb];
                dominantColor = rgb;
            }
        }

        return `rgb(${dominantColor})`;
    }

    function applyColorTheme(color) {
        document.documentElement.style.setProperty("--main-color", color);
        document.documentElement.style.setProperty("--main-color-hover", adjustBrightness(color, -30));
    }

    function adjustBrightness(color, adjustment) {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        const adjust = (value) => Math.min(255, Math.max(0, value + adjustment));
        return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
    }
};
