import { motion } from "framer-motion";

import worldMap from "../../assets/dashboard/world-map.png";
import plane from "../../assets/dashboard/plane.png";
import passport from "../../assets/dashboard/passport.png";
import boardingPass from "../../assets/dashboard/bording pass.png";
import suitcase from "../../assets/dashboard/suitcase.png";
import compass from "../../assets/dashboard/compass.png";
import camera from "../../assets/dashboard/camera.png";
import leafLeft from "../../assets/dashboard/leaf-left.png";
import leafRight from "../../assets/dashboard/leaf-right.png";

const floatAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const rotateAnimation = {
  rotate: [0, 6, 0, -6, 0],
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const TravelBackground = () => {
  return (
    <>
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">

  {/* Main Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#F4FBFF] via-[#E8F8FF] to-[#FFF8F1]" />

  {/* Decorative Blobs */}

  <div className="absolute -top-48 -left-32 h-[550px] w-[550px] rounded-full bg-cyan-300/20 blur-[170px]" />

  <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-300/20 blur-[170px]" />

  <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-teal-200/20 blur-[160px]" />

  <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-300/15 blur-[190px]" />

</div>
      {/* Sky Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-50" />

      {/* World Map */}

      <img
        src={worldMap}
        alt=""
        className="
        absolute
        bottom-50
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[150]
        opacity-[0.5]
        select-none
        pointer-events-none
        "
      />
      {/* Flight Path */}

<svg
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 1600 900"
  preserveAspectRatio="none"
>
    <motion.img
  src={plane}
  alt=""
  className="absolute w-14 top-[145px] left-[170px]"
  animate={{
    x: [0, 350, 700, 1050, 1280],
    y: [0, -90, -30, -80, -120],
    rotate: [0, 8, -6, 4, 0],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
/>
  <path
    d="M180 220 C420 80 700 250 950 150 S1350 220 1500 90"
    fill="none"
    stroke="#38BDF8"
    strokeWidth="5"
    strokeDasharray="10 12"
    opacity="0.5"
  />

  <path
    d="M250 720 C520 620 800 780 1100 620 S1450 700 1520 520"
    fill="none"
    stroke="#14B8A6"
    strokeWidth="5"
    strokeDasharray="10 12"
    opacity="0.5"
  />
</svg>

      {/* Airplane */}

      <motion.img
        animate={{
          x: [0, 30, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        src={plane}
        alt=""
        className="
        absolute
        top-8
        right-8
        w-75
        select-none
        pointer-events-none
        "
      />

      {/* Passport */}

      <motion.img
        animate={rotateAnimation}
        src={passport}
        alt=""
        className="
        absolute
        top-8
        right-1/2
        w-50
        select-none
        pointer-events-none
        "
      />

      {/* Suitcase */}

      <motion.img
        animate={floatAnimation}
        src={suitcase}
        alt=""
        className="
        absolute
        bottom-3
        right-100
        w-100
        select-none
        pointer-events-none
        "
      />

      {/* Camera */}

      <motion.img
        animate={floatAnimation}
        src={camera}
        alt=""
        className="
        absolute
        bottom-0
        left-5
        w-75
        select-none
        pointer-events-none
        "
      />

      {/* Compass */}

      <motion.img
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        src={compass}
        alt=""
        className="
        absolute
        bottom-65
        left-35
        -translate-x-1/2
        w-75
        opacity-90
        select-none
        pointer-events-none
        "
      />


      {/* Boarding Pass */}

      <motion.img
        animate={rotateAnimation}
        src={boardingPass}
        alt=""
        className="
        absolute
        top-12
        left-40
        w-75
        select-none
        pointer-events-none
        "
      />

      {/* Leaves */}

      <motion.img
        animate={floatAnimation}
        src={leafLeft}
        alt=""
        className="
        absolute
        top-0
        left-0
        w-75
        opacity-90
        select-none
        pointer-events-none
        "
      />

      <motion.img
        animate={floatAnimation}
        src={leafRight}
        alt=""
        className="
        absolute
        bottom-0
        right-0
        w-75
        opacity-90
        select-none
        pointer-events-none
        "
      />

      {/* Decorative Blur Circles */}

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-300/20 blur-[180px]" />

      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[120px]" />
    </>
  );
};

export default TravelBackground;