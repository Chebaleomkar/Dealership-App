import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';

export const generateBarcode = (serialNumber: string) => {
    const canvas = createCanvas(300 , 100);
    JsBarcode(canvas, serialNumber, { format: "CODE128" }); // You can customize the barcode format
    return canvas.toDataURL(); // This returns the barcode as a base64 string
};
