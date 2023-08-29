import ProductRoutes from "../routes/productRoutes";

export const loadRoutes = (app: any) => {
  app.use("/api/v1/product", ProductRoutes);
};
