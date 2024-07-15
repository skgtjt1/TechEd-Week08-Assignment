import { dbConnect } from "@/utils/dbConnection";
import Image from "next/image";
import Form from "@/components/Form";
import varExp from "./varexp.module.css";

export default async function ExpPages({ params }) {
  const db = dbConnect();
  const result = await db.query(`SELECT * FROM expansions WHERE id = $1`, [
    params.id,
  ]);
  const exp = result.rows[0];

  if (!exp) {
    return <div>Expansion not found</div>;
  }

  const commentResult = await db.query(
    `SELECT * FROM reviews2 WHERE expansion_id = $1`,
    [params.id]
  );
  const userRes = commentResult.rows;

  const allExpansionsResult = await db.query(
    `SELECT id, exp_name FROM expansions`
  );
  const allExpansions = allExpansionsResult.rows;

  return (
    <section>
      <div className={varExp.maincontainer}>
        <h1>{exp.exp_name}</h1>
        <Image
          src={exp.image_url}
          alt="expansion cover art"
          width={200}
          height={300}
          className={varExp.image}
        />
        <br />
        <Form expansions={allExpansions} selectedExpansion={exp.id} />
      </div>

      <div>
        <h1>User Reviews:</h1>
      </div>
      {userRes.map((post) => (
        <div className={varExp.postcontainer} key={post.id}>
          <h1>{post.username}</h1>
          <p>{post.review_text}</p>
          <p>{post.user_rating}</p>
          <p>{new Date(post.submission_date).toLocaleString("en-GB")}</p>
        </div>
      ))}
    </section>
  );
}
