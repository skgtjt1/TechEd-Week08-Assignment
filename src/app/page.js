import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/expansions">
        <Image
          className="logo"
          src="/assets/logo.svg"
          alt="FF14 logo"
          width={200}
          height={100}
        />
      </Link>
    </main>
  );
}
