import { PostPage, postMetadata } from "../../_components/PostDetail";

export const generateMetadata = ({ params }: PageProps<"/community/notices/[id]">) => postMetadata("notices", params);

export default function Page({ params }: PageProps<"/community/notices/[id]">) {
  return <PostPage board="notices" params={params} />;
}
