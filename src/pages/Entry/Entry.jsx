import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import * as THREE from "three";
import "./Entry.scss";
import { Link } from "react-router-dom";

const Entry = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeBox, setActiveBox] = useState(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: window.innerWidth > 768,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth > 768 ? 1500 : 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xff6b35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    const shapes = [];
    const geometries = [
      new THREE.TorusGeometry(0.5, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
    ];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshPhongMaterial({
        color: index === 0 ? 0xff6b35 : index === 1 ? 0x667eea : 0xf5576c,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (index - 1) * 3;
      mesh.position.z = -2;
      scene.add(mesh);
      shapes.push(mesh);
    });

    const pointLight = new THREE.PointLight(0xff6b35, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.03;

      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.3 * (index + 1);
        shape.rotation.y = elapsedTime * 0.2 * (index + 1);
      });

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach((geo) => geo.dispose());
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: false,
      offset: 100,
    });
  }, []);

  const handleMouseMove = (e, boxId) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setActiveBox(boxId);
    }
  };

  const handleMouseLeave = () => {
    setActiveBox(null);
  };

  return (
    <div className="entry-container">
      <canvas ref={canvasRef} className="webgl-canvas" />

      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">⚙</span>
            <span className="logo-text">SellerHUB</span>
          </div>
          <div className="navbar-links">
            <a href="#catalog">Каталог</a>
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
          </div>
        </div>
      </nav>

      <main className="main-content" ref={containerRef}>
        <div className="heading-wrapper" data-aos="fade-down">
          <h1 className="main-heading">Выберите свою роль</h1>
          <p className="main-subheading">
            Присоединяйтесь к крупнейшей платформе тяжелой техники
          </p>
        </div>

        <div className="boxes-container">
          {activeBox && (
            <motion.div
              className="cursor-follower"
              animate={{
                x: cursorPosition.x - 100,
                y: cursorPosition.y - 100,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.5,
              }}
            />
          )}

          <motion.div
            className="role-box buyer-box"
            data-aos="fade-right"
            data-aos-delay="200"
            onMouseMove={(e) => handleMouseMove(e, "buyer")}
            onMouseLeave={handleMouseLeave}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 50,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="box-content">
              <div className="box-icon">🏗️</div>
              <h2 className="box-title">Покупатель</h2>
              <p className="box-description">
                Найдите идеальную технику для вашего бизнеса из тысяч
                предложений
              </p>
              <ul className="box-features">
                <li>Проверенные продавцы</li>
                <li>Широкий выбор техники</li>
                <li>Удобный поиск и фильтры</li>
              </ul>
              <Link to="/buyer">
                <motion.button
                  className="box-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Начать поиск
                </motion.button>
              </Link>
            </div>
            <div className="box-overlay"></div>
          </motion.div>

          <motion.div
            className="role-box seller-box"
            data-aos="fade-left"
            data-aos-delay="400"
            onMouseMove={(e) => handleMouseMove(e, "seller")}
            onMouseLeave={handleMouseLeave}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              z: 50,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="box-content">
              <div className="box-icon">🚜</div>
              <h2 className="box-title">Продавец</h2>
              <p className="box-description">
                Продавайте технику миллионам покупателей по всей стране
              </p>
              <ul className="box-features">
                <li>Быстрое размещение</li>
                <li>Аналитика продаж</li>
                <li>Безопасные сделки</li>
              </ul>
              <Link to="/seller">
                <motion.button
                  id="boxBtn"
                  className="box-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Разместить объявление
                </motion.button>
              </Link>
            </div>
            <div className="box-overlay"></div>
          </motion.div>
        </div>

        <div className="bg-decoration">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-grid"></div>
        </div>
      </main>
    </div>
  );
};

export default Entry;
