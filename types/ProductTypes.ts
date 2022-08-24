export interface ProductItemProps {
    name: string
    id: number
    image: string
    price: Price
}

export interface Price {
    full: number
    currency: string
}