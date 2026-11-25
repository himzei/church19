import { PostPage, postMetadata } from "../../_components/PostDetail";

export const generateMetadata = ({ params }: PageProps<"/community/stories/[id]">) => postMetadata("stories", params);

export default function Page({ params }: PageProps<"/community/stories/[id]">) {
  return <PostPage board="stories" params={params} />;
}
