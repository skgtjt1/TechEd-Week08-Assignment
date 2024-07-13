import { dbConnect } from "@/utils/dbConnection";
import Image from "next/image";
import expStyles from "./exp.module.css";

export default async function Expansions() {
  const db = dbConnect();

  const expansions = (await db.query(`SELECT * from expansions`)).rows;

  //   console.log(expansions);

  return (
    <section className={expStyles.section}>
      <h1>Expansions page</h1>
      <br />
      <div className={expStyles.mapcontainer}>
        {expansions.map((exp) => (
          <div className={expStyles.expcontainer} key={exp.id}>
            <div className={expStyles.expdesc}>
              <h1 className={expStyles.expname}>{exp.exp_name}</h1>
              <p>
                <span className="font-bold">Release Date: </span>
                {exp.release_date.toLocaleDateString("en-GB")}
              </p>
              <p>Metacritic Rating: {exp.meta_rating}</p>
            </div>
            <Image
              className={expStyles.expimage}
              src={exp.image_url}
              alt="expansion cover art"
              width={200}
              height={300}
            ></Image>
          </div>
        ))}
      </div>
    </section>
  );
}
