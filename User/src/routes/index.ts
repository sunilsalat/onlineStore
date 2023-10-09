import UserRoutes from "../routes/userRoutes";

export const loadRoutes = (app: any) => {
    app.use("/user/api/v1", UserRoutes);
};
