import React, { useEffect, useState } from "react";
import "./Work.scss";

import { AiFillGithub, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { urlFor, client } from "../../client";
import Wrapper from "../../container/Wrapper";

function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWork] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = "*[_type == 'works']";
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    // setFilterWork(item);
    // setAnimateCard([{ y: 100, opacity: 0 }]);

    // setTimeout(() => {
    //   setAnimateCard([{ y: 100, opacity: 0 }]);
    // }, 500);
  };
  return (
    <div className="work__container">
      <h2>My personal Works </h2>
      <div
        className="work__tags"
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        {["Web Apps", "Web Design", "Mobile Apps", "All"].map((item, i) => (
          <div
            key={i}
            onClick={() => handleWorkFilter(item)}
            className={`tags ${
              activeFilter === item ? "work__filter-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="work__portfolio-container"
      >
        {filterWorks &&
          filterWorks?.map((item, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: [0, 1], y: [100, 0] }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="work__portfolio"
            >
              <div className="work__portfolio-image">
                <img src={urlFor(item.imgUrl)} alt={item.name} />
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="work__portfolio-link"
                >
                  <a href={item.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      whileInView={{ scale: [0, 1] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="work__portfolio-link-hover"
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
                      className="work__portfolio-link-hover"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className="work__portfolio-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <h5>{item?.tags[0]}</h5>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

export default Wrapper(Work, "work");