import { isModalOpenAtom } from "@/core/state/globalState";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import UploadFileForm from "./common/UploadFileForm";
import Image from "next/image";

const UploadFileModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsModalOpen}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-orange-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-4">
                <div>
                  <div className="flex justify-between">
                    <Dialog.Title as="h1" className="text-lg font-bold">
                      UPLOAD FILES
                    </Dialog.Title>
                    <Image
                      alt="X Circle"
                      className="cursor-pointer opacity-70"
                      height={18}
                      width={18}
                      src="/x-circle.svg"
                      onClick={() => setIsModalOpen(false)}
                    />
                  </div>
                  <div className="mt-1">
                    <UploadFileForm />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadFileModal;
