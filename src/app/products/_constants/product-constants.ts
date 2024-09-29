const cafeProductCategoriesGroup = [
  {
    category: "Coffee & Espresso",
    items: [
      "Espresso shots",
      "Americano",
      "Latte",
      "Cappuccino",
      "Flat White",
      "Mocha",
      "Cold Brew",
      "Iced Coffee",
    ],
  },
  {
    category: "Tea & Infusions",
    items: ["Black Tea", "Green Tea", "Herbal Tea", "Iced Tea", "Matcha"],
  },
  {
    category: "Non-Coffee Beverages",
    items: [
      "Hot Chocolate",
      "Chai Latte",
      "Smoothies",
      "Milkshakes",
      "Fresh Juices",
      "Lemonade",
    ],
  },
  {
    category: "Pastries & Bakery",
    items: ["Croissants", "Muffins", "Donuts", "Scones", "Danishes", "Bagels"],
  },
  {
    category: "Sandwiches & Wraps",
    items: ["Breakfast Sandwiches", "Paninis", "Wraps", "Bagel Sandwiches"],
  },
  {
    category: "Salads & Bowls",
    items: ["Fresh Salads", "Grain Bowls", "Fruit Bowls", "Yogurt Parfaits"],
  },
  {
    category: "Desserts & Sweets",
    items: [
      "Cakes (cheesecakes, layer cakes)",
      "Cookies",
      "Brownies",
      "Tarts",
      "Macarons",
    ],
  },
  {
    category: "Vegan & Gluten-Free Options",
    items: [
      "Vegan pastries",
      "Gluten-free cakes",
      "Vegan sandwiches",
      "Dairy-free beverages",
    ],
  },
  {
    category: "Breakfast Specials",
    items: [
      "Avocado Toast",
      "Omelettes",
      "Breakfast Burritos",
      "French Toast",
      "Pancakes",
    ],
  },
  {
    category: "Retail Products",
    items: [
      "Coffee Beans (whole or ground)",
      "Tea Leaves & Sachets",
      "Coffee Mugs",
      "Tumbler Cups",
      "Gift Baskets",
    ],
  },

  {
    category: "Softdrinks",
    items: ["Coke"],
  },

  {
    category: "Alcoholic Beverages",
    items: ["Coke"],
  },
];

export const cafeProductCategories = cafeProductCategoriesGroup.map(
  (item) => item.category
);
