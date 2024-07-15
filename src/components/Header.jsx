import Link from "next/link";
//import CSS module here
import HeaderStyles from "@/components/Header.module.css";
export default function Header() {
  return (
    <section className={HeaderStyles.section}>
      {/* we add the module name (that we choose in the import) and the rules we want to apply */}
      {/* <h1 className={HeaderStyles.h1}>Testing Header</h1> */}
      {/* <nav className={HeaderStyles.nav}> */}
      <h1 className="lg:text-xl font-extrabold  ">
        An Unofficial FFXIV Expansion Review Site
      </h1>
      <br />
      <nav className={HeaderStyles.nav}>
        <ul className={HeaderStyles.list}>
          <li>
            <Link className={HeaderStyles.link} href="/">
              Home
            </Link>
          </li>

          <li>
            <Link className={HeaderStyles.link} href="/expansions">
              Expansions{" "}
            </Link>
          </li>

          {/* <li>
            <Link href="/posts">Post a Review</Link>
          </li> */}
        </ul>
      </nav>
    </section>
  );
}
