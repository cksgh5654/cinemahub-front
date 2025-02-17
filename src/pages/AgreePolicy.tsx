import { useEffect, useState } from 'react';
import Tabs from '@ui/Tabs';

const AgreePolicy = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {}, []);

  return (
    <div className="min-w-96 max-w-2xl mx-auto mt-10">
      <Tabs onChangeTab={handleChangeTab} className="">
        <Tabs.MenuList className="flex w-full mb-12">
          <Tabs.Menu
            index={1}
            className={`w-full flex-1 py-2 text-center border-b-2 transition cursor-pointer ${
              activeTab === 1
                ? 'border-[#FF0000] text-[#FF0000] font-bold'
                : 'border-gray-300'
            }`}
          >
            이용약관
          </Tabs.Menu>

          <Tabs.Menu
            index={2}
            className={`w-full flex-1 py-2 text-center border-b-2 transition cursor-pointer ${
              activeTab === 2
                ? 'border-[#FF0000] text-[#FF0000] font-bold'
                : 'border-gray-300'
            }`}
          >
            개인정보처리방침
          </Tabs.Menu>
        </Tabs.MenuList>
        <Tabs.Pannel index={1}>
          <div>
            <h1 className="text-2xl font-bold">서비스 이용약관</h1>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 1조 목적</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고
                  합니다)이 <span className="font-bold">시네마 허브</span>(이하
                  "회사"라고 합니다)가 제공하는 서비스를 이용함에 있어 회사와
                  회원의 권리 의무 및 책임사항을 규정함을 목적으로 합니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 2조 정의</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회원"이라 함은 회사의 서비스에 접속하여 이 약관에 따라
                  "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스" 를
                  이용하는 고객을 말합니다.
                </li>
                <li className="mt-1">
                  아이디(ID)"라 함은 ”회원“의 식별과 ”서비스“ 이용을 위하여
                  ”회원“이 정하고 ”회사“가 승인하는 문자와 숫자의 조합을
                  말합니다.
                </li>
                <li className="mt-1">
                  "해지“라 함은 회사 또는 회원이 서비스 개통 후 이용계약을
                  해약하는 것을 말합니다.
                </li>
                <li className="mt-1">
                  “게시물”이라 함은 “회원”이 “서비스”를 이용함에 있어
                  “서비스상”에 게시한 부호·문자·음성·음향·화상·동영상 등의 정보
                  형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 말합니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 3조 정의</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"는 "정보통신망법" 등 관계 법령이 정하는 바에 따라
                  "회원"의 "개인정보"를 보호하기 위해 노력합니다. "개인정보"의
                  보호 및 사용에 대해서는 관련법 및 "회사"의 개인정보보호정책이
                  적용됩니다. 다만, "회사"의 공식 사이트 이외의 링크된
                  사이트에서는 "회사"의 개인정보보호정책이 적용되지 않습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                제 4조 약관의 게시와 개정
              </h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록
                  초기화면에 게시합니다.
                </li>
                <li className="mt-1">
                  "회사"는 "약관의규제에관한법률",
                  "정보통신망이용촉진및정보보호에관한법률(이하 "정보통신망법")"
                  등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수
                  있습니다.
                </li>
                <li className="mt-1">
                  "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를
                  명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의
                  적용일자 30일 전부터 적용일자 전일까지 공지합니다. 다만,
                  회원에게 불리한 내용으로 약관을 개정하는 경우에는 공지 외에
                  회원정보에 등록된 이메일 등 전자적 수단을 통해 별도로 명확히
                  통지하도록 합니다.
                </li>

                <li className="mt-1">
                  "회사"가 전항에 따라 공지하면서 회원에게 30일 기간 이내에
                  의사표시를 하지 않으면 승인한 것으로 본다는 뜻을 명확하게
                  공지하였음에도 회원이 명시적으로 거부의사를 밝히지 않은
                  경우에회원이 개정약관에 동의한 것으로 봅니다.
                </li>

                <li className="mt-1">
                  "회원"이 개정약관에 동의하지 않는 경우 회사는 개정약관의
                  내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수
                  있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는
                  경우에는 회사는 이용계약을 해지할 수 있습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                제 5조 권리의 귀속 및 저작물의 이용
              </h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  회사가 회원에게 제공하는 각종 서비스에 대한 저작권을 포함한
                  일체의 권리는 회사에 귀속되며 회원이 서비스를 이용하는
                  과정에서 작성한 댓글 등(이하 “게시물 등”이라 합니다)에 대한
                  저작권을 포함한 일체에 관한 권리는 별도의 의사표시가 없는 한
                  각 회원에게 귀속됩니다.
                </li>
                <li className="mt-1">
                  게시물 등은 회사가 운영하는 인터넷 사이트 및 모바일
                  어플리케이션을 통해 노출될 수 있으며, 검색결과 내지 관련
                  프로모션 등에도 노출될 수 있습니다. 또한, 해당 노출을 위해
                  필요한 범위 내에서는 일부 수정, 편집되어 게시될 수 있습니다.
                  이 경우, 회사는 저작권법 규정을 준수하며, 회원은 언제든지
                  고객센터 또는 각 서비스 내 관리기능을 통해 해당 게시물 등에
                  대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.
                </li>
                <li className="mt-1">
                  회사는 제2항 이외의 방법으로 회원의 게시물 등을 이용하고자
                  하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의
                  동의를 얻습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                제 6조 서비스의 변경, 중단, 일시 중지
              </h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  회사는 서비스의 일부 또는 전부를 회사의 사업 계획 및 서비스
                  운영정책에 따라 수정·변경 및 중단할 수 있으며, 이에 대하여
                  관련 법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지
                  않습니다.
                </li>
                <li className="mt-1">
                  회사는 서비스용 설비 점검·보수·공사 및 기간통신사업자의
                  전기통신 서비스의 중지, 서비스 이용의 폭주나 국가비상사태 등을
                  사유로 서비스 제공에 장애가 발생한 경우 그 사유가 해소될
                  때까지 서비스를 일시 중지할 수 있습니다.
                </li>
                <li>
                  회사는 본 조에 따른 서비스의 변경·중단·일시 중지의 사유가
                  발생한 경우, 서비스를 통해 공지하는 등의 방법으로 회원에게
                  통지합니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                제 7조 "회원"에 대한 통지
              </h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"가 "회원"에 대한 통지를 하는 경우 본 약관에 별도 규정이
                  없는 한 "회원"이 지정한 전자우편주소, 알림 메시지 등으로 할 수
                  있습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 8조 이용제한 등</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"는 "회원"이 본 약관의 의무를 위반하거나 서비스의
                  정상적인 운영을 방해한 경우, 일시정지, 계약해지로 단계적으로
                  제한할 수 있습니다.
                </li>

                <li className="mt-1">
                  "회사"는 전항에도 불구하고, "저작권법" 및
                  "컴퓨터프로그램보호법"을 위반한 불법프로그램의 제공 및
                  운영방해, "정보통신망법"을 위반한 불법통신 및 해킹,
                  악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을
                  위반한 경우에는 즉시 계약해지를 할 수 있습니다. 본 항에 따른
                  계약해지 시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며,
                  회사는 이에 대해 별도로 보상하지 않습니다.
                </li>

                <li className="mt-1">
                  "회사"는 회원이 계속해서 3개월 이상 로그인하지 않는 경우,
                  회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수
                  있습니다.
                </li>

                <li className="mt-1">
                  "회사"는 본 조의 이용제한 범위 내에서 제한의 조건 및
                  세부내용은 이용제한정책 등에서 정한 바에 의합니다.
                </li>

                <li className="mt-1">
                  본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는
                  "회사"는 제6조["회원"에 대한 통지]에 따라 통지합니다.
                </li>

                <li className="mt-1">
                  "회원"은 본 조에 따른 이용제한 등에 대해 "회사"가 정한 절차에
                  따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가
                  인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 9조 게시물의 관리</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회원"의 게시물이 "정보통신망법" 및 "저작권법"등 관련법에
                  위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에
                  따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며,
                  "회사"는 관련법에 따라 조치를 취하여야 합니다.
                </li>
                <li className="mt-1">
                  "회사"는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가
                  인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는
                  경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할
                  수 있습니다.
                </li>

                <li className="mt-1">
                  본 조에 따른 세부절차는 "정보통신망법" 및 "저작권법"이 규정한
                  범위 내에서 회사가 정한 게시중단요청서비스에 따릅니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 10조 권리의 귀속</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "서비스"에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단,
                  회원의 게시물 및 제휴계약에 따라 제공된 저작물 등은
                  제외합니다.
                </li>
                <li className="mt-1">
                  "회사"는 서비스와 관련하여 회원에게 회사가 정한 이용조건에
                  따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는 이용권만을
                  부여하며, "회원"은 이를 양도, 판매, 담보제공 등의 처분행위를
                  할 수 없습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">제 11조 책임제한</h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여
                  "서비스"를 제공할 수 없는 경우에는 "서비스" 제공에 관한 책임이
                  면제됩니다.
                </li>
                <li className="mt-1">
                  "회사"는 "회원" 의 귀책사유로 인한 서비스 이용의 장애에
                  대하여는 책임을 지지 않습니다.
                </li>
                <li className="mt-1">
                  "회사"는 "회원"이 "서비스"와 관련하여 게재한 정보, 자료,
                  사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지
                  않습니다.
                </li>
                <li className="mt-1">
                  "회사"는 "회원" 간 또는 "회원"과 제3자 상호간에 "서비스"를
                  매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
                </li>
                <li className="mt-1">
                  "회사"는 무료로 제공되는 서비스 이용과 관련하여 관련법에
                  특별한 규정이 없는 한 책임을 지지 않습니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                제 12조 준거법 및 재판관할
              </h1>

              <ol className="mt-2 list-decimal">
                <li className="mt-1">
                  "회사"와 "회원" 간 제기된 소송은 대한민국법을 준거법으로
                  합니다.
                </li>
                <li className="mt-1">
                  "회사"와 "회원"간 발생한 분쟁에 관한 소송은 제소 당시의
                  "회원"의 주소에 의하고, 주소가 없는 경우 거소를 관할하는
                  지방법원의 전속관할로 합니다. 단, 제소 당시 "회원"의 주소 또는
                  거소가 명확하지 아니한 경우의 관할법원은 민사소송법에 따라
                  정합니다.
                </li>
                <li className="mt-1">
                  해외에 주소나 거소가 있는 '회원' 의 경우 “회사”와 “회원”간
                  발생한 분쟁에 관한 소송은 전항에도 불구하고 대한민국
                  서울중앙지방법원을 관할 법원으로 합니다.
                </li>
              </ol>
            </div>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                본 약관은 2025.XX.XX일 부터 적용됩니다.
              </h1>
            </div>
          </div>
        </Tabs.Pannel>
        <Tabs.Pannel index={2}>
          <div>
            <h1 className="text-2xl font-bold">개인정보 취급 방침</h1>

            <div className="mt-10">
              <h1 className="mt-2 text-2xl font-bold">
                1. 개인정보의 수집 및 이용 목적
              </h1>

              <h2 className="mt-5 text-lg font-semi">
                <b>시네마허브</b>(이하 "회사")는 수집한 개인정보를 다음의 목적을
                위해 활용합니다.
              </h2>

              <ul className="mt-5 list-disc px-5">
                <li className="mt-1">회원 관리</li>
                <li className="mt-1">서비스 제공</li>
              </ul>
            </div>
          </div>
        </Tabs.Pannel>
      </Tabs>
    </div>
  );
};

export default AgreePolicy;
