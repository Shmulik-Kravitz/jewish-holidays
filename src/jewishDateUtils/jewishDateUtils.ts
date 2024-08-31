import { BasicJewishDate } from "jewish-date";

export const isBasicJewishDate = (object: Date | BasicJewishDate): object is BasicJewishDate => {
    return "monthName" in object;
};
