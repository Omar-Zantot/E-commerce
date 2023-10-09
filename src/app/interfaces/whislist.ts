export interface Product {
  sold: number;
  images: string[];
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ProductResponse {
  status: string;
  count: number;
  data: Product[];
}

/**
 * Represents the structure of an item in the wishlist.
 */
export interface WishlistItem {
  sold: number;
  images: string[];
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  ratingsQuantity: number;
  /** id of the item */
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  /** img src*/
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _Id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

/**
 * Represents the structure of a response when adding or removing items from the wishlist.
 */
export interface WishlistResponse {
  status: string;
  message: string;
  /**items that remain in the wishlist are included */
  data: string[];
}
