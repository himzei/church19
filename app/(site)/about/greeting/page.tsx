import { SubPage, subPageMetadata } from "@/app/_components/SubPage";

export const metadata = subPageMetadata("about", "greeting");

export default function Page() {
  return (
    <SubPage section="about" slug="greeting">
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* 담임목사 사진 자리 */}
        <figure className="mx-auto w-full max-w-xs lg:sticky lg:top-40">
          <div className="grid aspect-[4/5] place-items-center rounded-2xl bg-linear-to-br from-navy to-[#2f5d8a] text-white">
            <span className="text-7xl font-extrabold text-white/20">19</span>
          </div>
          <figcaption className="mt-4 text-center">
            <p className="text-sm text-muted">church19 담임목사</p>
            <p className="mt-1 text-xl font-bold text-navy">홍길동 목사</p>
          </figcaption>
        </figure>

        <article className="space-y-6 text-[17px] leading-[1.9] text-ink/85">
          <p className="text-2xl font-bold leading-snug text-navy md:text-3xl">
            “사랑하는 여러분,
            <br />
            church19에 오신 것을 환영합니다.”
          </p>
          <p>
            주님의 이름으로 문안드립니다. 바쁘고 지친 일상 속에서 이곳을 찾아 주신 여러분을 진심으로
            환영합니다. church19는 하나님의 사랑 안에서 한 사람 한 사람이 살아나고, 자라고, 세워지는
            공동체를 꿈꾸며 세워진 교회입니다.
          </p>
          <p>
            교회는 건물이 아니라 사람입니다. 우리는 화려한 프로그램보다 한 영혼을 소중히 여기는 마음을,
            큰 목소리보다 따뜻한 손길을 더 귀하게 여깁니다. 예배를 통해 하나님을 만나고, 말씀을 통해
            삶의 방향을 찾으며, 소그룹 안에서 서로의 짐을 나누어 지는 기쁨을 누리시기를 바랍니다.
          </p>
          <p>
            처음 교회에 오신 분, 오랫동안 신앙의 자리를 떠나 계셨던 분, 새로운 신앙 공동체를 찾고 계신
            분 모두에게 church19의 문은 활짝 열려 있습니다. 부담 없이 오셔서 함께 예배하고, 함께 식사하고,
            함께 이야기 나누어 주십시오.
          </p>
          <p>
            “사람을 살리고, 키우고, 세우는 교회.” 이 비전이 우리의 고백이 되고, 여러분의 삶의 이야기가
            되기를 소망합니다. 주님의 은혜와 평강이 여러분의 가정 위에 늘 함께하시기를 축복합니다.
          </p>
          <p className="pt-4 text-right font-semibold text-navy">
            church19 담임목사 <span className="ml-1 text-xl">홍길동</span>
          </p>
        </article>
      </div>
    </SubPage>
  );
}
