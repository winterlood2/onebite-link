import AppLayout from "@/components/AppLayout";
import LinkGrid from "@/components/LinkGrid";
import { links } from "@/lib/data";

export default function Home() {
  return (
    <AppLayout>
      <LinkGrid links={links} />
    </AppLayout>
  );
}
