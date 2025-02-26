import Modal from "@ui/Modal";
import { FC, ReactNode, use, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import XIcon from "../../../icons/XIcon";

interface ModalPageProps {
  pageParams: string;
  setPageOpen: (value: boolean) => void;
  setSelectedPage: (value: string | null) => void;
  selectedPage: string | null;
  isPageOpen: boolean;
  children: ReactNode;
  pageFrom: string;
}

const ModalPage: FC<ModalPageProps> = (props) => {
  const {
    pageParams,
    setPageOpen,
    setSelectedPage,
    selectedPage,
    isPageOpen,
    children,
    pageFrom,
  } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageId = searchParams.get(`${pageParams}`);
  const currentPage = location.pathname + location.search;

  const closeModal = () => {
    setSelectedPage(null);
    setPageOpen(false);
    navigate(`${pageFrom}`);
  };

  useEffect(() => {
    if (currentPage === pageFrom) {
      setSelectedPage(null);
      setPageOpen(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (pageId) setSelectedPage(pageId);
  }, [pageId]);

  useEffect(() => {
    if (selectedPage) {
      setPageOpen(true);
    } else {
      setPageOpen(false);
    }
  }, [selectedPage]);

  return (
    <Modal onCloseModal={closeModal} open={isPageOpen}>
      <Modal.Backdrop className="z-1 bg-black/50 backdrop-blur-lg" />
      <Modal.Content className="z-2 my-[128px] top-0">
        <Modal.Close>
          <XIcon fill="#000" className="fixed top-4 right-4 w-6" />
        </Modal.Close>
        {children}
      </Modal.Content>
    </Modal>
  );
};

export default ModalPage;
