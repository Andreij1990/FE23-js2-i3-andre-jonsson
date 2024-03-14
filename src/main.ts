const textInput: HTMLInputElement = document.getElementById('textInput') as HTMLInputElement;
const searchForm: HTMLFormElement = document.getElementById('searchForm') as HTMLFormElement;
const productContainer: HTMLElement = document.getElementById('product-container') as HTMLElement;

searchForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    performSearch();
    productContainer.innerHTML = '';
});

type Product = {
    title: string;
    description: string;
    rating: number;
    stock: number;
    category: string;
    images: string[];
}

function performSearch(): void {
    const searchText: string = textInput.value;

    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
        .then((response: Response) => response.json())
        .then((data: { products: Product[] }) => {
            const products: Product[] = data.products;

            console.log(data);

            products.forEach((product: Product) => {
                const productCard: HTMLElement = createProductCard(product);
                productContainer.appendChild(productCard);
            });
        })
        .catch((error: Error) => console.error('Fel vid hämtning av produkter:', error));
}

function createProductCard(product: Product): HTMLElement {
    const card: HTMLDivElement = document.createElement('div');
    card.classList.add('product-card');
  
    const imageContainer: HTMLDivElement = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image: HTMLImageElement = document.createElement('img');
    image.src = product.images[0];
    image.alt = product.title;
    imageContainer.appendChild(image);

    card.appendChild(imageContainer);
  
    const title: HTMLHeadingElement = document.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);
  
    const description: HTMLParagraphElement = document.createElement('p');
    description.textContent = product.description;
    card.appendChild(description);
  
    const rating: HTMLParagraphElement = document.createElement('p');
    rating.textContent = `Betyg: ${product.rating}`;
    card.appendChild(rating);
  
    const stock: HTMLParagraphElement = document.createElement('p');
    stock.textContent = `Lagersaldo: ${product.stock}`;
    if (product.stock < 10) {
      stock.style.color = 'red';
    }
    card.appendChild(stock);

    const category: HTMLParagraphElement = document.createElement('p');
    category.textContent = `Kategori: ${product.category}`;
    card.appendChild(category);
  
    const addToCartButton: HTMLButtonElement = document.createElement('button');
    addToCartButton.textContent = 'Lägg till i kundvagnen';
    card.appendChild(addToCartButton);
  
    return card;
}
