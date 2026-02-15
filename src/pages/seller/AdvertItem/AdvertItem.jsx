import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Save, X } from "lucide-react";
import { updateItem, deleteItem } from "../../../api/ItemsApi/ItemsAPI";
import "./UI/AdvertItem.scss";

export default function AdvertItem({ item, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...item });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) return alert("Название обязательно");

    setIsSaving(true);
    try {
      await updateItem(item.id, form);
      setEditMode(false);
      refresh();
    } catch (err) {
      console.error("Ошибка обновления:", err);
      alert("Не удалось сохранить изменения");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Удалить объявление навсегда?")) return;

    setIsDeleting(true);
    try {
      await deleteItem(item.id);
      refresh();
    } catch (err) {
      console.error("Ошибка удаления:", err);
      alert("Не удалось удалить объявление");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setForm({ ...item });
    setEditMode(false);
  };

  return (
    <motion.div
      className="advert-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
    >
      {editMode ? (
        <div className="edit-mode">
          <div className="edit-header">
            <h3>Редактирование объявления</h3>
            <div className="edit-actions">
              <motion.button
                className="save-btn"
                onClick={handleSave}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Save size={18} />
                {isSaving ? "Сохранение..." : "Сохранить"}
              </motion.button>

              <motion.button
                className="cancel-btn"
                onClick={handleCancel}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <X size={18} />
                Отмена
              </motion.button>
            </div>
          </div>

          <div className="edit-grid">
            <div className="form-group">
              <label>Название</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Например: MAN TGX 18.440"
              />
            </div>

            <div className="form-group">
              <label>Год</label>
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="2020"
              />
            </div>

            <div className="form-group">
              <label>Грузоподъёмность (кг)</label>
              <input
                name="kg"
                type="number"
                value={form.kg}
                onChange={handleChange}
                placeholder="18000"
              />
            </div>

            <div className="form-group">
              <label>Пробег (км)</label>
              <input
                name="km"
                type="number"
                value={form.km}
                onChange={handleChange}
                placeholder="450000"
              />
            </div>

            <div className="form-group">
              <label>Местоположение</label>
              <input
                name="locate"
                value={form.locate}
                onChange={handleChange}
                placeholder="Ташкент, Яшнабад"
              />
            </div>

            <div className="form-group">
              <label>Цена ($)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="45000"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="item-header">
            <h3 className="item-name">{item.name || "Без названия"}</h3>
            <div className="item-meta">
              <span>{item.year || "—"} г.</span>
              <span>{item.kg ? `${item.kg} кг` : "—"}</span>
              <span>{item.km ? `${item.km} км` : "—"}</span>
            </div>
          </div>

          <div className="item-details">
            <span className="location">{item.locate || "Не указано"}</span>
            <span className="price">
              {item.price
                ? `$${Number(item.price).toLocaleString()}`
                : "Цена не указана"}
            </span>
          </div>

          <div className="item-actions">
            <motion.button
              className="edit-btn"
              onClick={() => setEditMode(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Edit size={18} />
              Редактировать
            </motion.button>

            <motion.button
              className="delete-btn"
              onClick={handleDelete}
              disabled={isDeleting}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Trash2 size={18} />
              {isDeleting ? "Удаление..." : "Удалить"}
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
