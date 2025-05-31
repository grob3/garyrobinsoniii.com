import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface SkillBarProps {
  percentage: number;
}

const SkillBar = ({ percentage }: SkillBarProps) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="skill-bar">
      <div
        className="skill-progress"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default SkillBar;
