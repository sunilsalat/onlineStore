import InventoryRoutes from "./inventoryRoutes";

export const loadRoutes = (app: any) => {
  app.use("/inventory/api/v1", InventoryRoutes);
};
