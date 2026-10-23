import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import { link } from "../ui.js";

const VARIANT = 27; // номер у журналі групи
const REVIEWS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

// Відгуки роботодавців: вивід «curl» до API, кожен коментар — окрема картка.
function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | done | error

  useEffect(() => {
    // AbortController скасовує запит, якщо компонент демонтується раніше.
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch(REVIEWS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setReviews(await response.json());
        setStatus("done");
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Не вдалося завантажити відгуки:", error);
        setStatus("error");
      }
    }

    loadReviews();
    return () => controller.abort();
  }, []);

  return (
    <Section id="reviews" cmd="curl -s api/reviews  #" arg="Відгуки роботодавців" title="Відгуки роботодавців">
      <p role="status" className="text-sm text-dim">
        {status === "loading" && "Завантаження відгуків…"}
        {status === "done" && `200 OK · отримано відгуків: ${reviews.length}`}
        {status === "error" && (
          <span className="text-term">
            ERR: не вдалося завантажити відгуки. Перевірте з'єднання та оновіть сторінку.
          </span>
        )}
      </p>

      <ol className="mt-5 grid gap-4">
        {reviews.map(({ id, name, email, body }) => (
          <li
            key={id}
            className="border border-line border-l-2 border-l-phosphor bg-panel px-4 py-4 sm:px-5"
          >
            <blockquote className="whitespace-pre-line text-term first-letter:uppercase">
              {body}
            </blockquote>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-sm">
              <span aria-hidden="true" className="text-dim">
                --
              </span>
              <strong className="inline-block text-phosphor first-letter:uppercase">{name}</strong>
              <a className={link} href={`mailto:${email}`}>
                {email}
              </a>
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Reviews;
