import { PostPage, postMetadata } from "../../_components/PostDetail";

export const generateMetadata = ({ params }: PageProps<"/community/bulletin/[id]">) => postMetadata("bulletin", params);

export default function Page({ params }: PageProps<"/community/bulletin/[id]">) {
  return <PostPage board="bulletin" params={params} />;
}
