import React, { useState, useEffect } from "react";
import { addItem } from "../../../api/ItemsApi/ItemsAPI";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import "./UI/AddItemForm.scss";

export default function AddItemForm({ onClose, refresh }) {
  const [form, setForm] = useState({
    image: "https://via.placeholder.com/150?text=Вставьте+ссылку+на+фото",
    name: "",
    year: "",
    kg: "",
    km: "",
    locate: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    toast.error("Db Json not working with Vercel Sorry", {
      duration: 6000,
      position: "top-center",
      style: {
        background: "#1b1b1e",
        color: "#ffcccc",
        border: "2px solid #ff4d4f",
        borderRadius: "16px",
        padding: "20px 32px",
        fontSize: "18px",
        maxWidth: "480px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      },
      iconTheme: {
        primary: "#ff4d4f",
        secondary: "#ffffff",
      },
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Название обязательно!", {
        duration: 4000,
        style: {
          background: "#1b1b1e",
          color: "#ffcccc",
          border: "2px solid #ff4d4f",
        },
      });
      return;
    }

    setIsSubmitting(true);

    const toastId = toast.loading("Попытка добавить объявление...");

    try {
      await addItem(form);
      toast.success("Объявление добавлено (если бэкенд работал бы)", {
        id: toastId,
      });
      refresh();
      onClose();
    } catch (err) {
      toast.error("Ошибка добавления (как и ожидалось на Vercel)", {
        id: toastId,
      });
      console.error("Ошибка:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="add-item-form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="form-header">
          <h2 className="form-title">Добавить объявление</h2>
          <p className="form-subtitle">
            Заполните характеристики и вставьте ссылку на фото
          </p>
        </div>

        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="image">Ссылка на изображение</label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/my-truck.jpg"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="name">Название техники *</label>
            <input
              id="name"
              name="name"
              placeholder="Например: MAN TGX 18.440"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Год выпуска *</label>
            <input
              id="year"
              name="year"
              type="number"
              placeholder="2020"
              value={form.year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="kg">Грузоподъёмность (кг)</label>
            <input
              id="kg"
              name="kg"
              type="number"
              placeholder="18000"
              value={form.kg}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="km">Пробег (км)</label>
            <input
              id="km"
              name="km"
              type="number"
              placeholder="450000"
              value={form.km}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locate">Местоположение</label>
            <input
              id="locate"
              name="locate"
              placeholder="Ташкент, Яшнабадский район"
              value={form.locate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="price">Цена (в $)</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="45000"
              value={form.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </button>

          <motion.button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !form.name.trim()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? "Добавление..." : "Добавить объявление"}
          </motion.button>
        </div>
      </motion.form>
    </>
  );
}
