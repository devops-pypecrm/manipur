"use client";

import API from "@/lib/api";
import "@/styles/Hero.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_HERO = {
  title: "Shaping The Leaders of Tomorrow",
  subtitle:
    "An institution committed to intellectual rigor, industry integration, and transformative learning experiences that shape global professionals.",
  images: ["/hero/01.webp", "/hero/02.webp", "/hero/03.webp"],
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const [heroData, setHeroData] = useState(DEFAULT_HERO);

  useEffect(() => {
    API.get("/settings/hero")
      .then(({ data }) => {
        if (data?.content) {
          setHeroData((prev) => ({
            title: data.content.title || prev.title,
            subtitle: data.content.subtitle || prev.subtitle,
            images:
              Array.isArray(data.content.images) && data.content.images.length > 0
                ? data.content.images
                : prev.images,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const title = heroData?.title || DEFAULT_HERO.title;
  const subtitle = heroData?.subtitle || DEFAULT_HERO.subtitle;
  const images = heroData?.images;

  const displayImages =
    Array.isArray(images) && images.length > 0
      ? images
      : DEFAULT_HERO.images;

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);

      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);

      setFade(true);

      setTimeout(() => {
        setFade(false);
      }, 1000); // match CSS transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, displayImages.length]);

  return (
    <section className="lpu-hero-container">
      {/* New Image */}
      <div className="hero-image-wrapper">
        <Image
          src={displayImages[currentImageIndex]}
          alt={title}
          fill
          priority={currentImageIndex === 0}
          className="hero-image"
          sizes="100vw"
        />

        {fade && (
          <Image
            src={displayImages[previousImageIndex]}
            alt=""
            fill
            className="hero-image hero-image-fade"
            // sizes="100vw"
          />
        )}
      </div>

      <div className="lpu-hero-overlay"></div>

      <div className="container hero-layout">
        <div className="hero-typography">
          <h1 className="hero-main-title">{title}</h1>
          <p className="hero-subtext">{subtitle}</p>

          <div className="hero-buttons">
            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-orange"
            >
              Admissions 2026
            </a>
          </div>

          {/* <div className="hero-trust-badges">
            <div className="trust-item">
              <span className="big-num">{pageContent.stat1Value}</span>
              <span className="small-txt">{pageContent.stat1Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat2Value}</span>
              <span className="small-txt">{pageContent.stat2Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat3Value}</span>
              <span className="small-txt">{pageContent.stat3Label}</span>
            </div>

            <div className="trust-item">
              <span className="big-num">{pageContent.stat4Value}</span>
              <span className="small-txt">{pageContent.stat4Label}</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
