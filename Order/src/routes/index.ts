import OrderRoutes from "./orderRoutes";

export const loadRoutes = (app: any) => {
  app.use("/order/api/v1", OrderRoutes);
};
