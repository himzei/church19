import { PostPage, postMetadata } from "../../_components/PostDetail";

export const generateMetadata = ({ params }: PageProps<"/community/gallery/[id]">) => postMetadata("gallery", params);

export default function Page({ params }: PageProps<"/community/gallery/[id]">) {
  return <PostPage board="gallery" params={params} />;
}
