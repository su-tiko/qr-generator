document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const sizeInput = document.getElementById('size');
    const errorCorrectionInput = document.getElementById('error-correction');
    const darkColorInput = document.getElementById('dark-color');
    const lightColorInput = document.getElementById('light-color');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeDiv = document.getElementById('qr-code');

    let qr = null;

    function generateQRCode() {
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text or URL');
            return;
        }

        // Clear previous QR code
        qrCodeDiv.innerHTML = '';

        // Create canvas element
        const canvas = document.createElement('canvas');
        qrCodeDiv.appendChild(canvas);

        // Generate new QR code
        qr = new QRious({
            element: canvas,
            value: text,
            size: parseInt(sizeInput.value),
            level: errorCorrectionInput.value,
            foreground: darkColorInput.value,
            background: lightColorInput.value
        });

        downloadBtn.classList.remove('hidden');
    }

    function downloadQRCode() {
        if (!qr) return;

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qr.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listeners
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    // Generate QR code on Enter key press
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateQRCode();
        }
    });

    // Auto-generate QR code when options change
    [sizeInput, errorCorrectionInput, darkColorInput, lightColorInput].forEach(input => {
        input.addEventListener('change', () => {
            if (textInput.value.trim()) {
                generateQRCode();
            }
        });
    });
});
