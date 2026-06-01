import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Sparkles from "./Sparkles";
import styles from "./Letter.module.css";

const LETTER_TEXT = `Dear Joyita,

Happy Birthday!

I hope this special day brings you lots of happiness, laughter, and wonderful memories.

You spend so much time caring for others, so today is all about celebrating you.

May the year ahead be filled with success, good health, exciting opportunities, and countless reasons to smile.

Enjoy your day and make lots of happy memories.

Best wishes,
Arpan`;

export default function Letter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setTyped(LETTER_TEXT);
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(LETTER_TEXT.slice(0, i));
      if (i >= LETTER_TEXT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section id="letter" className="section">
      <div className="title-wrap">
        <Sparkles count={12}>
          <h2 className="section-title">A Letter For You</h2>
        </Sparkles>
      </div>

      <motion.div
        ref={ref}
        className={styles.paper}
        initial={{ opacity: 0, y: 60, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring", damping: 18 }}
      >
        <div className={styles.tape} aria-hidden="true" />
        <pre className={styles.body}>
          {typed}
          {!done && (
            <span className={styles.cursor} aria-hidden="true">
              |
            </span>
          )}
        </pre>
      </motion.div>
    </section>
  );
}
