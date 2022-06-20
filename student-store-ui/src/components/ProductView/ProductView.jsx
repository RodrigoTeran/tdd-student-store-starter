// id: 2,
// name: 'Flamin Hot Cheetos',
// category: 'food',
// image: 'https://static.openfoodfacts.org/images/products/896/400/009/0879/front_en.14.full.jpg',
// source: 'https://world.openfoodfacts.org/cgi/product_image.pl?code=8964000090879&id=front_en',
// category: "food"
// description: "No one knows what's in the powder that covers these snacks, but wow is it amazing!"
// id: 2
// image: "https://static.openfoodfacts.org/images/products/896/400/009/0879/front_en.14.full.jpg"
// name: "Flamin Hot Cheetos"
// price: 1.5
// source: "https://world.openfoodfacts.org/cgi/product_image.pl?code=8964000090879&id=front_en"

export default function ProductView({ product }) {
  return <>{product && <div>{product.name}</div>}</>;
}
