import InventoryRoutes from "./inventoryRoutes";

export const loadRoutes = (app: any) => {
  app.use("/api/v1/inventory", InventoryRoutes);
};
