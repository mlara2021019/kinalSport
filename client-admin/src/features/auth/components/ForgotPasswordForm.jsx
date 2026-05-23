import { useForm } from "react-hook-form";
import { forgotPassword } from "../../../shared/api/auth";
import toast from "react-hot-toast";
import { useState } from "react";

export const ForgotPasswordForm = ({ onSwitch }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await forgotPassword(data);
      toast.success("¡Correo enviado! Revisa tu bandeja de entrada.", { duration: 5000 });
      reset();
    } catch (error) {
      toast.error("No se pudo enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email
        </label>

        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2 border rounded-lg"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido"
            }
          })}
        />

        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        {loading ? "Enviando..." : "Enviar Correo"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={onSwitch}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  );
};