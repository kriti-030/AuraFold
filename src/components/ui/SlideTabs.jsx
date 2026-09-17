import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function SlideTabs({
  tabs,
  selected = 0,
  onSelect,
  renderTab,
}) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const tabsRef = useRef([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (!selectedTab) return;
    const { width } = selectedTab.getBoundingClientRect();
    setPosition({
      left: selectedTab.offsetLeft,
      width,
      opacity: 1,
    });
  }, [selected, tabs]);

  useEffect(() => {
    const onResize = () => {
      const selectedTab = tabsRef.current[selected];
      if (!selectedTab) return;
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selected]);

  const snapToSelected = () => {
    const selectedTab = tabsRef.current[selected];
    if (!selectedTab) return;
    const { width } = selectedTab.getBoundingClientRect();
    setPosition({
      left: selectedTab.offsetLeft,
      width,
      opacity: 1,
    });
  };

  return (
    <ul
      className="slide-tabs"
      onMouseLeave={snapToSelected}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.id || tab.label}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => onSelect?.(i, tab)}
          active={selected === i}
        >
          {renderTab ? renderTab(tab, i) : tab.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = React.forwardRef(function Tab(
  { children, setPosition, onClick, active },
  ref,
) {
  return (
    <li
      ref={ref}
      className={`slide-tabs__item${active ? " is-active" : ""}`}
      onClick={onClick}
      onMouseEnter={() => {
        const node = typeof ref === "object" ? ref?.current : null;
        if (!node) return;
        const { width } = node.getBoundingClientRect();
        setPosition({
          left: node.offsetLeft,
          width,
          opacity: 1,
        });
      }}
    >
      {children}
    </li>
  );
});

function Cursor({ position }) {
  return (
    <motion.li
      aria-hidden="true"
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="slide-tabs__cursor"
    />
  );
}

export default SlideTabs;
