"use client";

import React, { useState, useEffect } from "react";
import "@/styles/Stats.css";
import API from "@/lib/api";

const DEFAULT_STATS = [
  {
    value: "2019",
    label: "Year Established",
  },
  {
    value: "100+",
    label: "Receive Multiyear Fellowships",
  },
  {
    value: "50+",
    label: "Academic Programs",
  },
  {
    value: "10",
    label: "Research Centers",
  },
];

const Stats = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    API.get("/settings/page-home")
      .then(({ data }) => {
        if (data?.content) {
          const {
            stat1Value,
            stat1Label,
            stat2Value,
            stat2Label,
            stat3Value,
            stat3Label,
            stat4Value,
            stat4Label,
          } = data.content;

          setStats([
            {
              value: stat1Value || DEFAULT_STATS[0].value,
              label: stat1Label || DEFAULT_STATS[0].label,
            },
            {
              value: stat2Value || DEFAULT_STATS[1].value,
              label: stat2Label || DEFAULT_STATS[1].label,
            },
            {
              value: stat3Value || DEFAULT_STATS[2].value,
              label: stat3Label || DEFAULT_STATS[2].label,
            },
            {
              value: stat4Value || DEFAULT_STATS[3].value,
              label: stat4Label || DEFAULT_STATS[3].label,
            },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
