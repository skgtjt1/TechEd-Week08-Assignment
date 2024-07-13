import Link from "next/link";
//import CSS module here
import HeaderStyles from "@/components/Header.module.css";
export default function Header() {
  return (
    <section className={HeaderStyles.section}>
      {/* we add the module name (that we choose in the import) and the rules we want to apply */}
      {/* <h1 className={HeaderStyles.h1}>Testing Header</h1> */}
      {/* <nav className={HeaderStyles.nav}> */}
      <nav className={HeaderStyles.nav}>
        <Link href="/" className="italic">
          Home
        </Link>
        <br />
        <Link href="/expansions" className="text-pink-700 font-extrabold">
          Expansions
        </Link>
      </nav>
    </section>
  );
}
