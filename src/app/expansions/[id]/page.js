import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Form from "@/components/Form";

export default async function ExpPages({ params }) {
  const db = dbConnect();
  const result = await db.query(`SELECT * FROM expansions WHERE id = $1`, [
    params.id,
  ]);
  const exp = result.rows[0];

  if (!exp) {
    return <div>Expansion not found</div>;
  }

  return (
    <div>
      <h1>{exp.exp_name}</h1>
      <Image
        // className={expStyles.expimage}
        src={exp.image_url}
        alt="expansion cover art"
        width={200}
        height={300}
      ></Image>
      <Form></Form>
    </div>
  );
}
