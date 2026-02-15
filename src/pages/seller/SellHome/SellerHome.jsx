import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./UI/SellerHome.scss";
import Logo from "../../../../public/images/logotip.png";
import aboutImage1 from "../../../../public/images/about-company-image1.png";
import aboutImage2 from "../../../../public/images/about-company-image2.png";
import aboutImage3 from "../../../../public/images/about-company-image3.png";
import aboutImage4 from "../../../../public/images/about-company-image4.png";

import AddIMage1 from "../../../../public/images/addImage1.png";
import AddIMage2 from "../../../../public/images/addImage2.png";
import AddIMage3 from "../../../../public/images/addImage3.png";
import AddIMage4 from "../../../../public/images/addImage4.png";
import AddIMage5 from "../../../../public/images/addImage5.png";
import AddDott from "../../../../public/images/blueDottImage.png";

import PhoneImage from "../../../../public/images/phoneImage.png";

import roadImage1 from "../../../../public/images/raodmapImage1.png";
import roadImage2 from "../../../../public/images/raodmapImage2.png";
import roadImage3 from "../../../../public/images/raodmapImage3.png";

import footerLogo from "../../../../public/images/footer-logo.png";
import facebook from "../../../../public/images/facebook-logo-button.png";
import insta from "../../../../public/images/instagram-logo.png";
import yt from "../../../../public/images/youtube.png";

const navItems = [
  { label: "Маркетплейс", href: "#" },
  { label: "Про нас", href: "#" },
  { label: "Преимущества", href: "#" },
  { label: "Тарифы", href: "#" },
];
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -12,
    scale: 1.04,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.28)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const menuVariants = {
  closed: { x: "100%", opacity: 0.8 },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 35,
    },
  },
};

const SellerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Инициализация AOS
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out",
      offset: 60,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="wrapper">
      <nav className="navbar" data-aos="fade-down" data-aos-delay="100">
        <div className="nav-glav-box">
          <img src={Logo} alt="Логотип" className="logotip" />

          <ul className="desktop-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="nav-item"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/">
                <button className="nav-btn" id="button">
                  Регистрация
                </button>
              </Link>
            </li>
          </ul>

          <button
            ref={hamburgerRef}
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // ← важно! предотвращает всплытие клика
              setIsMenuOpen((prev) => !prev);
            }}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={handleLinkClick}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  <button className="nav-btn mobile-btn">Регистрация</button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <section className="backImage" data-aos="fade" data-aos-duration="900">
          <div className="hero-text1">Novo - маркетплейс техники</div>
          <div className="hero-title">Продавай технику быстро и удобно!</div>
          <button className="hero-btn">стать продавцем на Novo</button>
        </section>
        <section className="about-company">
          <div
            className="about-compant-text"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Про компанию
          </div>
          <h2
            className="about-compant-title"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            NOVO - торговая площадка коммерческого транспорта и тяжелой техники
          </h2>

          <div className="cards-container">
            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={aboutImage1}
                alt="Коммерческий транспорт"
                className="image"
              />
              <div className="about-card-text">Коммерческий транспорт</div>
            </motion.div>

            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src={aboutImage3} alt="Сельхоз техника" className="image" />
              <div className="about-card-text">
                <span className="spw2">Сельхозная </span>{" "}
                <span className="spw1">техника</span>
              </div>
            </motion.div>

            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={aboutImage2}
                alt="Строительная техника"
                className="image"
              />
              <div className="about-card-text">Строительная техника</div>
            </motion.div>

            <motion.div
              className="card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={aboutImage4}
                alt="Складское оборудование"
                className="image"
              />
              <div className="about-card-text">Складское оборудование</div>
            </motion.div>
          </div>
        </section>
        <section className="adds">
          <h1 className="add-text1" data-aos="fade-up" data-aos-delay="100">
            Понятный мессенджер
          </h1>

          <h1 className="add-text2" data-aos="fade-up" data-aos-delay="200">
            Удобный<span className="ad-sp1">дизайн</span>
          </h1>

          <h1 className="add-text3" data-aos="fade-up" data-aos-delay="300">
            Круглосуточная поддержка
          </h1>

          <img
            src={AddDott}
            alt=""
            className="dots1"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          <img
            src={AddDott}
            alt=""
            className="dots2"
            data-aos="fade-up"
            data-aos-delay="500"
          />
          <img
            src={AddDott}
            alt=""
            className="dots3"
            data-aos="fade-up"
            data-aos-delay="600"
          />

          <div className="add-image-box">
            <img src={AddIMage3} alt="" className="addimage3" loading="lazy" />
            <img src={AddIMage2} alt="" className="addimage2" loading="lazy" />
            <img src={AddIMage4} alt="" className="addimage4" loading="lazy" />
            <img src={AddIMage1} alt="" className="addimage1" loading="lazy" />
            <img src={AddIMage5} alt="" className="addimage5" loading="lazy" />
          </div>
        </section>
        <section className="seller-price">
          <div className="seller-price-header">
            <h3
              className="seller-price-text"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Тарифы и цены
            </h3>

            <h1
              className="seller-price-title"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Стань продавцом сегодня и получи 10 объявлений бесплатно!
            </h1>
          </div>

          <motion.div
            className="seller-price-card-box"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.div
              className="seller-price-card starter"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="seller-price-card-boll"></div>
              <div className="seller-price-card-name">Starter</div>
              <div className="seller-price-card-title">Бесплатно</div>
              <div className="seller-price-card-text1">До 10 объявлений</div>
              <button
                className="seller-price-card-btn"
                aria-label="Выбрать Starter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>

            <motion.div
              className="seller-price-card premium"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <div className="seller-price-card-boll"></div>
              <div className="seller-price-card-boll1"></div>
              <div className="seller-price-card-name">Premium</div>
              <div className="seller-price-card-title">
                ₴ 999 <span className="seller-sp1">/ месяц</span>
              </div>
              <div className="seller-price-card-text2">До 30 объявлений</div>
              <button
                className="seller-price-card-btn"
                aria-label="Выбрать Premium"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>

            <motion.div
              className="seller-price-card ultimate"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="seller-price-card-boll"></div>
              <div className="seller-price-card-boll1"></div>
              <div className="seller-price-card-boll2"></div>
              <div className="seller-price-card-name">Ultimate</div>
              <div className="seller-price-card-title">
                ₴ 1999 <span className="seller-sp1">/ месяц</span>
              </div>
              <div className="seller-price-card-text">До 50 объявлений</div>
              <button
                className="seller-price-card-btn"
                aria-label="Выбрать Ultimate"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          <div className="add-phone">
            <div className="add-phone-container">
              <motion.div
                className="add-phone-left"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <img
                  src={PhoneImage}
                  alt="Мобильное приложение"
                  className="add-phone-image"
                  loading="lazy" // помогает с производительностью
                />
              </motion.div>

              <div className="add-phone-right">
                <div className="add-phone-content">
                  <h1
                    className="add-phone-title"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Хотите размещать больше 50-ти объявлений в месяц?
                  </h1>

                  <motion.p
                    className="add-phone-text"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Мы предложим индивидуальные условия сотрудничества!
                  </motion.p>

                  <motion.button
                    className="add-phone-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.97 }}
                  >
                    отдел продаж
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="roadmap">
          <h1
            className="road-title"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            Начать продавать легко!
          </h1>

          <motion.div
            className="road-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25, // шаги появляются по очереди
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {/* Шаг 1 */}
            <motion.div
              className="road-step"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="road-step-image">
                <img
                  src={roadImage3}
                  alt="Регистрация"
                  className="road-image"
                  loading="lazy"
                />
              </div>
              <div className="road-step-content">
                <h3 className="road-step-number">Шаг 1</h3>
                <h2 className="road-step-title">Регистрация</h2>
              </div>
            </motion.div>

            {/* Шаг 2 */}
            <motion.div
              className="road-step reverse"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="road-step-image">
                <img
                  src={roadImage1}
                  alt="Выбор пакета"
                  className="road-image"
                  loading="lazy"
                />
              </div>
              <div className="road-step-content">
                <h3 className="road-step-number">Шаг 2</h3>
                <h2 className="road-step-title">Выбор пакета</h2>
              </div>
            </motion.div>

            {/* Шаг 3 */}
            <motion.div
              className="road-step"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: "easeOut" },
                },
              }}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="road-step-image">
                <img
                  src={roadImage2}
                  alt="Размещение объявления"
                  className="road-image"
                  loading="lazy"
                />
              </div>
              <div className="road-step-content">
                <h3 className="road-step-number">Шаг 3</h3>
                <h2 className="road-step-title">Размещение объявления</h2>
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            className="road-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            СТАТЬ ПРОДАВЦОМ
          </motion.button>
        </section>

        <section className="footer">
          <div className="footer-container">
            {/* Левый блок с логотипом и текстом */}
            <motion.div
              className="footer-left"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img
                src={footerLogo}
                alt="NOVO Logo"
                className="footer-logotip"
              />
              <p className="footer-description">
                Маркетплейс коммерческого транспорта и тяжёлой техники
              </p>
            </motion.div>

            {/* Блоки ссылок */}
            <div className="footer-links">
              {/* Покупателю */}
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

              {/* Продавцу */}
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

              {/* Соцсети */}
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
                    <img
                      src={facebook}
                      alt="Facebook"
                      className="social-icon"
                    />
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
          <motion.div className="footer-copyright">
            © 2019–{new Date().getFullYear()} Группа компаний «NOVO»
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default SellerHome;
