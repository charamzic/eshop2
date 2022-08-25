// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import data from "../../public/products.json";

type Product = {
  name: string
  id: number
  image: string
  price: {
    full: number
    currency: string
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newData = {
    products: data.map(({ name, id, image, price: { full, currency } } :Product ) => {
      return {
        name,
        id,
        image,
        price: {
          full,
          currency,
        },
      };
    }),
  };

  res.status(200).json(newData.products);
}
