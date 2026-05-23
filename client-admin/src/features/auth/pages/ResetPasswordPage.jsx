import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosAuth } from "../../../shared/api/api";
import toast from "react-hot-toast";
import { useState } from "react";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axiosAuth.post("/auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });
      toast.success("¡Contraseña restablecida! Ya puedes iniciar sesión.", { duration: 5000 });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "El enlace expiró o es inválido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Nueva Contraseña</h1>
          <p className="text-gray-600 text-base">Ingresa tu nueva contraseña</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">
              Nueva Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("newPassword", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Mínimo 8 caracteres" }
              })}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                validate: (val) => val === watch("newPassword") || "Las contraseñas no coinciden"
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
          >
            {loading ? "Guardando..." : "Restablecer Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
};