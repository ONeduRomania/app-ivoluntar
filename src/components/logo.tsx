import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-12 w-auto max-w-[12rem]">
      <Image
        src="/images/logo/ivoluntar.png"
        width={180}
        height={48}
        className="h-full w-auto object-contain dark:hidden"
        alt="iVoluntar logo"
        role="presentation"
        quality={100}
        priority
      />

      <Image
        src="/images/logo/ivoluntar.png"
        width={160}
        height={40}
        className="hidden h-full w-auto object-contain dark:block"
        alt="iVoluntar logo"
        role="presentation"
        quality={100}
        priority
      />
    </div>
  );
}
