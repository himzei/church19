import { SubPage, subPageMetadata } from "@/app/_components/SubPage";
import { Vision } from "@/app/_components/Vision";

export const metadata = subPageMetadata("about", "vision");

export default function Page() {
  return (
    <SubPage section="about" slug="vision">
      <Vision embedded />
    </SubPage>
  );
}
