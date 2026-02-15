import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import footerLogo from "../../../../public/images/footer-logo.png";
import facebook from "../../../../public/images/facebook-logo-button.png";
import insta from "../../../../public/images/instagram-logo.png";
import yt from "../../../../public/images/youtube.png";
import RegLogo from "../../../../public/images/regisLogo.png";
import "./UI/Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeToken =
      "123456eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9MASJD#GE&#NDJASDJKASDNK";

    localStorage.setItem("token", fakeToken);
    navigate("/profile");
  };

  return (
    <div className="register-page">
      <header
        className="regis-nav"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-delay="100"
      >
        <div className="nav-container">
          <img src={RegLogo} alt="NOVO Logo" className="reg-logo" />

          <Link to="/seller">
            <button className="reg-nav-btn">Перейти на NOVO</button>
          </Link>
        </div>
      </header>

      <main className="reg-main">
        <motion.div
          className="reg-box"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="reg-title" data-aos="fade-up" data-aos-delay="150">
            Регистрация продавца
          </h1>

          <p className="reg-subtitle" data-aos="fade-up" data-aos-delay="200">
            Заполните указанные поля, чтобы создать аккаунт продавца
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="reg-form"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.div
              className="form-section"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
            >
              <h3 className="form-title">Аккаунт</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль *</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Минимум 8 символов"
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="form-section"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
            >
              <h3 className="form-title">О компании</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="companyName">Название компании *</label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="ООО «Моя Компания»"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Город *</label>
                  <input type="text" id="city" placeholder="Ташкент" required />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Адрес</label>
                  <input type="text" id="address" placeholder="ул. Навои, 10" />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Почтовый индекс</label>
                  <input
                    type="number"
                    id="postalCode"
                    placeholder="100000"
                    inputMode="numeric"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Мобильный телефон *</label>
                  <input
                    type="number"
                    id="phone"
                    placeholder="+998 99 123 45 67"
                    required
                    inputMode="tel"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="website">Веб-сайт</label>
                  <input
                    type="url"
                    id="website"
                    placeholder="https://mycompany.uz"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="form-section"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
            >
              <h3 className="form-title">Контактное лицо</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contactName">ФИО *</label>
                  <input
                    type="text"
                    id="contactName"
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone">Мобильный телефон *</label>
                  <input
                    type="number"
                    id="contactPhone"
                    placeholder="+998 90 987 65 43"
                    required
                    inputMode="tel"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="form-agreement"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.4 },
                },
              }}
            >
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  Авторизуясь, Вы принимаете{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Условия использования
                  </a>{" "}
                  и{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    Заявление о конфиденциальности NOVO
                  </a>
                </span>
              </label>

              <div className="form-buttons">
                <motion.button
                  type="submit"
                  className="reg-submit-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Продолжить
                </motion.button>

                <Link to="/login" className="reg-login-link">
                  Есть аккаунт? Войти
                </Link>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </main>

      <section className="footer">
        <div className="footer-container">
          <motion.div
            className="footer-left"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img src={footerLogo} alt="NOVO Logo" className="footer-logotip" />
            <p className="footer-description">
              Маркетплейс коммерческого транспорта и тяжёлой техники
            </p>
          </motion.div>

          <div className="footer-links">
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4 className="footer-column-title">Покупателю</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#">Как купить</a>
                </li>
                <li>
                  <a href="#">Безопасность сделок</a>
                </li>
                <li>
                  <a href="#">Доставка и оплата</a>
                </li>
                <li>
                  <a href="#">Гарантии</a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h4 className="footer-column-title">Продавцу</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#">Стать продавцом</a>
                </li>
                <li>
                  <a href="#">Тарифы</a>
                </li>
                <li>
                  <a href="#">Правила размещения</a>
                </li>
                <li>
                  <a href="#">Поддержка продавцов</a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="footer-column social-column"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h4 className="footer-column-title">Следите за нами</h4>
              <div className="social-icons">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={facebook} alt="Facebook" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={insta} alt="Instagram" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src={yt} alt="YouTube" className="social-icon" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div id="footer-copyright" className="footer-copyright">
          © 2019–{new Date().getFullYear()} Группа компаний «NOVO»
        </motion.div>
      </section>
    </div>
  );
};

export default Register;
