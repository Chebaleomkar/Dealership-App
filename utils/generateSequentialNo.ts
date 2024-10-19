let currentNumber = 1; 

export const generateSequentialNumber = (): string => {
    const fourDigitRandom = Math.floor(1000 + Math.random() * 9000);
    const nextNumber = String(currentNumber)+fourDigitRandom;
    return nextNumber;
};
