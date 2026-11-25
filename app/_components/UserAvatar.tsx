/** 프로필 사진 — 사진이 없으면 이름 첫 글자 */
export function UserAvatar({
  name,
  image,
  className = "size-9 text-sm",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      // 업로드 사진(Supabase Storage)과 카카오·구글 프로필(외부 주소)을 모두 표시하기 위해 img 사용
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        className={`shrink-0 rounded-full bg-cream object-cover ${className}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-navy font-bold text-gold ${className}`}
    >
      {(name?.trim()[0] ?? "?").toUpperCase()}
    </span>
  );
}
