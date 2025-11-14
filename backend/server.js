import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* ---------------------- PRODUCTS SECTION ---------------------- */

// ✅ Get all products (with search, sort, pagination, and category filter)
app.get("/products", async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 6, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      ...(category && { category }),
      ...(search && { name: { contains: search, mode: "insensitive" } }),
    };

    const orderBy =
      sort === "price_asc"
        ? { price: "asc" }
        : sort === "price_desc"
        ? { price: "desc" }
        : { id: "asc" };

    const products = await prisma.product.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy,
    });

    const total = await prisma.product.count({ where });
    res.json({ products, total });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Get unique product categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    res.json(categories.map((c) => c.category));
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ✅ Get single product + related products
app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const related = await prisma.product.findMany({
      where: {
        category: product.category,
        NOT: { id },
      },
      take: 4,
    });

    res.json({ product, related });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

/* ---------------------- CART SECTION ---------------------- */

// ✅ Add to cart (increment quantity if exists)
app.post("/cart", async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const existing = await prisma.cart.findFirst({
      where: { productId: Number(productId) },
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cart.create({
        data: { productId: Number(productId), quantity: 1 },
        include: { product: true },
      });
    }

    res.json(cartItem);
  } catch (err) {
    console.error("Add to cart failed:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// ✅ Get all cart items
app.get("/cart", async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.json([]);
  }
});

// ✅ Update cart quantity
app.patch("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await prisma.cart.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) },
      include: { product: true },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// ✅ Delete cart item
app.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.cart.delete({ where: { id: Number(id) } });
    res.json(deleted);
  } catch (err) {
    console.error("Error deleting cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

/* ---------------------- SERVER ---------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
