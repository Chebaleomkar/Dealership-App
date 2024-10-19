let currentNumber = 1; 

export const generateSequentialNumber = (): string => {
    const nextNumber = String(currentNumber).padStart(4, '0');
    currentNumber++;
    return nextNumber;
};
