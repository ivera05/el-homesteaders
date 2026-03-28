import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class SeedStoreData1774658849926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      { id: uuidv4(), name: 'Freeze Dried Candy', slug: 'candy' },
      { id: uuidv4(), name: 'Freeze Dried Fruit', slug: 'fruit' },
      { id: uuidv4(), name: 'Mexican Specials', slug: 'mexican' },
    ];

    // 1. Insert Categories
    for (const cat of categories) {
      await queryRunner.query(`
        INSERT INTO categories (id, name, description, is_active)
        VALUES ('${cat.id}', '${cat.name}', 'Premium ${cat.name} selection', TRUE)
      `);
    }

    const productsToSeed = [
      // --- CATEGORY: CANDY ---
      {
        catId: categories[0].id,
        title: 'Freeze Dried Sour Worms',
        sku: 'CAN-001',
        price: 8.99,
        weight: 4.0,
        info: {
          calories: 120,
          ingredients: ['Sugar', 'Gelatin', 'Citric Acid'],
        },
      },
      {
        catId: categories[0].id,
        title: 'Crunchy Marshmallow Bits',
        sku: 'CAN-002',
        price: 6.5,
        weight: 2.5,
        info: { calories: 90, ingredients: ['Sugar', 'Corn Syrup', 'Vanilla'] },
      },
      {
        catId: categories[0].id,
        title: 'Freeze Dried Peach Rings',
        sku: 'CAN-003',
        price: 8.99,
        weight: 4.0,
        info: {
          calories: 110,
          ingredients: ['Sugar', 'Fruit Juice', 'Pectin'],
        },
      },
      {
        catId: categories[0].id,
        title: 'Exploding Saltwater Taffy',
        sku: 'CAN-004',
        price: 7.99,
        weight: 3.5,
        info: {
          calories: 140,
          ingredients: ['Corn Syrup', 'Butter', 'Sea Salt'],
        },
      },
      {
        catId: categories[0].id,
        title: 'Freeze Dried Gummy Bears',
        sku: 'CAN-005',
        price: 8.5,
        weight: 4.0,
        info: {
          calories: 130,
          ingredients: ['Glucose', 'Sugar', 'Natural Flavors'],
        },
      },

      // --- CATEGORY: FRUIT ---
      {
        catId: categories[1].id,
        title: 'Freeze Dried Sliced Strawberries',
        sku: 'FRU-001',
        price: 11.99,
        weight: 2.0,
        info: { calories: 45, ingredients: ['100% Strawberries'] },
      },
      {
        catId: categories[1].id,
        title: 'Crunchy Mango Slices',
        sku: 'FRU-002',
        price: 10.5,
        weight: 2.5,
        info: { calories: 60, ingredients: ['100% Mango'] },
      },
      {
        catId: categories[1].id,
        title: 'Freeze Dried Banana Coins',
        sku: 'FRU-003',
        price: 7.99,
        weight: 3.0,
        info: { calories: 95, ingredients: ['100% Bananas'] },
      },
      {
        catId: categories[1].id,
        title: 'Crispy Dragon Fruit',
        sku: 'FRU-004',
        price: 13.5,
        weight: 1.8,
        info: { calories: 50, ingredients: ['100% Dragon Fruit'] },
      },
      {
        catId: categories[1].id,
        title: 'Freeze Dried Apple Wedges',
        sku: 'FRU-005',
        price: 9.0,
        weight: 2.2,
        info: { calories: 55, ingredients: ['100% Apples'] },
      },

      // --- CATEGORY: MEXICAN SPECIALS ---
      {
        catId: categories[2].id,
        title: 'Freeze Dried Chamoy Skittles',
        sku: 'MEX-001',
        price: 9.99,
        weight: 5.0,
        info: { calories: 160, ingredients: ['Sugar', 'Chamoy', 'Tajin'] },
      },
      {
        catId: categories[2].id,
        title: 'Spicy Freeze Dried Watermelon',
        sku: 'MEX-002',
        price: 10.99,
        weight: 3.0,
        info: {
          calories: 70,
          ingredients: ['Watermelon', 'Chili Powder', 'Lime'],
        },
      },
      {
        catId: categories[2].id,
        title: 'Freeze Dried Quail Eggs (Savory)',
        sku: 'MEX-003',
        price: 15.0,
        weight: 4.0,
        info: { calories: 180, ingredients: ['Quail Eggs', 'Salt'] },
      },
      {
        catId: categories[2].id,
        title: 'Chili-Lime Freeze Dried Pineapple',
        sku: 'MEX-004',
        price: 10.5,
        weight: 2.8,
        info: {
          calories: 65,
          ingredients: ['Pineapple', 'Citric Acid', 'Guajillo Chili'],
        },
      },
      {
        catId: categories[2].id,
        title: 'Freeze Dried Pulparindo Style Bites',
        sku: 'MEX-005',
        price: 9.5,
        weight: 4.5,
        info: { calories: 140, ingredients: ['Tamarind', 'Sugar', 'Salt'] },
      },
    ];

    for (const [index, p] of productsToSeed.entries()) {
      const productId = uuidv4();

      // Insert Product
      await queryRunner.query(`
        INSERT INTO products (id, title, description, price, image_url, sku, weight, weight_unit, nutritional_info)
        VALUES ('${productId}', '${p.title}', 'Authentic freeze-dried texture.', ${p.price}, 'https://placehold.co/400',
                '${p.sku}', ${p.weight}, 'oz', '${JSON.stringify(p.info)}')
      `);

      // Insert Inventory
      await queryRunner.query(`
        INSERT INTO inventories (id, product_id, available_qty, low_stock_threshold)
        VALUES ('${uuidv4()}', '${productId}', 100, 15)
      `);

      // Link to Category via join table
      await queryRunner.query(`
        INSERT INTO category_products (id, product_id, category_id, sort_order)
        VALUES ('${uuidv4()}', '${productId}', '${p.catId}', ${index + 1})
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Clear tables in reverse order to respect Foreign Key constraints
    await queryRunner.query(`DELETE
                             FROM category_products`);
    await queryRunner.query(`DELETE
                             FROM inventories`);
    await queryRunner.query(`DELETE
                             FROM products`);
    await queryRunner.query(`DELETE
                             FROM categories`);
  }
}
