import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import formStyles from "./form.module.css";

export default async function Form() {
  async function handleSubmit() {}

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
    revalidatePath("/expansions"); //check where this needs to go
    redirect("/expansions");
  }

  return (
    <div>
      {/* we add the handleSubmit to the form in an onSubmit event */}
      <form className={formStyles.form1} action={handleSubmit}>
        {/* our classic for attribute is now called htmlFor. They are the same thing */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={formStyles.input}
          required
          //   we added the onChange event, so when the user types, the handleChange updates the value of the corresponding state variable
        />
        <label htmlFor="expansion">Expansion</label>
        <select name="expansion" className={formStyles.input}>
          <option value="" disabled>
            Select
          </option>
          <option value={1}>Final Fantasy XIV 1.0</option>
          <option value={2}>A Realm Reborn</option>
          <option value={3}>Heavensward</option>
          <option value={4}>Stormblood</option>
          <option value={5}>Shadowbringers</option>
          <option value={6}>Endwalker</option>
          <option value={7}>Dawntrail</option>
        </select>
        <label htmlFor="review">User Review</label>
        <textarea
          type="text"
          name="reviewText"
          placeholder="Write your review!"
          className={formStyles.input}
          required
          id="textarea"
          //   we added the onChange event, so when the user types, the handleChange updates the value of the corresponding state variable
        />
        <label htmlFor="user_rating">User Rating (1-10)</label>
        <input
          type="number"
          name="userRating"
          required
          className={formStyles.input}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
