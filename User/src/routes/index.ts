import UserRoutes from "../routes/userRoutes";

export const loadRoutes = (app: any) => {
  app.use("/api/v1/user", UserRoutes);
};
