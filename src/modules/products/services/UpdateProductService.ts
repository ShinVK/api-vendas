import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    quantity,
    price,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);
    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    await productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
