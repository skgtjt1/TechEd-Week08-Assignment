import { dbConnect } from "@/utils/dbConnection";
import Image from "next/image";
import Form from "@/components/Form";
import varExp from "./varexp.module.css";
import Link from "next/link";

export default async function ExpPages({ params, searchParams }) {
  const db = dbConnect();
  const result = await db.query(`SELECT * FROM expansions WHERE id = $1`, [
    params.id,
  ]);
  const exp = result.rows[0];

  if (!exp) {
    return <div>Expansion not found</div>;
  }

  const sortOrder = searchParams.sort === "asc" ? "asc" : "desc";
  const commentResult = await db.query(
    `SELECT * FROM reviews2 WHERE expansion_id = $1 ORDER BY submission_date ${sortOrder.toUpperCase()}`,
    [params.id]
  );
  const userRes = commentResult.rows;

  const allExpansionsResult = await db.query(
    `SELECT id, exp_name FROM expansions`
  );
  const allExpansions = allExpansionsResult.rows;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <section className={varExp.section}>
      <div className={varExp.maincontainer}>
        <h1 className={varExp.h1}>{exp.exp_name}</h1>
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
        <h1 className={varExp.h1}>User Reviews:</h1>
        <Link
          href={`/expansions/${params.id}?sort=${
            sortOrder === "asc" ? "desc" : "asc"
          }`}
        >
          <button className={varExp.postbutton}>Sort date: {sortOrder}</button>
        </Link>
      </div>
      <div className={varExp.posts}>
        {userRes.map((post) => (
          <div className={varExp.postcontainer} key={post.id}>
            <h2 className={varExp.puser}>
              Username:{" "}
              <span className={varExp.puserlight}>{post.username}</span>
            </h2>
            <p className={varExp.p}>{post.review_text}</p>
            <p className={varExp.p}>User Rating: {post.user_rating}</p>
            <p className={varExp.pdate}>
              {new Date(post.submission_date).toLocaleString("en-GB", options)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
