import { generateSequentialNumber } from "./generateSequentialNo";

type generateSNOProps = {
    category: string;
};
const shopId = 'MSShop24001';
export const generateSerialNumber = ({ category  }: generateSNOProps) => {
    const today = new Date();
    const dateFormatted = today.toISOString().slice(2, 10).replace(/-/g, '').substring(2);
    const uniqueNumber = generateSequentialNumber();
    return `${category}-${shopId}-${dateFormatted}-${uniqueNumber}`;
};
