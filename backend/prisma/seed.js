import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      // Shoes
      { name: "Nike Air Shoes", description: "Stylish running shoes.", price: 4999, image: "https://www.jordan1.vn/wp-content/uploads/2023/09/day-shoes-jmh2rb__1_-removebg-preview_d89f6c3c363242849e93f1674424cb0a_06f3d3d4b8e744f887e4eeab5729417c.png", category: "Shoes" },
      { name: "Adidas Running", description: "Comfortable running shoes.", price: 3999, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSTNV9a5Lb9ExR_1moO_yfJPlY5catZEvd2BTcuEraXr-FM3OQI_ZVSVEuL9tQYphs2qk10Yz1XNuQLaD4yygxe8U79Bez5jDxVkuivFUU_Iu32uFujmesR", category: "Shoes" },
      { name: "Puma Sneakers", description: "Casual sneakers for daily wear.", price: 2999, image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/30089088/2024/8/22/473367d4-b053-4815-a098-836df55a58311724303925080-PUMA-Courtismo-Mens-Sneakers-9731724303924799-1.jpg", category: "Shoes" },

      // Electronics
      { name: "Samsung Galaxy S24", description: "Latest smartphone with amazing camera.", price: 89999, image: "https://m.media-amazon.com/images/I/71eUNTW+nJL._SL1500_.jpg", category: "Electronics" },
      { name: "Sony Headphones", description: "Noise cancelling wireless headphones.", price: 7999, image: "https://www.gonoise.com/cdn/shop/files/Artboard_14_Am5.webp?v=1750679217", category: "Electronics" },
      { name: "Apple MacBook Pro", description: "Powerful laptop for professionals.", price: 129999, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=400&hei=400&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3WmJldjZKNUozZEJDc2p3M25qTEh4MlRLNDVIb25yeWxTSzhxdXNNaFBBZmJGcXNRQnFCV0w3WVRjTExvdm1ic1hTV3ZRdjl4cmtKRlU2NkJLZXo1VHBBU25Ob2N5dVQyQmxkN0IyWWVHdW0", category: "Electronics" },

      // Sports
      { name: "Yonex Badminton Racket", description: "Lightweight professional racket.", price: 3499, image: "https://m.media-amazon.com/images/I/31dmcHmJ0NL._SY300_SX300_QL70_FMwebp_.jpg", category: "Sports" },
      { name: "Football Nike", description: "Official size and weight football.", price: 1999, image: "https://m.media-amazon.com/images/I/51QsIn-sTAL._SY300_SX300_QL70_FMwebp_.jpg", category: "Sports" },
      { name: "Cricket Bat SG", description: "Premium willow cricket bat.", price: 4999, image: "Cricket Bat SG", category: "Sports" },

      // Baby
      { name: "Baby Stroller", description: "Comfortable and foldable stroller.", price: 7999, image: "https://via.placeholder.com/300x200?text=Baby+Stroller", category: "Baby" },
      { name: "Baby Diapers Pack", description: "Soft and safe diapers.", price: 999, image: "https://via.placeholder.com/300x200?text=Baby+Diapers", category: "Baby" },
      { name: "Baby Toys Set", description: "Safe colorful toys.", price: 599, image: "https://via.placeholder.com/300x200?text=Baby+Toys", category: "Baby" },

      // Men
      { name: "Men Casual Shirt", description: "Slim fit casual shirt.", price: 1299, image: "https://via.placeholder.com/300x200?text=Men+Shirt", category: "Men" },
      { name: "Men Formal Shoes", description: "Leather formal shoes.", price: 3499, image: "https://via.placeholder.com/300x200?text=Men+Formal+Shoes", category: "Men" },
      { name: "Men Watch", description: "Stylish wrist watch.", price: 1999, image: "https://via.placeholder.com/300x200?text=Men+Watch", category: "Men" },

      // Add more products to make 30+ items
      { name: "Samsung TV 42inch", description: "Full HD LED TV", price: 25999, image: "https://m.media-amazon.com/images/I/41vCI46xm3L._SX300_SY300_QL70_FMwebp_.jpg", category: "Electronics" },
      { name: "Apple iPhone 15", description: "Latest Apple smartphone", price: 99999, image: "https://vsprod.vijaysales.com/media/catalog/product/i/p/iphone_17_pro_cosmic_orange_pdp_image_position_1__en-in_1.jpg?optimize=medium&fit=bounds&height=500&width=500", category: "Electronics" },
      { name: "Reebok Sports Shoes", description: "Comfortable for running", price: 3299, image: "https://www.jagranimages.com/images/newimg/18062024/18_06_2024-best_reebok_sports_shoes_for_men_23741757.jpg", category: "Shoes" },
      
      { name: "Men Jeans", description: "Slim fit denim jeans", price: 1499, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRu3fmdvkZAvIUwvMNRjUKS-qNguwsdDf-yHjGtKKX-slDwBQWX1QDPj9skWPffThE3Ua_JLfhvNxOHhFmoG2NlTGRaTaFzZGiN-MRsqGqOM2plmzmMKvazniM2Hmg9NSwLRRnH6CS8Bg&usqp=CAc", category: "Men" },
      { name: "Table Tennis Bat", description: "High quality bat", price: 899, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQHkK4wwVLMnUMcroy8IsNk-L1D5rbtI16jPLdasLOinX3FK8x7f6eCZT1lH5yNFMpxD71ELQ-lveGyVF_K_Cm09rBkkN1WEb5Tqq0xiXZv1djZZzqUx5tMh-iCITiqCWsYuAVUVME&usqp=CAc", category: "Sports" },
      { name: "Apple AirPods Pro", description: "Wireless earbuds", price: 14999, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTNeDvkwvFD4pdxh_RpJqJL4iUmKb8UblWeQu8hj4r3x3MfQa7CNPogHnL-KycRhNA-gQjjJro8hdYKp8mpJOfwAbRvpYwhvE2Sqb5FYfmAFOa0f45z-cMQjKYv0yZXFg_5zhdgoQ&usqp=CAc", category: "Electronics" },
      { name: "Adidas Football Shoes", description: "Professional football shoes", price: 3999, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRNyxncW4Db6kytGcy52d8GTDOsS9UBd8WFaMQZ-VeLJRAe3xRh92HJuj_-CUMuX18HXHjVIajIeO-d2v78BVkIojuU4rhbfwO3iBJpe71RABmi6HQ1-Mchk223uCkyNIVuvhf-JIc&usqp=CAc", category: "Shoes" },
      { name: "Baby Walker", description: "Safe walker for babies", price: 2999, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKtSy4Dq-GNAsC-7mRYH0p74gziih7wKodDBzMEURmSbR4BAoIdMaon-sJBw4v4cazWBJIGiL8FFro_x-cWUBngZlYmQULgu3BugDGL7Qq8JyHLupeMDNLPSTuVkRoU2219r6Sgq_nawA&usqp=CAc", category: "Baby" },
      { name: "Men T-Shirt", description: "Casual cotton t-shirt", price: 799, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRK8X9CQlQmUto9CANZi-bqG2UqVCq0o4rZL8A7murfJs20IDdcyJNErepCG2C1vuoV11kfSNGPYiuKfLa0aMBF7oYgsH2bhmDrgCGLX8QuRnme3IVDJwC0kQ&usqp=CAc", category: "Men" },
      { name: "Basketball Nike", description: "Official NBA ball", price: 2499, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcROf14eb5-RrKSlT6NAApukx_nD9HIP7L9eDKxMxdIMbtM640A8Gxt4bQfNY7dZqceAmFLC5QHYpyUPS7BVP_Wlcr9an7gaXPBdEM4p-jZueuflAg5mcxas2SsD5K7fCvc7ePGnIng&usqp=CAc", category: "Sports" },
      { name: "Samsung Galaxy Buds", description: "Wireless earbuds", price: 4999, image: "https://www.bbassets.com/media/uploads/p/l/40329946_4-oneplus-buds-3-tws-earbuds-with-adaptive-noise-cancellation-ip55-water-resistant-fast-charging-splendid-blue.jpg", category: "Electronics" },
      { name: "Puma Sports Shoes", description: "Casual sports shoes", price: 2999, image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/108127/04/sv01/fnd/IND/fmt/png/Badminton-Smash-Sprint-Indoor-Sports-Shoes", category: "Shoes" },
      { name: "Men Jacket", description: "Winter jacket", price: 3999, image: "https://imagescdn.allensolly.com/img/app/product/3/39827108-16449666.jpg?auto=format&w=390", category: "Men" },
      { name: "Baby Clothes Set", description: "Comfortable baby clothes", price: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsoOsoa25nFd8sBaOrVTrRuKaisH5budv0cg&s", category: "Baby" },
      { name: "Sony PlayStation 5", description: "Next-gen gaming console", price: 49999, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTa7wBXQCM2QlkzGsBbgvkAeEzdP-gwckA5x8OG7xZJLQ7svH_W73ZGBcOUrFVAh1r4YV8kY3VQjJwoBccyQuKLVP33Om0jduEmM4ku8ZX0i60DyKy5Pz4lcgDTXR4DGkZ71vs-XLE&usqp=CAc", category: "Electronics" },
      { name: "Basketball Hoop", description: "Adjustable hoop for home", price: 3999, image: "https://m.media-amazon.com/images/I/51Jkc280BiL._SX300_SY300_QL70_FMwebp_.jpg", category: "Sports" },
    ],
  });

  console.log("✅ 30+ Products inserted!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
