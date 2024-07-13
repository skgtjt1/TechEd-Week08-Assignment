import { db } from "./server.js";

const seedDatabase = async () => {
  try {
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS "reviews" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(64),
        "review_text" TEXT,
        "user_rating" INTEGER,
        "karma" BIGINT,
        "expansion_id" INTEGER,
        CONSTRAINT "reviews_expansion_id_unique" UNIQUE ("expansion_id")
      );

      CREATE TABLE IF NOT EXISTS "expansions" (
        "id" SERIAL PRIMARY KEY,
        "exp_name" VARCHAR(255) NULL,
        "release_date" DATE,
        "image_url" TEXT,
        "meta_rating" FLOAT
      );

      ALTER TABLE "reviews"
      ADD CONSTRAINT "reviews_expansion_id_foreign"
      FOREIGN KEY ("expansion_id")
      REFERENCES "expansions" ("id");
    `;

    await db.query(createTablesQuery);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();

const insertDataIntoExpansions = async (
  exp_name,
  release_date,
  image_url,
  meta_rating
) => {
  const query = `
      INSERT INTO "expansions" (
        "exp_name",
        "release_date",
        "image_url",
        "meta_rating"
      ) VALUES ($1, $2, $3, $4);
    `;
  const values = [exp_name, release_date, image_url, meta_rating];

  try {
    await db.query(query, values);
    console.log("Data inserted into expansions successfully!");
  } catch (err) {
    console.error("Error inserting data into expansions:", err);
  }
};

insertDataIntoExpansions(
  "Final Fantasy Online 1.0",
  "2010-09-30",
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Final_Fantasy_XIV_box_art.jpg/400px-Final_Fantasy_XIV_box_art.jpg",
  49.0
);

insertDataIntoExpansions(
  "A Realm Reborn",
  "2013-08-27",
  "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Final_Fantasy_XIV%2C_A_Realm_Reborn_box_cover.jpg/400px-Final_Fantasy_XIV%2C_A_Realm_Reborn_box_cover.jpg",
  86.0
);

insertDataIntoExpansions(
  "Heavensward",
  "2015-06-23",
  "https://upload.wikimedia.org/wikipedia/en/c/ce/Final_Fantasy_XIV_Heavensward_box_cover.jpg",
  86.0
);

insertDataIntoExpansions(
  "Stormblood",
  "2017-06-20",
  "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Final_Fantasy_XIV_Stormblood_box_cover.jpg/400px-Final_Fantasy_XIV_Stormblood_box_cover.jpg",
  87.0
);

insertDataIntoExpansions(
  "Shadowbringers",
  "2019-07-02",
  "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Final_Fantasy_XIV_Shadowbringers_box_cover.png/400px-Final_Fantasy_XIV_Shadowbringers_box_cover.png",
  90.0
);

insertDataIntoExpansions(
  "Endwalker",
  "2021-12-07",
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Final_Fantasy_XIV_Endwalker_box_cover.png/400px-Final_Fantasy_XIV_Endwalker_box_cover.png",
  92.0
);

insertDataIntoExpansions(
  "Dawntrail",
  "2024-07-02",
  "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Final_Fantasy_XIV_Dawntrail_box_cover.jpg/400px-Final_Fantasy_XIV_Dawntrail_box_cover.jpg",
  0o0
);
