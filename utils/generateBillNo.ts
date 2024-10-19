export const generateBillNo = (): string => {
    return `BILL-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};
