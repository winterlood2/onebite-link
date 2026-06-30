import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { readLinks } from "@/lib/store";

export default async function Home() {
  const links = await readLinks();
  return (
    <AppLayout>
      <LinkGrid links={links} />
    </AppLayout>
  );
}
