import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import "./UI/Modal.scss";

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Телефон — только цифры
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.includes("@") &&
      formData.email.includes(".") &&
      formData.phone.trim().length >= 9
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Заполните все поля правильно!", {
        duration: 4000,
        style: {
          background: "#1b1b1e",
          color: "#ffcccc",
          border: "2px solid #ff4d4f",
          borderRadius: "16px",
          padding: "20px 32px",
          fontSize: "18px",
        },
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Отправляем...", {
      style: {
        background: "#1b1b1e",
        color: "#ddd",
        border: "2px solid #555",
        borderRadius: "16px",
        padding: "18px 28px",
        fontSize: "17px",
      },
    });

    try {
      // Имитация отправки (замени на реальный fetch/axios)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      toast.success("Успешно! Мы перезвоним вам в ближайшее время", {
        id: toastId,
        duration: 7000,
        style: {
          background: "#1b1b1e",
          color: "#e0ffe6",
          border: "2px solid #009661",
          borderRadius: "20px",
          padding: "28px 40px",
          fontSize: "19px",
          maxWidth: "540px",
          lineHeight: "1.5",
          boxShadow: "0 20px 50px rgba(0, 150, 97, 0.3)",
        },
        iconTheme: {
          primary: "#009661",
          secondary: "#ffffff",
        },
      });

      // Закрываем модал после успеха (опционально)
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      toast.error("Произошла ошибка. Попробуйте позже", {
        id: toastId,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Глобальный Toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={24}
        containerStyle={{ top: 40, zIndex: 3000 }}
        toastOptions={{
          duration: 6000,
          style: {
            fontFamily: "Manrope, sans-serif",
            borderRadius: "16px",
            background: "#1b1b1e",
            color: "#fff",
            boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
            padding: "20px 32px",
            fontSize: "17px",
            maxWidth: "520px",
          },
        }}
      />

      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.7, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Крестик закрытия */}
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <h1 className="modal-title">Мы свяжемся с вами в ближайшее время</h1>
          <p className="modal-text">
            Впишите свои данные и мы перезвоним вам для создания личного
            тарифного плана
          </p>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя *"
                required
              />
              <div className="line"></div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail адрес *"
                required
              />
              <div className="line"></div>
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Номер телефона *"
                required
                maxLength={12}
              />
              <div className="line"></div>
            </div>

            <motion.button
              type="submit"
              className="modal-submit-btn"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.email ||
                !formData.phone
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? "Отправка..." : "Перезвоните мне"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Modal;
