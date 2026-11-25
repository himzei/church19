import type { Metadata } from "next";
import Link from "next/link";
import { Clause, LegalPage } from "@/app/_components/LegalPage";
import { brand } from "@/app/_data/site";

export const metadata: Metadata = {
  title: "이용약관 | church19",
  description: "church19 홈페이지 이용약관",
};

const toc = [
  { id: "purpose", label: "제1조 목적" },
  { id: "definitions", label: "제2조 용어의 정의" },
  { id: "effect", label: "제3조 약관의 효력과 변경" },
  { id: "signup", label: "제4조 회원가입" },
  { id: "account", label: "제5조 계정 관리" },
  { id: "withdraw", label: "제6조 회원 탈퇴와 자격 제한" },
  { id: "service", label: "제7조 서비스의 내용" },
  { id: "duties", label: "제8조 회원의 의무" },
  { id: "posts", label: "제9조 게시물의 관리" },
  { id: "copyright", label: "제10조 게시물의 권리" },
  { id: "change", label: "제11조 서비스의 변경·중단" },
  { id: "liability", label: "제12조 책임의 제한" },
  { id: "dispute", label: "제13조 분쟁의 해결" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="이용약관"
      effective="2026년 11월 25일"
      toc={toc}
      intro={
        <p>
          {brand.name}(이하 &lsquo;교회&rsquo;)의 홈페이지를 찾아 주셔서 감사합니다. 이 약관은 교회가 운영하는 홈페이지와
          관련 서비스를 이용하는 데 필요한 기본 사항을 정합니다.
        </p>
      }
    >
      <Clause id="purpose" title="제1조 목적">
        <p>
          이 약관은 교회가 제공하는 홈페이지 서비스(이하 &lsquo;서비스&rsquo;)의 이용 조건과 절차, 교회와 회원의 권리·의무 및
          책임 사항을 정하는 것을 목적으로 합니다.
        </p>
      </Clause>

      <Clause id="definitions" title="제2조 용어의 정의">
        <ol>
          <li>
            &lsquo;방문자&rsquo;란 로그인하지 않고 서비스를 이용하는 사람을 말합니다. 방문자는 공개된 글을 읽을 수 있습니다.
          </li>
          <li>
            &lsquo;회원&rsquo;이란 이 약관에 동의하고 가입하여 로그인한 사람을 말합니다. 회원은 글을 읽고 댓글을 쓸 수 있습니다.
          </li>
          <li>
            &lsquo;관리자&rsquo;란 교회가 지정하여 공지사항·사역 스토리·주보·갤러리 등 게시물을 작성·수정·삭제하고 서비스를
            관리하는 회원을 말합니다.
          </li>
          <li>&lsquo;게시물&rsquo;이란 서비스에 올린 글, 사진, 댓글 등 모든 정보를 말합니다.</li>
        </ol>
      </Clause>

      <Clause id="effect" title="제3조 약관의 효력과 변경">
        <ol>
          <li>이 약관은 서비스 화면에 게시하여 공지함으로써 효력이 생깁니다.</li>
          <li>
            교회는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경할 때에는 시행일 7일 전부터(회원에게 불리한
            변경은 30일 전부터) 홈페이지 공지사항을 통해 알립니다.
          </li>
          <li>회원은 변경된 약관에 동의하지 않을 경우 이용을 중단하고 탈퇴할 수 있습니다.</li>
        </ol>
      </Clause>

      <Clause id="signup" title="제4조 회원가입">
        <ol>
          <li>
            회원가입은 이 약관과{" "}
            <Link href="/privacy" className="font-semibold text-navy underline">
              개인정보 처리방침
            </Link>
            에 동의한 뒤 이메일로 가입하거나, 카카오·구글 계정으로 로그인하는 방법으로 합니다.
          </li>
          <li>만 14세 미만은 회원으로 가입할 수 없습니다.</li>
          <li>
            다른 사람의 정보를 도용하거나 허위 정보로 가입한 경우, 교회는 가입을 거절하거나 사후에 회원 자격을 제한할 수
            있습니다.
          </li>
        </ol>
      </Clause>

      <Clause id="account" title="제5조 계정 관리">
        <ol>
          <li>회원은 자신의 계정과 비밀번호를 안전하게 관리해야 하며, 다른 사람이 사용하도록 해서는 안 됩니다.</li>
          <li>계정이 도용되었거나 그런 의심이 들 때에는 즉시 비밀번호를 바꾸고 교회에 알려야 합니다.</li>
          <li>회원은 &lsquo;내 프로필&rsquo;에서 이름·프로필 사진과 선택 정보를 언제든 확인하고 고칠 수 있습니다.</li>
        </ol>
      </Clause>

      <Clause id="withdraw" title="제6조 회원 탈퇴와 자격 제한">
        <ol>
          <li>
            회원은 언제든지 교회 사무실({brand.tel}) 또는 이메일({brand.email})로 탈퇴를 요청할 수 있으며, 교회는 본인 확인 후
            지체 없이 처리합니다.
          </li>
          <li>
            회원이 제8조를 위반한 경우 교회는 사전 안내 후(긴급한 경우 사후 안내) 게시물을 삭제하거나 회원 자격을 일시 또는 영구
            제한할 수 있습니다.
          </li>
        </ol>
      </Clause>

      <Clause id="service" title="제7조 서비스의 내용">
        <ul>
          <li>교회 소개, 예배·교육·선교 안내 등 정보 제공</li>
          <li>나눔터(공지사항, 사역 스토리, 주보, 갤러리) 게시물 열람과 회원 댓글</li>
          <li>회원 프로필 관리 (프로필 사진, 성별·취미·특기 등 선택 정보)</li>
          <li>그 밖에 교회가 정하여 제공하는 서비스</li>
        </ul>
        <p>서비스는 무료로 제공됩니다.</p>
      </Clause>

      <Clause id="duties" title="제8조 회원의 의무">
        <p>회원은 서비스를 이용하면서 다음 행위를 해서는 안 됩니다.</p>
        <ol>
          <li>다른 사람을 비방하거나 모욕하는 등 명예를 훼손하는 행위</li>
          <li>음란·폭력적이거나 혐오를 조장하는 내용을 올리는 행위</li>
          <li>다른 사람의 개인정보를 동의 없이 수집·게시하는 행위</li>
          <li>영리 목적의 광고, 홍보, 스팸성 게시물을 올리는 행위</li>
          <li>다른 사람의 저작권 등 권리를 침해하는 행위</li>
          <li>서비스 운영을 방해하거나, 권한 없이 시스템에 접근하는 행위</li>
          <li>그 밖에 법령이나 공공질서·미풍양속에 어긋나는 행위</li>
        </ol>
      </Clause>

      <Clause id="posts" title="제9조 게시물의 관리">
        <ol>
          <li>
            회원이 쓴 댓글은 작성자의 이름·프로필 사진과 함께 누구나 볼 수 있도록 공개됩니다. 개인정보가 담긴 내용은 올리지
            않도록 주의해 주세요.
          </li>
          <li>회원은 자신이 쓴 댓글을 언제든지 삭제할 수 있습니다.</li>
          <li>
            관리자는 제8조에 해당하거나 권리 침해 신고가 접수된 게시물을 작성자의 동의 없이 삭제하거나 비공개로 할 수 있습니다.
          </li>
          <li>회원이 탈퇴하면 그 회원이 쓴 댓글도 함께 삭제됩니다.</li>
        </ol>
      </Clause>

      <Clause id="copyright" title="제10조 게시물의 권리">
        <ol>
          <li>교회가 작성한 게시물과 사진의 권리는 교회에 있으며, 허락 없이 영리 목적으로 사용할 수 없습니다.</li>
          <li>
            회원이 쓴 게시물의 권리는 작성자에게 있습니다. 다만 교회는 서비스 운영과 소개를 위해 필요한 범위에서 이를 표시할
            수 있습니다.
          </li>
          <li>
            갤러리 등에 실린 사진에 본인이 나와 게시를 원하지 않는 경우 교회에 요청하면 확인 후 삭제하거나 가림 처리합니다.
          </li>
        </ol>
      </Clause>

      <Clause id="change" title="제11조 서비스의 변경·중단">
        <ol>
          <li>교회는 운영상 필요한 경우 서비스의 내용을 변경할 수 있으며, 이 경우 미리 공지합니다.</li>
          <li>
            설비 점검, 장애, 천재지변 등 부득이한 사유가 있으면 서비스를 일시 중단할 수 있으며, 가능한 한 미리 또는 사후에
            지체 없이 알립니다.
          </li>
        </ol>
      </Clause>

      <Clause id="liability" title="제12조 책임의 제한">
        <ol>
          <li>교회는 천재지변이나 이에 준하는 불가항력으로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
          <li>교회는 회원의 귀책 사유로 생긴 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
          <li>교회는 회원이 올린 게시물의 정확성·신뢰성에 대해 책임을 지지 않습니다.</li>
          <li>다만 교회의 고의 또는 중대한 과실로 인한 손해는 위 각 항에도 불구하고 관련 법령에 따라 책임을 집니다.</li>
        </ol>
      </Clause>

      <Clause id="dispute" title="제13조 분쟁의 해결">
        <ol>
          <li>교회와 회원은 서비스와 관련한 분쟁을 원만하게 해결하기 위해 성실히 협의합니다.</li>
          <li>협의로 해결되지 않는 분쟁은 대한민국 법률에 따르며, 관할 법원은 민사소송법에 따릅니다.</li>
        </ol>
        <p className="pt-4 text-sm text-muted">부칙 — 이 약관은 2026년 11월 25일부터 시행합니다.</p>
      </Clause>
    </LegalPage>
  );
}
