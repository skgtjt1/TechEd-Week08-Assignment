import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import formStyles from "./form.module.css";

export default function Form({ expansions, selectedExpansion }) {
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const expansion = formData.get("expansion");
    const reviewText = formData.get("reviewText");
    const userRating = formData.get("userRating");

    const db = dbConnect();
    await db.query(
      `INSERT INTO reviews2 (username, review_text, user_rating, expansion_id) VALUES ($1, $2, $3, $4)`,
      [username, reviewText, userRating, expansion]
    );
    revalidatePath("/expansions"); // Update the path to be revalidated as needed
    // redirect("/expansions");
  }

  return (
    <div>
      <form className={formStyles.form1} action={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={formStyles.input}
          required
        />
        <label htmlFor="expansion">Expansion</label>
        <select
          name="expansion"
          className={formStyles.input}
          required
          defaultValue={selectedExpansion}
        >
          <option value="" disabled>
            Select
          </option>
          {expansions.map((expansion) => (
            <option key={expansion.id} value={expansion.id}>
              {expansion.exp_name}
            </option>
          ))}
        </select>
        <label htmlFor="reviewText">User Review</label>
        <textarea
          type="text"
          name="reviewText"
          placeholder="Write your review!"
          className={formStyles.input}
          required
          id="textarea"
        />
        <label htmlFor="userRating">User Rating (1-10)</label>
        <input
          type="number"
          name="userRating"
          required
          className={formStyles.input}
          min="1"
          max="10"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
