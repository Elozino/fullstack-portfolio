import React, { useEffect, useState } from "react";
import "./AllWorks.scss";

import { AiFillGithub, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { urlFor, client } from "../../client";

function AllWorks() {
  const [allWorks, setAllWorks] = useState([]);
  const [filterWorks, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = "*[_type == 'allWorks']";
    client.fetch(query).then((data) => {
      setAllWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(allWorks);
      } else {
        setFilterWork(
          allWorks.filter((allwork) => allwork.tags.includes(item))
        );
      }
    }, 500);
  };

  return (
    <div className="allworks__container">
      <h2>All my personal works</h2>
      <div
        className="allworks__tags"
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        {["Web Apps", "Web Design", "Mobile Apps", "All"].map((item, i) => (
          <div
            key={i}
            onClick={() => handleWorkFilter(item)}
            className={`tags ${
              activeFilter === item ? "allworks__filter-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        className="allworks__portfolio-container"
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
        {filterWorks?.map((item, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, type: "tween" }}
            className="allworks__portfolio"
          >
            <div className="allworks__portfolio-image">
              <img src={urlFor(item.imgUrl)} alt={item.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="allworks__portfolio-link"
              >
                <a href={item.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="allworks__portfolio-link-hover"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={item.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [1, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="allworks__portfolio-link-hover"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className="allworks__portfolio-content">
              <p className="allworks__tag-title">{item.title}</p>
              <p>{item.description}</p>
              <p className="allworks__tag-name">{item?.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default AllWorks;
