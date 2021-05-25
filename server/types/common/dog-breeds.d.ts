// types/common/dog-breeds.d.ts

type Breed = {
    name: string;
    origin: string;
    imageURL: string;
}

declare module "dog-breeds" {
    export function random(): Breed;
}