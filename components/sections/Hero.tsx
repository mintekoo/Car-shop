import HeroClient from "./HeroClient";
import { fetchProducts } from "@/lib/api";

export default async function Hero() {
  const res = await fetchProducts({ page: 1, perPage: 5 });
  const featuredProducts = res.products;

  return <HeroClient featuredProducts={featuredProducts} />;
}
