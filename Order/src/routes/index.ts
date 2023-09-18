import OrderRoutes from "./orderRoutes";

export const loadRoutes = (app: any) => {
  app.use("/api/v1/order", OrderRoutes);
};
