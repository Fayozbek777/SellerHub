import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MessageSquare,
  CreditCard,
  Settings,
  Search,
  PlusCircle,
  ChevronRight,
  Trash2,
  Archive,
  Star,
  Clock,
  Check,
  Download,
  Crown,
  Zap,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import proffLogo from "../../../../public/images/regisLogo.png";
import AddModal from "../../../components/common/AddModal/AddModal";
import AddItemForm from "../AddItemForm/AddItemForm";
import AdvertItem from "../AdvertItem/AdvertItem";
import { getItems } from "../../../api/ItemsApi/ItemsAPI";
import "./UI/Profile.scss";

const tabs = [
  { name: "Мои объявления", icon: Home },
  { name: "Сообщения (4 новых)", icon: MessageSquare },
  { name: "Управление подпиской", icon: CreditCard },
  { name: "Настройки профиля", icon: Settings },
];

const mockMessages = [
  {
    id: 1,
    sender: "Алексей Иванов",
    subject: "Вопрос по объявлению",
    preview:
      "Здравствуйте! Меня интересует ваше предложение. Можем ли мы обсудить детали?",
    timestamp: "2 часа назад",
    unread: true,
  },
  {
    id: 2,
    sender: "Мария Петрова",
    subject: "Запрос на сотрудничество",
    preview:
      "Добрый день! Хотела бы предложить вам партнерство. У нас есть интересное предложение...",
    timestamp: "5 часов назад",
    unread: true,
  },
  {
    id: 3,
    sender: "Дмитрий Соколов",
    subject: "Уточнение по условиям",
    preview: "Подскажите, пожалуйста, какие у вас условия доставки?",
    timestamp: "1 день назад",
    unread: false,
  },
  {
    id: 4,
    sender: "Екатерина Волкова",
    subject: "Благодарность",
    preview: "Спасибо большое за быстрый ответ! Все отлично получилось.",
    timestamp: "2 дня назад",
    unread: false,
  },
];

// Моковые данные для планов подписки
const subscriptionPlans = [
  {
    id: 1,
    name: "Базовый",
    price: "Бесплатно",
    features: [
      "До 10 объявлений",
      "Базовая статистика",
      "Стандартная поддержка",
      "Срок размещения: 30 дней",
    ],
    current: true,
  },
  {
    id: 2,
    name: "Профессиональный",
    price: "99 000 сум/мес",
    features: [
      "До 50 объявлений",
      "Расширенная аналитика",
      "Приоритетная поддержка",
      "Срок размещения: 60 дней",
      "Продвижение объявлений",
      "Выделение в топе",
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Бизнес",
    price: "249 000 сум/мес",
    features: [
      "Неограниченно объявлений",
      "Полная аналитика и отчеты",
      "VIP поддержка 24/7",
      "Срок размещения: 90 дней",
      "Максимальное продвижение",
      "Персональный менеджер",
      "API доступ",
    ],
  },
];

// Моковые данные для истории платежей
const billingHistory = [
  {
    id: 1,
    date: "15 января 2025",
    description: "Подписка «Базовый»",
    amount: "0 сум",
    status: "completed",
  },
  {
    id: 2,
    date: "15 декабря 2024",
    description: "Подписка «Базовый»",
    amount: "0 сум",
    status: "completed",
  },
];

const Profie = () => {
  const [activeTab, setActiveTab] = useState("Мои объявления");
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [messageFilter, setMessageFilter] = useState("all");
  const [messages, setMessages] = useState(mockMessages);

  const refresh = async () => {
    const res = await getItems();
    setItems(res.data || []);
  };

  useEffect(() => {
    refresh();
    // Инициализация AOS
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const isSettingsTab = activeTab === "Настройки профиля";
  const isMessagesTab = activeTab === "Сообщения (4 новых)";
  const isSubscriptionTab = activeTab === "Управление подпиской";

  // Фильтрация сообщений
  const filteredMessages = messages.filter((msg) => {
    if (messageFilter === "unread") return msg.unread;
    if (messageFilter === "read") return !msg.unread;
    return true;
  });

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="profile-page">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Навбар */}
      <motion.nav
        className="profile-navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="nav-container">
          <Link to="/">
            <img src={proffLogo} alt="NOVO Logo" className="logo" />
          </Link>

          <Link to="/seller">
            <motion.button
              className="profile-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home size={18} />
              Вернуться на главную
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      <main className="profile-main">
        <motion.div
          className="profile-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h1 className="advert-title" data-aos="fade-up" data-aos-delay="100">
            {isSettingsTab
              ? "Настройки профиля"
              : isMessagesTab
                ? "Сообщения"
                : isSubscriptionTab
                  ? "Управление подпиской"
                  : "Мои объявления"}
          </h1>

          {/* Вкладки */}
          <motion.div
            className="advert-sections"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.name}
                className={`advert-section ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <tab.icon size={20} />
                {tab.name}
                {tab.name.includes("Сообщения") && (
                  <span className="badge">4 новых</span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Контент в зависимости от вкладки */}
          <AnimatePresence mode="wait">
            {isMessagesTab ? (
              // СЕКЦИЯ СООБЩЕНИЙ
              <motion.div
                className="messages-section"
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="messages-header"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2>Входящие сообщения</h2>
                  <div className="filter-buttons">
                    <button
                      className={messageFilter === "all" ? "active" : ""}
                      onClick={() => setMessageFilter("all")}
                    >
                      Все
                    </button>
                    <button
                      className={messageFilter === "unread" ? "active" : ""}
                      onClick={() => setMessageFilter("unread")}
                    >
                      Непрочитанные
                    </button>
                    <button
                      className={messageFilter === "read" ? "active" : ""}
                      onClick={() => setMessageFilter("read")}
                    >
                      Прочитанные
                    </button>
                  </div>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`message-card ${
                        message.unread ? "unread" : ""
                      }`}
                      variants={itemVariants}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="avatar">
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="sender-name">{message.sender}</span>
                          <span className="timestamp">{message.timestamp}</span>
                        </div>
                        <div className="message-subject">{message.subject}</div>
                        <div className="message-preview">{message.preview}</div>
                      </div>
                      <div className="message-actions">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Архивировать"
                        >
                          <Archive size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Удалить"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="В избранное"
                        >
                          <Star size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {filteredMessages.length === 0 && (
                  <motion.div
                    className="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p>Нет сообщений в этой категории</p>
                  </motion.div>
                )}
              </motion.div>
            ) : isSubscriptionTab ? (
              // СЕКЦИЯ УПРАВЛЕНИЯ ПОДПИСКОЙ
              <motion.div
                className="subscription-section"
                key="subscription"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Текущий план */}
                <motion.div
                  className="current-plan"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="plan-badge">
                    <Crown size={16} />
                    Активный план
                  </div>
                  <div className="plan-name">Базовый</div>
                  <div className="plan-price">
                    Бесплатно<span></span>
                  </div>
                  <ul className="plan-features">
                    <li>До 10 объявлений</li>
                    <li>Базовая статистика</li>
                    <li>Стандартная поддержка</li>
                    <li>Срок размещения: 30 дней</li>
                  </ul>
                  <div className="renewal-date">
                    <Clock
                      size={16}
                      style={{ display: "inline", marginRight: "8px" }}
                    />
                    Следующее продление: 15 февраля 2025
                  </div>
                </motion.div>

                {/* Доступные планы */}
                <div>
                  <h2
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "1.5rem",
                    }}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    Доступные планы
                  </h2>
                  <motion.div
                    className="plans-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {subscriptionPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        className={`plan-card ${
                          plan.recommended ? "recommended" : ""
                        }`}
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        data-aos="fade-up"
                        data-aos-delay={400 + index * 100}
                      >
                        {plan.recommended && (
                          <div className="recommend-badge">Рекомендуем</div>
                        )}
                        <div className="plan-header">
                          <h3>{plan.name}</h3>
                          <div className="price">
                            {plan.price}
                            {plan.id !== 1 && <span></span>}
                          </div>
                        </div>
                        <ul className="plan-features">
                          {plan.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                        <motion.button
                          className={`plan-btn ${
                            plan.current ? "current" : ""
                          }`}
                          whileHover={!plan.current ? { scale: 1.05 } : {}}
                          whileTap={!plan.current ? { scale: 0.95 } : {}}
                        >
                          {plan.current ? "Текущий план" : "Выбрать план"}
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* История платежей */}
                <motion.div
                  className="billing-history"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <h3>История платежей</h3>
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Дата</th>
                        <th>Описание</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * item.id }}
                        >
                          <td>{item.date}</td>
                          <td>{item.description}</td>
                          <td className="amount">{item.amount}</td>
                          <td className="status">
                            <span
                              className={`status-badge ${
                                item.status === "completed" ? "" : "failed"
                              }`}
                            >
                              {item.status === "completed"
                                ? "Оплачено"
                                : "Неуспешно"}
                            </span>
                          </td>
                          <td>
                            <motion.button
                              className="download-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Download
                                size={14}
                                style={{ marginRight: "4px" }}
                              />
                              Скачать
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>
            ) : isSettingsTab ? (
              // СЕКЦИЯ НАСТРОЕК
              <motion.div
                className="settings-section"
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Настройка аккаунта */}
                <motion.div
                  className="settings-block"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  whileHover={{ y: -4 }}
                >
                  <div className="settings-title">Настройка аккаунта</div>
                  <div className="settings-item">
                    <span>Ваш E-mail адрес:</span>
                    <span className="email">example@domain.com</span>
                  </div>
                  <div className="settings-item">
                    <span>Изменить E-mail адрес</span>
                    <input type="email" placeholder="Новый E-mail" />
                    <motion.button
                      className="save-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Сохранить
                    </motion.button>
                  </div>

                  <div className="settings-item">
                    <span>Изменить пароль</span>
                    <input type="password" placeholder="Новый пароль" />
                    <motion.button
                      className="save-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Сохранить
                    </motion.button>
                  </div>
                </motion.div>

                {/* Информация о компании */}
                <motion.div
                  className="settings-block"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  whileHover={{ y: -4 }}
                >
                  <div className="settings-title">
                    Изменить контактную информацию
                  </div>
                  <p className="settings-desc">
                    Тут вы можете поменять информацию про компанию, которую
                    видят ваши клиенты
                  </p>

                  <div className="settings-grid">
                    <div className="form-group">
                      <label>Название компании</label>
                      <input type="text" placeholder="ООО «Моя Компания»" />
                    </div>

                    <div className="form-group">
                      <label>Страна</label>
                      <input type="text" placeholder="Узбекистан" />
                    </div>

                    <div className="form-group">
                      <label>Город</label>
                      <input type="text" placeholder="Ташкент" />
                    </div>

                    <div className="form-group">
                      <label>Адрес</label>
                      <input type="text" placeholder="ул. Навои, 10" />
                    </div>

                    <div className="form-group">
                      <label>Почтовый индекс</label>
                      <input type="text" placeholder="100000" />
                    </div>

                    <div className="form-group">
                      <label>Мобильный телефон</label>
                      <input type="tel" placeholder="+998 99 123 45 67" />
                    </div>

                    <div className="form-group">
                      <label>Веб-сайт</label>
                      <input type="url" placeholder="https://mycompany.uz" />
                    </div>

                    <div className="form-group">
                      <label>Время работы</label>
                      <input type="text" placeholder="Пн–Пт 9:00–18:00" />
                    </div>
                  </div>

                  <div className="settings-title">Контактное лицо</div>

                  <div className="settings-grid">
                    <div className="form-group">
                      <label>ФИО</label>
                      <input type="text" placeholder="Иванов Иван Иванович" />
                    </div>

                    <div className="form-group">
                      <label>Мобильный телефон</label>
                      <input type="tel" placeholder="+998 90 987 65 43" />
                    </div>
                  </div>

                  <motion.button
                    className="save-btn large"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Сохранить
                  </motion.button>
                </motion.div>

                {/* Описание компании */}
                <motion.div
                  className="settings-block company-description"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  whileHover={{ y: -4 }}
                >
                  <div className="settings-title">
                    Изменить информацию о компании
                  </div>
                  <p className="settings-desc">
                    Опишите вашу компанию. Эта информация будет показана на
                    странице продавца
                  </p>

                  <textarea
                    placeholder="Напишите краткое описание вашей компании..."
                    rows={10}
                  />

                  <motion.button
                    className="save-btn large"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Сохранить изменения
                  </motion.button>
                </motion.div>

                {/* Выход из аккаунта */}
                <motion.div
                  className="logout-section"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <motion.button
                    className="logout-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Выйти из аккаунта
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              // СЕКЦИЯ ОБЪЯВЛЕНИЙ
              <motion.div
                key="adverts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="adver-obsh"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  whileHover={{ scale: 1.01 }}
                >
                  <span>Использовано объявлений: {items.length}/10</span>
                  <motion.button
                    className="upgrade-btn"
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Увеличить лимит <ChevronRight size={18} />
                  </motion.button>
                </motion.div>

                <motion.div
                  className="search-add-bar"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                      type="search"
                      placeholder="Поиск по объявлениям..."
                      className="search-input"
                    />
                  </div>

                  <motion.button
                    className="add-advert-btn"
                    onClick={() => {
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
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PlusCircle size={20} />
                    Добавить объявление
                  </motion.button>
                </motion.div>

                <motion.div
                  className="advert-list"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {items.length === 0 ? (
                    <motion.div
                      className="empty-state"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p>У вас пока нет объявлений</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="items-grid"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          <AdvertItem item={item} refresh={refresh} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <AddModal show={showModal} onClose={() => setShowModal(false)}>
        <AddItemForm onClose={() => setShowModal(false)} refresh={refresh} />
      </AddModal>
    </div>
  );
};

export default Profie;
