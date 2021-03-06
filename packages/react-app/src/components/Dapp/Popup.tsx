import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface PopupProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ title, children, setOpen, open, onClose }: PopupProps) => {
  const cancelButtonRef = useRef();

  return (
    <div className="bg-blue-100">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div
            className="flex items-end justify-center min-h-screen
        pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="fixed inset-0 bg-gray-500
            bg-opacity-75 transition-opacity"
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white
             rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl
              transform transition-all sm:my-8 sm:align-middle sm:max-w-lg
              sm:w-full sm:p-6 bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800"
              >
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    className="inline-flex justify-center w-full rounded-md border
                  border-transparent shadow-sm px-4 py-2 bg-gradient-to-br  from-indigo-400 via-indigo-600
                  to-indigo-600 text-base font-medium
                  text-white hover:bg-indigo-700  sm:text-sm"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Popup;
