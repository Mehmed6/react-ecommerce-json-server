import type {ProductType} from "../types/Types.tsx";

export const mergeBaskets = (basket1: ProductType[], baskets2: ProductType[]) => {
    const merged = [...basket1];

    baskets2.forEach(item => {
        const existing = merged.find(p => p.id === item.id);

        if (existing && existing.count && item.count)
            existing.count += item.count;
        else
            merged.push(item);
    });

    return merged;
}