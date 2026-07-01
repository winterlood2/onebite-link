import AppLayout from "@/components/AppLayout";
import NewLinkForm from "@/components/NewLinkForm";
import { getFolders } from "@/lib/folders";

export default async function NewPage() {
  const folders = await getFolders();
  return (
    <AppLayout initialFolders={folders}>
      <NewLinkForm />
    </AppLayout>
  );
}
